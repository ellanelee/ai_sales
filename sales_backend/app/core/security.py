from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from jose import jwt
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    "평문 비번 해시 변환"
    return pwd_context.hash(password)

def verify_password(plain_password:str, hashed_password:str) -> bool:
    "입력된 평문 비번과 해시된 비번 비교"
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data:dict, expires_minutes: int | None = None) -> str :
    to_encode = data.copy()
    if expires_minutes is None:
        expires_minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES

    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)
    to_encode.update({"exp":expire})

    encoded_jwt = jwt.encode(
        to_encode,
        settings.JWT_SECRET, 
        algorithm=settings.JWT_ALGORITHM
    )
    return encoded_jwt
