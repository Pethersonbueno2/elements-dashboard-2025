import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Metric } from "@/data/dashboardData";

interface TVMetricGridProps {
  metrics: Metric[];
  selectedMonth: string;
}

export function TVMetricGrid({ metrics, selectedMonth }: TVMetricGridProps) {
  if (metrics.length === 0) return null;

  const formatValue = (val: number | null, isReais: boolean = false) => {
    if (val === null) return "–";
    if (isReais) {
      if (val >= 1000000) return `R$ ${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `R$ ${(val / 1000).toFixed(0)}K`;
      return `R$ ${val.toFixed(0)}`;
    }
    return val.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
  };

  // Determine grid columns based on number of metrics
  const getGridCols = (count: number) => {
    if (count <= 2) return "grid-cols-2";
    if (count <= 4) return "grid-cols-2";
    if (count <= 6) return "grid-cols-3";
    if (count <= 9) return "grid-cols-3";
    if (count <= 12) return "grid-cols-4";
    return "grid-cols-4";
  };

  const getGridRows = (count: number) => {
    if (count <= 2) return "grid-rows-1";
    if (count <= 4) return "grid-rows-2";
    if (count <= 6) return "grid-rows-2";
    if (count <= 9) return "grid-rows-3";
    if (count <= 12) return "grid-rows-3";
    return "grid-rows-4";
  };

  return (
    <div className={cn(
      "h-full w-full grid gap-2 p-4",
      getGridCols(metrics.length),
      getGridRows(metrics.length)
    )}>
      {metrics.map((metric) => {
        const currentData = metric.dados.find((d) => d.mes === selectedMonth);
        const completionPercent = currentData?.concluido ?? 0;
        const isBelowTarget = completionPercent < 100;
        const isReais = metric.meta.includes("R$");

        const pieData = [
          { name: "Realizado", value: Math.min(completionPercent, 100) },
          { name: "Restante", value: Math.max(100 - completionPercent, 0) }
        ];

        return (
          <div 
            key={metric.id} 
            className="bg-card rounded-lg border border-border p-3 flex flex-col items-center justify-center"
          >
            {/* Metric name */}
            <div className="flex items-center gap-1 mb-1">
              <h2 className="text-xs md:text-sm font-semibold text-foreground text-center line-clamp-2">
                {metric.nome}
              </h2>
              {isBelowTarget && (
                <Flag className="h-3 w-3 text-destructive flex-shrink-0" fill="currentColor" />
              )}
            </div>

            {/* Pie Chart */}
            <div className="relative flex-1 w-full max-h-[120px] min-h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius="55%"
                    outerRadius="100%"
                    startAngle={90}
                    endAngle={-270}
                    strokeWidth={0}
                  >
                    <Cell fill={isBelowTarget ? "hsl(0, 72%, 51%)" : "hsl(142, 71%, 45%)"} />
                    <Cell fill="hsl(var(--muted))" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center percentage */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn(
                  "text-lg md:text-2xl font-bold",
                  isBelowTarget ? "text-destructive" : "text-green-500"
                )}>
                  {completionPercent.toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Values */}
            <div className="flex gap-4 mt-1 text-center text-xs">
              <div>
                <p className="text-muted-foreground">Prev</p>
                <p className="font-semibold text-foreground">
                  {formatValue(currentData?.previsto ?? null, isReais)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Real</p>
                <p className={cn(
                  "font-semibold",
                  isBelowTarget ? "text-destructive" : "text-green-500"
                )}>
                  {formatValue(currentData?.realizado ?? null, isReais)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
