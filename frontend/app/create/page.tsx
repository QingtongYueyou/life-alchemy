"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MobilePage } from "@/components/layout/MobilePage";
import { Button } from "@/components/common/Button";
import StoneTypeSelector from "@/components/stone/StoneTypeSelector";
import HpToast from "@/components/stone/HpToast";
import { createStone } from "@/lib/api/stones";
import type { StoneType } from "@/types/stone";
import { STONE_TYPES } from "@/types/stone";

const MAX_LENGTH = 2000;

export default function CreateStonePage() {
  const router = useRouter();
  const [type, setType] = useState<StoneType | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hpToast, setHpToast] = useState<{ show: boolean; hp: number }>({
    show: false,
    hp: 0,
  });

  const canSubmit = type !== null && content.trim().length > 0 && !loading;

  async function handleSubmit() {
    if (!type || !content.trim()) return;
    setLoading(true);
    setError(null);

    const res = await createStone({ type, content: content.trim() });

    if (!res.success || !res.data) {
      setError(res.error?.message ?? "创建失败，请重试");
      setLoading(false);
      return;
    }

    setHpToast({ show: true, hp: res.data.hp_change });
    setTimeout(() => {
      router.push(`/stones/${res.data!.stone.id}`);
    }, 800);
  }

  return (
    <MobilePage>
      <HpToast show={hpToast.show} hpChange={hpToast.hp} />

      <div className="flex items-center border-b border-[var(--line)] px-4 py-3">
        <button type="button" onClick={() => router.back()} className="text-sm text-[var(--muted)]">
          返回
        </button>
        <h1 className="flex-1 text-center text-base font-semibold text-[var(--text)]">
          记录一件事
        </h1>
        <div className="w-10" />
      </div>

      <div className="flex flex-col gap-5 p-4">
        <section>
          <p className="mb-2 text-sm font-medium text-[var(--text)]">选择宝石类型</p>
          <StoneTypeSelector selected={type} onSelect={setType} />
          {type && (
            <p className="mt-2 text-xs text-[var(--muted)]">
              {STONE_TYPES[type].label} &middot; +{STONE_TYPES[type].hp} HP
            </p>
          )}
        </section>

        <section>
          <p className="mb-2 text-sm font-medium text-[var(--text)]">今天发生了什么？</p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={MAX_LENGTH}
            rows={5}
            placeholder="写下让你开心、有成就感、或想记住的小事…"
            className="w-full resize-none rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
          />
          <p className="mt-1 text-right text-xs text-[var(--muted)]">
            {content.length} / {MAX_LENGTH}
          </p>
        </section>

        {error && <p className="text-center text-sm text-[var(--red)]">{error}</p>}

        <Button variant="primary" size="lg" fullWidth disabled={!canSubmit} onClick={handleSubmit}>
          {loading ? "炼成中…" : "炼成宝石"}
        </Button>
      </div>
    </MobilePage>
  );
}
