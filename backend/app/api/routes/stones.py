from fastapi import APIRouter, Query

from app.api.deps import DbSession, UserId
from app.schemas.common import ApiResponse
from app.schemas.stone import (
    CreateStoneRequest,
    CreateStoneResponse,
    StoneListResponse,
    StoneResponse,
)
from app.services.stone_service import StoneService

router = APIRouter(prefix="/stones", tags=["stones"])


@router.post("", response_model=ApiResponse[CreateStoneResponse])
async def create_stone(request: CreateStoneRequest, db: DbSession, user_id: UserId):
    service = StoneService(db)
    result = await service.create_stone(user_id, request)
    return ApiResponse(data=result)


@router.get("", response_model=ApiResponse[StoneListResponse])
async def list_stones(
    db: DbSession,
    user_id: UserId,
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=100),
    type: str | None = Query(None),
):
    service = StoneService(db)
    result = await service.list_stones(user_id, page, page_size, type)
    return ApiResponse(data=result)


@router.get("/{stone_id}", response_model=ApiResponse[StoneResponse])
async def get_stone(stone_id: str, db: DbSession, user_id: UserId):
    service = StoneService(db)
    result = await service.get_stone(user_id, stone_id)
    return ApiResponse(data=result)


@router.post("/{stone_id}/favorite")
async def favorite_stone(stone_id: str, db: DbSession, user_id: UserId):
    service = StoneService(db)
    await service.toggle_favorite(user_id, stone_id)
    return ApiResponse(data={"message": "ok"})


@router.delete("/{stone_id}/favorite")
async def unfavorite_stone(stone_id: str, db: DbSession, user_id: UserId):
    service = StoneService(db)
    await service.toggle_favorite(user_id, stone_id)
    return ApiResponse(data={"message": "ok"})


@router.delete("/{stone_id}")
async def delete_stone(stone_id: str, db: DbSession, user_id: UserId):
    service = StoneService(db)
    await service.delete_stone(user_id, stone_id)
    return ApiResponse(data={"message": "deleted"})
