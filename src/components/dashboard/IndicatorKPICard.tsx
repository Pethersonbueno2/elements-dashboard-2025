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
}: IndicatorKPICardProps) {
  const isPositive = percentage >= 100;

  return (
    <Card className={cn("bg-card border-border hover:border-primary/50 transition-all", className)}>
      <CardContent className="p-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium mb-1 truncate">
              {title}
            </p>
            <p className="text-lg md:text-xl font-bold text-foreground leading-tight">
              {value}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Meta: {meta}
            </p>
          </div>
          <div className="flex flex-col items-center gap-0.5 shrink-0">
            <div className={cn(
              "p-1.5 rounded-full",
              isPositive ? "bg-green-500/10" : "bg-orange-500/10"
            )}>
              <Percent className={cn(
                "h-3.5 w-3.5",
                isPositive ? "text-green-500" : "text-orange-500"
              )} />
            </div>
            <span className={cn(
              "text-[8px] font-medium text-center leading-tight",
              isPositive ? "text-green-500" : "text-orange-500"
            )}>
              Porcentagem<br />atingida
            </span>
          </div>
        </div>

        {(previstoValue || realizadoValue) && (
          <div className="flex items-center gap-2 mt-1.5 pt-1.5 border-t border-border/50">
            {previstoValue && (
              <p className="text-[10px] text-muted-foreground">
                {previstoLabel} <span className="font-semibold text-foreground">{previstoValue}</span>
              </p>
            )}
            {realizadoValue && (
              <p className="text-[10px] text-muted-foreground">
                {realizadoLabel} <span className="font-semibold text-foreground">{realizadoValue}</span>
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
