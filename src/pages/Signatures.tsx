import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SignatureCanvasComponent } from '@/components/signatures/SignatureCanvas'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, FileText, Users, Calendar } from 'lucide-react'
import { toast } from '@/components/ui/sonner'

interface Signer {
  id: string
  name: string
  email: string
  status: 'pending' | 'signed'
  signedAt?: string
  signature?: string
}

const Signatures = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [document, setDocument] = useState<any>(null)
  const [signers, setSigners] = useState<Signer[]>([])
  const [currentSigner, setCurrentSigner] = useState<Signer | null>(null)
  const [showSignatureCanvas, setShowSignatureCanvas] = useState(false)

  useEffect(() => {
    // Get document from navigation state or load from localStorage
    const docFromState = location.state?.document
    if (docFromState) {
      setDocument(docFromState)
      // Mock signers for demo
      setSigners([
        {
          id: '1',
          name: 'João Silva',
          email: 'joao@email.com',
          status: 'pending'
        },
        {
          id: '2',
          name: 'Maria Santos',
          email: 'maria@email.com',
          status: 'pending'
        }
      ])
    } else {
      // Redirect to dashboard if no document
      navigate('/dashboard')
    }
  }, [location.state, navigate])

  const handleStartSigning = (signer: Signer) => {
    setCurrentSigner(signer)
    setShowSignatureCanvas(true)
  }

  const handleSignatureSave = (signature: string) => {
    if (currentSigner) {
      const updatedSigners = signers.map(signer =>
        signer.id === currentSigner.id
          ? {
              ...signer,
              status: 'signed' as const,
              signedAt: new Date().toISOString(),
              signature
            }
          : signer
      )
      setSigners(updatedSigners)
      setShowSignatureCanvas(false)
      setCurrentSigner(null)
      toast.success('Assinatura realizada com sucesso!')

      // Check if all signers have signed
      const allSigned = updatedSigners.every(s => s.status === 'signed')
      if (allSigned) {
        toast.success('Documento totalmente assinado!')
        setTimeout(() => navigate('/dashboard'), 2000)
      }
    }
  }

  const handleSignatureCancel = () => {
    setShowSignatureCanvas(false)
    setCurrentSigner(null)
  }

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (showSignatureCanvas) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <SignatureCanvasComponent
          onSave={handleSignatureSave}
          onCancel={handleSignatureCancel}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white border-b border-border p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Assinaturas</h1>
              <p className="text-muted-foreground">Gerencie as assinaturas do documento</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Document Info */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {document.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 bg-white max-h-96 overflow-y-auto">
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: document.content }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Signers Panel */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Assinantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {signers.map((signer) => (
                    <div key={signer.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{signer.name}</h4>
                        <Badge 
                          variant={signer.status === 'signed' ? 'default' : 'outline'}
                          className={signer.status === 'signed' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {signer.status === 'signed' ? 'Assinado' : 'Pendente'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{signer.email}</p>
                      
                      {signer.status === 'signed' ? (
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Assinado em {new Date(signer.signedAt!).toLocaleString('pt-BR')}
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => handleStartSigning(signer)}
                          className="w-full"
                        >
                          Assinar Documento
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signatures