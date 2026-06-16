"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  KnowledgeExplorer,
  type KnowledgeCardItem,
} from "@/components/knowledge/KnowledgeExplorer";
import { MindMap } from "@/components/knowledge/MindMap";

interface KnowledgeViewProps {
  cards: KnowledgeCardItem[];
  typeCount: number;
}

export function KnowledgeView({ cards, typeCount }: KnowledgeViewProps) {
  const [viewMode, setViewMode] = useState<"cards" | "mindmap">("cards");

  // 生成思维导图 Markdown
  const generateMindMapMarkdown = () => {
    let markdown = "# 知识网络\n\n";

    // 按类型分组
    const cardsByType = cards.reduce((acc, card) => {
      if (!acc[card.kind]) acc[card.kind] = [];
      acc[card.kind].push(card);
      return acc;
    }, {} as Record<string, KnowledgeCardItem[]>);

    // 生成每个类型的节点
    Object.entries(cardsByType).forEach(([type, typeCards]) => {
      const typeLabel = type === "insight" ? "洞察" :
                       type === "tip" ? "技巧" :
                       type === "concept" ? "概念" :
                       type === "book" ? "书籍" :
                       type === "person" ? "人物" :
                       type === "mentalmodel" ? "心智模型" :
                       type === "counterintuitive" ? "反直觉" :
                       type === "tool" ? "工具" : "笔记";

      markdown += `## ${typeLabel} (${typeCards.length})\n\n`;

      typeCards.slice(0, 5).forEach(card => {
        markdown += `- ${card.displayTitle}\n`;
        if (card.tags && card.tags.length > 0) {
          card.tags.slice(0, 3).forEach(tag => {
            markdown += `  - #${tag}\n`;
          });
        }
      });

      if (typeCards.length > 5) {
        markdown += `- ...还有 ${typeCards.length - 5} 张卡片\n`;
      }

      markdown += "\n";
    });

    return markdown;
  };

  return (
    <>
      <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <div>
          <Badge variant="info" size="md">
            Knowledge Network
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-text-primary md:text-5xl">
            知识网络
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-text-secondary md:text-lg">
            展示从 Obsidian 04_Knowledge 同步而来的真实卡片，支持卡片墙和思维导图两种视图。
          </p>
        </div>

        <Card className="grid grid-cols-2 gap-4 p-5" hover={false} glass>
          <div>
            <p className="text-sm text-text-secondary">真实卡片</p>
            <p className="mt-2 text-3xl font-semibold text-text-primary">{cards.length}</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">类型</p>
            <p className="mt-2 text-3xl font-semibold text-text-primary">{typeCount}</p>
          </div>
        </Card>
      </div>

      {/* 视图切换 */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("cards")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              viewMode === "cards"
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-bg-elevated text-text-secondary hover:bg-dark-hover hover:text-text-primary"
            }`}
          >
            📋 卡片墙
          </button>
          <button
            onClick={() => setViewMode("mindmap")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              viewMode === "mindmap"
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-bg-elevated text-text-secondary hover:bg-dark-hover hover:text-text-primary"
            }`}
          >
            🧠 思维导图
          </button>
        </div>

        <Badge variant="info" size="sm">
          {viewMode === "cards" ? "卡片视图" : "导图视图"}
        </Badge>
      </div>

      {/* 条件渲染：卡片墙或思维导图 */}
      {viewMode === "cards" ? (
        <KnowledgeExplorer cards={cards} />
      ) : (
        <Card className="min-h-[600px] overflow-hidden p-0">
          <div className="h-[520px] w-full md:h-[600px]">
            <MindMap markdown={generateMindMapMarkdown()} />
          </div>
        </Card>
      )}
    </>
  );
}
