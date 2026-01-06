import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Metric } from "@/data/dashboardData";

interface TVMetricCarouselProps {
  metrics: Metric[];
  selectedMonth: string;
  intervalMs?: number;
}

export function TVMetricCarousel({ 
  metrics, 
  selectedMonth, 
  intervalMs = 5000 
}: TVMetricCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (metrics.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % metrics.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [metrics.length, intervalMs]);

  if (metrics.length === 0) return null;

  const metric = metrics[currentIndex];
  const currentData = metric.dados.find((d) => d.mes === selectedMonth);
  const completionPercent = currentData?.concluido ?? 0;
  const isBelowTarget = completionPercent < 100;

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
    return val.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
  };

  const isReais = metric.meta.includes("R$");

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background p-8">
      {/* Progress dots */}
      <div className="flex gap-2 mb-6">
        {metrics.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              idx === currentIndex 
                ? (isBelowTarget ? "bg-destructive" : "bg-green-500") 
                : "bg-muted-foreground/30"
            )}
          />
        ))}
      </div>

      {/* Metric name */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            {metric.nome}
          </h1>
          {isBelowTarget && (
            <Flag className="h-10 w-10 text-destructive" fill="currentColor" />
          )}
        </div>
        <p className="text-xl text-muted-foreground mt-2">
          Meta: {metric.meta} • {selectedMonth}
        </p>
      </div>

      {/* Giant Pie Chart */}
      <div className="relative w-[50vh] h-[50vh] max-w-[500px] max-h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius="60%"
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
            "text-6xl md:text-8xl font-bold",
            isBelowTarget ? "text-destructive" : "text-green-500"
          )}>
            {completionPercent.toFixed(0)}%
          </span>
          <span className="text-xl text-muted-foreground">concluído</span>
        </div>
      </div>

      {/* Values */}
      <div className="flex gap-12 mt-8 text-center">
        <div>
          <p className="text-2xl text-muted-foreground">Previsto</p>
          <p className="text-4xl font-bold text-foreground">
            {formatValue(currentData?.previsto ?? null, isReais)}
          </p>
        </div>
        <div>
          <p className="text-2xl text-muted-foreground">Realizado</p>
          <p className={cn(
            "text-4xl font-bold",
            isBelowTarget ? "text-destructive" : "text-green-500"
          )}>
            {formatValue(currentData?.realizado ?? null, isReais)}
          </p>
        </div>
      </div>

      {/* Counter */}
      <div className="mt-8 text-muted-foreground text-lg">
        {currentIndex + 1} de {metrics.length}
      </div>
    </div>
  );
}
