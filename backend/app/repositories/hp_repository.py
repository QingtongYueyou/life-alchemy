from sqlalchemy.ext.asyncio import AsyncSession

from app.models.hp_log import HpLog


class HpRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, log: HpLog) -> HpLog:
        self.db.add(log)
        await self.db.flush()
        return log
