from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import User, Company
from app.schemas.auth import UserCreate, UserOut, LoginRequest, LoginResponse
from app.schemas.common import ApiResponse
from app.core.security import hash_password, verify_password, create_access_token
from app.core.deps import get_current_user

router = APIRouter(
    tags=["auth"]
); 

@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return ApiResponse(
        success = True, 
        data = [UserOut.model_validate(u) for u in users],
        error = None,
        meta = None
    )

@router.post("/signup", response_model=ApiResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing: 
        raise HTTPException (
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="이미 사용중인 이메일입니다"
        )
    company = None
    if payload.company_name:
        company = (
            db.query(Company)
            .filter(Company.name == payload.company_name)
            .first()
        )
        if company == None:
            company = Company(
                name = payload.company_name, 
                industry = None, 
                description = "",
            )
            db.add(company)
            db.flush()

    user = User(
        email = payload.email, 
        name = payload.name, 
        password = hash_password(payload.password),
        company = company,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    user_out = UserOut.model_validate(user)

    return ApiResponse(
        success = True, 
        data = user_out,
        error = None, 
        meta = { "message":"회원가입이 완료되었습니다."}
    )

@router.post(
    "/login", 
    response_model=ApiResponse, 
    status_code=status.HTTP_200_OK
)
def login(payload: LoginRequest, db:Session= Depends(get_db) ):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password):
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail="이메일 또는 비밀번호가 올바르지 않습니다."
        )
    
    access_token = create_access_token({"sub":str(user.id)})

    user_out = UserOut.model_validate(user)
    token_response = LoginResponse(
        access_token = access_token,
        user= user_out,
    )
    return ApiResponse(
        success=True,
        data = token_response, 
        error=None, 
        meta=None
    )

@router.get("/me", response_model=ApiResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return ApiResponse(
        success=True,
        data=UserOut.model_validate(current_user),
        error = None, 
        meta = None, 
    )