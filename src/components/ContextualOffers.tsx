import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Percent, 
  Clock, 
  Calendar,
  TrendingDown,
  Gift,
  Users
} from "lucide-react";

interface ContextualOffer {
  id: string;
  title: string;
  description: string;
  discount: number;
  trigger: string;
  isActive: boolean;
  conditions: string[];
}

export const ContextualOffers = () => {
  const [offers, setOffers] = useState<ContextualOffer[]>([
    {
      id: "1",
      title: "Quinta Tranquila",
      description: "15% OFF em todas as quintas-feiras",
      discount: 15,
      trigger: "Quinta-feira",
      isActive: true,
      conditions: ["Quinta-feira", "Movimento baixo"]
    },
    {
      id: "2", 
      title: "Horário Vazio",
      description: "20% OFF entre 14h-16h",
      discount: 20,
      trigger: "Horário de baixo movimento",
      isActive: true,
      conditions: ["14h-16h", "Menos de 3 pedidos/hora"]
    },
    {
      id: "3",
      title: "Primeira Compra",
      description: "10% OFF para novos clientes",
      discount: 10,
      trigger: "Cliente novo",
      isActive: true,
      conditions: ["Primeiro pedido", "Cadastro novo"]
    },
    {
      id: "4",
      title: "Combo Família",
      description: "25% OFF em pedidos acima de R$ 50",
      discount: 25,
      trigger: "Pedido alto valor",
      isActive: false,
      conditions: ["Pedido > R$ 50", "Fim de semana"]
    }
  ]);

  const [currentTime] = useState(new Date());
  const [activeOffers, setActiveOffers] = useState<string[]>([]);

  useEffect(() => {
    // Simular verificação de condições contextuais
    const checkContextualConditions = () => {
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0 = domingo, 4 = quinta
      const hour = now.getHours();
      
      const newActiveOffers: string[] = [];

      offers.forEach(offer => {
        if (!offer.isActive) return;

        // Quinta-feira
        if (offer.id === "1" && dayOfWeek === 4) {
          newActiveOffers.push(offer.id);
        }

        // Horário vazio (14h-16h)
        if (offer.id === "2" && hour >= 14 && hour <= 16) {
          newActiveOffers.push(offer.id);
        }

        // Sempre ativo para novos clientes
        if (offer.id === "3") {
          newActiveOffers.push(offer.id);
        }

        // Fim de semana
        if (offer.id === "4" && (dayOfWeek === 0 || dayOfWeek === 6)) {
          newActiveOffers.push(offer.id);
        }
      });

      setActiveOffers(newActiveOffers);
    };

    checkContextualConditions();
    const interval = setInterval(checkContextualConditions, 60000); // Verifica a cada minuto

    return () => clearInterval(interval);
  }, [offers]);

  const toggleOffer = (id: string) => {
    setOffers(prev => 
      prev.map(offer => 
        offer.id === id ? { ...offer, isActive: !offer.isActive } : offer
      )
    );
  };

  const getOfferIcon = (trigger: string) => {
    if (trigger.includes("Quinta")) return Calendar;
    if (trigger.includes("Horário")) return Clock;
    if (trigger.includes("Cliente")) return Users;
    if (trigger.includes("valor")) return TrendingDown;
    return Gift;
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Percent className="w-5 h-5 text-primary" />
          Ofertas Contextuais
          <Badge variant="secondary" className="ml-auto">
            {activeOffers.length} ativas agora
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Atual */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-sm font-medium mb-2">Status Atual:</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">
              <Clock className="w-3 h-3 mr-1" />
              {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </Badge>
            <Badge variant="outline">
              <Calendar className="w-3 h-3 mr-1" />
              {currentTime.toLocaleDateString('pt-BR', { weekday: 'long' })}
            </Badge>
            <Badge variant="outline">
              <TrendingDown className="w-3 h-3 mr-1" />
              Movimento: Normal
            </Badge>
          </div>
        </div>

        {/* Lista de Ofertas */}
        <div className="space-y-3">
          {offers.map((offer) => {
            const IconComponent = getOfferIcon(offer.trigger);
            const isCurrentlyActive = activeOffers.includes(offer.id);
            
            return (
              <div
                key={offer.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  isCurrentlyActive ? 'bg-primary/5 border-primary/20' : 'bg-background'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isCurrentlyActive ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  <IconComponent className={`w-5 h-5 ${
                    isCurrentlyActive ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{offer.title}</h4>
                    <Badge variant={isCurrentlyActive ? "default" : "secondary"}>
                      {offer.discount}% OFF
                    </Badge>
                    {isCurrentlyActive && (
                      <Badge variant="outline" className="text-xs">
                        ATIVA AGORA
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {offer.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {offer.conditions.map((condition, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={offer.isActive}
                    onCheckedChange={() => toggleOffer(offer.id)}
                  />
                  <span className="text-xs text-muted-foreground">
                    {offer.isActive ? 'Ativo' : 'Pausado'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumo */}
        <div className="pt-3 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {offers.filter(o => o.isActive).length} ofertas configuradas
            </span>
            <Button variant="outline" size="sm">
              Criar Nova Oferta
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};