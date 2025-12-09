from pydantic import BaseModel, EmailStr
from typing import Optional
from pydantic import ConfigDict

class ProductBase(BaseModel):
    name: str
    product_category: Optional[str] = None
    description: Optional[str] = None
    target_industry: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int
    company_id: int 
    model_config=ConfigDict(from_attributes=True)