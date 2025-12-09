from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

from app.db.database import get_db
from app.db.models import User, Product, Company
from app.schemas.products import ProductCreate, ProductOut, ProductListQuery
from app.schemas.common import ApiResponse
from app.core.deps import get_current_user

router = APIRouter(
    tags=["products"]
)

#제품 조회 
@router.get("/", response_model = ApiResponse)
def list_products(
    q : ProductListQuery = Depends(), 
    current_user: User = Depends(get_current_user),
    db:Session = Depends(get_db)
):
    query = db.query(Product).filter(Product.company_id == current_user.company_id)
    total_count = query.count()
    products = query.offset(q.offset).limit(q.limit).all()

    return ApiResponse(
        success=True,
        data = [ProductOut.model_validate(p)for p in products],
        error=None, 
        meta={
            "total": total_count,
            "limit": q.limit, 
            "offset": q.offset
        }, 
    )   

@router.post("/", response_model=ApiResponse, status_code=status.HTTP_201_CREATED)
def create_product(
    payload: ProductCreate, 
    db:Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    product = Product(
        company_id = current_user.company_id,
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

@router.put("/{product_id}", response_model=ApiResponse)
def update_product(
    product_id : int,
    payload : ProductCreate, 
    db:Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="해당 제품을 찾을수 없습니다."
        )
    if product.company_id != current_user.company_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="제품의 정보를 수정할 권한이 없습니다"
        )
    
    product.name=payload.name,
    product.product_category = payload.product_category,
    product.description= payload.description,
    product.target_industry= payload.target_industry
    
    db.commit()
    db.refresh(product)
    
    product_out=ProductOut.model_validate(product)

    return ApiResponse(
        success=True, 
        data= product_out, 
        error=None, 
        meta = {"message": "제품 정보가 수정되었습니다"}
    )

@router.delete("/{product_id}", response_model=ApiResponse)
def delete_product(
    product_id : int,
    db:Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="해당 제품을 찾을수 없습니다."
        )
    if product.company_id != current_user.company_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="제품을 삭제할 권한이 없습니다"
        )
    
    db.delete(product)
    db.commit()

    return ApiResponse(
        success=True, 
        data= True, 
        error=None, 
        meta = {"message": "제품 정보가 삭제되었습니다"}
    )