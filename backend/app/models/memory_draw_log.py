from datetime import datetime
from uuid import uuid4

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class MemoryDrawLog(Base):
    __tablename__ = "memory_draw_logs"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    user_id: Mapped[str] = mapped_column(String, nullable=False, index=True)
    stone_id: Mapped[str] = mapped_column(
        String, ForeignKey("stones.id", ondelete="CASCADE"), nullable=False
    )
    ai_message: Mapped[str | None] = mapped_column(Text, nullable=True)
    hp_change: Mapped[int] = mapped_column(Integer, nullable=False, default=10)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
