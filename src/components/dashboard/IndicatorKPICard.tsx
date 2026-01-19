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
  // Para métricas inversas (menor é melhor): 
  // - Se realizado < previsto, porcentagem será > 100, mas isso é BOM
  // - Mas a lógica de concluido já considera isso, então:
  // Para inverso: percentage >= 100 significa que atingiu OU superou (mesmo que realizado < previsto)
  // Na verdade, a cor deve ser baseada se a meta foi atingida:
  // - Normal: realizado >= previsto = verde
  // - Inverso: realizado <= previsto = verde (porque menor é melhor)
  // Como o percentage vem do Supabase (concluido), ele já está calculado corretamente
  // Então percentage >= 100 = verde para ambos os casos
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
