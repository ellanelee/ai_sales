from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os 

from app.core.config import settings
from app.db.database import Base, engine
from app.api import auth, company, products

@asynccontextmanager
async def lifespan(app:FastAPI):
    print("startup:Initializing database")
    Base.metadata.create_all(bind=engine)
    yield 
    print("Shutdown: cleaning up")

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    lifespan=lifespan,
)

load_dotenv()

# CORS 
cors_origins : str = os.getenv("CORS_ORIGIN", "")
origins = [cors_origins]

app.add_middleware(
    CORSMiddleware, 
    allow_origins = origins, 
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth.router, prefix="/auth")
app.include_router(company.router, prefix="/company")
app.include_router(products.router, prefix="/products")

@app.get("/")
def read_root():
    return{"message":"Sales_AI is running now!"}    

@app.get("/config-test")
def read_root():
    return {
        "app_name": settings.APP_NAME , 
        "db_url": settings.DATABASE_URL
    }

@app.get("/health")
def health_check():
    return {"status":"OK"}
