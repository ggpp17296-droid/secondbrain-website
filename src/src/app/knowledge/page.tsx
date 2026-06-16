import {
  type KnowledgeCardItem,
} from "@/components/knowledge/KnowledgeExplorer";
import { KnowledgeView } from "@/components/knowledge/KnowledgeView";
import { getVaultData, type VaultCard } from "@/lib/vault-data";

const knownKinds = [
  "insight",
  "tip",
  "counterintuitive",
  "concept",
  "person",
  "book",
  "mentalmodel",
  "quote",
  "tool",
  "note",
  "card",
];

function isRealCard(card: VaultCard) {
  return !card.id.includes("_EXAMPLE_") && !card.title.includes("_EXAMPLE_");
}

function inferKind(card: VaultCard) {
  const tagKind = card.tags?.find((tag) => knownKinds.includes(tag));
  if (tagKind && tagKind !== "card") {
    return tagKind;
  }

  const idPrefix = card.id.split("_")[0];
  if (knownKinds.includes(idPrefix)) {
    return idPrefix;
  }

  return card.type === "note" ? "note" : card.type || "card";
}

function cleanTitle(title: string) {
  return title.replace(
    /^(insight|tip|counterintuitive|concept|person|book|mentalmodel|quote|tool|card|note)_/,
    "",
  );
}

function toKnowledgeItem(card: VaultCard): KnowledgeCardItem {
  const kind = inferKind(card);

  return {
    id: card.id,
    kind,
    title: card.title,
    displayTitle: cleanTitle(card.title),
    summary: card.summary ?? "",
    tags: card.tags ?? [],
    createdAt: card.createdAt,
    content: card.content ?? "",
  };
}

export default function KnowledgePage() {
  const vaultData = getVaultData();
  const cards = vaultData.cards.filter(isRealCard).map(toKnowledgeItem);
  const typeCount = new Set(cards.map((card) => card.kind)).size;

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <KnowledgeView cards={cards} typeCount={typeCount} />
    </section>
  );
}
