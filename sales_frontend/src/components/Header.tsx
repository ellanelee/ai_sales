"use client"
import LogoutButton from "./LogoutButton"
import Link from "next/link"
import { useAuthStore } from "@/store/authStore"
import LoginButton from "./LoginButton"

export const Header = () => {
  const { isLoggedIn } = useAuthStore()
  return (
    <header className="w-full px-6 py-4 bg-white shadow-sm flex justify-between items-center">
      {/* Left side Logo */}
      <Link href="/" className="text-2xl font-bold text-blue-600">
        AI_SALES
      </Link>

      {/* Right side Navigation */}
      <nav className="flex items-center gap-6">
        {isLoggedIn ? (
          <>
            <Link
              href="/mypage"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              My Page
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
          <Link
            href="/login"
            className="text-gray-700 hover:text-blue-600 transition"
          >
          </Link>
          <LoginButton />
          </>
        )}
      </nav>
    </header>
  )
}
