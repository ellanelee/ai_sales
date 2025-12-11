import type { Deal } from "@/types/types"

export const MOCK_DEALS: Deal[] = [
  {
    id: 1,
    leadCompany: "SK 하이닉스",
    productName: "리드 스코어링 엔진",
    stage: "new",
    amount: 120000000,
    expectedClose: "2025-12-31",
  },
  {
    id: 2,
    leadCompany: "오토닉스",
    productName: "세일즈 자동화 플랫폼",
    stage: "qualification",
    amount: 80000000,
    expectedClose: "2026-01-15",
  },
  {
    id: 3,
    leadCompany: "카카오엔터프라이즈",
    productName: "AI 세일즈 어시스턴트",
    stage: "proposal",
    amount: 150000000,
    expectedClose: "2026-02-10",
  },
  {
    id: 4,
    leadCompany: "무신사",
    productName: "이커머스 퍼널 최적화 솔루션",
    stage: "negotiation",
    amount: 60000000,
    expectedClose: "2026-01-05",
  },
  {
    id: 5,
    leadCompany: "네이버클라우드",
    productName: "B2B 리드 인텔리전스",
    stage: "closed",
    amount: 200000000,
    expectedClose: "2025-11-30",
  },
]
