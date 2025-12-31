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
        "rounded-lg border bg-card p-4 shadow-sm transition-all",
        isBelowTarget ? "border-destructive/50 bg-destructive/5" : "border-border/50"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left: Title and current values */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-foreground text-sm truncate">
              {metric.nome} {unit && `(${unit})`}
            </h3>
            {isBelowTarget && (
              <Flag className="h-4 w-4 text-destructive flex-shrink-0" fill="currentColor" />
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Previsto:</span>{" "}
              <span className="font-medium text-foreground">
                {formatValue(currentData?.previsto ?? null, isReais)}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Realizado:</span>{" "}
              <span className={cn(
                "font-medium",
                isBelowTarget ? "text-destructive" : "text-foreground"
              )}>
                {formatValue(currentData?.realizado ?? null, isReais)}
              </span>
            </div>
          </div>
          
          <div className="mt-1 text-xs text-muted-foreground">
            Meta: {metric.meta}
          </div>
        </div>

        {/* Right: Mini chart */}
        <div className="w-32 h-16 flex-shrink-0">
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
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(0, 0%, 78%)",
                  borderRadius: "6px",
                  fontSize: "11px",
                  padding: "4px 8px"
                }}
              />
              <Area
                type="monotone"
                dataKey="previsto"
                stroke="hsl(264, 100%, 50%)"
                strokeWidth={1.5}
                fill={`url(#gradient-${metric.id}-prev)`}
              />
              <Area
                type="monotone"
                dataKey="realizado"
                stroke={isBelowTarget ? "hsl(0, 72%, 51%)" : "hsl(200, 70%, 50%)"}
                strokeWidth={1.5}
                fill={`url(#gradient-${metric.id}-real)`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}