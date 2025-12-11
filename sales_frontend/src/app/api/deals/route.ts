import { NextResponse } from "next/server"
import { MOCK_DEALS } from "@/mock/deal"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  return NextResponse.json(MOCK_DEALS)
}
