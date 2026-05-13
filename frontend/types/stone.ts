export type StoneType = "strength" | "wisdom" | "charm" | "wealth" | "joy";

export type StoneRarity = "normal" | "shiny" | "rare" | "legendary";

export type StoneShape = "crystal";

export interface StoneTypeConfig {
  label: string;
  color: string;
  emoji: string;
  hp: number;
}

export const STONE_TYPES: Record<StoneType, StoneTypeConfig> = {
  strength: { label: "力量", color: "red", emoji: "🔴", hp: 5 },
  wisdom: { label: "智慧", color: "blue", emoji: "🔵", hp: 5 },
  charm: { label: "魅力", color: "pink", emoji: "🩷", hp: 5 },
  wealth: { label: "财富", color: "gold", emoji: "🟡", hp: 5 },
  joy: { label: "小确幸", color: "rainbow", emoji: "🌈", hp: 8 },
};

export interface Stone {
  id: string;
  userId: string;
  type: StoneType;
  color: string;
  content: string;
  imageUrl: string | null;
  aiTitle: string | null;
  aiMessage: string | null;
  rarity: StoneRarity;
  shape: StoneShape;
  isFavorite: boolean;
  drawCount: number;
  lastDrawnAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStoneRequest {
  type: StoneType;
  content: string;
  imageUrl?: string;
}

export interface StoneListResponse {
  list: Stone[];
  total: number;
}
