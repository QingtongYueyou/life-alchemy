from pydantic import BaseModel


class DrawMemoryResponse(BaseModel):
    stone_id: str
    stone_type: str
    stone_color: str
    content: str
    image_url: str | None
    created_at: str
    ai_message: str
    hp_change: int
    hp_after: int
