import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  Users, 
  Plus,
  Eye,
  Download,
  Send,
  LogOut
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface Document {
  id: string
  title: string
  status: 'draft' | 'pending' | 'signed' | 'expired'
  createdAt: string
  signers: string[]
  lastUpdate: string
}

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    // Load documents from localStorage for demo
    const savedDocs = JSON.parse(localStorage.getItem('documents') || '[]')
    const mockDocs: Document[] = [
      {
        id: '1',
        title: 'Contrato de Prestação de Serviços - Cliente ABC',
        status: 'pending',
        createdAt: '2024-01-15',
        signers: ['João Silva', 'Maria Santos'],
        lastUpdate: '2 horas atrás'
      },
      {
        id: '2',
        title: 'NDA - Projeto Confidencial XYZ',
        status: 'signed',
        createdAt: '2024-01-14',
        signers: ['Pedro Costa'],
        lastUpdate: '1 dia atrás'
      },
      {
        id: '3',
        title: 'Termo de Parceria - Empresa DEF',
        status: 'pending',
        createdAt: '2024-01-12',
        signers: ['Ana Oliveira', 'Carlos Lima'],
        lastUpdate: '3 dias atrás'
      }
    ]
    setDocuments([...savedDocs, ...mockDocs])
  }, [])

  const stats = [
    {
      label: "Documentos Criados",
      value: documents.length.toString(),
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      label: "Pendentes",
      value: documents.filter(d => d.status === 'pending').length.toString(),
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      label: "Assinados",
      value: documents.filter(d => d.status === 'signed').length.toString(),
      icon: CheckCircle,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      label: "Participantes",
      value: "12",
      icon: Users,
      color: "text-accent",
      bgColor: "bg-accent/10"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return "bg-orange-100 text-orange-800 border-orange-200"
      case 'signed':
        return "bg-green-100 text-green-800 border-green-200"
      case 'draft':
        return "bg-blue-100 text-blue-800 border-blue-200"
      case 'expired':
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente'
      case 'signed': return 'Assinado'
      case 'draft': return 'Rascunho'
      case 'expired': return 'Expirado'
      default: return status
    }
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/auth')
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white border-b border-border p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Bem-vindo, {user?.name}!</p>
            </div>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-border hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card 
            className="bg-gradient-card border-border hover:shadow-medium transition-all duration-300 cursor-pointer group"
            onClick={() => navigate('/templates')}
          >
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Usar Template</h3>
              <p className="text-sm text-muted-foreground">Escolha um modelo pronto</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-card border-border hover:shadow-medium transition-all duration-300 cursor-pointer group"
            onClick={() => navigate('/editor')}
          >
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mb-4 group-hover:bg-secondary/20 transition-colors">
                <Plus className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Criar Documento</h3>
              <p className="text-sm text-muted-foreground">Comece do zero</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border hover:shadow-medium transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 group-hover:bg-accent/20 transition-colors">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Ver Histórico</h3>
              <p className="text-sm text-muted-foreground">Documentos anteriores</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Documents */}
        <Card className="bg-white border-border">
          <CardHeader>
            <CardTitle>Documentos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:shadow-soft transition-all duration-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-medium text-foreground">{doc.title}</h3>
                      <Badge variant="outline" className={getStatusColor(doc.status)}>
                        {getStatusLabel(doc.status)}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-2">
                      Criado em {new Date(doc.createdAt).toLocaleDateString('pt-BR')} • Atualizado {doc.lastUpdate}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {doc.signers.join(", ")}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    {(doc.status === 'draft' || doc.status === 'pending') && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate('/signatures', { state: { document: doc } })}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard