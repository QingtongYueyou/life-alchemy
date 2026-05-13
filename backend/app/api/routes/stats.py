from fastapi import APIRouter, Query

from app.api.deps import DbSession, UserId
from app.schemas.common import ApiResponse
from app.schemas.stats import MonthlyStatsResponse
from app.services.stats_service import StatsService

router = APIRouter(prefix="/stats", tags=["stats"])


@router.get("/monthly", response_model=ApiResponse[MonthlyStatsResponse])
async def get_monthly_stats(db: DbSession, user_id: UserId, month: str = Query(...)):
    service = StatsService(db)
    result = await service.get_monthly_stats(user_id, month)
    return ApiResponse(data=result)
