from fastapi import APIRouter

from api.api_v1.endpoints import login, utils, users, todos

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
# api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(todos.router, prefix="/todos", tags=["todos"])
