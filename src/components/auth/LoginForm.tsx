import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Mail, Lock, FileSignature } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/components/ui/sonner'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
})

type LoginFormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  onToggleMode: () => void
  onSuccess: () => void
}

export const LoginForm = ({ onToggleMode, onSuccess }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const { user, error } = await signIn(data.email, data.password)
      
      if (error) {
        setError(error.message)
      } else if (user) {
        toast.success('Login realizado com sucesso!')
        onSuccess()
      }
    } catch (err) {
      setError('Erro interno do servidor')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-primary rounded-lg">
            <FileSignature className="h-8 w-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Bem-vindo de volta</CardTitle>
        <CardDescription>
          Entre na sua conta para continuar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="pl-10"
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="pl-10 pr-10"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>

          <div className="text-center space-y-2">
            <Button variant="link" className="text-sm">
              Esqueceu sua senha?
            </Button>
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <Button variant="link" onClick={onToggleMode} className="p-0 h-auto">
                Cadastre-se
              </Button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}