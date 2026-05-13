from datetime import datetime
from uuid import uuid4

from sqlalchemy import Boolean, DateTime, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Stone(Base):
    __tablename__ = "stones"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    user_id: Mapped[str] = mapped_column(String, nullable=False, index=True)
    type: Mapped[str] = mapped_column(String, nullable=False)
    color: Mapped[str] = mapped_column(String, nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    image_url: Mapped[str | None] = mapped_column(String, nullable=True)
    ai_title: Mapped[str | None] = mapped_column(String, nullable=True)
    ai_message: Mapped[str | None] = mapped_column(Text, nullable=True)
    rarity: Mapped[str] = mapped_column(String, nullable=False, default="normal")
    shape: Mapped[str] = mapped_column(String, nullable=False, default="crystal")
    is_favorite: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    draw_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    last_drawn_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
