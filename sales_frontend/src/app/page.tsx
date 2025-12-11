"use client"
import Link from "next/link"
import { useAuthStore } from "@/store/authStore"
import { DashboardWrapper } from "@/components/DashboardWrapper"

export default function Home() {
  const { user, company } = useAuthStore()
  return (
    <DashboardWrapper>
      <div>
        <div className="min-h-screen bg-gray-50 px-6 py-10">
          {/* 상단 환영 영역 */}
          <section className="max-w-5xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              안녕하세요, {user?.name ?? "사용자"} 님 👋
            </h1>
            <p className="text-gray-600 text-lg">
              AI 기반 B2B 세일즈 대시보드입니다. 회사/제품 정보를 관리하고, 리드
              추천과 딜 진행 현황을 한 곳에서 확인하세요.
            </p>

            {/* 간단한 사용자/회사 요약 */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow p-4">
                <p className="text-sm text-gray-500 mb-1">계정 이메일</p>
                <p className="text-base font-medium break-all">{user?.email}</p>
              </div>

              <div className="bg-white rounded-xl shadow p-4">
                <p className="text-sm text-gray-500 mb-1">소속 회사</p>
                <p className="text-base font-medium">{company?.name ?? "-"}</p>
                <p className="text-xs text-gray-400 mt-1">
                  회사 상세 정보는 추후 /company 연동 예정
                </p>
              </div>

              <div className="bg-indigo-50 rounded-xl shadow p-4">
                <p className="text-sm text-gray-500 mb-1">빠른 시작 안내</p>
                <p className="text-sm text-gray-700">
                  1) 제품 등록 → 2) 리드 추천 확인 → 3) 파이프라인 관리 → 4)
                  Agent 대화 로그 검토
                </p>
              </div>
            </div>
          </section>

          {/* 주요 기능 카드 영역 */}
          <section className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">대시보드 메뉴</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 회사 & 제품 관리 */}
              <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    회사 & 제품 관리
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    우리 회사의 기본 정보와 세일즈 대상 제품을 등록·수정합니다.
                    리드 추천과 파이프라인의 기반 데이터가 됩니다.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/company"
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
                  >
                    회사 정보 관리
                  </Link>
                  <Link
                    href="/products"
                    className="px-4 py-2 rounded-lg border border-indigo-200 text-indigo-700 text-sm font-medium hover:bg-indigo-50 transition"
                  >
                    제품 목록 보기
                  </Link>
                </div>
              </div>

              {/* 리드 추천 (Mock) */}
              <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    리드 추천 리스트
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    AI가 추천한 것처럼 보이는 Mock 리드 데이터를 표시합니다.
                    산업, 점수, 회사 규모로 필터링하고 정렬할 수 있습니다.
                  </p>
                </div>
                <Link
                  href="/leads"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition"
                >
                  리드 추천 보러가기
                </Link>
              </div>

              {/* 딜 파이프라인 */}
              <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">딜 파이프라인</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    New → Qualification → Proposal → Closing 단계별로 딜을
                    관리하는 칸반 스타일 파이프라인입니다.
                  </p>
                </div>
                <Link
                  href="/deals"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition"
                >
                  파이프라인 관리
                </Link>
              </div>

              {/* Agent 대화 로그 */}
              <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Agent 대화 로그
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Seller Agent와 Buyer Agent의 Mock 대화 로그를 보여주고,
                    사람이 최종 승인/반려하는 UI를 구성할 수 있습니다.
                  </p>
                </div>
                <Link
                  href="/agent-logs"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 transition"
                >
                  대화 로그 보기
                </Link>
              </div>

              {/* 마이페이지 */}
              <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">My Page</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    나의 프로필, 이메일, 소속 회사 정보를 확인하고 프로필
                    이미지를 관리할 수 있습니다.
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
                    예정&quot; 이라고 말해주면 설계 이해도를 잘 어필할 수
                    있어요.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardWrapper>
  )
}
