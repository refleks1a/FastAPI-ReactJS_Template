import secrets
from typing import Any, Dict, List, Optional, Union

from pydantic import AnyHttpUrl, BaseSettings, EmailStr, HttpUrl, PostgresDsn, validator

from dotenv import load_dotenv
import os

class Settings(BaseSettings):
    
    load_dotenv()
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.environ.get("SECRET_KEY")
    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    SERVER_NAME: str = "ToDO App Server"
    SERVER_HOST_FRONT: AnyHttpUrl = os.environ.get("SERVER_HOST_FRONT")
    # BACKEND_CORS_ORIGINS is a JSON-formatted list of origins
    # e.g: '["http://localhost", "http://localhost:4200", "http://localhost:3000", \
    # "http://localhost:8080", "http://local.dockertoolbox.tiangolo.com"]'
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = ["http://localhost:3000"]

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    PROJECT_NAME: str = os.environ.get("PROJECT_NAME")
    FIRST_SUPERUSER_EMAIL: str = os.environ.get("FIRST_SUPERUSER_EMAIL")
    FIRST_SUPERUSER_FIRST_NAME: str = os.environ.get("FIRST_SUPERUSER_FIRST_NAME")
    FIRST_SUPERUSER_LAST_NAME: str = os.environ.get("FIRST_SUPERUSER_FIRST_NAME") 
    FIRST_SUPERUSER_PASSWORD: str = os.environ.get("FIRST_SUPERUSER_PASSWORD")

    SQLALCHEMY_DATABASE_URI: Optional[str] = "sqlite:///./sql_app.db"

    SMTP_TLS: bool = os.environ.get("MAIL_TLS")
    SMTP_PORT: Optional[int] = os.environ.get("SMTP_PORT")
    SMTP_HOST: Optional[str] = os.environ.get("SMTP_HOST")
    SMTP_USER: Optional[str] = os.environ.get("SMTP_USER")
    SMTP_PASSWORD: Optional[str] = os.environ.get("SMTP_PASSWORD")
    EMAILS_FROM_EMAIL: Optional[EmailStr] = os.environ.get("EMAILS_FROM_EMAIL")
    EMAILS_FROM_NAME: Optional[str] = os.environ.get("EMAILS_FROM_NAME")

    @validator("EMAILS_FROM_NAME")
    def get_project_name(cls, v: Optional[str], values: Dict[str, Any]) -> str:
        if not v:
            return values["PROJECT_NAME"]
        return v

    EMAIL_CONFIRMATION_TOKEN_EXPIRE_HOURS: int = 24
    USERS_OPEN_REGISTRATION: bool = True
    EMAIL_RESET_TOKEN_EXPIRE_HOURS: int = 48
    EMAIL_TEMPLATES_DIR: str = "email-templates"
    EMAILS_ENABLED: bool = True

    @validator("EMAILS_ENABLED", pre=True)
    def get_emails_enabled(cls, v: bool, values: Dict[str, Any]) -> bool:
        return bool(
            values.get("SMTP_HOST")
            and values.get("SMTP_PORT")
            and values.get("EMAILS_FROM_EMAIL")
        )


settings = Settings()
