import { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Flag } from "lucide-react";
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
  const diferenca = lastWithData?.diferenca || 0;
  const mes = lastWithData?.mes || "—";
  const isBelowTarget = realizado === 0 || realizado < previsto;
  
  return { previsto, realizado, concluido, diferenca, mes, isBelowTarget };
};

// Format value based on metric type
const formatValue = (value: number, metricId: string) => {
  if (metricId.includes("receita")) {
    return `R$ ${(value / 1000000).toFixed(2)}M`;
  }
  if (metricId.includes("taxa") || metricId.includes("margem") || metricId.includes("base") || metricId.includes("satisfacao")) {
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

const formatDiferenca = (value: number, metricId: string) => {
  const prefix = value >= 0 ? "" : "";
  if (metricId.includes("receita")) {
    return `R$ ${value >= 0 ? "" : "-"}${Math.abs(value).toLocaleString("pt-BR")}`;
  }
  if (metricId.includes("taxa") || metricId.includes("margem") || metricId.includes("base") || metricId.includes("satisfacao")) {
    return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
  }
  if (metricId.includes("ticket")) {
    return `R$ ${value >= 0 ? "+" : ""}${value.toLocaleString("pt-BR")}`;
  }
  return `${value >= 0 ? "+" : ""}${value.toLocaleString("pt-BR")}`;
};

// Single metric slide component
const SingleSlide = ({ metric, timeLeft, currentIndex, totalSlides }: { 
  metric: Metric; 
  timeLeft: number;
  currentIndex: number;
  totalSlides: number;
}) => {
  const { previsto, realizado, concluido, diferenca, mes, isBelowTarget } = getMetricData(metric);
  
  const percentage = Math.min(concluido, 100);
  const remaining = Math.max(0, 100 - percentage);
  const pieData = [
    { name: "Realizado", value: percentage },
    { name: "Restante", value: remaining },
  ];
  
  const mainColor = isBelowTarget ? "#DC2626" : "#7C3AED";
  const bgColor = "#E5E7EB";

  return (
    <div className="flex flex-col items-center justify-center gap-4 animate-fade-in w-full h-full">
      {/* Title with flag */}
      <div className="flex items-center gap-3">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center">
          {metric.nome}
        </h1>
        <Flag className={`w-8 h-8 ${isBelowTarget ? "text-red-600" : "text-purple-600"} fill-current`} />
      </div>

      {/* Category and month */}
      <p className="text-gray-500 text-lg">
        {metric.categoria} • {mes}
      </p>

      {/* Giant Pie Chart */}
      <div className="relative my-4">
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={180}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={mainColor} />
            <Cell fill={bgColor} />
          </Pie>
        </PieChart>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl md:text-6xl font-bold ${isBelowTarget ? "text-red-600" : "text-purple-600"}`}>
            {concluido.toFixed(0)}%
          </span>
          <span className="text-gray-400 text-lg mt-1">concluído</span>
        </div>
      </div>

      {/* Values: META, REALIZADO, DIFERENÇA */}
      <div className="flex gap-12 md:gap-20 mt-2">
        <div className="text-center">
          <p className="text-gray-400 text-sm uppercase tracking-wide mb-1">Meta</p>
          <p className="text-gray-900 text-2xl md:text-3xl font-bold">
            {formatValue(previsto, metric.id)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm uppercase tracking-wide mb-1">Realizado</p>
          <p className={`text-2xl md:text-3xl font-bold ${isBelowTarget ? "text-red-600" : "text-purple-600"}`}>
            {formatValue(realizado, metric.id)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm uppercase tracking-wide mb-1">Diferença</p>
          <p className={`text-2xl md:text-3xl font-bold ${diferenca >= 0 ? "text-purple-600" : "text-red-600"}`}>
            {formatDiferenca(diferenca, metric.id)}
          </p>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex gap-2 mt-8">
        {[...Array(totalSlides)].map((_, idx) => (
          <div
            key={idx}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-blue-600 scale-125"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Timer and counter */}
      <p className="text-gray-400 text-sm mt-4">
        Próximo indicador em {timeLeft} segundos • {currentIndex + 1} de {totalSlides}
      </p>
    </div>
  );
};

// Summary slide with all metrics
const SummarySlide = ({ metrics, timeLeft, totalSlides }: { 
  metrics: Metric[]; 
  timeLeft: number;
  totalSlides: number;
}) => {
  const gridCols = metrics.length <= 4 ? 2 : metrics.length <= 6 ? 3 : 4;
  
  return (
    <div className="flex flex-col items-center justify-center gap-4 animate-fade-in w-full h-full px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
        Resumo Geral - B2B e B2BC
      </h1>
      <p className="text-gray-500 text-lg mb-4">Todos os indicadores</p>
      
      <div 
        className="grid gap-4 w-full max-w-6xl"
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
          const mainColor = isBelowTarget ? "#DC2626" : "#7C3AED";
          const bgColor = "#E5E7EB";

          return (
            <div 
              key={metric.id} 
              className="bg-gray-50 rounded-xl p-3 flex flex-col items-center border border-gray-100"
            >
              <h3 className="text-gray-700 text-xs font-medium text-center mb-1 line-clamp-2 h-8">
                {metric.nome}
              </h3>
              
              <div className="relative">
                <PieChart width={100} height={100}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={45}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill={mainColor} />
                    <Cell fill={bgColor} />
                  </Pie>
                </PieChart>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-sm font-bold ${isBelowTarget ? "text-red-600" : "text-purple-600"}`}>
                    {concluido.toFixed(0)}%
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-1 text-xs">
                <div className="text-center">
                  <p className="text-gray-400">Meta</p>
                  <p className="text-gray-700 font-semibold">
                    {formatValue(previsto, metric.id)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400">Real</p>
                  <p className={`font-semibold ${isBelowTarget ? "text-red-600" : "text-purple-600"}`}>
                    {formatValue(realizado, metric.id)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="flex gap-2 mt-6">
        {[...Array(totalSlides)].map((_, idx) => (
          <div
            key={idx}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              idx === totalSlides - 1
                ? "bg-green-500 scale-125"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <p className="text-gray-400 text-sm mt-2">
        Reiniciando em {timeLeft} segundos • Resumo
      </p>
    </div>
  );
};

export const TVCarousel = ({ 
  metrics, 
  slideIntervalMs = 20000,
  summaryIntervalMs = 60000 
}: TVCarouselProps) => {
  const totalSlides = metrics.length + 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(Math.floor(slideIntervalMs / 1000));
  
  const isSummarySlide = currentIndex === metrics.length;
  const currentInterval = isSummarySlide ? summaryIntervalMs : slideIntervalMs;

  // Countdown timer
  useEffect(() => {
    setTimeLeft(Math.floor(currentInterval / 1000));
    
    const countdown = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentIndex, currentInterval]);

  // Slide transition
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, currentInterval);

    return () => clearTimeout(timeout);
  }, [currentIndex, totalSlides, currentInterval]);

  const currentMetric = !isSummarySlide ? metrics[currentIndex] : null;

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center p-8 overflow-hidden">
      {isSummarySlide ? (
        <SummarySlide 
          metrics={metrics} 
          timeLeft={timeLeft}
          totalSlides={totalSlides}
        />
      ) : (
        currentMetric && (
          <SingleSlide 
            metric={currentMetric} 
            timeLeft={timeLeft}
            currentIndex={currentIndex}
            totalSlides={totalSlides}
          />
        )
      )}
    </div>
  );
};
