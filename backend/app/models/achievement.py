from datetime import datetime

from sqlalchemy import DateTime, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Achievement(Base):
    __tablename__ = "achievements"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    condition_type: Mapped[str] = mapped_column(String, nullable=False)
    condition_value: Mapped[int] = mapped_column(Integer, nullable=False)
    reward_type: Mapped[str] = mapped_column(String, nullable=False)
    reward_value: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
