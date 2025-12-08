from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.core.config import settings

#Base Class
class Base(DeclarativeBase):
    pass

#Engine (POSTGRES와 연결할 객체)
engine = create_engine(
    settings.DATABASE_URL,
    echo=True,   #QueryLog 출력 
    future=True, 
)

#Session (세션 Factory)
SessionLocal = sessionmaker(
    autocommit = False, 
    autoflush = False, 
    bind = engine, 
)

# DB Dependency용 함수(DI)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()