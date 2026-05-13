from datetime import datetime

from pydantic import BaseModel, Field


class CreateStoneRequest(BaseModel):
    type: str = Field(..., pattern=r"^(strength|wisdom|charm|wealth|joy)$")
    content: str = Field(..., min_length=1, max_length=2000)
    image_url: str | None = None


class StoneResponse(BaseModel):
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

    class Config:
        from_attributes = True


class CreateStoneResponse(BaseModel):
    stone: StoneResponse
    hp_change: int
    hp_after: int


class StoneListResponse(BaseModel):
    list: list[StoneResponse]
    total: int
