import { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RotateCcw, Check, X } from 'lucide-react'

interface SignatureCanvasProps {
  onSave: (signature: string) => void
  onCancel: () => void
}

export const SignatureCanvasComponent = ({ onSave, onCancel }: SignatureCanvasProps) => {
  const sigCanvas = useRef<SignatureCanvas>(null)
  const [isEmpty, setIsEmpty] = useState(true)

  const clear = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear()
      setIsEmpty(true)
    }
  }

  const save = () => {
    if (sigCanvas.current && !isEmpty) {
      const signature = sigCanvas.current.toDataURL()
      onSave(signature)
    }
  }

  const handleBegin = () => {
    setIsEmpty(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Assine o Documento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
          <SignatureCanvas
            ref={sigCanvas}
            canvasProps={{
              width: 500,
              height: 200,
              className: 'signature-canvas w-full h-full'
            }}
            onBegin={handleBegin}
          />
        </div>
        
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={clear}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Limpar
          </Button>
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={save} disabled={isEmpty}>
            <Check className="h-4 w-4 mr-2" />
            Confirmar Assinatura
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}