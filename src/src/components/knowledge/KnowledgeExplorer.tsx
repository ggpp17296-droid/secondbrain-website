"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export interface KnowledgeCardItem {
  id: string;
  kind: string;
  title: string;
  displayTitle: string;
  summary: string;
  tags: string[];
  createdAt?: string;
  content: string;
}

const typeMeta: Record<
  string,
  { icon: string; label: string; badge: "success" | "warning" | "pending" | "info" }
> = {
  insight: { icon: "💡", label: "洞察", badge: "info" },
  tip: { icon: "📌", label: "技巧", badge: "success" },
  counterintuitive: { icon: "🔄", label: "反直觉", badge: "warning" },
  concept: { icon: "🎯", label: "概念", badge: "info" },
  person: { icon: "👤", label: "人物", badge: "pending" },
  book: { icon: "📖", label: "书籍", badge: "warning" },
  mentalmodel: { icon: "🧠", label: "心智模型", badge: "info" },
  note: { icon: "📝", label: "笔记", badge: "pending" },
  card: { icon: "📝", label: "卡片", badge: "pending" },
};

function getTypeMeta(kind: string) {
  return typeMeta[kind] ?? { icon: "📝", label: kind, badge: "pending" as const };
}

function createExcerpt(content: string) {
  return content
    .replace(/^#+\s+/gm, "")
    .replace(/\[\[|\]\]/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim()
    .slice(0, 520);
}

export function KnowledgeExplorer({ cards }: { cards: KnowledgeCardItem[] }) {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCardId, setSelectedCardId] = useState(cards[0]?.id ?? "");

  const typeOptions = useMemo(() => {
    return Array.from(new Set(cards.map((card) => card.kind))).map((kind) => ({
      kind,
      count: cards.filter((card) => card.kind === kind).length,
      meta: getTypeMeta(kind),
    }));
  }, [cards]);

  const filteredCards = useMemo(() => {
    if (selectedType === "all") {
      return cards;
    }

    return cards.filter((card) => card.kind === selectedType);
  }, [cards, selectedType]);

  const selectedCard =
    cards.find((card) => card.id === selectedCardId) ?? filteredCards[0] ?? cards[0];

  function handleTypeChange(kind: string) {
    setSelectedType(kind);
    const nextCard = kind === "all" ? cards[0] : cards.find((card) => card.kind === kind);
    setSelectedCardId(nextCard?.id ?? "");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div>
        <div className="mb-6 flex flex-wrap gap-3">
          <Button
            type="button"
            variant={selectedType === "all" ? "primary" : "secondary"}
            size="sm"
            onClick={() => handleTypeChange("all")}
          >
            全部 ({cards.length})
          </Button>
          {typeOptions.map(({ kind, count, meta }) => (
            <Button
              key={kind}
              type="button"
              variant={selectedType === kind ? "primary" : "secondary"}
              size="sm"
              onClick={() => handleTypeChange(kind)}
            >
              {meta.icon} {meta.label} ({count})
            </Button>
          ))}
        </div>

        {filteredCards.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {filteredCards.map((card) => {
              const meta = getTypeMeta(card.kind);
              const isSelected = selectedCard?.id === card.id;

              return (
                <Card
                  key={card.id}
                  className={`overflow-hidden ${isSelected ? "border-primary/70" : ""}`}
                >
                  <button
                    type="button"
                    className="block h-full w-full p-5 text-left"
                    onClick={() => setSelectedCardId(card.id)}
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl" aria-hidden="true">
                          {meta.icon}
                        </span>
                        <Badge variant={meta.badge}>{meta.label}</Badge>
                      </div>
                      {card.createdAt ? (
                        <span className="shrink-0 text-xs text-text-tertiary">
                          {card.createdAt}
                        </span>
                      ) : null}
                    </div>

                    <h2 className="text-lg font-semibold leading-snug text-text-primary">
                      {card.displayTitle}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-text-secondary">
                      {card.summary || createExcerpt(card.content)}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {card.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border-default bg-dark-hover px-2.5 py-1 text-xs font-medium text-text-secondary"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </button>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-10 text-center" hover={false}>
            <p className="text-text-secondary">该类型暂无卡片</p>
          </Card>
        )}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        {selectedCard ? (
          <Card className="p-6" hover={false} glass>
            <div className="mb-5 flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">
                {getTypeMeta(selectedCard.kind).icon}
              </span>
              <div>
                <Badge variant={getTypeMeta(selectedCard.kind).badge}>
                  {getTypeMeta(selectedCard.kind).label}
                </Badge>
                {selectedCard.createdAt ? (
                  <p className="mt-2 text-xs text-text-tertiary">
                    创建于 {selectedCard.createdAt}
                  </p>
                ) : null}
              </div>
            </div>

            <h3 className="text-xl font-semibold leading-snug text-text-primary">
              {selectedCard.displayTitle}
            </h3>
            <p className="mt-4 text-sm leading-7 text-text-secondary">
              {selectedCard.summary || createExcerpt(selectedCard.content)}
            </p>

            <div className="mt-6 border-t border-border-default pt-5">
              <p className="text-sm font-medium text-text-primary">内容摘录</p>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-text-tertiary">
                {createExcerpt(selectedCard.content)}
              </p>
            </div>
          </Card>
        ) : null}
      </aside>
    </div>
  );
}
