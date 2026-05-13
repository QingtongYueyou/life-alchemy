from uuid import uuid4

from sqlalchemy.ext.asyncio import AsyncSession

from app.ai.client import generate_stone_ai
from app.domain.hp_rules import clamp_hp, get_create_stone_hp
from app.domain.rarity import roll_rarity
from app.domain.stone_types import get_stone_color
from app.models.hp_log import HpLog
from app.models.stone import Stone
from app.repositories.hp_repository import HpRepository
from app.repositories.profile_repository import ProfileRepository
from app.repositories.stone_repository import StoneRepository
from app.schemas.stone import CreateStoneRequest, CreateStoneResponse, StoneResponse


class StoneService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.stone_repo = StoneRepository(db)
        self.profile_repo = ProfileRepository(db)
        self.hp_repo = HpRepository(db)

    async def create_stone(self, user_id: str, request: CreateStoneRequest) -> CreateStoneResponse:
        profile = await self.profile_repo.create_if_not_exists(user_id)

        color = get_stone_color(request.type)
        rarity = roll_rarity(has_image=bool(request.image_url))
        ai_title, ai_message = await generate_stone_ai(request.type, request.content)

        stone = Stone(
            id=str(uuid4()),
            user_id=user_id,
            type=request.type,
            color=color,
            content=request.content,
            image_url=request.image_url,
            ai_title=ai_title,
            ai_message=ai_message,
            rarity=rarity,
            shape="crystal",
        )
        stone = await self.stone_repo.create(stone)

        hp_change = get_create_stone_hp(request.type)
        hp_before = profile.hp
        hp_after = clamp_hp(hp_before + hp_change)

        await self.profile_repo.update_hp(user_id, hp_after)

        hp_log = HpLog(
            user_id=user_id,
            change_value=hp_change,
            reason="create_joy_stone" if request.type == "joy" else "create_stone",
            related_stone_id=stone.id,
            hp_before=hp_before,
            hp_after=hp_after,
        )
        await self.hp_repo.create(hp_log)

        return CreateStoneResponse(
            stone=StoneResponse.model_validate(stone),
            hp_change=hp_change,
            hp_after=hp_after,
        )

    async def get_stone(self, user_id: str, stone_id: str) -> StoneResponse:
        stone = await self.stone_repo.get_by_id(stone_id, user_id)
        if not stone:
            from app.core.errors import NotFoundError

            raise NotFoundError("宝石")
        return StoneResponse.model_validate(stone)

    async def list_stones(
        self, user_id: str, page: int = 1, page_size: int = 50, stone_type: str | None = None
    ):
        stones, total = await self.stone_repo.get_list(user_id, page, page_size, stone_type)
        return {
            "list": [StoneResponse.model_validate(s) for s in stones],
            "total": total,
        }

    async def toggle_favorite(self, user_id: str, stone_id: str) -> StoneResponse:
        stone = await self.stone_repo.get_by_id(stone_id, user_id)
        if not stone:
            from app.core.errors import NotFoundError

            raise NotFoundError("宝石")
        await self.stone_repo.toggle_favorite(stone_id, user_id, not stone.is_favorite)
        await self.db.refresh(stone)
        return StoneResponse.model_validate(stone)

    async def delete_stone(self, user_id: str, stone_id: str) -> None:
        stone = await self.stone_repo.get_by_id(stone_id, user_id)
        if not stone:
            from app.core.errors import NotFoundError

            raise NotFoundError("宝石")
        await self.stone_repo.delete(stone_id, user_id)
