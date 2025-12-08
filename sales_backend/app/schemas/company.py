from pydantic import BaseModel, EmailStr
from typing import Optional
from pydantic import ConfigDict

class CompanyBase(BaseModel):
    name: str
    industry: Optional[str] = None
    description: Optional[str] = None

class CompanyUpdate(CompanyBase):
    """회사 정보 생성/수정"""
    pass

class CompanyOut(CompanyBase):
    id: int
    model_config=ConfigDict(from_attributes=True)
