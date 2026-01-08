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
  Legend
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
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  if (value < 100) return value.toFixed(1);
  return value.toFixed(0);
};

const formatPercentage = (value: number): string => {
  if (value < 10) return `${value.toFixed(1)}%`;
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
  
  const totalSlides = metrics.length + 1; // +1 for summary slide
  const isSummarySlide = currentIndex === metrics.length;
  
  const currentInterval = isSummarySlide ? summaryIntervalMs : slideIntervalMs;

  // Auto-advance slides
  useEffect(() => {
    setProgress(0);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = 100 / (currentInterval / 100);
        return Math.min(prev + increment, 100);
      });
    }, 100);

    const slideTimer = setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % totalSlides);
    }, currentInterval);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimer);
    };
  }, [currentIndex, currentInterval, totalSlides]);

  // Individual metric chart data
  const singleMetricData = useMemo(() => {
    if (isSummarySlide || !metrics[currentIndex]) return [];
    
    const metric = metrics[currentIndex];
    return metric.dados.map(d => ({
      mes: d.mes.substring(0, 3),
      valor: d.realizado ?? 0,
      percentual: d.concluido ?? 0,
    }));
  }, [currentIndex, metrics, isSummarySlide]);

  // Summary chart data - grouped by category with average performance
  const summaryData = useMemo(() => {
    // Group metrics by category
    const categoryGroups: Record<string, Metric[]> = {};
    metrics.forEach(m => {
      if (!categoryGroups[m.categoria]) {
        categoryGroups[m.categoria] = [];
      }
      categoryGroups[m.categoria].push(m);
    });

    // Calculate average performance per category
    return Object.entries(categoryGroups).map(([categoria, categoryMetrics], index) => {
      // Calculate average % concluído across all months for this category
      let totalConcluido = 0;
      let count = 0;
      
      categoryMetrics.forEach(m => {
        m.dados.forEach(d => {
          if (d.concluido !== null && d.concluido !== undefined) {
            totalConcluido += d.concluido;
            count++;
          }
        });
      });
      
      const avgConcluido = count > 0 ? totalConcluido / count : 0;
      const indicadoresCount = categoryMetrics.length;
      
      return {
        categoria: categoria.length > 12 ? categoria.substring(0, 12) + '...' : categoria,
        categoriaFull: categoria,
        performance: avgConcluido,
        indicadores: indicadoresCount,
        colorIndex: index,
      };
    }).sort((a, b) => b.performance - a.performance);
  }, [metrics]);

  const currentMetric = !isSummarySlide ? metrics[currentIndex] : null;

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground">
              {isSummarySlide 
                ? "Evolução Mensal - Visão Consolidada" 
                : `Evolução Mensal - ${currentMetric?.nome}`
              }
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {isSummarySlide 
                ? `${metrics.length} indicadores comparados` 
                : `${currentMetric?.categoria} · Slide ${currentIndex + 1} de ${totalSlides}`
              }
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
            {isSummarySlide ? (
              // Summary view - horizontal bar chart by category
              <ComposedChart 
                data={summaryData} 
                layout="vertical"
                margin={{ top: 20, right: 80, left: 100, bottom: 10 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="hsl(var(--border))" 
                  opacity={0.3}
                  horizontal={false}
                />
                <XAxis 
                  type="number"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={false}
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 'auto']}
                />
                <YAxis 
                  type="category"
                  dataKey="categoria"
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 11, fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                  width={95}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                          <p className="text-sm font-semibold text-foreground mb-1">{data.categoriaFull}</p>
                          <p className="text-sm text-muted-foreground">
                            Performance média: <span className="font-bold text-primary">{data.performance.toFixed(1)}%</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {data.indicadores} indicador{data.indicadores > 1 ? 'es' : ''}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="performance" 
                  name="Performance Média"
                  radius={[0, 6, 6, 0]}
                  maxBarSize={35}
                >
                  {summaryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[entry.colorIndex % COLORS.length]}
                    />
                  ))}
                  <LabelList 
                    dataKey="performance" 
                    position="right"
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                    style={{ 
                      fill: 'hsl(var(--foreground))', 
                      fontSize: '12px', 
                      fontWeight: 600 
                    }}
                  />
                </Bar>
              </ComposedChart>
            ) : (
              // Individual metric view
              <ComposedChart data={singleMetricData} margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
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
                </Bar>
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Legend for individual slides */}
        {!isSummarySlide && (
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary" />
              <span className="text-sm text-muted-foreground">Valor Realizado</span>
            </div>
          </div>
        )}

        {/* Legend for summary slide */}
        {isSummarySlide && (
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            {summaryData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded" 
                  style={{ backgroundColor: COLORS[item.colorIndex % COLORS.length] }} 
                />
                <span className="text-xs text-muted-foreground">{item.categoriaFull}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
