from pydantic import BaseModel


class MonthlyStatsResponse(BaseModel):
    month: str
    total: int
    distribution: dict[str, int]
    dominant_type: str | None
    title: str
    summary: str
