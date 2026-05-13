from app.schemas.base import CamelModel


class MonthlyStatsResponse(CamelModel):
    month: str
    total: int
    distribution: dict[str, int]
    dominant_type: str | None
    title: str
    summary: str
