from fastapi import APIRouter

from app.api.deps import DbSession, UserId
from app.schemas.common import ApiResponse
from app.schemas.memory import DrawMemoryResponse
from app.services.memory_service import MemoryService

router = APIRouter(prefix="/memory", tags=["memory"])


@router.post("/draw", response_model=ApiResponse[DrawMemoryResponse])
async def draw_memory(db: DbSession, user_id: UserId):
    service = MemoryService(db)
    result = await service.draw_memory(user_id)
    return ApiResponse(data=result)
