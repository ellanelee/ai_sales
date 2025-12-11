import { apiClient } from "@/lib/api"
import type { Product, ProductCreatePayload } from "@/types/types"

export async function fetchProducts(): Promise<Product[]> {
  const res = await apiClient<Product[]>("/products", {
    method: "GET",
  })
  if (!res.success || !res.data) {
    throw new Error(res.error || "제품 정보를 불러올수 없습니다")
  }
  return res.data
}

export async function createProduct(
  payload: ProductCreatePayload
): Promise<Product> {
  const res = await apiClient<Product>("/products", {
    method: "POST",
    body: JSON.stringify(payload),
  })
  if (!res.success || !res.data) {
    throw new Error(res.error || "제품 정보를 불러올수 없습니다")
  }
  return res.data
}

export async function deleteProduct(productId: number): Promise<void> {
  const res = await apiClient<boolean>(`/products/${productId}`, {
    method: "DELETE",
  })

  if (!res.success) {
    throw new Error(res.error || "제품 삭제에 실패했습니다.")
  }
}
