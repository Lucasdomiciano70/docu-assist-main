import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { DocumentEditor } from '@/components/editor/DocumentEditor'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const Editor = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const templateId = searchParams.get('template')

  const handleSave = (document: any) => {
    console.log('Document saved:', document)
    navigate('/dashboard')
  }

  const handlePreview = (document: any) => {
    console.log('Preview document:', document)
    // Open preview modal or navigate to preview page
  }

  const handleSend = (document: any) => {
    console.log('Send document:', document)
    navigate('/signatures', { state: { document } })
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white border-b border-border p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Editor de Documentos</h1>
              <p className="text-muted-foreground">
                {templateId ? 'Editando template selecionado' : 'Criando novo documento'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <DocumentEditor
          templateId={templateId || undefined}
          onSave={handleSave}
          onPreview={handlePreview}
          onSend={handleSend}
        />
      </div>
    </div>
  )
}

export default Editor