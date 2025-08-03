import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TemplateCard } from '@/components/templates/TemplateCard'
import { TemplatePreview } from '@/components/templates/TemplatePreview'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Plus } from 'lucide-react'

interface Template {
  id: string
  title: string
  description: string
  category: string
  isPremium: boolean
  rating: number
  usageCount: number
  preview: string
}

const mockTemplates: Template[] = [
  {
    id: '1',
    title: 'Contrato de Prestação de Serviços',
    description: 'Template completo para contratos de prestação de serviços profissionais com cláusulas padrão.',
    category: 'Contratos',
    isPremium: false,
    rating: 4.8,
    usageCount: 1250,
    preview: `
      <h2>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</h2>
      <p><strong>CONTRATANTE:</strong> {{nome_contratante}}</p>
      <p><strong>CPF:</strong> {{cpf_contratante}}</p>
      <p><strong>CONTRATADO:</strong> {{nome_contratado}}</p>
      <p><strong>CPF:</strong> {{cpf_contratado}}</p>
      <h3>CLÁUSULA 1ª - DO OBJETO</h3>
      <p>O presente contrato tem por objeto a prestação de serviços de {{tipo_servico}} pelo CONTRATADO ao CONTRATANTE.</p>
      <h3>CLÁUSULA 2ª - DO VALOR</h3>
      <p>O valor total dos serviços é de R$ {{valor}} ({{valor_extenso}}).</p>
      <h3>CLÁUSULA 3ª - DO PRAZO</h3>
      <p>O prazo para execução dos serviços é de {{prazo}} dias, contados a partir da assinatura deste contrato.</p>
    `
  },
  {
    id: '2',
    title: 'Acordo de Confidencialidade (NDA)',
    description: 'Termo de confidencialidade para proteção de informações sensíveis em negociações.',
    category: 'Confidencialidade',
    isPremium: true,
    rating: 4.9,
    usageCount: 890,
    preview: `
      <h2>ACORDO DE CONFIDENCIALIDADE</h2>
      <p><strong>PARTE REVELADORA:</strong> {{nome_reveladora}}</p>
      <p><strong>PARTE RECEPTORA:</strong> {{nome_receptora}}</p>
      <h3>CLÁUSULA 1ª - DEFINIÇÕES</h3>
      <p>Para os fins deste acordo, "Informação Confidencial" significa toda e qualquer informação...</p>
      <h3>CLÁUSULA 2ª - OBRIGAÇÕES</h3>
      <p>A PARTE RECEPTORA compromete-se a manter em sigilo absoluto todas as informações...</p>
    `
  },
  {
    id: '3',
    title: 'Termo de Aceite',
    description: 'Template simples para termos de aceite de produtos ou serviços digitais.',
    category: 'Termos',
    isPremium: false,
    rating: 4.6,
    usageCount: 2100,
    preview: `
      <h2>TERMO DE ACEITE</h2>
      <p><strong>USUÁRIO:</strong> {{nome_usuario}}</p>
      <p><strong>EMAIL:</strong> {{email_usuario}}</p>
      <h3>1. ACEITE DOS TERMOS</h3>
      <p>Ao utilizar nossos serviços, você concorda com os seguintes termos...</p>
      <h3>2. DESCRIÇÃO DO SERVIÇO</h3>
      <p>{{descricao_servico}}</p>
    `
  },
  {
    id: '4',
    title: 'Contrato de Parceria',
    description: 'Acordo de parceria comercial entre empresas com definição de responsabilidades.',
    category: 'Parcerias',
    isPremium: true,
    rating: 4.7,
    usageCount: 650,
    preview: `
      <h2>CONTRATO DE PARCERIA COMERCIAL</h2>
      <p><strong>PARCEIRO A:</strong> {{nome_parceiro_a}}</p>
      <p><strong>PARCEIRO B:</strong> {{nome_parceiro_b}}</p>
      <h3>CLÁUSULA 1ª - OBJETO DA PARCERIA</h3>
      <p>As partes estabelecem parceria para {{objeto_parceria}}...</p>
      <h3>CLÁUSULA 2ª - RESPONSABILIDADES</h3>
      <p>Cada parceiro será responsável por {{responsabilidades}}...</p>
    `
  }
]

const categories = ['Todos', 'Contratos', 'Confidencialidade', 'Termos', 'Parcerias']

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const navigate = useNavigate()

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template)
    setIsPreviewOpen(true)
  }

  const handleUse = (template: Template) => {
    navigate(`/editor?template=${template.id}`)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white border-b border-border p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Templates</h1>
              <p className="text-muted-foreground">Escolha um modelo para começar seu documento</p>
            </div>
            <Button onClick={() => navigate('/editor')} size="lg">
              <Plus className="h-4 w-4 mr-2" />
              Criar do Zero
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreview={handlePreview}
              onUse={handleUse}
            />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              Nenhum template encontrado para "{searchTerm}"
            </div>
            <Button variant="outline" onClick={() => setSearchTerm('')}>
              Limpar busca
            </Button>
          </div>
        )}
      </div>

      <TemplatePreview
        template={previewTemplate}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onUse={handleUse}
      />
    </div>
  )
}

export default Templates