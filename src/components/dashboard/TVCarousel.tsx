import { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { type Metric } from "@/data/dashboardData";

interface TVCarouselProps {
  metrics: Metric[];
  intervalMs?: number;
}

export const TVCarousel = ({ metrics, intervalMs = 20000 }: TVCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % metrics.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [metrics.length, intervalMs]);

  const currentMetric = metrics[currentIndex];
  if (!currentMetric) return null;

  // Get the last month with data
  const lastWithData = [...currentMetric.dados].reverse().find((d) => d.realizado !== null);
  const previsto = lastWithData?.previsto || 0;
  const realizado = lastWithData?.realizado || 0;
  const concluido = lastWithData?.concluido || 0;
  const mes = lastWithData?.mes || "—";

  // Determine if below target
  const isBelowTarget = realizado === 0 || realizado < previsto;

  // Calculate percentage for pie
  const percentage = Math.min(concluido, 100);
  const remaining = Math.max(0, 100 - percentage);

  const pieData = [
    { name: "Realizado", value: percentage },
    { name: "Restante", value: remaining },
  ];

  // Colors based on performance
  const mainColor = isBelowTarget ? "hsl(0, 85%, 55%)" : "hsl(264, 100%, 65%)";
  const bgColor = "hsl(240, 10%, 20%)";

  // Format value based on metric type
  const formatValue = (value: number, metricId: string) => {
    if (metricId.includes("receita")) {
      return `R$ ${(value / 1000000).toFixed(2)}M`;
    }
    if (metricId.includes("taxa") || metricId.includes("margem") || metricId.includes("base")) {
      return `${value.toFixed(1)}%`;
    }
    if (metricId.includes("ticket")) {
      return `R$ ${(value / 1000).toFixed(1)}K`;
    }
    if (metricId.includes("reputacao")) {
      return value.toFixed(1);
    }
    return value.toLocaleString("pt-BR");
  };

  const formatMeta = (value: number, metricId: string) => {
    if (metricId.includes("receita")) {
      return `R$ ${(value / 1000000).toFixed(2)}M`;
    }
    if (metricId.includes("taxa") || metricId.includes("margem") || metricId.includes("base")) {
      return `${value.toFixed(0)}%`;
    }
    if (metricId.includes("ticket")) {
      return `R$ ${(value / 1000).toFixed(0)}K`;
    }
    if (metricId.includes("reputacao")) {
      return value.toFixed(1);
    }
    return value.toLocaleString("pt-BR");
  };

  return (
    <div className="w-full h-screen bg-[hsl(240,15%,8%)] flex flex-col items-center justify-center p-8">
      {/* Progress dots */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3">
        {metrics.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              idx === currentIndex
                ? "bg-[hsl(264,100%,65%)] scale-125"
                : "bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Category badge */}
      <div className="absolute top-6 right-8 bg-[hsl(264,60%,40%)]/40 px-6 py-2 rounded-full">
        <span className="text-white/80 text-lg font-medium">{currentMetric.categoria}</span>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center gap-8 animate-in fade-in duration-700">
        {/* Metric name */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center max-w-4xl leading-tight">
          {currentMetric.nome}
        </h1>

        {/* Month badge */}
        <div className="bg-white/10 px-6 py-2 rounded-full">
          <span className="text-white/70 text-xl">{mes}</span>
        </div>

        {/* Giant Pie Chart */}
        <div className="relative">
          <PieChart width={500} height={500}>
            <defs>
              <linearGradient id="tvPieGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={isBelowTarget ? "hsl(0, 85%, 60%)" : "hsl(264, 100%, 70%)"} />
                <stop offset="100%" stopColor={isBelowTarget ? "hsl(0, 70%, 45%)" : "hsl(200, 80%, 60%)"} />
              </linearGradient>
            </defs>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={160}
              outerRadius={230}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              <Cell fill="url(#tvPieGradient)" />
              <Cell fill={bgColor} />
            </Pie>
          </PieChart>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-7xl font-bold ${isBelowTarget ? "text-red-400" : "text-white"}`}>
              {concluido.toFixed(0)}%
            </span>
            <span className="text-white/50 text-2xl mt-2">concluído</span>
          </div>
        </div>

        {/* Values */}
        <div className="flex gap-16 mt-4">
          <div className="text-center">
            <p className="text-white/50 text-xl mb-2">Meta</p>
            <p className="text-white text-4xl font-bold">
              {formatMeta(previsto, currentMetric.id)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-white/50 text-xl mb-2">Realizado</p>
            <p className={`text-4xl font-bold ${isBelowTarget ? "text-red-400" : "text-emerald-400"}`}>
              {formatValue(realizado, currentMetric.id)}
            </p>
          </div>
        </div>

        {/* Meta text */}
        <div className="bg-white/5 px-8 py-4 rounded-2xl mt-4">
          <span className="text-white/60 text-xl">Meta anual: </span>
          <span className="text-white text-xl font-semibold">{currentMetric.meta}</span>
        </div>
      </div>

      {/* Counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <span className="text-white/40 text-lg">
          {currentIndex + 1} / {metrics.length}
        </span>
      </div>
    </div>
  );
};
