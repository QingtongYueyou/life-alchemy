from datetime import datetime, timezone

from sqlalchemy import func, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.stone import Stone


class StoneRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, stone: Stone) -> Stone:
        self.db.add(stone)
        await self.db.flush()
        await self.db.refresh(stone)
        return stone

    async def get_by_id(self, stone_id: str, user_id: str) -> Stone | None:
        result = await self.db.execute(
            select(Stone).where(Stone.id == stone_id, Stone.user_id == user_id)
        )
        return result.scalar_one_or_none()

    async def get_list(
        self, user_id: str, page: int = 1, page_size: int = 50, stone_type: str | None = None
    ) -> tuple[list[Stone], int]:
        query = select(Stone).where(Stone.user_id == user_id)
        count_query = select(func.count()).select_from(Stone).where(Stone.user_id == user_id)

        if stone_type:
            query = query.where(Stone.type == stone_type)
            count_query = count_query.where(Stone.type == stone_type)

        query = query.order_by(Stone.created_at.desc())
        query = query.offset((page - 1) * page_size).limit(page_size)

        result = await self.db.execute(query)
        stones = list(result.scalars().all())

        count_result = await self.db.execute(count_query)
        total = count_result.scalar() or 0

        return stones, total

    async def get_all_for_draw(self, user_id: str) -> list[Stone]:
        result = await self.db.execute(
            select(Stone).where(Stone.user_id == user_id).order_by(Stone.created_at.desc())
        )
        return list(result.scalars().all())

    async def update_draw_info(self, stone_id: str) -> None:
        await self.db.execute(
            update(Stone)
            .where(Stone.id == stone_id)
            .values(
                draw_count=Stone.draw_count + 1,
                last_drawn_at=datetime.now(timezone.utc),
            )
        )

    async def toggle_favorite(self, stone_id: str, user_id: str, is_favorite: bool) -> None:
        await self.db.execute(
            update(Stone)
            .where(Stone.id == stone_id, Stone.user_id == user_id)
            .values(is_favorite=is_favorite)
        )

    async def delete(self, stone_id: str, user_id: str) -> None:
        stone = await self.get_by_id(stone_id, user_id)
        if stone:
            await self.db.delete(stone)
