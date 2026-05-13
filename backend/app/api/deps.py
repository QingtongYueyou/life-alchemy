from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_user_id
from app.db.session import get_db

DbSession = Annotated[AsyncSession, Depends(get_db)]
UserId = Annotated[str, Depends(get_current_user_id)]
