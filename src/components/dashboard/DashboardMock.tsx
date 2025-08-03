import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  FileSignature, 
  Clock, 
  CheckCircle, 
  Users, 
  Plus,
  Filter,
  Download,
  Eye
} from "lucide-react";

const DashboardMock = () => {
  // Mock data para demonstração
  const stats = [
    {
      label: "Documentos Criados",
      value: "24",
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      label: "Pendentes de Assinatura",
      value: "8",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      label: "Documentos Assinados",
      value: "16",
      icon: CheckCircle,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      label: "Participantes",
      value: "42",
      icon: Users,
      color: "text-accent",
      bgColor: "bg-accent/10"
    }
  ];

  const recentDocuments = [
    {
      id: 1,
      name: "Contrato de Prestação de Serviços - Cliente ABC",
      status: "Pendente",
      lastUpdate: "2 horas atrás",
      signers: ["João Silva", "Maria Santos"],
      type: "Contrato"
    },
    {
      id: 2,
      name: "NDA - Projeto Confidencial XYZ",
      status: "Assinado",
      lastUpdate: "1 dia atrás",
      signers: ["Pedro Costa"],
      type: "NDA"
    },
    {
      id: 3,
      name: "Termo de Parceria - Empresa DEF",
      status: "Aguardando",
      lastUpdate: "3 dias atrás",
      signers: ["Ana Oliveira", "Carlos Lima", "Lucia Ferreira"],
      type: "Parceria"
    },
    {
      id: 4,
      name: "Contrato de Locação - Imóvel Centro",
      status: "Assinado",
      lastUpdate: "1 semana atrás",
      signers: ["Roberto Mendes", "Sandra Rocha"],
      type: "Locação"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Assinado":
        return "bg-green-100 text-green-800 border-green-200";
      case "Aguardando":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white border-b border-border p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Gerencie seus documentos e assinaturas</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg">
                <Filter className="h-4 w-4" />
                Filtrar
              </Button>
              <Button variant="default" size="lg">
                <Plus className="h-4 w-4" />
                Novo Documento
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-gradient-card border-border hover:shadow-medium transition-all duration-300">
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
            </Card>
          ))}
        </div>

        {/* Recent Documents */}
        <Card className="bg-white border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Documentos Recentes</h2>
            <p className="text-muted-foreground">Últimas atividades nos seus documentos</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {recentDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:shadow-soft transition-all duration-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileSignature className="h-5 w-5 text-primary" />
                      <h3 className="font-medium text-foreground">{doc.name}</h3>
                      <Badge variant="outline" className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-2">
                      Tipo: {doc.type} • Atualizado {doc.lastUpdate}
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
                      Ver
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-card border-border hover:shadow-medium transition-all duration-300 cursor-pointer group">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Criar Documento</h3>
              <p className="text-sm text-muted-foreground">Use nossos templates prontos</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border hover:shadow-medium transition-all duration-300 cursor-pointer group">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mb-4 group-hover:bg-secondary/20 transition-colors">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Enviar para Assinatura</h3>
              <p className="text-sm text-muted-foreground">Convide participantes</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border hover:shadow-medium transition-all duration-300 cursor-pointer group">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 group-hover:bg-accent/20 transition-colors">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Ver Histórico</h3>
              <p className="text-sm text-muted-foreground">Documentos anteriores</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardMock;