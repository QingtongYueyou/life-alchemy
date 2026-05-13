from datetime import datetime

from pydantic import Field

from app.schemas.base import CamelModel


class CreateStoneRequest(CamelModel):
    type: str = Field(..., pattern=r"^(strength|wisdom|charm|wealth|joy)$")
    content: str = Field(..., min_length=1, max_length=2000)
    image_url: str | None = None


class StoneResponse(CamelModel):
    id: str
    type: str
    color: str
    content: str
    image_url: str | None
    ai_title: str | None
    ai_message: str | None
    rarity: str
    shape: str
    is_favorite: bool
    created_at: datetime


class CreateStoneResponse(CamelModel):
    stone: StoneResponse
    hp_change: int
    hp_after: int


class StoneListResponse(CamelModel):
    list: list[StoneResponse]
    total: int
