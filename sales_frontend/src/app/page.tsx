"use client"
import Link from "next/link"
import { useAuthStore } from "@/store/authStore"
import { DashboardWrapper } from "@/components/DashboardWrapper"
import { Header } from "@/components/Header"
export default function Home() {
  const { user } = useAuthStore()
  return (
    <DashboardWrapper>
      <Header />
    </DashboardWrapper>
  )
}
