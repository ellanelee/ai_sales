"use client"
import Link from "next/link"
import { useAuthStore } from "@/store/authStore"
import { DashboardWrapper } from "@/components/DashboardWrapper"
import { fetchLeads } from "@/services/lead"
import { fetchDeals } from "@/services/deal"
import type { Lead, Deal, DashboardStats } from "@/types/types"
import { useEffect, useState } from "react"
import { fetchProducts } from "@/services/product"

export default function Home() {
  const { user, company } = useAuthStore()
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    hotLeads: 0,
    inProgressDeals: 0,
    closingSoonDeals: 0,
    productCount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)

        // 1) 리드/딜/제품 동시에 호출
        const [leads, deals, products] = await Promise.all([
          // 전체 리드(최소 점수 50, 산업 all 가정)
          fetchLeads({ industry: "all", minScore: 50 }),
          fetchDeals(),
          fetchProducts(),
        ])

        // 2) 통계 계산
        const totalLeads = leads.length
        const hotLeads = leads.filter((l) => l.score >= 80).length
        const productCount = products.length

        const inProgressDeals = deals.filter(
          (d) => d.stage !== "new" && d.stage !== "closed"
        ).length

        // 30일 이내 클로징 예정 딜 (closed 제외)
        const now = new Date()
        const soon = new Date()
        soon.setDate(now.getDate() + 30)

        const closingSoonDeals = deals.filter((d) => {
          if (d.stage === "closed") return false
          const closeDate = new Date(d.expectedClose)
          return closeDate >= now && closeDate <= soon
        }).length

        setStats({
          totalLeads,
          hotLeads,
          inProgressDeals,
          closingSoonDeals,
          productCount,
        })
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : "대시보드 데이터를 불러오지 못했습니다."
        setError(msg)
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  return (
    <DashboardWrapper>
      <div className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          {/* 상단 인트로 */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              AI 세일즈 대시보드 (Mock)
            </h1>
            <p className="text-slate-600">
              회사/제품 정보 + 리드 추천 + 딜 파이프라인을 한눈에 보는
              포트폴리오용 대시보드입니다.
            </p>
          </header>

          {/* 상태 메세지 */}
          {loading && (
            <p className="text-slate-500 mb-4">
              대시보드 데이터를 불러오는 중...
            </p>
          )}
          {error && <p className="text-red-500 mb-4">오류: {error}</p>}

          {/* 상단 카드 4개 - 통계 */}
          <section className="grid gap-4 md:grid-cols-4 mb-8">
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="text-sm text-slate-500 mb-1">전체 리드 수</h3>
              <p className="text-2xl font-bold">{stats.totalLeads}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="text-sm text-slate-500 mb-1">
                핫 리드 (score ≥ 80)
              </h3>
              <p className="text-2xl font-bold text-emerald-600">
                {stats.hotLeads}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="text-sm text-slate-500 mb-1">진행 중인 딜</h3>
              <p className="text-2xl font-bold text-amber-600">
                {stats.inProgressDeals}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="text-sm text-slate-500 mb-1">
                30일 이내 클로징 예정 딜
              </h3>
              <p className="text-2xl font-bold text-indigo-600">
                {stats.closingSoonDeals}
              </p>
            </div>
          </section>

          {/* 하단: 주요 기능 바로가기 섹션 */}
          <section className="grid gap-4 md:grid-cols-3">
            {/* 회사/제품 관리 */}
            <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">회사 & 제품 관리</h3>
                <p className="text-gray-600 text-sm mb-4">
                  FastAPI 백엔드와 연동된 실제 회사/제품 정보를 관리하는
                  화면으로 이동합니다.
                </p>
                {/* 제품 개수 노출 */}
                <p className="text-xs text-slate-500">
                  현재 등록된 제품:{" "}
                  <span className="font-semibold">{stats.productCount}</span>개
                </p>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition"
              >
                회사/제품 관리
              </Link>
            </div>

            {/* 리드 추천 */}
            <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">리드 추천 리스트</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Mock 데이터 기반으로 산업/점수 기준 필터링이 가능한 리드
                  리스트입니다.
                </p>
              </div>
              <Link
                href="/leads"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition"
              >
                리드 리스트 보기
              </Link>
            </div>

            {/* 딜 파이프라인 */}
            <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">딜 파이프라인</h3>
                <p className="text-gray-600 text-sm mb-4">
                  New → Qualification → Proposal → Negotiation → Closed 단계로
                  이동 가능한 딜 파이프라인입니다.
                </p>
              </div>
              <Link
                href="/deals"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition"
              >
                파이프라인 관리
              </Link>
            </div>
            {/* 마이페이지 */}
            <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">My Page</h3>
                <p className="text-gray-600 text-sm mb-4">
                  나의 프로필, 이메일, 소속 회사 정보를 확인하고 프로필 이미지를
                  관리할 수 있습니다.
                </p>
              </div>
              <Link
                href="/mypage"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
              >
                마이페이지로 이동
              </Link>
            </div>

            {/* 향후 확장 영역 */}
            <div className="bg-gradient-to-br from-indigo-50 to-emerald-50 rounded-xl shadow p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">향후 확장 예정</h3>
                <p className="text-gray-700 text-sm mb-2">
                  실제 LLM / Agent 연동, 리드 스코어링 모델, 외부 CRM 연동(예:
                  Salesforce, HubSpot)을 붙일 수 있는 여지를 보여주는
                  카드입니다.
                </p>
                <p className="text-xs text-gray-500">
                  포트폴리오 설명 시 &quot;여기에는 추후 AI 로직을 붙일
                  예정&quot; 이라고 말해주면 설계 이해도를 잘 어필할 수 있어요.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardWrapper>
  )
}
