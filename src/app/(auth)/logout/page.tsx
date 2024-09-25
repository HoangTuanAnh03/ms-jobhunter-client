'use client'
import authApiRequest from '@/apiRequests/auth'
import { clientAccessToken } from '@/utils/api'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
export default function Logout() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const accessToken = searchParams.get('accessToken')
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    if (accessToken === clientAccessToken.value) {
      authApiRequest
        .logoutFromNextClientToNextServer(true, signal)
        .then((res) => {
          router.push(`/login?redirectFrom=${pathname}`)
        })
    }
    return () => {
      controller.abort()
    }
  }, [accessToken, router, pathname])
  return <div>page</div>
}