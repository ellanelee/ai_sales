import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

# env파일 로드
load_dotenv()

class Settings(BaseSettings):
    APP_NAME: str = "AI Sales Backend"
    APP_VERSION: str = "0.1.0"

    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "postgresql+psycopg2://sales:1234@localhost:5432/sales_db",
    )

    JWT_SECRET: str = os.getenv("JWT_SECRET", "default_secret")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 *24 

settings = Settings()