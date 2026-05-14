"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MobilePage } from "@/components/layout/MobilePage";
import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { AuthGuard } from "@/lib/supabase/auth";
import StoneCard from "@/components/stone/StoneCard";
import { listStones } from "@/lib/api/stones";
import type { Stone } from "@/types/stone";

export default function HomePage() {
  const router = useRouter();
  const [stones, setStones] = useState<Stone[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const load = useCallback(async (p: number) => {
    setLoading(true);
    const res = await listStones(p);
    if (res.success && res.data) {
      setStones((prev) => (p === 1 ? res.data!.list : [...prev, ...res.data!.list]));
      setTotal(res.data.total);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load(1);
  }, [load]);

  const hasMore = stones.length < total;

  return (
    <AuthGuard>
    <MobilePage>
      <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
        <div>
          <h1 className="text-lg font-bold text-[var(--accent)]">Life Alchemy</h1>
          <p className="text-xs text-[var(--muted)]">人生炼金术</p>
        </div>
        <div className="flex items-center gap-2">
          {total > 0 && (
            <button
              type="button"
              onClick={() => router.push("/memory")}
              className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              回忆回血
            </button>
          )}
          <span className="text-xs text-[var(--muted)]">{total} 颗宝石</span>
        </div>
      </div>

      <div className="p-4">
        {!loading && stones.length === 0 ? (
          <EmptyState
            message="还没有宝石，记录第一件事吧"
            action={
              <Button variant="primary" size="sm" onClick={() => router.push("/create")}>
                记录一件事
              </Button>
            }
          />
        ) : (
          <div className="flex flex-col gap-2">
            {stones.map((s) => (
              <StoneCard key={s.id} stone={s} />
            ))}
            {hasMore && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const next = page + 1;
                  setPage(next);
                  load(next);
                }}
              >
                {loading ? "加载中…" : "加载更多"}
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-4 flex justify-center">
        <Button variant="primary" size="lg" onClick={() => router.push("/create")}>
          记录一件事
        </Button>
      </div>
    </MobilePage>
    </AuthGuard>
  );
}
