from typing import Any

from fastapi import APIRouter, Depends
from pydantic.networks import EmailStr

import schemas
from api import deps
from utils import send_test_email
from app.core.celery_app import print_test_message
from celery.result import AsyncResult


router = APIRouter()


@router.post("/test-email/", response_model=schemas.Msg, status_code=201)
def test_email(
    email_to: EmailStr,
) -> Any:
    """
    Test emails.
    """
    send_test_email(email_to=email_to)
    return {"msg": "Test email sent"}


@router.post("/add-test-task/", response_model=schemas.Msg, status_code=201)
def test_email() -> Any:
    """
    Test worker.
    """
    task = print_test_message.delay(5)
    return {"msg": task.id}
    #return JSONResponse({"task_id": task.id})


@router.get("/get-task-info")
def get_status(
    task_id: str
):
    """
    Get status of a task
    """
    task_result = AsyncResult(task_id)
    result = {
        "task_id": task_id,
        "task_status": task_result.status,
        "task_result": task_result.result
    }
    return result