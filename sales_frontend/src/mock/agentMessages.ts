import { AgentMessage } from "@/types/types"

export const mockAgentMessages: AgentMessage[] = [
  {
    id: 1,
    role: "system",
    content:
      "해당 대화는 AI Seller Agent와 Buyer Agent 간의 협상 로그입니다. 사람 검토 후 승인 또는 수정 요청을 내려주세요.",
    createdAt: "2025-12-10T09:00:00Z",
  },
  {
    id: 2,
    role: "seller_agent",
    content:
      "고객사는 현재 클라우드 전환 프로젝트를 진행 중이며, 연간 약 1억 원 규모의 예산을 확보한 상태입니다. 우리 PRO 플랜(연 8천만 원)을 제안하는 것이 적절해 보입니다.",
    createdAt: "2025-12-10T09:01:00Z",
  },
  {
    id: 3,
    role: "buyer_agent",
    content:
      "고객 측 요청에 따르면, 초기 1년은 PoC 성격으로 진행하고 싶어 합니다. 연 5천만 원 이하의 가격대를 선호합니다.",
    createdAt: "2025-12-10T09:02:00Z",
  },
  {
    id: 4,
    role: "seller_agent",
    content:
      "초기 1년 차에는 기능 제한 버전(반자동 리드 스코어링)으로 연 4,800만 원에 제안하고, 2년 차부터 PRO 플랜으로 업셀하는 조건을 제시하겠습니다.",
    createdAt: "2025-12-10T09:03:30Z",
  },
  {
    id: 5,
    role: "buyer_agent",
    content:
      "고객사는 해당 조건에 긍정적입니다. 단, PoC 기간 동안 월간 리포트와 분기별 리뷰 미팅을 포함해달라고 요청했습니다.",
    createdAt: "2025-12-10T09:04:30Z",
  },
  {
    id: 6,
    role: "seller_agent",
    content:
      "월간 리포트 및 분기별 리뷰 미팅 포함 조건으로, 1년 차 4,800만 원 제안안으로 합의 초안 작성하겠습니다. 최종 제안서를 사람 검토에 전달합니다.",
    createdAt: "2025-12-10T09:06:00Z",
  },
]
