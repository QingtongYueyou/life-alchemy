from datetime import datetime
from uuid import uuid4

from sqlalchemy import DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class HpLog(Base):
    __tablename__ = "hp_logs"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    user_id: Mapped[str] = mapped_column(String, nullable=False, index=True)
    change_value: Mapped[int] = mapped_column(Integer, nullable=False)
    reason: Mapped[str] = mapped_column(String, nullable=False)
    related_stone_id: Mapped[str | None] = mapped_column(
        String, ForeignKey("stones.id", ondelete="SET NULL"), nullable=True
    )
    hp_before: Mapped[int] = mapped_column(Integer, nullable=False)
    hp_after: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
