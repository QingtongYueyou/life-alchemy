"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { MobilePage } from "@/components/layout/MobilePage";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { getStone, toggleFavorite } from "@/lib/api/stones";
import { RARITY_LABELS } from "@/lib/constants";
import type { Stone } from "@/types/stone";
import { STONE_TYPES } from "@/types/stone";

const RARITY_COLORS: Record<string, string> = {
  normal: "var(--muted)",
  shiny: "var(--gold)",
  rare: "var(--accent)",
  legendary: "var(--red)",
};

export default function StoneDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [stone, setStone] = useState<Stone | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStone(id).then((res) => {
      if (res.success && res.data) {
        setStone(res.data);
      } else {
        setError(res.error?.message ?? "宝石未找到");
      }
      setLoading(false);
    });
  }, [id]);

  async function handleToggleFavorite() {
    if (!stone) return;
    const res = await toggleFavorite(stone.id, !stone.isFavorite);
    if (res.success && res.data) {
      setStone(res.data);
    }
  }

  if (loading) {
    return (
      <MobilePage>
        <div className="flex h-64 items-center justify-center">
          <p className="text-sm text-[var(--muted)]">加载中…</p>
        </div>
      </MobilePage>
    );
  }

  if (error || !stone) {
    return (
      <MobilePage>
        <div className="flex h-64 flex-col items-center justify-center gap-3">
          <p className="text-sm text-[var(--muted)]">{error ?? "宝石未找到"}</p>
          <Button variant="ghost" onClick={() => router.push("/")}>
            返回首页
          </Button>
        </div>
      </MobilePage>
    );
  }

  const cfg = STONE_TYPES[stone.type];
  const rarityLabel = RARITY_LABELS[stone.rarity as keyof typeof RARITY_LABELS];

  return (
    <MobilePage>
      <div className="flex items-center border-b border-[var(--line)] px-4 py-3">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-sm text-[var(--muted)]"
        >
          首页
        </button>
        <h1 className="flex-1 text-center text-base font-semibold text-[var(--text)]">宝石详情</h1>
        <button
          type="button"
          onClick={handleToggleFavorite}
          className="text-lg"
          style={{ color: stone.isFavorite ? "var(--red)" : "var(--line)" }}
        >
          &#x2665;
        </button>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col items-center gap-2 pt-4">
          <span
            className="h-16 w-16 rounded-full shadow-md"
            style={{ background: `var(--${cfg?.color ?? "muted"})` }}
          />
          <h2 className="text-lg font-bold text-[var(--text)]">
            {stone.aiTitle ?? cfg?.label ?? "宝石"}
          </h2>
          <span
            className="rounded-full px-2 py-0.5 text-xs font-medium"
            style={{
              color: RARITY_COLORS[stone.rarity] ?? "var(--muted)",
              background: "var(--paper)",
              border: `1px solid ${RARITY_COLORS[stone.rarity] ?? "var(--line)"}`,
            }}
          >
            {rarityLabel}
          </span>
        </div>

        {stone.aiMessage && (
          <Card>
            <p className="text-sm leading-relaxed text-[var(--text)]">{stone.aiMessage}</p>
          </Card>
        )}

        <Card>
          <p className="mb-1 text-xs text-[var(--muted)]">我的记录</p>
          <p className="whitespace-pre-wrap text-sm text-[var(--text)]">{stone.content}</p>
        </Card>

        <p className="text-center text-xs text-[var(--muted)]">
          {new Date(stone.createdAt).toLocaleString("zh-CN")}
        </p>
      </div>
    </MobilePage>
  );
}
