from sqlalchemy.ext.asyncio import AsyncSession

from app.ai.client import generate_memory_ai
from app.domain.hp_rules import MEMORY_DRAW_HP, clamp_hp
from app.domain.memory_draw import calculate_draw_weight, weighted_random_draw
from app.models.hp_log import HpLog
from app.models.memory_draw_log import MemoryDrawLog
from app.repositories.hp_repository import HpRepository
from app.repositories.memory_repository import MemoryRepository
from app.repositories.profile_repository import ProfileRepository
from app.repositories.stone_repository import StoneRepository
from app.schemas.memory import DrawMemoryResponse


class MemoryService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.stone_repo = StoneRepository(db)
        self.profile_repo = ProfileRepository(db)
        self.hp_repo = HpRepository(db)
        self.memory_repo = MemoryRepository(db)

    async def draw_memory(self, user_id: str) -> DrawMemoryResponse:
        stones = await self.stone_repo.get_all_for_draw(user_id)
        if not stones:
            from app.core.errors import AppError

            raise AppError(
                code="NO_STONES",
                message="还没有宝石可以抽取，先创建一颗吧",
                status_code=400,
            )

        stones_with_weights = []
        for s in stones:
            weight = calculate_draw_weight(
                is_favorite=s.is_favorite,
                stone_type=s.type,
                has_image=bool(s.image_url),
                last_drawn_at=s.last_drawn_at,
                created_at=s.created_at,
            )
            stones_with_weights.append((s.id, weight))

        drawn_id = weighted_random_draw(stones_with_weights)
        drawn_stone = next((s for s in stones if s.id == drawn_id), stones[0])

        ai_message = await generate_memory_ai(drawn_stone.type, drawn_stone.content)

        await self.stone_repo.update_draw_info(drawn_stone.id)

        profile = await self.profile_repo.get_by_id(user_id)
        if not profile:
            from app.core.errors import NotFoundError

            raise NotFoundError("用户")

        hp_before = profile.hp
        hp_after = clamp_hp(hp_before + MEMORY_DRAW_HP)
        await self.profile_repo.update_hp(user_id, hp_after)

        hp_log = HpLog(
            user_id=user_id,
            change_value=MEMORY_DRAW_HP,
            reason="memory_draw",
            related_stone_id=drawn_stone.id,
            hp_before=hp_before,
            hp_after=hp_after,
        )
        await self.hp_repo.create(hp_log)

        memory_log = MemoryDrawLog(
            user_id=user_id,
            stone_id=drawn_stone.id,
            ai_message=ai_message,
            hp_change=MEMORY_DRAW_HP,
        )
        await self.memory_repo.create(memory_log)

        return DrawMemoryResponse(
            stone_id=drawn_stone.id,
            stone_type=drawn_stone.type,
            stone_color=drawn_stone.color,
            content=drawn_stone.content,
            image_url=drawn_stone.image_url,
            created_at=drawn_stone.created_at.isoformat(),
            ai_message=ai_message,
            hp_change=MEMORY_DRAW_HP,
            hp_after=hp_after,
        )
