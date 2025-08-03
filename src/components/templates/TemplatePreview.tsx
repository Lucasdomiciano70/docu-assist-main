import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FileText, Edit3, X } from 'lucide-react'

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

interface TemplatePreviewProps {
  template: Template | null
  isOpen: boolean
  onClose: () => void
  onUse: (template: Template) => void
}

export const TemplatePreview = ({ template, isOpen, onClose, onUse }: TemplatePreviewProps) => {
  if (!template) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">{template.title}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{template.category}</Badge>
                  {template.isPremium && (
                    <Badge className="bg-gradient-secondary">Premium</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          <DialogDescription className="text-left">
            {template.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ScrollArea className="h-[500px] border rounded-lg p-4">
              <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: template.preview }} />
              </div>
            </ScrollArea>
          </div>

          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Campos Dinâmicos</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{{nome}}</span>
                  <span>Nome completo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{{cpf}}</span>
                  <span>CPF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{{email}}</span>
                  <span>Email</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{{data}}</span>
                  <span>Data atual</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{{valor}}</span>
                  <span>Valor do contrato</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Informações</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Categoria:</span>
                  <span>{template.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avaliação:</span>
                  <span>{template.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Usos:</span>
                  <span>{template.usageCount}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => onUse(template)}
              className="w-full"
              size="lg"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Usar Este Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}