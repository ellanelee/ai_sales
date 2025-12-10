"use client"

import { useState } from "react"
import { signupApi } from "@/services/auth"
import { useRouter } from "next/navigation"

const SignupForm = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    company_name: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const isPasswordMismatch =
    formData.password == "" &&
    formData.passwordConfirm == "" &&
    formData.password !== formData.passwordConfirm

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      if (!formData.email || !formData.password || !formData.name) {
        throw new Error("이메일, 이름, 비밀번호는 필수 입력입니다.")
      }

      if (isPasswordMismatch) {
        throw new Error("비밀번호가 일치하지 않습니다.")
      }

      const userData = await signupApi({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        company_name: formData.company_name || undefined,
      })

      console.log("회원가입 성공:", userData)
      setSuccess(true)

      setTimeout(() => {
        router.push("/login")
      }, 800)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "알 수 없는 오류"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-md rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        회원가입
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이메일 */}
        <div className="space-y-1">
          <label className="block text-lg font-medium text-gray-700">
            이메일
          </label>
          <input
            type="email"
            name="email"
            required
            disabled={isLoading}
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                      text-gray-800 shadow-sm"
          />
        </div>

        {/* 이름 */}
        <div className="space-y-1">
          <label className="block text-lg font-medium text-gray-700">
            이름
          </label>
          <input
            type="text"
            name="name"
            required
            disabled={isLoading}
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                      text-gray-800 shadow-sm"
          />
        </div>

        {/* 비밀번호 */}
        <div className="space-y-1">
          <label className="block text-lg font-medium text-gray-700">
            비밀번호
          </label>
          <input
            type="password"
            name="password"
            required
            disabled={isLoading}
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                      text-gray-800 shadow-sm"
          />
        </div>

        {/* 비밀번호 재확인 */}
        <div className="space-y-1">
          <label className="block text-lg font-medium text-gray-700">
            비밀번호 재확인
          </label>
          <input
            type="password"
            name="passwordConfirm"
            required
            disabled={isLoading}
            value={formData.passwordConfirm}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border text-gray-800 shadow-sm
                       ${
                         isPasswordMismatch
                           ? "border-red-500"
                           : "border-gray-300"
                       }
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          />

          {isPasswordMismatch && (
            <div className="text-red-500 text-sm mt-1">
              비밀번호와 비밀번호 재확인이 일치하지 않습니다.
            </div>
          )}
        </div>

        {/* 회사명(선택) */}
        <div className="space-y-1">
          <label className="block text-lg font-medium text-gray-700">
            회사명 (선택)
          </label>
          <input
            type="text"
            name="company_name"
            disabled={isLoading}
            value={formData.company_name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                      text-gray-800 shadow-sm"
          />
        </div>

        {/* 에러 메시지 */}
        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        {/* 성공 메시지 */}
        {success && (
          <p className="text-green-600 text-center font-medium">
            회원가입 성공! 로그인 페이지로 이동 중...
          </p>
        )}

        {/* 버튼 */}
        <button
          type="submit"
          disabled={isLoading || isPasswordMismatch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 
                     rounded-lg text-lg font-semibold shadow-md 
                     transition-all disabled:bg-gray-400"
        >
          {isLoading ? "처리 중..." : "가입하기"}
        </button>
      </form>
    </div>
  )
}

export default SignupForm
