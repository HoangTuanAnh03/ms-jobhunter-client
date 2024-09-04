'use client'
import { createContext, useContext, useState } from 'react'

const AppContext = createContext({
  accessToken: '',
  setAccessToken: (accessToken: string) => {},
  refreshToken: '',
  setRefreshToken: (refreshToken: string) => {}
})

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

export default function AppProvider({
  children,
  initialAccessToken = '',
  initialRefreshToken =''
}: {
  children: React.ReactNode
  initialAccessToken?: string
  initialRefreshToken?: string
}) {
  const [accessToken, setAccessToken] = useState(initialAccessToken);
  const [refreshToken, setRefreshToken] = useState(initialRefreshToken);
  return (
    <AppContext.Provider value={{ accessToken, setAccessToken, refreshToken, setRefreshToken }}>
      {children}
    </AppContext.Provider>
  )
}