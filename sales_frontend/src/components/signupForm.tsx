"use client"

import { useState } from "react"
import { signupApi } from "@/services/auth"
import { useRouter } from "next/navigation"

const SignupForm = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    company_name: "",
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
      if (!formData.email || !formData.password || !formData.name) {
        throw new Error("이메일, 이름, 비밀번호는 필수 입력 항목입니다")
      }
      // signupUser함수 호출
      const userData = await signupApi({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        company_name: formData.company_name || undefined,
      })
      console.log(`회원가입함수호출 성공, userData: ${userData}`)
      setIsSuccess(true)

      //회원 가입 후 로그인 페이지(signup성공)
      setTimeout(() => {
        router.push("/auth/login")
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
      <h2>회원가입</h2>
      
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

        {/* 이름 */}
        <label htmlFor="name">이름:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
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
        
        {/* 회사명 (선택 사항) */}
        <label htmlFor="company_name">회사명 (선택):</label>
        <input
          type="text"
          id="company_name"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          disabled={isLoading}
        />
        <br />

        {/* 상태 메시지 */}
        {error && <p style={{ color: 'red' }}>오류: {error}</p>}
        {success && <p style={{ color: 'green' }}>회원가입 성공! 로그인 페이지로 이동합니다...</p>}

        {/* 버튼 */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? '처리 중...' : '가입하기'}
        </button>
      </form>
    </div>
  );
}

export default SignupForm
