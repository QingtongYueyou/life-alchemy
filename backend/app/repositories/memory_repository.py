from sqlalchemy.ext.asyncio import AsyncSession

from app.models.memory_draw_log import MemoryDrawLog


class MemoryRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, log: MemoryDrawLog) -> MemoryDrawLog:
        self.db.add(log)
        await self.db.flush()
        return log
