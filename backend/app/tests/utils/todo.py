from typing import Optional

from sqlalchemy.orm import Session  # type: ignore

from app import crud
from app import models
from app.schemas.todo import TodoCreate
from app.tests.utils.user import create_random_user
from app.tests.utils.utils import random_lower_string


def create_random_todo(db: Session, *, owner_id: Optional[int] = None, is_done: Optional[bool] = False) -> models.Todo:
    if owner_id is None:
        user = create_random_user(db)
        owner_id = user.id
    title = random_lower_string()
    item_in = TodoCreate(title=title)
    return crud.todo.create_with_owner(db=db, obj_in=item_in, owner_id=owner_id)
