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

export interface AuthState {
  isLoggedIn: boolean
  user: UserData | null
  company: CompanyData | null
  isInitialized: boolean
  login: (userData: UserData, token: string) => void
  logout: () => void
  setInitialized: (initialized: boolean) => void
  setCompany: (companyData: CompanyData | null) => void
}

export interface Lead {
  id: number
  company: string
  industry: string
  score: number
  reason: string
  size: string
}

export interface LeadFilter {
  industry: string
  minScore: number
}

export type DealStage =
  | "new"
  | "qualification"
  | "proposal"
  | "negotiation"
  | "closed"

export interface Deal {
  id: number
  leadCompany: string
  productName: string
  stage: DealStage
  amount: number
  expectedClose: string
}
