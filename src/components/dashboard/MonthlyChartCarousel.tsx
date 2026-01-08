import { useState, useEffect, useMemo } from "react";
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LabelList,
  Legend,
  ReferenceLine
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { type Metric } from "@/data/dashboardData";

interface MonthlyChartCarouselProps {
  metrics: Metric[];
  slideIntervalMs?: number;
  summaryIntervalMs?: number;
}

const COLORS = [
  "hsl(259, 100%, 60%)",
  "hsl(200, 85%, 55%)", 
  "hsl(142, 76%, 45%)",
  "hsl(38, 92%, 55%)",
  "hsl(338, 85%, 55%)",
  "hsl(280, 70%, 50%)",
  "hsl(190, 80%, 50%)",
  "hsl(320, 75%, 55%)",
];

const formatValue = (value: number): string => {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}Bi`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}Mi`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toFixed(0);
};

const formatPercentage = (value: number): string => {
  return `${value.toFixed(0)}%`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-foreground">
              {entry.dataKey === 'percentual' || entry.dataKey?.includes('pct')
                ? `${entry.value?.toFixed(1)}%` 
                : formatValue(entry.value || 0)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function MonthlyChartCarousel({ 
  metrics, 
  slideIntervalMs = 10000,
  summaryIntervalMs = 60000 
}: MonthlyChartCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const totalSlides = metrics.length; // Only individual metrics, no summary
  
  // Auto-advance slides
  useEffect(() => {
    if (totalSlides === 0) return;
    
    setProgress(0);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = 100 / (slideIntervalMs / 100);
        return Math.min(prev + increment, 100);
      });
    }, 100);

    const slideTimer = setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % totalSlides);
    }, slideIntervalMs);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimer);
    };
  }, [currentIndex, slideIntervalMs, totalSlides]);

  // Individual metric chart data with variation calculation
  const singleMetricData = useMemo(() => {
    if (!metrics[currentIndex]) return [];
    
    const metric = metrics[currentIndex];
    return metric.dados.map((d, i) => {
      const prevValue = i > 0 ? (metric.dados[i - 1].concluido ?? 0) : null;
      const currentValue = d.concluido ?? 0;
      const variation = prevValue !== null ? currentValue - prevValue : null;
      
      return {
        mes: d.mes.substring(0, 3),
        valor: d.realizado ?? 0,
        percentual: currentValue,
        variacao: variation,
      };
    });
  }, [currentIndex, metrics]);

  const currentMetric = metrics[currentIndex] ?? null;

  // Return early if no metrics
  if (!currentMetric || totalSlides === 0) {
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">
            Evolução Mensal
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Nenhum indicador disponível
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] flex items-center justify-center text-muted-foreground">
            Carregando dados...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground">
              {`Evolução Mensal - ${currentMetric.nome}`}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {`${currentMetric.categoria} · Slide ${currentIndex + 1} de ${totalSlides}`}
            </p>
          </div>
          
          {/* Slide indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex 
                    ? 'bg-primary w-4' 
                    : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Progress bar */}
        <Progress value={progress} className="h-1 mt-3" />
      </CardHeader>
      
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={singleMetricData} margin={{ top: 30, right: 30, left: 20, bottom: 40 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))" 
                opacity={0.3}
                vertical={false}
              />
              <XAxis 
                dataKey="mes" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={false}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => formatValue(value)}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
                domain={[0, 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                yAxisId="left"
                dataKey="valor" 
                name="Valor Realizado"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              >
                {singleMetricData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill="hsl(var(--primary))"
                    opacity={0.9}
                  />
                ))}
                <LabelList 
                  dataKey="valor" 
                  position="top" 
                  formatter={(value: number) => formatValue(value)}
                  style={{ 
                    fill: 'hsl(var(--foreground))', 
                    fontSize: '11px', 
                    fontWeight: 600 
                  }}
                />
                <LabelList 
                  dataKey="variacao" 
                  position="insideBottom"
                  content={({ x, y, width, height, value }: any) => {
                    if (value === null || value === undefined) return null;
                    const sign = value >= 0 ? '+' : '';
                    const color = value >= 0 ? 'hsl(142, 76%, 45%)' : 'hsl(0, 84%, 60%)';
                    return (
                      <text
                        x={x + (width / 2)}
                        y={y + height + 32}
                        textAnchor="middle"
                        fill={color}
                        fontSize={11}
                        fontWeight={700}
                      >
                        {`${sign}${value.toFixed(0)}%`}
                      </text>
                    );
                  }}
                />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        {/* Linha vermelha de referência abaixo do gráfico */}
        <div className="mx-5 -mt-6 mb-2">
          <div className="h-[3px] bg-[hsl(338,85%,55%)] rounded-full" />
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary" />
            <span className="text-sm text-muted-foreground">Valor Realizado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(142, 76%, 45%)' }} />
            <span className="text-sm text-muted-foreground">Crescimento</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(0, 84%, 60%)' }} />
            <span className="text-sm text-muted-foreground">Decrescimento</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
