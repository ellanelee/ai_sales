from typing import Any, Optional
from pydantic import BaseModel

class ApiResponse(BaseModel):
    success: bool
    data: Optional[Any] = None 
    error: Optional[str] = None
    meta: Optional[dict[str,Any]] = None
    