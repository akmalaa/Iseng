import type React from "react"
import type { Metadata } from "next"
import { Corinthia, Noto_Sans_Math } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const conrithia = Corinthia({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-conrithia",
  display: "swap",
})

const notoSansMath = Noto_Sans_Math({
  weight: "400",
  subsets: ["math"],
  variable: "--font-noto-sans-math",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Test Akmal",
  description: "Test Amal",
  generator: "v0.app",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${GeistSans.variable} ${conrithia.variable} ${notoSansMath.variable}`}>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
