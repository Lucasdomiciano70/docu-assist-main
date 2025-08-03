import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Save, Eye, Send, FileText } from 'lucide-react'
import { toast } from '@/components/ui/sonner'

interface DocumentField {
  key: string
  label: string
  value: string
  type: 'text' | 'email' | 'number' | 'date'
}

interface DocumentEditorProps {
  templateId?: string
  onSave: (document: any) => void
  onPreview: (document: any) => void
  onSend: (document: any) => void
}

export const DocumentEditor = ({ templateId, onSave, onPreview, onSend }: DocumentEditorProps) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [fields, setFields] = useState<DocumentField[]>([])
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (templateId) {
      loadTemplate(templateId)
    } else {
      setTitle('Novo Documento')
      setContent('<h2>Título do Documento</h2>\n<p>Conteúdo do documento...</p>')
      setFields([
        { key: 'nome', label: 'Nome completo', value: '', type: 'text' },
        { key: 'email', label: 'Email', value: '', type: 'email' },
        { key: 'data', label: 'Data', value: new Date().toISOString().split('T')[0], type: 'date' }
      ])
    }
  }, [templateId])

  const loadTemplate = (id: string) => {
    // Mock template loading
    const templates: Record<string, any> = {
      '1': {
        title: 'Contrato de Prestação de Serviços',
        content: `<h2>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</h2>
<p><strong>CONTRATANTE:</strong> {{nome_contratante}}</p>
<p><strong>CPF:</strong> {{cpf_contratante}}</p>
<p><strong>EMAIL:</strong> {{email_contratante}}</p>
<p><strong>CONTRATADO:</strong> {{nome_contratado}}</p>
<p><strong>CPF:</strong> {{cpf_contratado}}</p>
<p><strong>EMAIL:</strong> {{email_contratado}}</p>

<h3>CLÁUSULA 1ª - DO OBJETO</h3>
<p>O presente contrato tem por objeto a prestação de serviços de {{tipo_servico}} pelo CONTRATADO ao CONTRATANTE.</p>

<h3>CLÁUSULA 2ª - DO VALOR</h3>
<p>O valor total dos serviços é de R$ {{valor}} ({{valor_extenso}}).</p>

<h3>CLÁUSULA 3ª - DO PRAZO</h3>
<p>O prazo para execução dos serviços é de {{prazo}} dias, contados a partir da assinatura deste contrato.</p>

<h3>CLÁUSULA 4ª - DAS RESPONSABILIDADES</h3>
<p>O CONTRATADO se compromete a executar os serviços com qualidade e dentro do prazo estabelecido.</p>

<h3>CLÁUSULA 5ª - DO FORO</h3>
<p>Fica eleito o foro da comarca de {{cidade}} para dirimir quaisquer questões oriundas do presente contrato.</p>

<p>{{cidade}}, {{data}}</p>`,
        fields: [
          { key: 'nome_contratante', label: 'Nome do Contratante', value: '', type: 'text' },
          { key: 'cpf_contratante', label: 'CPF do Contratante', value: '', type: 'text' },
          { key: 'email_contratante', label: 'Email do Contratante', value: '', type: 'email' },
          { key: 'nome_contratado', label: 'Nome do Contratado', value: '', type: 'text' },
          { key: 'cpf_contratado', label: 'CPF do Contratado', value: '', type: 'text' },
          { key: 'email_contratado', label: 'Email do Contratado', value: '', type: 'email' },
          { key: 'tipo_servico', label: 'Tipo de Serviço', value: '', type: 'text' },
          { key: 'valor', label: 'Valor (R$)', value: '', type: 'number' },
          { key: 'valor_extenso', label: 'Valor por Extenso', value: '', type: 'text' },
          { key: 'prazo', label: 'Prazo (dias)', value: '', type: 'number' },
          { key: 'cidade', label: 'Cidade', value: '', type: 'text' },
          { key: 'data', label: 'Data', value: new Date().toLocaleDateString('pt-BR'), type: 'date' }
        ]
      }
    }

    const template = templates[id]
    if (template) {
      setTitle(template.title)
      setContent(template.content)
      setFields(template.fields)
    }
  }

  const updateField = (key: string, value: string) => {
    setFields(prev => prev.map(field => 
      field.key === key ? { ...field, value } : field
    ))
  }

  const getPreviewContent = () => {
    let preview = content
    fields.forEach(field => {
      const regex = new RegExp(`{{${field.key}}}`, 'g')
      preview = preview.replace(regex, field.value || `[${field.label}]`)
    })
    return preview
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const document = {
        id: Date.now().toString(),
        title,
        content,
        fields,
        createdAt: new Date().toISOString(),
        status: 'draft'
      }
      
      // Save to localStorage for demo
      const savedDocs = JSON.parse(localStorage.getItem('documents') || '[]')
      savedDocs.push(document)
      localStorage.setItem('documents', JSON.stringify(savedDocs))
      
      onSave(document)
      toast.success('Documento salvo com sucesso!')
    } catch (error) {
      toast.error('Erro ao salvar documento')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreview = () => {
    const document = {
      title,
      content: getPreviewContent(),
      fields
    }
    onPreview(document)
  }

  const handleSend = () => {
    const document = {
      title,
      content: getPreviewContent(),
      fields
    }
    onSend(document)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Editor Panel */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Informações do Documento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título do Documento</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Digite o título do documento"
                />
              </div>
              
              <div>
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Digite o conteúdo do documento..."
                  className="min-h-[200px] font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use {{campo}} para criar campos dinâmicos
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campos Dinâmicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.key}>
                  <Label htmlFor={field.key}>
                    {field.label}
                    <Badge variant="outline" className="ml-2 text-xs">
                      {`{{${field.key}}}`}
                    </Badge>
                  </Label>
                  <Input
                    id={field.key}
                    type={field.type}
                    value={field.value}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    placeholder={`Digite ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={isSaving} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
          <Button variant="outline" onClick={handlePreview} className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            Visualizar
          </Button>
          <Button variant="secondary" onClick={handleSend} className="flex-1">
            <Send className="h-4 w-4 mr-2" />
            Enviar
          </Button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="space-y-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Pré-visualização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-6 bg-white min-h-[600px]">
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: getPreviewContent() }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}