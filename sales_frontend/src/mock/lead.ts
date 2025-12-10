import type { Lead } from "@/types/types"
export const MOCK_LEADS: Lead[] = [
  {
    id: 1,
    company: "SK 하이닉스",
    industry: "반도체",
    score: 88,
    reason: "AI/데이터 인프라 확장 및 생산라인 자동화 관련 예산 확대",
    size: "대기업",
  },
  {
    id: 2,
    company: "오토닉스",
    industry: "제조",
    score: 76,
    reason: "공정 자동화 장비 교체 및 AI 기반 품질 관리 PoC 검토",
    size: "중견기업",
  },
  {
    id: 3,
    company: "쿠팡",
    industry: "이커머스",
    score: 82,
    reason: "세일즈/물류 운영 효율화 위한 AI 프로젝트 다수 진행 중",
    size: "대기업",
  },
  {
    id: 4,
    company: "마켓보드",
    industry: "SaaS",
    score: 69,
    reason: "CRM·세일즈 파이프라인 가시성 개선 요구, AI 도입 관심",
    size: "스타트업",
  },
  {
    id: 5,
    company: "테크플랜트",
    industry: "제조",
    score: 73,
    reason: "B2B 영업조직 확장 중, 리드 발굴 자동화 니즈 존재",
    size: "중소기업",
  },
]
