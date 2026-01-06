import { Flag } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import type { Metric, MetricData } from "@/data/dashboardData";

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

  const chartData = metric.dados
    .filter((d) => d.previsto !== null || d.realizado !== null)
    .map((item) => ({
      name: item.mes.substring(0, 3),
      previsto: item.previsto,
      realizado: item.realizado,
    }));

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
        "rounded-sm border bg-card px-0.5 transition-all leading-none",
        isBelowTarget ? "border-destructive/40 bg-destructive/5" : "border-border/15"
      )}
      style={{ paddingTop: '1px', paddingBottom: '1px' }}
    >
      <div className="flex items-center justify-between">
        {/* Left: Title and current values */}
        <div className="flex-1 min-w-0 flex items-center gap-0.5">
          <div className="flex items-center gap-0.5 min-w-[90px] max-w-[90px]">
            <h3 className="font-medium text-foreground text-[6px] truncate leading-none">
              {metric.nome}
            </h3>
            {isBelowTarget && (
              <Flag className="h-1 w-1 text-destructive flex-shrink-0" fill="currentColor" />
            )}
          </div>
          
          <div className="flex items-center gap-1 text-[6px]">
            <span className="text-muted-foreground w-7 text-right">
              {formatValue(currentData?.previsto ?? null, isReais)}
            </span>
            <span className={cn(
              "font-semibold w-7 text-right",
              isBelowTarget ? "text-destructive" : "text-foreground"
            )}>
              {formatValue(currentData?.realizado ?? null, isReais)}
            </span>
          </div>
        </div>

        {/* Right: Mini chart */}
        <div className="w-8 h-2 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`gradient-${metric.id}-prev`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(264, 100%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(264, 100%, 50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id={`gradient-${metric.id}-real`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isBelowTarget ? "hsl(0, 72%, 51%)" : "hsl(200, 70%, 50%)"} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={isBelowTarget ? "hsl(0, 72%, 51%)" : "hsl(200, 70%, 50%)"} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Area
                type="monotone"
                dataKey="previsto"
                stroke="hsl(264, 100%, 50%)"
                strokeWidth={0.5}
                fill={`url(#gradient-${metric.id}-prev)`}
              />
              <Area
                type="monotone"
                dataKey="realizado"
                stroke={isBelowTarget ? "hsl(0, 72%, 51%)" : "hsl(200, 70%, 50%)"}
                strokeWidth={0.5}
                fill={`url(#gradient-${metric.id}-real)`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}