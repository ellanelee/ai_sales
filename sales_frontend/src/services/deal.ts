import type { Deal } from "@/types/types";

export async function fetchDeals(): Promise<Deal[]> {
   const res = await fetch('api/deals', {
      method: "GET",
      cache: "no-store"
   })

   if(!res.ok){
    throw new Error("deal항목을 불러오지 못했습니다")
   }

   const data = (await res.json()) as Deal[]
   return data
}