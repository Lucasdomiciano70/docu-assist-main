import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff, Mail, Lock, User, FileSignature } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/components/ui/sonner'

const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, 'Você deve aceitar os termos')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword']
})

type RegisterFormData = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onToggleMode: () => void
  onSuccess: () => void
}

export const RegisterForm = ({ onToggleMode, onSuccess }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { signUp } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const password = watch('password')

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '' }
    
    let strength = 0
    if (password.length >= 6) strength++
    if (password.match(/[a-z]/)) strength++
    if (password.match(/[A-Z]/)) strength++
    if (password.match(/[0-9]/)) strength++
    if (password.match(/[^a-zA-Z0-9]/)) strength++

    const labels = ['', 'Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte']
    const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-600']
    
    return { strength, label: labels[strength], color: colors[strength] }
  }

  const passwordStrength = getPasswordStrength(password || '')

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const { user, error } = await signUp(data.email, data.password, data.name)
      
      if (error) {
        setError(error.message)
      } else if (user) {
        toast.success('Conta criada com sucesso!')
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
        <CardTitle className="text-2xl font-bold">Criar conta</CardTitle>
        <CardDescription>
          Comece a assinar documentos digitalmente
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
            <Label htmlFor="name">Nome completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                className="pl-10"
                {...register('name')}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

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
            {password && (
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded ${
                        level <= passwordStrength.strength
                          ? passwordStrength.color
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Força da senha: {passwordStrength.label}
                </p>
              </div>
            )}
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="pl-10 pr-10"
                {...register('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="acceptTerms" {...register('acceptTerms')} />
            <Label htmlFor="acceptTerms" className="text-sm">
              Aceito os{' '}
              <Button variant="link" className="p-0 h-auto text-sm">
                termos de uso
              </Button>{' '}
              e{' '}
              <Button variant="link" className="p-0 h-auto text-sm">
                política de privacidade
              </Button>
            </Label>
          </div>
          {errors.acceptTerms && (
            <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Criando conta...' : 'Criar conta'}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <Button variant="link" onClick={onToggleMode} className="p-0 h-auto">
                Faça login
              </Button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}