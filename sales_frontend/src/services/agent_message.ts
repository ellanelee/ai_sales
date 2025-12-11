import type { AgentMessage } from "@/types/types"

export async function fetchAgentMessages(): Promise<AgentMessage[]> {
  const res = await fetch("api/agent_messages", {
    method: "GET",
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Agent의 message를 불러오지 못했습니다")
  }

  const data = (await res.json()) as AgentMessage[]
  return data
}
