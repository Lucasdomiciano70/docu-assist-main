import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Eye, Edit3, Star } from 'lucide-react'

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

interface TemplateCardProps {
  template: Template
  onPreview: (template: Template) => void
  onUse: (template: Template) => void
}

export const TemplateCard = ({ template, onPreview, onUse }: TemplateCardProps) => {
  return (
    <Card className="group hover:shadow-medium transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{template.title}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {template.category}
                </Badge>
                {template.isPremium && (
                  <Badge className="text-xs bg-gradient-secondary">
                    Premium
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="text-sm leading-relaxed">
          {template.description}
        </CardDescription>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{template.rating}</span>
          </div>
          <span>{template.usageCount} usos</span>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreview(template)}
            className="flex-1"
          >
            <Eye className="h-4 w-4 mr-2" />
            Visualizar
          </Button>
          <Button
            size="sm"
            onClick={() => onUse(template)}
            className="flex-1"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Usar Template
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}