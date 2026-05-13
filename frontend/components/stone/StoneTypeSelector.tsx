"use client";

import type { StoneType } from "@/types/stone";
import { STONE_TYPES } from "@/types/stone";

interface StoneTypeSelectorProps {
  selected: StoneType | null;
  onSelect: (type: StoneType) => void;
}

export default function StoneTypeSelector({ selected, onSelect }: StoneTypeSelectorProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {(Object.keys(STONE_TYPES) as StoneType[]).map((type) => {
        const cfg = STONE_TYPES[type];
        const isActive = selected === type;
        return (
          <button
            key={type}
            type="button"
            onClick={() => onSelect(type)}
            className={`flex flex-col items-center gap-1 rounded-xl p-2 transition-all ${
              isActive
                ? "bg-[var(--accent-soft)] ring-2 ring-[var(--accent)]"
                : "bg-[var(--paper)] border border-[var(--line)]"
            }`}
          >
            <span className="h-6 w-6 rounded-full" style={{ background: `var(--${cfg.color})` }} />
            <span className="text-xs text-[var(--text)]">{cfg.label}</span>
            <span className="text-[10px] text-[var(--muted)]">+{cfg.hp} HP</span>
          </button>
        );
      })}
    </div>
  );
}
