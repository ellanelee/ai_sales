import type { Metadata } from "next"
import "./globals.css"
import { AuthInitializer } from "@/components/AuthInitizlizer"
import { Header } from "@/components/Header"

export const metadata: Metadata = {
  title: "ai_sales_dashboard",
  description: "ai_sales_simple",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <AuthInitializer />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
