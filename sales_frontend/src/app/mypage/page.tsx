"use client"
import { useAuthStore } from "@/store/authStore"
import { useEffect, useState } from "react"
import Image from "next/image"
import { CompanyData } from "@/types/types"
import { fetchMyCompany } from "@/services/company"

export default function MyPage() {
  const { user, company } = useAuthStore()
  const [preview, setPreview] = useState<string | null>(null)
  const [companyInfo, setCompanyInfo] = useState<
    CompanyData | null | undefined
  >(null)

  //store에 로그인 정보 설정에 문제가 있는 경우
  if (!user) {
    return <p className="p-6 text-gray-600">로그인 정보가 없습니다.</p>
  }

  //컴퍼넌트 마운트시에 회사 정보 fetch
  // useEffect(() => {
  //   const loadCompanyInfo = async () => {
  //     try {
  //       const company = await fetchMyCompany()
  //       setCompanyInfo(company)
  //       console.log(companyInfo)
  //     } catch (error) {
  //       console.error("회사 정보 불러오기 실패")
  //       setCompanyInfo(null)
  //     }
  //   }
  //   loadCompanyInfo()
  // }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
  }
  // const companyName = companyInfo?.name || "소속된 회사가 없습니다."

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">My Page</h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-3 flex items-center justify-center">
          {preview ? (
            <Image
              src={preview}
              alt="profile preview"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-500">No Image</span>
          )}
        </div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      {/* User Info */}
      <div className="space-y-3">
        <div>
          <p className="text-gray-600 text-sm">이름</p>
          <p className="text-lg font-medium">{user.name}</p>
        </div>

        <div>
          <p className="text-gray-600 text-sm">이메일</p>
          <p className="text-lg font-medium">{user.email}</p>
        </div>

        <div>
          <p className="text-gray-600 text-sm">소속 회사</p>
          <p className="text-lg font-medium">{company?.name}</p>
        </div>
      </div>
    </div>
  )
}
