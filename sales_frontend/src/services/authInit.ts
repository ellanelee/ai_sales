import { useAuthStore } from "@/store/authStore"
import { fetchCurrentUser } from "@/services/auth"
import { fetchAndStoreCompanyData } from "./company"

export async function authInitWithToken() {
  const { login, logout, setInitialized } = useAuthStore.getState()

  if (typeof window == "undefined") return
  const token = localStorage.getItem("access_token")
  try {
    if (!token) {
      logout()
      return
    }
    const userInfo = await fetchCurrentUser()
    await fetchAndStoreCompanyData()

    login(userInfo, token)
  } catch (e) {
    console.log("Auth동기화가 실패했습니다.")
    logout()
  } finally {
    setInitialized(true)
  }
}
