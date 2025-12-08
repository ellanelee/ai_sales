from pydantic import BaseModel, EmailStr
from typing import Optional
from pydantic import ConfigDict

#Request 데이터 수신 형식 (유효성)
class UserBase(BaseModel):
    email: EmailStr
    name: str


#API Request의 수신정보
class UserCreate(UserBase):
    password: str    
    company_name: Optional[str] = None 

#API Response
class UserOut(UserBase):
    id: int
    company_id: Optional[int] = None

    model_config = ConfigDict(from_attributes=True)

#Login
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

#Login Reponse
class LoginResponse(BaseModel):
    access_token: str
    token_type : str = "bearer"
    user: UserOut