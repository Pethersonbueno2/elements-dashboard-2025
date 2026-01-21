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
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium mb-2 truncate">
              {title}
            </p>
            <p className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {value}
            </p>
            <p className="text-base text-muted-foreground mt-1 font-medium">
              Meta: {meta}
            </p>
          </div>
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div className={cn(
              "p-2.5 rounded-full",
              isPositive ? "bg-green-500/10" : "bg-red-500/10"
            )}>
              <Percent className={cn(
                "h-6 w-6",
                isPositive ? "text-green-500" : "text-red-500"
              )} />
            </div>
            <span className={cn(
              "text-xs font-medium text-center leading-tight",
              isPositive ? "text-green-500" : "text-red-500"
            )}>
              Porcentagem<br />atingida
            </span>
          </div>
        </div>

        {(previstoValue || realizadoValue) && (
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
            {previstoValue && (
              <p className="text-sm text-muted-foreground">
                {previstoLabel} <span className="font-bold text-foreground text-base">{previstoValue}</span>
              </p>
            )}
            {realizadoValue && (
              <p className="text-sm text-muted-foreground">
                {realizadoLabel} <span className="font-bold text-foreground text-base">{realizadoValue}</span>
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
