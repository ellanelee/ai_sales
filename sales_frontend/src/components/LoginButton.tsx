"use client"
import React from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import Button from "@/utils/Button"

const LoginButton: React.FC = () => {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <Button
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      variant="primary"
      type="button"
    >
      LOG IN{" "}
    </Button>
  )
}

export default LoginButton
