import type { Lead } from "@/types/types";
import type { LeadFilter } from "@/types/types";

export async function fetchLeads(filters?: LeadFilter): Promise<Lead[]> {
   const params = new URLSearchParams(); 

   if(filters?.industry && filters.industry !== "all"){
    params.set("industry", filters.industry)
   }
   if(typeof filters?.minScore === "number"){
    params.set("minScore", String(filters.minScore))
   }

   const queryString = params.toString()
   const url = queryString? `/api/leads?${queryString}`:"/api/leads"
   const res = await fetch(url, {cache: "no-store"})

   if(!res.ok){
    throw new Error("리드 목록을 불러오지 못했습니다")
   }

   const data = (await res.json()) as Lead[]
   return data
}