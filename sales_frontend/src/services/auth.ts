import { SignupPayload, UserData } from "@/types/types";
import { apiClient } from "@/lib/api";

export async function signupUser(payload: SignupPayload): Promise<UserData>{
   const apiResponse = await apiClient<UserData>('auth/signup', {
    method: 'POST', 
    body: JSON.stringify(payload)
   })
   if(!apiResponse.success || !apiResponse.data){
    throw new Error(apiResponse.error || "회원가입 요청에 실패했습니다");
   }
   return apiResponse.data
}



