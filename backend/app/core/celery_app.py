from celery import Celery
from time import sleep
from celery.utils.log import get_task_logger
import os

# Initialize celery
celery_app = Celery('tasks')
# celery_app.conf.task_routes = {"app.worker.test_celery": "main-queue"}
celery_app.conf.broker_url = os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379")
celery_app.conf.result_backend = os.environ.get("CELERY_RESULT_BACKEND", "redis://localhost:6379")

celery_app.conf.update(imports=['app.core.celery_app'])

# Create logger - enable to display messages on task logger
celery_log = get_task_logger(__name__)

# Create Order - Run Asynchronously with celery
# Example process of long running task
@celery_app.task
def print_test_message(quantity: int):
    """Print message with 2 second interval."""
    for i in range(quantity):
        sleep(2)
        celery_log.info(f"Task {i} completed!")
    return True