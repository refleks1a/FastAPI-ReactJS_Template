from sqlalchemy.orm import Session

import crud
from schemas.todo import TodoCreate, TodoUpdate
from tests.utils.user import create_random_user
from tests.utils.utils import random_lower_string


def test_create_todo(db: Session) -> None:
    title = random_lower_string()
    todo_in = TodoCreate(title=title)
    user = create_random_user(db)
    todo = crud.todo.create_with_owner(db=db, obj_in=todo_in, owner_id=user.id)
    assert todo.title == title
    assert todo.owner_id == user.id


def test_get_todo(db: Session) -> None:
    title = random_lower_string()
    todo_in = TodoCreate(title=title)
    user = create_random_user(db)
    todo = crud.todo.create_with_owner(db=db, obj_in=todo_in, owner_id=user.id)
    stored_todo = crud.todo.get(db=db, id=todo.id)
    assert stored_todo
    assert todo.id == stored_todo.id
    assert todo.title == stored_todo.title
    assert todo.owner_id == stored_todo.owner_id


def test_delete_todo(db: Session) -> None:
    title = random_lower_string()
    todo_in = TodoCreate(title=title)
    user = create_random_user(db)
    todo = crud.todo.create_with_owner(db=db, obj_in=todo_in, owner_id=user.id)
    todo2 = crud.todo.remove(db=db, id=todo.id)
    todo3 = crud.todo.get(db=db, id=todo.id)
    assert todo3 is None
    assert todo2.id == todo.id
    assert todo2.title == title
    assert todo2.owner_id == user.id

def test_update_todo(db: Session) -> None:
    title1 = random_lower_string()
    todo_in = TodoCreate(title=title1, is_done=False)
    user = create_random_user(db)
    todo_initial = crud.todo.create_with_owner(db=db, obj_in=todo_in, owner_id=user.id)
    title2 = random_lower_string()
    todo_in_updated = TodoUpdate(title=title2, is_done=True)
    todo_updated = crud.todo.update(db, obj_in=todo_in_updated, db_obj=todo_initial)
    assert todo_initial.id == todo_updated.id
    assert todo_initial.owner_id == todo_updated.owner_id
    assert title1 != todo_updated.title
    assert todo_updated.is_done is True