import { ApiResponse } from "./types"

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

export async function apiClient<T>(
  url: string, 
  options: RequestInit = {}
):Promise<ApiResponse<T>> {
  const token =
    typeof window != "undefined" ? localStorage.getItem("access_token") : null

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  })

  let result: unknown = null ; 
  try {
    result = await res.json(); 
  }catch {
    result = null 
  }

  if (!res.ok) {
    let errorMsg = "API Error"
    if(result && typeof result === "object"){
      const err = result as {
        detail? : string, 
        message?: string, 
        error?: string
      }
      errorMsg = err.detail ?? err.message?? err.error ?? errorMsg
    }
    throw new Error(errorMsg); 
  }
  return result as ApiResponse<T>; 
}
