"use client"

import { useState } from "react"
import { loginApi } from "@/services/auth"
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
      if (!formData.email || !formData.password ) {
        throw new Error("이메일, 비밀번호는 필수 입력 항목입니다")
      }
      // loginApi함수 호출
      const loginData = await loginApi({
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
   <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>로그인</h2>
      
      <form onSubmit={handleSubmit}>
        {/* 이메일 */}
        <label htmlFor="email">이메일:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
        <br />

        {/* 비밀번호 */}
        <label htmlFor="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
        <br />

        {/* 상태 메시지 */}
        {error && <p style={{ color: 'red' }}>오류: {error}</p>}
        {success && <p style={{ color: 'green' }}>로그인 성공! 홈 페이지로 이동합니다...</p>}

        {/* 버튼 */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? '처리 중...' : '로그인하기'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm 
