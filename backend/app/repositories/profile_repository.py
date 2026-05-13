from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.profile import Profile


class ProfileRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, user_id: str) -> Profile | None:
        result = await self.db.execute(select(Profile).where(Profile.id == user_id))
        return result.scalar_one_or_none()

    async def create_if_not_exists(self, user_id: str) -> Profile:
        profile = await self.get_by_id(user_id)
        if profile:
            return profile
        profile = Profile(id=user_id)
        self.db.add(profile)
        await self.db.flush()
        await self.db.refresh(profile)
        return profile

    async def update_hp(self, user_id: str, new_hp: int) -> None:
        await self.db.execute(update(Profile).where(Profile.id == user_id).values(hp=new_hp))
