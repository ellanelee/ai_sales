from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import User, Company
from app.schemas.company import CompanyOut, CompanyUpdate
from app.schemas.common import ApiResponse
from app.core.deps import get_current_user

router = APIRouter(
    tags=["company"]
)

@router.get("/me", response_model=ApiResponse)
def get_my_company(    
    current_user : User = Depends(get_current_user),
    db:Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            details="사용자를 찾을수 없습니다"
        )
    
    company = current_user.company
    if not company:
        return ApiResponse(
            success=True, 
            data=None, 
            error=None, 
            meta={"message":"회사 정보가 없습니다"}
        )
    
    company_out = CompanyOut.model_validate(company)
    return ApiResponse(
            success=True, 
            data=company_out, 
            error=None, 
            meta=None
    )
@router.put("/me")
def update_my_company(
    payload: CompanyUpdate,
    db:Session = Depends(get_db),
    current_user : User = Depends(get_current_user),
):
    if not current_user:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail="사용자를 찾을수 없습니다."
        )
    company = current_user.company

    if company is None:
        company = Company(
            name=payload.name, 
            industry=payload.industry, 
            description = payload.description or "",
        )
        db.add(company)
        db.flush()
        current_user.company = company
    else: 
        company.name = payload.name
        company.industry = payload.industry
        company.description = payload.description or ""
    
    db.commit()
    db.refresh(company)

    company_out = CompanyOut.model_validate(company)
    return ApiResponse(
        success=True,
        data = company_out,
        error = None, 
        meta = {"message":"회사 정보가 저장되었습니다"} 
    )

