import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bell, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Send
} from "lucide-react";

interface AlertMessage {
  id: string;
  type: 'preparation' | 'ready' | 'delay' | 'reminder';
  title: string;
  message: string;
  isActive: boolean;
}

export const CustomerAlerts = () => {
  const [alerts, setAlerts] = useState<AlertMessage[]>([
    {
      id: "1",
      type: "preparation",
      title: "Pedido em Preparo",
      message: "Seu pedido #{orderNumber} está sendo preparado! Tempo estimado: {estimatedTime} minutos. Fique atento para não perder a retirada! 🍔",
      isActive: true
    },
    {
      id: "2", 
      type: "ready",
      title: "Pedido Pronto",
      message: "🎉 Seu pedido #{orderNumber} está pronto! Retire no balcão em até 10 minutos para garantir a qualidade. Obrigado pela preferência!",
      isActive: true
    },
    {
      id: "3",
      type: "delay",
      title: "Atraso no Pedido",
      message: "Ops! Seu pedido #{orderNumber} terá um pequeno atraso de {delayTime} minutos devido ao movimento. Pedimos desculpas e garantimos que vale a espera! ⏰",
      isActive: true
    },
    {
      id: "4",
      type: "reminder",
      title: "Lembrete de Retirada",
      message: "⚠️ Seu pedido #{orderNumber} está pronto há 8 minutos. Por favor, retire no balcão para manter a qualidade do seu lanche!",
      isActive: true
    }
  ]);

  const [customMessage, setCustomMessage] = useState("");

  const toggleAlert = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
      )
    );
  };

  const updateMessage = (id: string, newMessage: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, message: newMessage } : alert
      )
    );
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'preparation': return Clock;
      case 'ready': return CheckCircle;
      case 'delay': return AlertTriangle;
      case 'reminder': return Bell;
      default: return MessageSquare;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'preparation': return 'bg-blue-100 text-blue-700';
      case 'ready': return 'bg-green-100 text-green-700';
      case 'delay': return 'bg-orange-100 text-orange-700';
      case 'reminder': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const sendCustomAlert = () => {
    if (!customMessage.trim()) return;
    
    // Simular envio de mensagem personalizada
    console.log("Enviando mensagem personalizada:", customMessage);
    setCustomMessage("");
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Mensagens de Alerta para Clientes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mensagens Automáticas */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Mensagens Automáticas</h3>
          
          {alerts.map((alert) => {
            const IconComponent = getAlertIcon(alert.type);
            
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${
                  alert.isActive ? 'bg-background' : 'bg-muted/50 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getAlertColor(alert.type)}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{alert.title}</h4>
                      <Badge variant={alert.isActive ? "default" : "secondary"}>
                        {alert.isActive ? 'Ativo' : 'Pausado'}
                      </Badge>
                    </div>
                    <Textarea
                      value={alert.message}
                      onChange={(e) => updateMessage(alert.id, e.target.value)}
                      className="min-h-[80px] text-sm"
                      placeholder="Digite a mensagem..."
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Variáveis disponíveis: {"{orderNumber}"}, {"{estimatedTime}"}, {"{delayTime}"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleAlert(alert.id)}
                  >
                    {alert.isActive ? 'Pausar' : 'Ativar'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mensagem Personalizada */}
        <div className="space-y-3">
          <h3 className="font-medium text-lg">Enviar Mensagem Personalizada</h3>
          <div className="flex gap-2">
            <Textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Digite uma mensagem personalizada para todos os clientes com pedidos ativos..."
              className="flex-1"
            />
            <Button
              onClick={sendCustomAlert}
              disabled={!customMessage.trim()}
              className="self-end"
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar
            </Button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">98%</p>
              <p className="text-xs text-muted-foreground">Taxa de entrega</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">2.3min</p>
              <p className="text-xs text-muted-foreground">Tempo médio retirada</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">156</p>
              <p className="text-xs text-muted-foreground">Alertas hoje</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">3</p>
              <p className="text-xs text-muted-foreground">Pedidos atrasados</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};