import { apiRequest, type ApiResponse } from "@/lib/api/client";

export interface DrawMemoryData {
  stoneId: string;
  stoneType: string;
  stoneColor: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  aiMessage: string;
  hpChange: number;
  hpAfter: number;
}

export async function drawMemory(): Promise<ApiResponse<DrawMemoryData>> {
  return apiRequest<DrawMemoryData>("/memory/draw", {
    method: "POST",
  });
}
