from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from db.base_class import Base

if TYPE_CHECKING:
    from .todo import Item  # noqa: F401


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(150), index=True)
    last_name = Column(String(150), index=True)
    email = Column(String(150), unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean(), default=False)
    is_superuser = Column(Boolean(), default=False)
    todos = relationship("Todo", back_populates="owner")
