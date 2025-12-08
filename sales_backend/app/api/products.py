from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

from app.db.database import get_db
from app.db.models import Product, Company
from app.schemas.products import ProductCreate, ProductOut 
from app.schemas.common import ApiResponse

router = APIRouter(
    tags=["products"]
)

#제품 조회 
@router.get("/", response_model = ApiResponse)
def list_products(
    company_id: Optional[int] = None, 
    db:Session = Depends(get_db)
):
    query = db.query(Product)

    if company_id is not None:
        query = query.filter(Product.company_id == company_id)

    products = query.all()

    return ApiResponse(
        success=True,
        data = [ProductOut.model_validate(p)for p in products],
        error=None, 
        meta=None, 
    )   

@router.post("/", response_model=ApiResponse, status_code=status.HTTP_201_CREATED)
def create_product(payload: ProductCreate, db:Session = Depends(get_db)):
    company = db.query(Company).filter(Company.id == payload.company_id).first()
    if company is None:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail="회사 정보를 찾을수 없습니다"
        ) 
    product = Product(
        company_id = payload.company_id,
        name=payload.name,
        product_category = payload.product_category,
        description= payload.description,
        target_industry= payload.target_industry
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    
    product_out=ProductOut.model_validate(product)

    return ApiResponse(
        success=True, 
        data= product_out, 
        error=None, 
        meta = {"message": "제품이 생성되었습니다"}
    )