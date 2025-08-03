import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { LoginForm } from '@/components/auth/LoginForm'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { useAuth } from '@/contexts/AuthContext'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSuccess = () => {
    // Navigation will be handled by the auth context
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm
            onToggleMode={() => setIsLogin(false)}
            onSuccess={handleSuccess}
          />
        ) : (
          <RegisterForm
            onToggleMode={() => setIsLogin(true)}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  )
}

export default Auth