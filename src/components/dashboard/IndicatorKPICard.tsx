import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Percent } from "lucide-react";

interface IndicatorKPICardProps {
  title: string;
  value: string;
  meta: string;
  percentage: number;
  previstoLabel?: string;
  previstoValue?: string;
  realizadoLabel?: string;
  realizadoValue?: string;
  className?: string;
  inverso?: boolean; // true = menor é melhor
  onClick?: () => void;
  isSelected?: boolean;
}

export function IndicatorKPICard({
  title,
  value,
  meta,
  percentage,
  previstoLabel = "Previsto:",
  previstoValue,
  realizadoLabel = "Realizado:",
  realizadoValue,
  className,
  inverso = false,
  onClick,
  isSelected = false,
}: IndicatorKPICardProps) {
  // O percentual do Supabase já considera a lógica inversa internamente
  // percentual >= 100% significa meta atingida (bom) para AMBOS os tipos de métricas
  // Isso porque para métricas inversas, o Supabase calcula: (previsto/realizado)*100
  // Ex: Ruptura de Estoque - previsto 30%, realizado 23.80% = 126.05% (bom, abaixo do limite)
  const isPositive = percentage >= 100;

  return (
    <Card 
      className={cn(
        "bg-card border-border hover:border-primary/50 transition-all cursor-pointer",
        isSelected && "ring-2 ring-primary border-primary",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium truncate">
              {title}
            </p>
            <p className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              {value}
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              Meta: {meta}
            </p>
          </div>
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div className={cn(
              "p-2 rounded-full",
              isPositive ? "bg-green-500/10" : "bg-red-500/10"
            )}>
              <Percent className={cn(
                "h-6 w-6",
                isPositive ? "text-green-500" : "text-red-500"
              )} />
            </div>
            <span className={cn(
              "font-bold text-center leading-tight",
              isPositive ? "text-green-500" : "text-red-500"
            )} style={{ fontSize: '30px' }}>
              {percentage.toFixed(0)}%
            </span>
          </div>
        </div>

        {(previstoValue || realizadoValue) && (
          <div className="flex items-center gap-6 mt-2 pt-2 border-t border-border/50 text-lg">
            {previstoValue && (
              <p className="text-muted-foreground" style={{ fontSize: '30px' }}>
                {previstoLabel} <span className="font-bold text-foreground">{previstoValue}</span>
              </p>
            )}
            {realizadoValue && (
              <p className="text-muted-foreground" style={{ fontSize: '30px' }}>
                {realizadoLabel} <span className="font-bold text-foreground">{realizadoValue}</span>
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
