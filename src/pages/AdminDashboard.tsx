import { BusyModeControl } from "@/components/BusyModeControl";
import { QuickMenuEditor } from "@/components/QuickMenuEditor";
import { ContextualOffers } from "@/components/ContextualOffers";
import { CustomerAlerts } from "@/components/CustomerAlerts";
import { NotificationPermission } from "@/components/NotificationPermission";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Zap, 
  Percent, 
  Bell, 
  Smartphone,
  ArrowRight
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Painel do Comerciante</h1>
              <p className="text-muted-foreground">
                Gerencie seu foodtruck com inteligência e eficiência
              </p>
            </div>
            <Badge variant="secondary" className="px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
              Online
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Seção 1: Controle de Demanda */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Settings className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Controle de Demanda</h2>
                <p className="text-sm text-muted-foreground">
                  Gerencie o fluxo de pedidos quando estiver lotado
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <BusyModeControl />
            </div>
          </section>

          {/* Seção 2: Edição Rápida do Cardápio */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Edição Rápida do Cardápio</h2>
                <p className="text-sm text-muted-foreground">
                  Atualize disponibilidade, promoções e posições com um toque
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <QuickMenuEditor />
            </div>
          </section>

          {/* Seção 3: Ofertas Contextuais */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Percent className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Ofertas Contextuais</h2>
                <p className="text-sm text-muted-foreground">
                  Cupons automáticos para distribuir melhor o movimento
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <ContextualOffers />
            </div>
          </section>

          {/* Seção 4: Mensagens de Alerta */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Mensagens de Alerta</h2>
                <p className="text-sm text-muted-foreground">
                  Mantenha os clientes informados sobre seus pedidos
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <CustomerAlerts />
            </div>
          </section>

          {/* Seção 5: Experiência do Cliente */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Experiência do Cliente</h2>
                <p className="text-sm text-muted-foreground">
                  Como o cliente vê as notificações e permissões
                </p>
              </div>
            </div>
            
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Simulação - Tela do Cliente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      Quando o cliente acessa o menu pela primeira vez:
                    </p>
                    <div className="bg-background p-3 rounded border">
                      <NotificationPermission />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Pedido em Preparo</h4>
                      <p className="text-xs text-muted-foreground">
                        "Seu pedido #123 está sendo preparado! Tempo estimado: 15 minutos. 🍔"
                      </p>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Pedido Pronto</h4>
                      <p className="text-xs text-muted-foreground">
                        "🎉 Seu pedido #123 está pronto! Retire no balcão em até 10 minutos."
                      </p>
                    </div>
                    
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Oferta Contextual</h4>
                      <p className="text-xs text-muted-foreground">
                        "Quinta tranquila! 15% OFF em todos os lanches hoje. 🎯"
                      </p>
                    </div>
                    
                    <div className="p-3 bg-red-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Lembrete</h4>
                      <p className="text-xs text-muted-foreground">
                        "⚠️ Seu pedido #123 está pronto há 8 minutos. Retire no balcão!"
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Call to Action */}
          <section className="text-center py-12">
            <Card className="max-w-lg mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">
                  Pronto para revolucionar seu foodtruck?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Todas essas funcionalidades estão incluídas no Zero Fila. 
                  Comece hoje mesmo e veja a diferença!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-cta text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-transform">
                    Começar Agora
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                    Ver Demonstração
                  </button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;