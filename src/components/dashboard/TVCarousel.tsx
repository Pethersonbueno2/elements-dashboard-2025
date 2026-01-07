import { useState, useEffect, useMemo } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { type Metric } from "@/data/dashboardData";

interface TVCarouselProps {
  metrics: Metric[];
  slideIntervalMs?: number;
  summaryIntervalMs?: number;
}

// Helper to get metric data
const getMetricData = (metric: Metric) => {
  const lastWithData = [...metric.dados].reverse().find((d) => d.realizado !== null);
  const previsto = lastWithData?.previsto || 0;
  const realizado = lastWithData?.realizado || 0;
  const concluido = lastWithData?.concluido || 0;
  const mes = lastWithData?.mes || "—";
  const isBelowTarget = realizado === 0 || realizado < previsto;
  
  return { previsto, realizado, concluido, mes, isBelowTarget };
};

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

// Single metric slide component
const SingleSlide = ({ metric }: { metric: Metric }) => {
  const { previsto, realizado, concluido, mes, isBelowTarget } = getMetricData(metric);
  
  const percentage = Math.min(concluido, 100);
  const remaining = Math.max(0, 100 - percentage);
  const pieData = [
    { name: "Realizado", value: percentage },
    { name: "Restante", value: remaining },
  ];
  const bgColor = "hsl(240, 10%, 20%)";

  return (
    <div className="flex flex-col items-center justify-center gap-8 animate-fade-in">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center max-w-4xl leading-tight">
        {metric.nome}
      </h1>

      <div className="bg-white/10 px-6 py-2 rounded-full">
        <span className="text-white/70 text-xl">{mes}</span>
      </div>

      <div className="relative">
        <PieChart width={500} height={500}>
          <defs>
            <linearGradient id={`gradient-${metric.id}`} x1="0" y1="0" x2="1" y2="1">
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
            <Cell fill={`url(#gradient-${metric.id})`} />
            <Cell fill={bgColor} />
          </Pie>
        </PieChart>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-7xl font-bold ${isBelowTarget ? "text-red-400" : "text-white"}`}>
            {concluido.toFixed(0)}%
          </span>
          <span className="text-white/50 text-2xl mt-2">concluído</span>
        </div>
      </div>

      <div className="flex gap-16 mt-4">
        <div className="text-center">
          <p className="text-white/50 text-xl mb-2">Meta</p>
          <p className="text-white text-4xl font-bold">
            {formatMeta(previsto, metric.id)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-white/50 text-xl mb-2">Realizado</p>
          <p className={`text-4xl font-bold ${isBelowTarget ? "text-red-400" : "text-emerald-400"}`}>
            {formatValue(realizado, metric.id)}
          </p>
        </div>
      </div>

      <div className="bg-white/5 px-8 py-4 rounded-2xl mt-4">
        <span className="text-white/60 text-xl">Meta anual: </span>
        <span className="text-white text-xl font-semibold">{metric.meta}</span>
      </div>
    </div>
  );
};

// Summary slide with all metrics
const SummarySlide = ({ metrics }: { metrics: Metric[] }) => {
  const bgColor = "hsl(240, 10%, 20%)";
  
  // Calculate grid layout based on number of metrics
  const gridCols = metrics.length <= 4 ? 2 : metrics.length <= 6 ? 3 : 4;
  
  return (
    <div className="flex flex-col items-center justify-center gap-6 animate-fade-in w-full h-full px-8">
      <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
        Resumo Geral - B2B e B2BC
      </h1>
      
      <div 
        className="grid gap-6 w-full max-w-7xl"
        style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
      >
        {metrics.map((metric) => {
          const { previsto, realizado, concluido, isBelowTarget } = getMetricData(metric);
          const percentage = Math.min(concluido, 100);
          const remaining = Math.max(0, 100 - percentage);
          const pieData = [
            { name: "Realizado", value: percentage },
            { name: "Restante", value: remaining },
          ];

          return (
            <div 
              key={metric.id} 
              className="bg-white/5 rounded-2xl p-4 flex flex-col items-center"
            >
              <h3 className="text-white text-sm font-medium text-center mb-2 line-clamp-2 h-10">
                {metric.nome}
              </h3>
              
              <div className="relative">
                <PieChart width={140} height={140}>
                  <defs>
                    <linearGradient id={`summary-gradient-${metric.id}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={isBelowTarget ? "hsl(0, 85%, 60%)" : "hsl(264, 100%, 70%)"} />
                      <stop offset="100%" stopColor={isBelowTarget ? "hsl(0, 70%, 45%)" : "hsl(200, 80%, 60%)"} />
                    </linearGradient>
                  </defs>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill={`url(#summary-gradient-${metric.id})`} />
                    <Cell fill={bgColor} />
                  </Pie>
                </PieChart>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-xl font-bold ${isBelowTarget ? "text-red-400" : "text-white"}`}>
                    {concluido.toFixed(0)}%
                  </span>
                </div>
              </div>

              <div className="flex gap-4 mt-2 text-xs">
                <div className="text-center">
                  <p className="text-white/50">Meta</p>
                  <p className="text-white font-semibold">
                    {formatMeta(previsto, metric.id)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-white/50">Real</p>
                  <p className={`font-semibold ${isBelowTarget ? "text-red-400" : "text-emerald-400"}`}>
                    {formatValue(realizado, metric.id)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const TVCarousel = ({ 
  metrics, 
  slideIntervalMs = 20000,
  summaryIntervalMs = 60000 
}: TVCarouselProps) => {
  // Total slides = individual metrics + 1 summary slide
  const totalSlides = metrics.length + 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const isSummarySlide = currentIndex === metrics.length;

  useEffect(() => {
    const currentInterval = isSummarySlide ? summaryIntervalMs : slideIntervalMs;
    
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, currentInterval);

    return () => clearTimeout(timeout);
  }, [currentIndex, totalSlides, slideIntervalMs, summaryIntervalMs, isSummarySlide]);

  const currentMetric = !isSummarySlide ? metrics[currentIndex] : null;

  return (
    <div className="w-full h-screen bg-[hsl(240,15%,8%)] flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Progress dots */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3">
        {[...Array(totalSlides)].map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              idx === currentIndex
                ? idx === metrics.length 
                  ? "bg-emerald-400 scale-125" 
                  : "bg-[hsl(264,100%,65%)] scale-125"
                : "bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Category badge */}
      <div className="absolute top-6 right-8 bg-[hsl(264,60%,40%)]/40 px-6 py-2 rounded-full">
        <span className="text-white/80 text-lg font-medium">
          {isSummarySlide ? "Resumo Geral" : currentMetric?.categoria}
        </span>
      </div>

      {/* Main content */}
      {isSummarySlide ? (
        <SummarySlide metrics={metrics} />
      ) : (
        currentMetric && <SingleSlide metric={currentMetric} />
      )}

      {/* Counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <span className="text-white/40 text-lg">
          {isSummarySlide ? "Resumo" : `${currentIndex + 1} / ${metrics.length}`}
        </span>
      </div>
    </div>
  );
};
