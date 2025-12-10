"use client"

import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { useEffect, useState } from "react"

export function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isLoggedIn, user } = useAuthStore()
  const [isChecking, setIsChecking] = useState(true)

  //AuthInitialzier구동 후 로그인 상태인지 확인하여 리다이렉트
  useEffect(() => {
    setIsChecking(false)
    if (isLoggedIn === false) {
      router.replace("/login")
    }
  }, [isLoggedIn, router])

  if (isChecking) {
    return (
      <div style={{ padding: "20px" }}>
        <p>인증 정보를 확인중입니다 .... </p>
      </div>
    )
  }
  //로그인 된 경우에만 내용 렌더링
  return <>{children}</>
}
