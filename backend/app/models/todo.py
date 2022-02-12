from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import relationship

from db.base_class import Base

if TYPE_CHECKING:
    from .user import User  # noqa: F401


class Todo(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(250), nullable=False)
    owner_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    is_done = Column(Boolean, default=False)
    owner = relationship("User", back_populates="todos")
