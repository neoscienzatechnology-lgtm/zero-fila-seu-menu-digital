import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  ChevronUp, 
  ChevronDown, 
  X, 
  Star, 
  Clock,
  AlertCircle 
} from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  available: boolean;
  isPromotion: boolean;
  isHappyHour: boolean;
  position: number;
}

export const QuickMenuEditor = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: "1", name: "X-Burger Clássico", price: 15.90, available: true, isPromotion: false, isHappyHour: false, position: 1 },
    { id: "2", name: "X-Bacon Especial", price: 18.90, available: true, isPromotion: true, isHappyHour: false, position: 2 },
    { id: "3", name: "Batata Frita", price: 8.90, available: false, isPromotion: false, isHappyHour: true, position: 3 },
    { id: "4", name: "Refrigerante Lata", price: 4.50, available: true, isPromotion: false, isHappyHour: true, position: 4 },
  ]);

  const toggleAvailability = (id: string) => {
    setMenuItems(items => 
      items.map(item => 
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  const togglePromotion = (id: string) => {
    setMenuItems(items => 
      items.map(item => 
        item.id === id ? { ...item, isPromotion: !item.isPromotion } : item
      )
    );
  };

  const toggleHappyHour = (id: string) => {
    setMenuItems(items => 
      items.map(item => 
        item.id === id ? { ...item, isHappyHour: !item.isHappyHour } : item
      )
    );
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    setMenuItems(items => {
      const sortedItems = [...items].sort((a, b) => a.position - b.position);
      const currentIndex = sortedItems.findIndex(item => item.id === id);
      
      if (
        (direction === 'up' && currentIndex === 0) ||
        (direction === 'down' && currentIndex === sortedItems.length - 1)
      ) {
        return items;
      }

      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      const temp = sortedItems[currentIndex].position;
      sortedItems[currentIndex].position = sortedItems[newIndex].position;
      sortedItems[newIndex].position = temp;

      return sortedItems;
    });
  };

  const sortedItems = [...menuItems].sort((a, b) => a.position - b.position);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Edição Rápida do Cardápio
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedItems.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              !item.available ? 'bg-muted/50 opacity-60' : 'bg-background'
            }`}
          >
            {/* Controles de Posição */}
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => moveItem(item.id, 'up')}
                disabled={index === 0}
                className="h-6 w-6 p-0"
              >
                <ChevronUp className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => moveItem(item.id, 'down')}
                disabled={index === sortedItems.length - 1}
                className="h-6 w-6 p-0"
              >
                <ChevronDown className="w-3 h-3" />
              </Button>
            </div>

            {/* Info do Item */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium">{item.name}</h4>
                <div className="flex gap-1">
                  {item.isPromotion && (
                    <Badge variant="secondary" className="text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      Promoção
                    </Badge>
                  )}
                  {item.isHappyHour && (
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      Happy Hour
                    </Badge>
                  )}
                  {!item.available && (
                    <Badge variant="destructive" className="text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Acabou
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                R$ {item.price.toFixed(2)}
              </p>
            </div>

            {/* Controles Rápidos */}
            <div className="flex items-center gap-2">
              {/* Toggle Disponibilidade */}
              <Button
                variant={item.available ? "destructive" : "default"}
                size="sm"
                onClick={() => toggleAvailability(item.id)}
              >
                {item.available ? (
                  <>
                    <X className="w-4 h-4 mr-1" />
                    Acabou
                  </>
                ) : (
                  "Disponível"
                )}
              </Button>

              {/* Toggle Promoção */}
              <div className="flex items-center gap-1">
                <Switch
                  checked={item.isPromotion}
                  onCheckedChange={() => togglePromotion(item.id)}
                  disabled={!item.available}
                />
                <span className="text-xs">Promoção</span>
              </div>

              {/* Toggle Happy Hour */}
              <div className="flex items-center gap-1">
                <Switch
                  checked={item.isHappyHour}
                  onCheckedChange={() => toggleHappyHour(item.id)}
                  disabled={!item.available}
                />
                <span className="text-xs">Happy</span>
              </div>
            </div>
          </div>
        ))}

        {/* Resumo */}
        <div className="pt-3 border-t text-sm text-muted-foreground">
          <p>
            {menuItems.filter(item => item.available).length} disponíveis • 
            {menuItems.filter(item => item.isPromotion && item.available).length} promoções • 
            {menuItems.filter(item => item.isHappyHour && item.available).length} happy hour
          </p>
        </div>
      </CardContent>
    </Card>
  );
};