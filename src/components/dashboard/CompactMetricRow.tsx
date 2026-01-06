import { Flag } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import type { Metric } from "@/data/dashboardData";

interface CompactMetricRowProps {
  metric: Metric;
  selectedMonth: string;
}

// Extract unit from meta field
function getUnit(meta: string): string {
  if (meta.includes("%")) return "%";
  if (meta.includes("R$")) return "R$";
  if (meta.toLowerCase().includes("dias") || meta.toLowerCase().includes("dia")) return "dias";
  if (meta.toLowerCase().includes("h") || meta.toLowerCase().includes("hora")) return "h";
  return "";
}

export function CompactMetricRow({ metric, selectedMonth }: CompactMetricRowProps) {
  const unit = getUnit(metric.meta);
  const currentData = metric.dados.find((d) => d.mes === selectedMonth);
  
  const isBelowTarget = currentData?.concluido !== null && 
                        currentData?.concluido !== undefined && 
                        currentData.concluido < 100;

  // Pie chart data - shows completion percentage
  const completionPercent = currentData?.concluido ?? 0;
  const pieData = [
    { name: "Realizado", value: Math.min(completionPercent, 100) },
    { name: "Restante", value: Math.max(100 - completionPercent, 0) }
  ];

  const formatValue = (val: number | null, isReais: boolean = false) => {
    if (val === null) return "–";
    if (isReais) {
      if (val >= 1000000) return `R$ ${(val / 1000000).toFixed(2)}M`;
      if (val >= 1000) return `R$ ${(val / 1000).toFixed(0)}K`;
      return `R$ ${val.toFixed(0)}`;
    }
    return val.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
  };

  const isReais = unit === "R$";

  return (
    <div 
      className={cn(
        "rounded-sm border bg-card px-1 leading-none",
        isBelowTarget ? "border-destructive/40 bg-destructive/5" : "border-border/15"
      )}
      style={{ paddingTop: '2px', paddingBottom: '2px' }}
    >
      <div className="flex items-center justify-between">
        {/* Left: Title and current values */}
        <div className="flex-1 min-w-0 flex items-center gap-1">
          <div className="flex items-center gap-0.5 min-w-[110px] max-w-[110px]">
            <h3 className="font-semibold text-foreground text-[10px] truncate leading-none">
              {metric.nome}
            </h3>
            {isBelowTarget && (
              <Flag className="h-2 w-2 text-destructive flex-shrink-0" fill="currentColor" />
            )}
          </div>
          
          <div className="flex items-center gap-2 text-[9px]">
            <span className="text-muted-foreground w-10 text-right font-medium">
              {formatValue(currentData?.previsto ?? null, isReais)}
            </span>
            <span className={cn(
              "font-bold w-10 text-right",
              isBelowTarget ? "text-destructive" : "text-foreground"
            )}>
              {formatValue(currentData?.realizado ?? null, isReais)}
            </span>
          </div>
        </div>

        {/* Right: Pie chart */}
        <div className="w-8 h-8 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={0}
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
        </div>
      </div>
    </div>
  );
}