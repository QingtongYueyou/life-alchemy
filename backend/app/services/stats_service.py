from sqlalchemy import extract, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.stats_rules import get_dominant_type, get_growth_summary, get_growth_title
from app.models.stone import Stone
from app.schemas.stats import MonthlyStatsResponse


class StatsService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_monthly_stats(self, user_id: str, month: str) -> MonthlyStatsResponse:
        year, mon = month.split("-")

        result = await self.db.execute(
            select(Stone.type, func.count())
            .where(
                Stone.user_id == user_id,
                extract("year", Stone.created_at) == int(year),
                extract("month", Stone.created_at) == int(mon),
            )
            .group_by(Stone.type)
        )
        rows = result.all()

        distribution = {t: 0 for t in ["strength", "wisdom", "charm", "wealth", "joy"]}
        total = 0
        for stone_type, count in rows:
            distribution[stone_type] = count
            total += count

        dominant_type = get_dominant_type(distribution)
        title = get_growth_title(dominant_type)
        summary = get_growth_summary(dominant_type)

        return MonthlyStatsResponse(
            month=month,
            total=total,
            distribution=distribution,
            dominant_type=dominant_type,
            title=title,
            summary=summary,
        )
