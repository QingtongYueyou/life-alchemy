"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/common/Card";
import { RARITY_LABELS } from "@/lib/constants";
import type { Stone } from "@/types/stone";
import { STONE_TYPES } from "@/types/stone";

interface StoneCardProps {
  stone: Stone;
}

const RARITY_COLORS: Record<string, string> = {
  normal: "var(--muted)",
  shiny: "var(--gold)",
  rare: "var(--accent)",
  legendary: "var(--red)",
};

export default function StoneCard({ stone }: StoneCardProps) {
  const router = useRouter();
  const cfg = STONE_TYPES[stone.type];

  return (
    <Card
      className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
      onClick={() => router.push(`/stones/${stone.id}`)}
    >
      <div className="flex items-start gap-3">
        {stone.imageUrl ? (
          <img
            src={stone.imageUrl}
            alt=""
            className="h-10 w-10 shrink-0 rounded-lg object-cover"
          />
        ) : (
          <span
            className="mt-0.5 h-3 w-3 shrink-0 rounded-full"
            style={{ background: `var(--${cfg?.color ?? "muted"})` }}
          />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-[var(--text)]">
            {stone.aiTitle ?? cfg?.label ?? "宝石"}
          </p>
          {stone.aiMessage && (
            <p className="mt-0.5 line-clamp-2 text-xs text-[var(--muted)]">{stone.aiMessage}</p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          {stone.rarity !== "normal" && (
            <span
              className="rounded-full px-1.5 py-0.5 text-[10px] font-medium"
              style={{ color: RARITY_COLORS[stone.rarity] ?? "var(--muted)" }}
            >
              {RARITY_LABELS[stone.rarity as keyof typeof RARITY_LABELS]}
            </span>
          )}
          {stone.isFavorite && <span className="text-xs text-[var(--red)]">&#x2665;</span>}
        </div>
      </div>
    </Card>
  );
}
