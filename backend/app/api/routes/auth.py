from fastapi import APIRouter

from app.api.deps import DbSession, UserId
from app.repositories.profile_repository import ProfileRepository
from app.schemas.base import CamelModel
from app.schemas.common import ApiResponse

router = APIRouter(prefix="/auth", tags=["auth"])


class UserProfileResponse(CamelModel):
    id: str
    nickname: str | None
    avatar_url: str | None
    hp: int
    current_title: str
    current_skin_id: str


@router.get("/me", response_model=ApiResponse[UserProfileResponse])
async def get_me(db: DbSession, user_id: UserId):
    repo = ProfileRepository(db)
    profile = await repo.create_if_not_exists(user_id)
    return ApiResponse(data=UserProfileResponse.model_validate(profile))
