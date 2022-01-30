from typing import List
from xmlrpc.client import Boolean

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from crud.base import CRUDBase
from models.todo import Todo
from schemas.todo import TodoCreate, TodoUpdate


class CRUDTodo(CRUDBase[Todo, TodoCreate, TodoUpdate]):
    def create_with_owner(
        self, db: Session, *, obj_in: TodoCreate, owner_id: int
    ) -> Todo:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, owner_id=owner_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def query_get_multi_by_owner(
        self, db: Session, *, owner_id: int, is_done: bool
    ) -> List[Todo]:
        query = (db.query(self.model)
            .filter(Todo.owner_id == owner_id)
        )
        if is_done == True:
            query = query.filter(Todo.is_done == True)
        elif is_done == False:
            query = query.filter(Todo.is_done == False)
        return query

    def remove(self, db: Session, *, id: int) -> Todo:
        obj = db.query(self.model).get(id)
        db.delete(obj)
        db.commit()
        return obj
    
todo = CRUDTodo(Todo)
