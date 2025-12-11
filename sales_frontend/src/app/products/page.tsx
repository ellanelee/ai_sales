"use client"

import { DashboardWrapper } from "@/components/DashboardWrapper"
import ProductCreateForm from "@/components/ProductCreateForm"
import { deleteProduct, fetchProducts } from "@/services/product"
import { useAuthStore } from "@/store/authStore"
import { Product } from "@/types/types"
import { useEffect, useState } from "react"

function ProductsPageInner() {
  const { user } = useAuthStore()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProducts = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "제품 목록을 불러오지 못했습니다."
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadProducts()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm("정말 이제품을 삭제하시겠습니까?")) return
    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "제품 삭제중 오류가 발생했습니다"
      alert(msg)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-1">회사 & 제품 관리</h1>
          <p className="text-slate-600">
            로그인한 계정의 회사({user?.company_id})에 속한 제품들을 관리합니다.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* 💡 수정: 분리된 폼 컴포넌트를 사용하고, loadProducts 함수를 onSuccess 콜백으로 전달 */}
          <ProductCreateForm onSuccess={loadProducts} />

          {/* 제품 리스트 (기존 코드 유지) */}
          <section className="bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">등록된 제품</h2>
              {/* ... (로딩 상태 표시) ... */}
              {loading ? (
                <span className="text-xs text-slate-500">불러오는 중...</span>
              ) : (
                <span className="text-xs text-slate-500">
                  총 {products.length}개
                </span>
              )}
            </div>

            {error && (
              <p className="text-red-500 text-sm mb-3">오류: {error}</p>
            )}

            {!loading && !error && products.length === 0 && (
              <p className="text-slate-500 text-sm">
                아직 등록된 제품이 없습니다. 왼쪽 폼에서 첫 제품을 등록해보세요.
              </p>
            )}

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border border-slate-100 rounded-lg p-3 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold">{product.name}</h3>
                      {product.product_category && (
                        <p className="text-xs text-slate-500">
                          카테고리: {product.product_category}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => void handleDelete(product.id)}
                      className="text-xs px-2 py-1 rounded border border-rose-200 text-rose-600 hover:bg-rose-50"
                    >
                      삭제
                    </button>
                  </div>
                  {product.target_industry && (
                    <p className="text-xs text-slate-500">
                      타깃 산업: {product.target_industry}
                    </p>
                  )}
                  {product.description && (
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
export default function ProductPage() {
  return (
    <DashboardWrapper>
      <ProductsPageInner />
    </DashboardWrapper>
  )
}
