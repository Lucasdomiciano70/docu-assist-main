import { Card } from "@/components/ui/card";
import { 
  FileText, 
  Shield, 
  Users, 
  Download, 
  Edit3, 
  Mail, 
  Clock, 
  Smartphone,
  CheckCircle
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "Templates Profissionais",
      description: "Biblioteca completa com contratos, NDAs, termos de parceria e muito mais. Todos validados juridicamente.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Edit3,
      title: "Editor Intuitivo",
      description: "Editor WYSIWYG com campos dinâmicos. Preencha automaticamente com dados das partes envolvidas.",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: Shield,
      title: "Assinatura Segura",
      description: "Assinatura eletrônica com validade legal. Log completo de auditoria com IP, horário e autenticação.",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Download,
      title: "PDF Profissional",
      description: "Geração automática de PDF com layout profissional, cabeçalho personalizado e página de assinaturas.",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: Users,
      title: "Múltiplas Partes",
      description: "Envie para quantas pessoas precisar. Fluxo orientado com notificações automáticas para cada etapa.",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Mail,
      title: "Notificações Automáticas",
      description: "E-mails automáticos para convites, confirmações e finalizações. Integração futura com WhatsApp.",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Clock,
      title: "Histórico Completo",
      description: "Acompanhe o status de todos os documentos. Filtros por status, data e tipo de documento.",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Interface responsiva otimizada para celular. Assine e gerencie documentos de qualquer lugar.",
      color: "text-pink-600",
      bgColor: "bg-pink-100"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Recursos Completos para
            <span className="block text-primary">Assinatura Digital</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tudo que você precisa para criar, enviar e gerenciar documentos profissionais 
            com assinatura eletrônica válida juridicamente.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 bg-gradient-card border-border hover:shadow-medium transition-all duration-300 group hover:scale-[1.02]"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.bgColor} rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Feature Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Processo Simplificado em 3 Passos
            </h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Escolha o Template</h4>
                  <p className="text-muted-foreground">Selecione um modelo pronto ou crie do zero com nosso editor.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Preencha e Envie</h4>
                  <p className="text-muted-foreground">Complete os campos e envie para as partes assinarem.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-accent to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Receba Assinado</h4>
                  <p className="text-muted-foreground">PDF profissional gerado automaticamente com log de auditoria.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <div className="w-full h-80 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <FileText className="h-20 w-20 text-primary/50" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-glow p-4 border border-border">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">Assinado com Sucesso</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-glow p-4 border border-border">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">3 Participantes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;