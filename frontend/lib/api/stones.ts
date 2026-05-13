import { apiRequest, type ApiResponse } from "@/lib/api/client";
import type { CreateStoneRequest, Stone, StoneListResponse } from "@/types/stone";

interface CreateStoneData {
  stone: Stone;
  hp_change: number;
  hp_after: number;
}

export async function createStone(req: CreateStoneRequest): Promise<ApiResponse<CreateStoneData>> {
  return apiRequest<CreateStoneData>("/stones", {
    method: "POST",
    body: JSON.stringify(req),
  });
}

export async function listStones(
  page = 1,
  pageSize = 50,
  type?: string
): Promise<ApiResponse<StoneListResponse>> {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });
  if (type) params.set("type", type);
  return apiRequest<StoneListResponse>(`/stones?${params}`);
}

export async function getStone(id: string): Promise<ApiResponse<Stone>> {
  return apiRequest<Stone>(`/stones/${id}`);
}

export async function toggleFavorite(id: string, on: boolean): Promise<ApiResponse<Stone>> {
  return apiRequest<Stone>(`/stones/${id}/favorite`, {
    method: on ? "POST" : "DELETE",
  });
}

export async function deleteStone(id: string): Promise<ApiResponse<null>> {
  return apiRequest<null>(`/stones/${id}`, { method: "DELETE" });
}
