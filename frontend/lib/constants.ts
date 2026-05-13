export const APP_NAME = "Life Alchemy";
export const APP_NAME_CN = "人生炼金术";

export const HP = {
  MIN: 0,
  MAX: 100,
  DEFAULT: 80,
  CREATE_STONE: 5,
  CREATE_JOY_STONE: 8,
  MEMORY_DRAW: 10,
  FAVORITE: 2,
} as const;

export const STONE_PAGE_SIZE = 50;

export const RARITY_LABELS: Record<string, string> = {
  normal: "普通",
  shiny: "闪耀",
  rare: "稀有",
  legendary: "传奇",
};

export const HP_STATUS: Array<{
  min: number;
  max: number;
  label: string;
  message: string;
}> = [
  { min: 80, max: 100, label: "满能量", message: "你的罐子正在发光" },
  { min: 60, max: 79, label: "稳定", message: "今天的能量还不错" },
  { min: 40, max: 59, label: "有点疲惫", message: "也许可以慢慢来" },
  { min: 20, max: 39, label: "需要回血", message: "从过去借一点光吧" },
  { min: 0, max: 19, label: "低能量", message: "先照顾好自己就很好" },
];

export function getHpStatus(hp: number) {
  return HP_STATUS.find((s) => hp >= s.min && hp <= s.max) || HP_STATUS[HP_STATUS.length - 1];
}
