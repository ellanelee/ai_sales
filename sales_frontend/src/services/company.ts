import { CompanyData } from "@/types/types";
import { apiClient } from "@/lib/api";

export async function fetchMyCompany(): Promise<CompanyData | null >{
   const apiResponse = await apiClient<CompanyData>('/company/me',
   { method: "GET",
   }); 

   if(!apiResponse.success){
      throw new Error(apiResponse.error || "회사 정보를 불러오는 데 실패했습니다" )
   }
   if (apiResponse.data === null) {
      return null; 
   }

   return apiResponse. data;  
}