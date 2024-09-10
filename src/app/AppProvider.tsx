'use client'
import { clientAccessToken } from '@/utils/api'
import {  useState } from 'react'


export default function AppProvider({
  children,
  initialAccessToken = '',
  // initialRefreshToken =''
}: {
  children: React.ReactNode
  initialAccessToken?: string
  // initialRefreshToken?: string
}) {
  useState(() => {
    if (typeof window !== 'undefined') {
      clientAccessToken.value = initialAccessToken
    }
  })
  return <>{children}</>
}