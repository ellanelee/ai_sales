"use client"

import { useEffect, useState } from "react"
import { DashboardWrapper } from "@/components/DashboardWrapper"
import { fetchAgentMessages } from "@/services/agent_message"
import type { AgentMessage, AgentDecision } from "@/types/types"

export default function AgentLog() {
  const [messages, setMessages] = useState<AgentMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [decision, setDecision] = useState<AgentDecision>("none")

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchAgentMessages()
        setMessages(data)
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : "에이전트 대화 로그를 불러오지 못했습니다."
        setError(msg)
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [])

  const handleApprove = () => {
    setDecision("approved")
  }

  const handleReject = () => {
    setDecision("rejected")
  }

  const renderRoleLabel = (role: AgentMessage["role"]) => {
    switch (role) {
      case "seller_agent":
        return "Seller Agent"
      case "buyer_agent":
        return "Buyer Agent"
      case "system":
        return "System"
      default:
        return role
    }
  }

  const bubbleColors = (role: AgentMessage["role"]) => {
    if (role === "seller_agent")
      return "bg-emerald-50 border border-emerald-100 text-emerald-900"
    if (role === "buyer_agent")
      return "bg-sky-50 border border-sky-100 text-sky-900"
    return "bg-slate-100 border border-slate-200 text-slate-800"
  }

  const alignClass = (role: AgentMessage["role"]) => {
    if (role === "seller_agent") return "items-end"
    if (role === "buyer_agent") return "items-start"
    return "items-center"
  }
  return (
    <DashboardWrapper>
      <div className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="max-w-4xl mx-auto">
          {/* 상단 설명 */}
          <header className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              Agent 협상 로그 & 최종 승인
            </h1>
            <p className="text-slate-600 text-sm">
              AI Seller Agent와 Buyer Agent가 제안/협상을 진행한 로그입니다.
              사람(지은님)이 마지막으로 내용을 확인하고 승인 또는 수정 요청을
              내리는 플로우를 보여주는 화면입니다.
            </p>
          </header>

          {/* 상태 메시지 */}
          {loading && (
            <p className="text-slate-500 mb-4">대화 로그를 불러오는 중...</p>
          )}
          {error && <p className="text-red-500 mb-4">오류: {error}</p>}

          {/* 대화 로그 */}
          <section className="bg-white rounded-xl shadow p-5 mb-6 max-h-[520px] overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${alignClass(msg.role)} mb-3`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${bubbleColors(
                    msg.role
                  )}`}
                >
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {renderRoleLabel(msg.role)}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(msg.createdAt).toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="whitespace-pre-line leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}

            {!loading && !error && messages.length === 0 && (
              <p className="text-slate-500 text-sm">
                표시할 대화 로그가 없습니다.
              </p>
            )}
          </section>

          {/* 승인/반려 영역 */}
          <section className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">
                최종 제안에 대한 의사결정
              </h2>
              <p className="text-slate-600 text-sm">
                실제 서비스라면 이 버튼 클릭 시 Deal stage를
                &quot;Proposal&quot; → &quot;Closing&quot; 등으로 변경하거나,
                제안서를 생성하는 트리거가 됩니다. 여기서는 포트폴리오용으로
                상태만 UI로 보여줍니다.
              </p>
            </div>

            <div className="flex flex-col items-start gap-2 md:items-end">
              <div className="flex gap-2">
                <button
                  onClick={handleApprove}
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600"
                >
                  ✅ 이 제안 승인하기
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 rounded-lg bg-rose-500 text-white text-sm font-medium hover:bg-rose-600"
                >
                  ❌ 수정 요청하기
                </button>
              </div>

              {decision !== "none" && (
                <p className="text-sm mt-1">
                  현재 의사결정:{" "}
                  {decision === "approved" ? (
                    <span className="text-emerald-600 font-semibold">
                      승인됨 (Approved)
                    </span>
                  ) : (
                    <span className="text-rose-600 font-semibold">
                      수정 요청됨 (Requested Change)
                    </span>
                  )}
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </DashboardWrapper>
  )
}
