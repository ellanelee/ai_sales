"use client"
import React from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import Button from "@/utils/Button"

const LogoutButton: React.FC = () => {
  const router = useRouter()
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <Button onClick={handleLogout} variant="danger" type="button">
      로그 아웃{" "}
    </Button>
  )
}

export default LogoutButton
