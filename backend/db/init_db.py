from sqlalchemy.orm import Session

import crud, schemas
from core.config import settings
from db.base import Base  # noqa: F401
from db.session import engine

# make sure all SQL Alchemy models are imported (app.db.base) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly
# for more details: https://github.com/tiangolo/full-stack-fastapi-postgresql/issues/28



def init_db(db: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next line
    Base.metadata.create_all(bind=engine)
    pass
    user = crud.user.get_by_email(db, email=settings.FIRST_SUPERUSER_EMAIL)
    if not user:
        user_in = schemas.UserCreate(
            email=settings.FIRST_SUPERUSER_EMAIL,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            first_name=settings.FIRST_SUPERUSER_FIRST_NAME,
            last_name=settings.FIRST_SUPERUSER_LAST_NAME,
            is_active=True,
            is_superuser=True,
        )
        user = crud.user.create(db, obj_in=user_in)

    todos = crud.todo.get_multi(db, is_done=None)
    number_todo = 100
    if len(todos)<number_todo:
        for i in range(number_todo):
            todo_in = schemas.TodoCreate(
                title="Visit the office #{}". format(str(i+1)),
                is_done=False,
                owner_id = user.id
            )
            crud.todo.create(db, obj_in=todo_in)

    print(todos)