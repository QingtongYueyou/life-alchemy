import { StoneType } from "./stone";

export interface MonthlyStats {
  month: string;
  total: number;
  distribution: Record<StoneType, number>;
  dominantType: StoneType | null;
  title: string;
  summary: string;
}
