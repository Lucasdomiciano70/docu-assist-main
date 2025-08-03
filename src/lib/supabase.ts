import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Mock authentication for development
export const mockAuth = {
  signIn: async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (email && password) {
      const user = {
        id: '1',
        email,
        name: email.split('@')[0],
        created_at: new Date().toISOString()
      }
      localStorage.setItem('user', JSON.stringify(user))
      return { user, error: null }
    }
    
    return { user: null, error: { message: 'Credenciais inválidas' } }
  },
  
  signUp: async (email: string, password: string, name: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const user = {
      id: Date.now().toString(),
      email,
      name,
      created_at: new Date().toISOString()
    }
    localStorage.setItem('user', JSON.stringify(user))
    return { user, error: null }
  },
  
  signOut: async () => {
    localStorage.removeItem('user')
    return { error: null }
  },
  
  getUser: () => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  }
}