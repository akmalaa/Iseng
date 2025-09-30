"use client"

import type React from "react"

import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "next/navigation"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense fallback={null}>{children}</Suspense>
      <Analytics />
    </>
  )
}
