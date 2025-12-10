import { create } from "zustand"
import { CompanyData, UserData, AuthState } from "@/types/types"
import { persist, createJSONStorage } from "zustand/middleware"



//스토어 생성 (persist middleware)
export const useAuthStore = create<AuthState>()(
  persist(
    //authstate store저장
    (set) => ({
      isLoggedIn: false,
      user: null,
      company: null,
      isInitialized: false,
      login: (userData, token) => {
        set({ isLoggedIn: true, user: userData })
        //persist가 토큰을 localStorage에 직접저장
        if (typeof window != "undefined") {
          localStorage.setItem("access_token", token)
        }
      },
      logout: () => {
        set({ isLoggedIn: false, user: null })
        if (typeof window != "undefined") {
          localStorage.removeItem("access_token")
          localStorage.removeItem("auth_storage")
        }
      },
      setInitialized: (initialized) => {
        set({ isInitialized: initialized })
      },
      setCompany: (companyData: CompanyData | null) =>
        set({ company: companyData }),
    }),
    //로컬 스토리지 저장
    {
      name: "auth_storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
    }
  )
)

// 스토어 생성 (미들웨어 없이 )
// export const useAuthStore = create<AuthState>((set) => ({
//   isLoggedIn: false,
//   user: null,
//   login: (userData, token) => {
//     set({ isLoggedIn: true, user: userData })
//     if (typeof window != "undefined") {
//       localStorage.setItem("accessToken", token)
//     }
//   },
//   logout: () => {
//     set({ isLoggedIn: false, user: null })
//     if (typeof window != "undefined") {
//       localStorage.removeItem("accessToken")
//     }
//   },
// }))

//초기 로그인 상태 복원함수 (AuthInitialize적용으로 제외)
// export const checkAuthStore = async () => {
//   const token = localStorage.getItem("access_token")
//   const { login, user } = useAuthStore.getState()
//   if (token && !user) {
//     //토큰이 있지만 zustand에 사용자 정보없는 경우, 사용자 정보를 호출
//   }
// }
