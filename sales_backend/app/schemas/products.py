from pydantic import BaseModel, ConfigDict
from typing import Optional

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

class ProductListQuery(BaseModel):
    limit: int = 10
    offset: int = 0 