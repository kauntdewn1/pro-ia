'use client'

import { useState, useEffect } from 'react'

interface UserSession {
  email: string
  xp: number
  level: 'basic' | 'premium' | 'expert'
  unlocked_at: string
  scope: string[]
}

interface AuthState {
  user: UserSession | null
  loading: boolean
  authenticated: boolean
}

export function useAuth(): AuthState {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    authenticated: false
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'GET',
        credentials: 'include'
      })

      const data = await response.json()
      
      if (data.authenticated && data.user) {
        setAuthState({
          user: data.user,
          loading: false,
          authenticated: true
        })
      } else {
        setAuthState({
          user: null,
          loading: false,
          authenticated: false
        })
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setAuthState({
        user: null,
        loading: false,
        authenticated: false
      })
    }
  }

  return authState
}

export function useRequireAuth(redirectTo: string = '/') {
  const { user, loading, authenticated } = useAuth()

  useEffect(() => {
    if (!loading && !authenticated) {
      window.location.href = redirectTo
    }
  }, [loading, authenticated, redirectTo])

  return { user, loading, authenticated }
}
