import re

from fastapi import APIRouter, Query

from app.api.deps import DbSession, UserId
from app.core.errors import AppError
from app.schemas.common import ApiResponse
from app.schemas.stats import MonthlyStatsResponse
from app.services.stats_service import StatsService

router = APIRouter(prefix="/stats", tags=["stats"])

MONTH_PATTERN = re.compile(r"^\d{4}-(0[1-9]|1[0-2])$")


@router.get("/monthly", response_model=ApiResponse[MonthlyStatsResponse])
async def get_monthly_stats(db: DbSession, user_id: UserId, month: str = Query(...)):
    if not MONTH_PATTERN.match(month):
        raise AppError(code="INVALID_MONTH", message="month 格式须为 YYYY-MM，如 2026-01")
    service = StatsService(db)
    result = await service.get_monthly_stats(user_id, month)
    return ApiResponse(data=result)
