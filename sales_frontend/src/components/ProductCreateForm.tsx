"use client"

import { DashboardWrapper } from "@/components/DashboardWrapper"
import { createProduct } from "@/services/product"
import { useAuthStore } from "@/store/authStore"
import { Product, ProductCreatePayload } from "@/types/types"
import { useState } from "react"

interface ProductCreateFormProps {
  onSuccess: () => Promise<void> //생성시 리스트를 불러오는 콜백
}

const ProductCreateForm: React.FC<ProductCreateFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState<ProductCreatePayload>({
    name: "",
    product_category: "",
    description: "",
    target_industry: "",
  })
  const [isSubmit, setIsSubmit] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) {
      alert("제품명은 필수입니다")
      return
    }
    try {
      setIsSubmit(true)
      await createProduct({
        name: form.name.trim(),
        product_category: form.product_category?.trim() || undefined,
        description: form.description?.trim() || undefined,
        target_industry: form.target_industry?.trim() || undefined,
      })
      //props로 부모 class에 내용 전달 및 Form초기화
      await onSuccess()
      setForm({
        name: "",
        product_category: "",
        description: "",
        target_industry: "",
      })
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "제품 생성 중 오류가 발생했습니다."
      alert(msg)
    } finally {
      setIsSubmit(false)
    }
  }
  return (
    <section className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-4">새 제품 등록</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* 제품명 */}
        <div>
          <label className="block text-sm text-slate-600 mb-1">제품명 *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            disabled={isSubmit}
            required
          />
        </div>

        {/* 카테고리 */}
        <div>
          <label className="block text-sm text-slate-600 mb-1">카테고리</label>
          <input
            type="text"
            name="product_category"
            value={form.product_category ?? ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="예: SaaS, On-premise 등"
            disabled={isSubmit}
          />
        </div>

        {/* 타깃 산업 */}
        <div>
          <label className="block text-sm text-slate-600 mb-1">타깃 산업</label>
          <input
            type="text"
            name="target_industry"
            value={form.target_industry ?? ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="예: B2B 제조·IT, 금융 등"
            disabled={isSubmit}
          />
        </div>

        {/* 제품 설명 */}
        <div>
          <label className="block text-sm text-slate-600 mb-1">제품 설명</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm min-h-[80px]"
            placeholder="리드 스코어링, 세일즈 자동화 등의 기능 설명을 적어주세요."
            disabled={isSubmit}
          />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isSubmit}
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 disabled:opacity-60"
        >
          {isSubmit ? "등록 중..." : "제품 등록"}
        </button>
      </form>
    </section>
  )
}

export default ProductCreateForm
