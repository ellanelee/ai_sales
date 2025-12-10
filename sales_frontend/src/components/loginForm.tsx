"use client"

import { useState } from "react"
import { loginUser } from "@/services/auth"
import { useRouter } from "next/navigation"

const LoginForm = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setIsSuccess] = useState(false)

  //Form 내용변경
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  //Form 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setIsSuccess(false)

    try {
      // 필수필드 입력확인
      if (!formData.email || !formData.password) {
        throw new Error("이메일, 비밀번호는 필수 입력 항목입니다")
      }
      // loginApi함수 호출
      const loginData = await loginUser({
        email: formData.email,
        password: formData.password,
      })
      console.log(`로그인함수호출 성공, userData: ${loginData}`)
      setIsSuccess(true)

      //회원 가입 후 로그인 페이지(signup성공)
      setTimeout(() => {
        router.push("/")
      }, 1000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "알수 없는 오류"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-md rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        로그인
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이메일 */}
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            이메일
          </label>
          <input
            type="email"
            id="email"
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

        {/* 비밀번호 */}
        <div>
          <label
            htmlFor="password"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            비밀번호
          </label>
          <input
            type="password"
            id="password"
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

        {/* 상태 메시지 */}
        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-center font-medium">
            로그인 성공! 이동 중...
          </p>
        )}

        {/* 버튼 */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 
                     rounded-lg text-lg font-semibold shadow-md 
                     transition-all disabled:bg-gray-400"
        >
          {isLoading ? "처리 중..." : "로그인하기"}
        </button>
      </form>
    </div>
  )
}

export default LoginForm
