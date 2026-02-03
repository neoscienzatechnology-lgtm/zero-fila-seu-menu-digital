import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, X, CheckCircle, Clock, Gift } from "lucide-react";

export const NotificationPermission = () => {
  const [showPermissionRequest, setShowPermissionRequest] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<'default' | 'granted' | 'denied'>('default');

  useEffect(() => {
    // Verificar status atual da permissão
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
      
      // Mostrar solicitação se ainda não foi decidido
      if (Notification.permission === 'default') {
        // Aguardar um pouco antes de mostrar para não ser intrusivo
        const timer = setTimeout(() => {
          setShowPermissionRequest(true);
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setPermissionStatus(permission);
        setShowPermissionRequest(false);
        
        if (permission === 'granted') {
          // Enviar notificação de teste
          new Notification('Zero Fila - Notificações Ativadas! 🎉', {
            body: 'Agora você receberá avisos sobre seus pedidos.',
            icon: '/favicon.ico',
            badge: '/favicon.ico'
          });
        }
      } catch (error) {
        console.error('Erro ao solicitar permissão:', error);
      }
    }
  };

  const dismissPermission = () => {
    setShowPermissionRequest(false);
    // Salvar no localStorage que o usuário dispensou
    localStorage.setItem('notificationDismissed', 'true');
  };

  if (!showPermissionRequest || permissionStatus !== 'default') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <Card className="shadow-lg border-primary/20 bg-background/95 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-2">
                Podemos enviar avisos do seu pedido?
              </h3>
              
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Usaremos notificações para informar quando seu lanche estiver em preparo, 
                pronto para retirada e para lembrar de ofertas da praça de foodtrucks.
              </p>
              
              {/* Benefícios */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="w-3 h-3 text-green-600" />
                  <span>Status do pedido em tempo real</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="w-3 h-3 text-blue-600" />
                  <span>Aviso quando estiver pronto</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Gift className="w-3 h-3 text-orange-600" />
                  <span>Ofertas exclusivas da praça</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={requestPermission}
                  size="sm"
                  className="flex-1 text-xs"
                >
                  Permitir notificações
                </Button>
                <Button
                  onClick={dismissPermission}
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                >
                  Agora não
                </Button>
              </div>
            </div>
            
            <Button
              onClick={dismissPermission}
              variant="ghost"
              size="sm"
              className="p-1 h-auto w-auto flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Hook para gerenciar notificações
export const useNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (permission === 'granted') {
      return new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      });
    }
    return null;
  };

  const sendOrderNotification = (type: 'preparing' | 'ready' | 'delay', orderNumber: string, extraInfo?: string) => {
    const notifications = {
      preparing: {
        title: `Pedido #${orderNumber} em preparo! 🍔`,
        body: `Seu pedido está sendo preparado. ${extraInfo || 'Aguarde alguns minutos!'}`
      },
      ready: {
        title: `Pedido #${orderNumber} pronto! 🎉`,
        body: `Seu pedido está pronto para retirada no balcão. ${extraInfo || 'Não demore!'}`
      },
      delay: {
        title: `Pedido #${orderNumber} - Pequeno atraso ⏰`,
        body: `Seu pedido terá um pequeno atraso. ${extraInfo || 'Pedimos desculpas!'}`
      }
    };

    const notification = notifications[type];
    return sendNotification(notification.title, {
      body: notification.body,
      requireInteraction: type === 'ready', // Notificação de "pronto" fica na tela
      tag: `order-${orderNumber}` // Evita duplicatas
    });
  };

  return {
    isSupported,
    permission,
    sendNotification,
    sendOrderNotification
  };
};