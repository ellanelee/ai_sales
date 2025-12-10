export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload extends LoginPayload {
  name: string
  company_name?: string | null // 백엔드 UserCreate에 있음
}

export interface UserData {
  email: string
  name: string
  id: number
  company_id: number
}

export interface LoginResponseData {
  access_token: string
  token_type: string //bearer
  user: UserData
}

export interface CompanyData {
  id: number
  name: string
  industry: string | null
  description: string | null
}
