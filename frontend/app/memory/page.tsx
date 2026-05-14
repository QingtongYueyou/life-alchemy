"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MobilePage } from "@/components/layout/MobilePage";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { AuthGuard } from "@/lib/supabase/auth";
import HpToast from "@/components/stone/HpToast";
import { drawMemory, type DrawMemoryData } from "@/lib/api/memory";
import { STONE_TYPES, type StoneType } from "@/types/stone";

export default function MemoryPage() {
  const router = useRouter();
  const [drawing, setDrawing] = useState(false);
  const [memory, setMemory] = useState<DrawMemoryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hpToast, setHpToast] = useState<{ show: boolean; hp: number }>({
    show: false,
    hp: 0,
  });

  async function handleDraw() {
    setDrawing(true);
    setError(null);
    setMemory(null);

    const res = await drawMemory();

    if (!res.success || !res.data) {
      setError(res.error?.message ?? "抽取失败，请稍后再试");
      setDrawing(false);
      return;
    }

    setMemory(res.data);
    setHpToast({ show: true, hp: res.data.hpChange });
    setDrawing(false);
  }

  const cfg = memory ? STONE_TYPES[memory.stoneType as StoneType] : null;

  return (
    <AuthGuard>
      <MobilePage>
        <HpToast show={hpToast.show} hpChange={hpToast.hp} />

        <div className="flex items-center border-b border-[var(--line)] px-4 py-3">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-sm text-[var(--muted)]"
          >
            首页
          </button>
          <h1 className="flex-1 text-center text-base font-semibold text-[var(--text)]">
            回忆回血
          </h1>
          <div className="w-10" />
        </div>

        <div className="flex flex-col items-center gap-6 p-4">
          {!memory && !drawing && (
            <>
              <div className="flex flex-col items-center gap-3 pt-8">
                <span className="text-5xl">🔮</span>
                <h2 className="text-lg font-bold text-[var(--text)]">抽取一段回忆</h2>
                <p className="text-center text-sm text-[var(--muted)]">
                  从你的宝石中随机抽取一颗，
                  <br />
                  回顾当时的美好，恢复 +10 HP
                </p>
              </div>

              {error && (
                <p className="text-center text-sm text-[var(--red)]">{error}</p>
              )}

              <Button
                variant="primary"
                size="lg"
                onClick={handleDraw}
                className="mt-4"
              >
                抽取回忆
              </Button>
            </>
          )}

          {drawing && (
            <div className="flex flex-col items-center gap-4 pt-16">
              <span className="animate-pulse text-5xl">✨</span>
              <p className="text-sm text-[var(--muted)]">正在回忆中…</p>
            </div>
          )}

          {memory && (
            <>
              <div className="flex flex-col items-center gap-2 pt-4">
                <span
                  className="h-20 w-20 rounded-full shadow-lg"
                  style={{
                    background: `var(--${cfg?.color ?? memory.stoneColor ?? "muted"})`,
                  }}
                />
                <span className="text-sm font-medium text-[var(--muted)]">
                  {cfg?.label ?? memory.stoneType} 宝石
                </span>
              </div>

              <Card className="w-full">
                <p className="mb-1 text-xs text-[var(--muted)]">当时的记录</p>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--text)]">
                  {memory.content}
                </p>
                <p className="mt-2 text-xs text-[var(--muted)]">
                  {new Date(memory.createdAt).toLocaleDateString("zh-CN")}
                </p>
              </Card>

              {memory.aiMessage && (
                <Card className="w-full border-[var(--accent)]/20 bg-[var(--accent)]/5">
                  <p className="text-sm leading-relaxed text-[var(--text)]">
                    {memory.aiMessage}
                  </p>
                </Card>
              )}

              <p className="text-center text-sm font-medium text-[var(--accent)]">
                +{memory.hpChange} HP → 当前 {memory.hpAfter} HP
              </p>

              <div className="flex w-full gap-3">
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={() => router.push(`/stones/${memory.stoneId}`)}
                >
                  查看宝石
                </Button>
                <Button variant="primary" className="flex-1" onClick={handleDraw}>
                  再抽一次
                </Button>
              </div>
            </>
          )}
        </div>
      </MobilePage>
    </AuthGuard>
  );
}
