import type { Metadata } from "next"
import "./globals.css"
import { AuthInitializer } from "@/components/AuthInitizlizer"

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
        {children}
      </body>
    </html>
  )
}
