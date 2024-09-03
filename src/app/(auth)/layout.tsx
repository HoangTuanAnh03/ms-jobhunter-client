import React from 'react'
import { Toaster } from "@/components/ui/toaster"

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Toaster/>
      {children}
    </div>
  )
}
