import {
  LoginPayload,
  LoginResponseData,
  SignupPayload,
  UserData,
} from "@/types/types"
import { apiClient } from "@/lib/api"

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

export async function loginApi(payload: LoginPayload) {
  const apiResponse = await apiClient<LoginResponseData>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  })
  if (!apiResponse.success || !apiResponse.data) {
    throw new Error(apiResponse.error || "로그인에 실패했습니다")
  }
  if(typeof window != "undefined" && apiResponse.success) {
    localStorage.setItem('access_token', apiResponse.data.access_token)
  }
  return apiResponse.data
}
