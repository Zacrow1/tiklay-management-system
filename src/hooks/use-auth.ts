'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'

interface User {
  id: string
  email: string
  name?: string
  emailVerified: boolean
  image?: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterCredentials {
  email: string
  password: string
  name: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check authentication status on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        toast.success('Login successful!')
        return { success: true }
      } else {
        const error = await response.json()
        toast.error(error.error || 'Login failed')
        return { success: false, error: error.error }
      }
    } catch (error) {
      toast.error('Login failed')
      return { success: false, error: 'Network error' }
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        toast.success('Registration successful!')
        return { success: true }
      } else {
        const error = await response.json()
        toast.error(error.error || 'Registration failed')
        return { success: false, error: error.error }
      }
    } catch (error) {
      toast.error('Registration failed')
      return { success: false, error: 'Network error' }
    }
  }

  const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      if (response.ok) {
        setUser(null)
        toast.success('Logged out successfully!')
        return { success: true }
      } else {
        toast.error('Logout failed')
        return { success: false }
      }
    } catch (error) {
      toast.error('Logout failed')
      return { success: false }
    }
  }

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }
}