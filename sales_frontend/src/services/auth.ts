import {
  LoginPayload,
  LoginResponseData,
  SignupPayload,
  UserData,
} from "@/types/types"
import { apiClient } from "@/lib/api"
import { useAuthStore } from "@/store/authStore"

export async function signupApi(payload: SignupPayload): Promise<UserData> {
  const apiResponse = await apiClient<UserData>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  })
  if (!apiResponse.success || !apiResponse.data) {
    throw new Error(apiResponse.error || "회원가입 요청에 실패했습니다")
  }
  return apiResponse.data
}

export async function loginUser(payload: LoginPayload) {
  const apiResponse = await apiClient<LoginResponseData>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  })
  if (!apiResponse.success || !apiResponse.data) {
    throw new Error(apiResponse.error || "로그인에 실패했습니다")
  }
  const { access_token, user } = apiResponse.data
  useAuthStore.getState().login(user, access_token)
  return apiResponse.data
}

export async function fetchCurrentUser(): Promise<UserData> {
   const apiResponse = await apiClient<UserData>('/auth/me', {
    method: "GET",
   })
   if(!apiResponse.success || !apiResponse.data){
    throw new Error(apiResponse.error || "사용자 정보를 가져올수 없습니다")
   }
   return apiResponse.data; 
}