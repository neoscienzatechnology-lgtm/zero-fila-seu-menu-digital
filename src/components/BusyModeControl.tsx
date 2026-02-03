import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Clock, Pause, Play, AlertTriangle } from "lucide-react";

export const BusyModeControl = () => {
  const [isBusyMode, setIsBusyMode] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(15);

  const handleTimeIncrease = () => {
    setEstimatedTime(prev => Math.min(prev + 5, 60));
  };

  const handleTimeDecrease = () => {
    setEstimatedTime(prev => Math.max(prev - 5, 5));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          Controle de Demanda
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Modo Lotado */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Modo Lotado</p>
            <p className="text-sm text-muted-foreground">
              Aumenta tempo estimado automaticamente
            </p>
          </div>
          <Switch
            checked={isBusyMode}
            onCheckedChange={setIsBusyMode}
          />
        </div>

        {/* Controle de Tempo */}
        <div className="space-y-2">
          <p className="font-medium">Tempo Estimado</p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleTimeDecrease}
              disabled={estimatedTime <= 5}
            >
              -5min
            </Button>
            <Badge variant="secondary" className="px-4 py-2">
              <Clock className="w-4 h-4 mr-1" />
              {estimatedTime} min
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleTimeIncrease}
              disabled={estimatedTime >= 60}
            >
              +5min
            </Button>
          </div>
        </div>

        {/* Pausar Pedidos */}
        <div className="space-y-2">
          <Button
            variant={isPaused ? "default" : "destructive"}
            className="w-full"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                Retomar Pedidos
              </>
            ) : (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pausar Pedidos
              </>
            )}
          </Button>
          {isPaused && (
            <p className="text-sm text-muted-foreground text-center">
              Novos pedidos estão pausados
            </p>
          )}
        </div>

        {/* Status */}
        <div className="pt-2 border-t">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              isPaused ? 'bg-red-500' : isBusyMode ? 'bg-orange-500' : 'bg-green-500'
            }`} />
            <span className="text-sm">
              {isPaused ? 'Pausado' : isBusyMode ? 'Modo Lotado' : 'Normal'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};