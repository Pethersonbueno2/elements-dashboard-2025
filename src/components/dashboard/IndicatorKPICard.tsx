import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
}: IndicatorKPICardProps) {
  const isPositive = percentage >= 100;
  const isNegative = percentage < 100;

  return (
    <Card className={cn("bg-card border-border hover:border-primary/50 transition-all", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">
              {title}
            </p>
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              {value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Meta: {meta}
            </p>
          </div>
          
          <div className="flex items-center">
            <span
              className={cn(
                "text-xs font-semibold px-2 py-1 rounded-full",
                isPositive && "text-success bg-success/10",
                isNegative && "text-orange-500 bg-orange-500/10"
              )}
            >
              ○ {percentage.toFixed(0)}%
            </span>
          </div>
        </div>

        {(previstoValue || realizadoValue) && (
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
            {previstoValue && (
              <p className="text-xs text-muted-foreground">
                {previstoLabel} <span className="font-semibold text-foreground">{previstoValue}</span>
              </p>
            )}
            {realizadoValue && (
              <p className="text-xs text-muted-foreground">
                {realizadoLabel} <span className="font-semibold text-foreground">{realizadoValue}</span>
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
