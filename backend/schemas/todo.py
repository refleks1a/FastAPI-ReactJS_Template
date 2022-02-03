from typing import Optional

from pydantic import BaseModel


# Shared properties
class TodoBase(BaseModel):
    title: str = None
    is_done: bool = None


# Properties to receive on Todo creation
class TodoCreate(TodoBase):
    title: str
    owner_id: int


# Properties to receive on Todo deletion
class TodoDelete(BaseModel):
    id: int

# Properties to receive on Todo update
class TodoUpdate(TodoBase):
    pass


# Properties shared by models stored in DB
class TodoInDBBase(TodoBase):
    id: int
    title: str
    owner_id: int

    class Config:
        orm_mode = True


# Properties to return to client
class Todo(TodoInDBBase):
    pass


# Properties properties stored in DB
class TodoInDB(TodoInDBBase):
    pass
