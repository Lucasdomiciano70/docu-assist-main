import React, { createContext, useContext, useEffect, useState } from 'react'
import { mockAuth } from '@/lib/supabase'

interface User {
  id: string
  email: string
  name: string
  created_at: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: any }>
  signUp: (email: string, password: string, name: string) => Promise<{ user: User | null; error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = mockAuth.getUser()
    setUser(savedUser)
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    const { user, error } = await mockAuth.signIn(email, password)
    if (user) {
      setUser(user)
    }
    return { user, error }
  }

  const signUp = async (email: string, password: string, name: string) => {
    const { user, error } = await mockAuth.signUp(email, password, name)
    if (user) {
      setUser(user)
    }
    return { user, error }
  }

  const signOut = async () => {
    await mockAuth.signOut()
    setUser(null)
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}