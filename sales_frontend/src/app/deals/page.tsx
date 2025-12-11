"use client"

import { DashboardWrapper } from "@/components/DashboardWrapper"
import { fetchDeals } from "@/services/deal"
import { Deal, DealStage } from "@/types/types"
import { useEffect, useState } from "react"

const STAGE_ORDER: DealStage[] = [
  "new",
  "qualification",
  "proposal",
  "negotiation",
  "closed",
]

function DealsPageInner() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const grouped: Record<DealStage, Deal[]> = {
    new: [],
    qualification: [],
    proposal: [],
    negotiation: [],
    closed: [],
  }

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchDeals()
      setDeals(data)
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "deal항목을 불러오지 못했습니다"
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  //다음 단계로 이동
  const moveToNextStage = (dealId: number) => {
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id != dealId) return deal
        const currentIndex = STAGE_ORDER.indexOf(deal.stage)
        if (currentIndex === -1 || currentIndex === STAGE_ORDER.length - 1) {
          return deal
        }
        return {
          ...deal,
          stage: STAGE_ORDER[currentIndex + 1],
        }
      })
    )
  }

  //지정된 단계로 이동
  const moveToStage = (dealId: number, stage: DealStage) => {
    setDeals((prev) =>
      prev.map((deal) => (deal.id === dealId ? { ...deal, stage } : deal))
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">딜 파이프라인</h1>
        <p className="text-slate-600 mb-6">
          New → Qualification → Proposal → Negotiation → Closed 단계별로 딜을
          관리하는 Mock 파이프라인입니다.
        </p>

        {loading && (
          <p className="text-slate-500 mt-4">
            딜 데이터를 불러오는 중입니다...
          </p>
        )}
        {error && <p className="text-red-500 mt-4">오류: {error}</p>}

        {/* 단계별 칼럼 */}
        <div className="mt-6 grid gap-4 md:grid-cols-5">
          {STAGE_ORDER.map((stage) => (
            <div
              key={stage}
              className="bg-white rounded-xl shadow-sm p-3 border border-slate-100 flex flex-col"
            >
              <div className="mb-3">
                <h3 className="font-semibold capitalize">
                  {stage === "new"
                    ? "New"
                    : stage === "qualification"
                    ? "Qualification"
                    : stage === "proposal"
                    ? "Proposal"
                    : stage === "negotiation"
                    ? "Negotiation"
                    : "Closed"}
                </h3>
                <p className="text-xs text-slate-500">
                  {deals.filter((deal) => deal.stage === stage).length} 개의 딜
                </p>
              </div>

              <div className="flex-1 space-y-3 overflow-auto">
                {deals
                  .filter((deal) => deal.stage === stage)
                  .map((deal) => (
                    <div
                      key={deal.id}
                      className="bg-slate-50 rounded-lg p-3 shadow-sm flex flex-col gap-2"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-sm">
                            {deal.leadCompany}
                          </div>
                          <div className="text-xs text-slate-600">
                            {deal.productName}
                          </div>
                        </div>
                        <div className="text-xs text-emerald-600 font-bold">
                          {deal.amount.toLocaleString()} 원
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500">
                        예상 클로징: {deal.expectedClose}
                      </div>

                      {/* 단계 이동 컨트롤 */}
                      <div className="flex items-center justify-between gap-2 mt-1">
                        <select
                          className="flex-1 border rounded-md px-2 py-1 text-[11px]"
                          value={deal.stage}
                          onChange={(e) =>
                            moveToStage(deal.id, e.target.value as DealStage)
                          }
                        >
                          {STAGE_ORDER.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          onClick={() => moveToNextStage(deal.id)}
                          className="text-[11px] px-2 py-1 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition"
                        >
                          다음 단계
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DealsPage() {
  return (
    <DashboardWrapper>
      <DealsPageInner />
    </DashboardWrapper>
  )
}
