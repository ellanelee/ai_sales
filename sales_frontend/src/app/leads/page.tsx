"use client"
import { useEffect, useState } from "react"
import { DashboardWrapper } from "@/components/DashboardWrapper"
import { fetchLeads } from "@/services/lead"
import type { Lead } from "@/types/types"

function LeadsPageInner() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [industry, setIndustry] = useState<string>("all")
  const [minScore, setMinScore] = useState<number>(70)

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchLeads({ industry, minScore })
      setLeads(data)
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "리드데이터를 불러오지 못했습니다."
      setError(msg)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    void load()
  }, [industry, minScore])

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">리드 추천 리스트</h1>
        <p className="text-slate-600 mb-6">
          AI Agent가 추천한 것처럼 보이는 Mock 리드 데이터입니다. 산업/점수
          기준으로 필터링해볼 수 있어요.
        </p>

        {/* 필터 영역 */}
        <div className="flex flex-wrap items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm">
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              산업 필터
            </label>
            <select
              className="border rounded-lg px-3 py-2 text-sm"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="all">전체</option>
              <option value="반도체">반도체</option>
              <option value="제조">제조</option>
              <option value="이커머스">이커머스</option>
              <option value="SaaS">SaaS</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              최소 추천 점수: <span className="font-semibold">{minScore}</span>
            </label>
            <input
              type="range"
              min={50}
              max={95}
              step={5}
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-52"
            />
          </div>
        </div>

        {/* 상태 표시 */}
        {loading && (
          <p className="text-slate-500 mt-4">리드를 불러오는 중입니다...</p>
        )}
        {error && <p className="text-red-500 mt-4">오류: {error}</p>}
        {!loading && !error && leads.length === 0 && (
          <p className="text-slate-500 mt-4">
            조건에 해당하는 리드가 없습니다. 필터를 조정해보세요.
          </p>
        )}

        {/* 카드 리스트 */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-xl shadow-sm p-4 border border-slate-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{lead.company}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                    {lead.industry}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{lead.reason}</p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-500">{lead.size}</span>
                <span className="text-sm font-bold text-emerald-600">
                  추천 점수 {lead.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function LeadsPage() {
  return (
    <DashboardWrapper>
      <LeadsPageInner />
    </DashboardWrapper>
  )
}
