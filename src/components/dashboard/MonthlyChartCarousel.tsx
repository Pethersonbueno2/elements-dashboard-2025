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
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { type Metric } from "@/data/dashboardData";

interface MonthlyChartCarouselProps {
  metrics: Metric[];
  slideIntervalMs?: number;
  summaryIntervalMs?: number;
  onSlideChange?: (index: number, metric: Metric | null) => void;
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

// Formata valor com decimais quando necessário
const formatValueWithDecimals = (value: number, unit: string): string => {
  const prefix = unit === 'R$' ? 'R$ ' : '';
  const suffix = unit === 'R$' ? '' : ` ${unit}`;
  
  if (value >= 1000000000) return `${prefix}${(value / 1000000000).toFixed(2)}Bi${suffix}`;
  if (value >= 1000000) return `${prefix}${(value / 1000000).toFixed(2)}Mi${suffix}`;
  if (value >= 1000) return `${prefix}${(value / 1000).toFixed(1)}K${suffix}`;
  
  // Para valores pequenos, mostra decimais
  if (value % 1 !== 0) {
    return `${prefix}${value.toFixed(2)}${suffix}`;
  }
  return `${prefix}${value.toFixed(0)}${suffix}`;
};

const formatValue = (value: number): string => {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(2)}Bi`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(2)}Mi`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  if (value % 1 !== 0) return value.toFixed(2);
  return value.toFixed(0);
};

const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

// Extrai a unidade de medida da meta
const getMetricUnit = (meta: string): string => {
  if (meta.includes('%')) return '%';
  if (meta.includes('R$')) return 'R$';
  if (meta.toLowerCase().includes('dia')) return 'dias';
  if (meta.toLowerCase().includes('h')) return 'h';
  return '';
};

// Verifica se a meta é "menor que" (onde menor é melhor)
const isLowerBetterMetric = (meta: string, nome: string): boolean => {
  const lowerMeta = meta.toLowerCase();
  const lowerNome = nome.toLowerCase();
  
  // Métricas com < na meta (ex: < 10%, <2h, <3)
  if (lowerMeta.includes('<')) return true;
  
  // Métricas conhecidas onde menor é melhor
  if (lowerNome.includes('turnover')) return true;
  if (lowerNome.includes('churn')) return true;
  if (lowerNome.includes('ruptura')) return true;
  if (lowerNome.includes('avaria')) return true;
  if (lowerNome.includes('ciclo de venda')) return true;
  if (lowerNome.includes('tempo de primeira resposta')) return true;
  if (lowerNome.includes('prazo')) return true;
  if (lowerNome.includes('lead time')) return true;
  if (lowerNome.includes('cpl') || lowerNome.includes('cpa')) return true;
  if (lowerNome.includes('custo por lead')) return true;
  if (lowerNome.includes('despesa')) return true;
  if (lowerNome.includes('endividamento')) return true;
  if (lowerNome.includes('alavancagem')) return true;
  if (lowerNome.includes('time to fill')) return true;
  
  return false;
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
  summaryIntervalMs = 60000,
  onSlideChange
}: MonthlyChartCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const totalSlides = metrics.length; // Only individual metrics, no summary
  
  // Notify parent of slide changes
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentIndex, metrics[currentIndex] ?? null);
    }
  }, [currentIndex, metrics, onSlideChange]);
  
  // Auto-advance slides
  useEffect(() => {
    if (totalSlides === 0 || isPaused) return;
    
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
  }, [currentIndex, slideIntervalMs, totalSlides, isPaused]);

  // Individual metric chart data with variation calculation
  const singleMetricData = useMemo(() => {
    if (!metrics[currentIndex]) return [];
    
    const metric = metrics[currentIndex];
    const lowerIsBetter = isLowerBetterMetric(metric.meta, metric.nome);
    
    return metric.dados.map((d, i) => {
      const realizado = d.realizado ?? 0;
      const previsto = d.previsto ?? 0;
      
      // Calcula a variação percentual
      let variacao: number | null = null;
      
      if (previsto > 0) {
        if (lowerIsBetter) {
          // Para métricas onde menor é melhor (Turnover, Churn, etc.)
          // Fórmula: 100 + ((previsto - realizado) / previsto * 100)
          // Exemplo: meta 10%, realizado 1% → 100 + 90 = 190%
          variacao = 100 + ((previsto - realizado) / previsto) * 100;
        } else {
          // Para métricas onde maior é melhor (Receita, Vendas, etc.)
          // Fórmula: (realizado / previsto) * 100
          // Exemplo: previsto 1, realizado 5 → 500% (atingiu 500% da meta)
          variacao = (realizado / previsto) * 100;
        }
      } else if (realizado > 0 && previsto === 0) {
        // Se não há meta mas há realizado, não mostra variação
        variacao = null;
      } else {
        variacao = null;
      }
      
      return {
        mes: d.mes.substring(0, 3),
        valor: realizado,
        percentual: d.concluido ?? 0,
        variacao: variacao,
        previsto: previsto,
      };
    });
  }, [currentIndex, metrics]);

  // Extrai meta do nome da métrica (ex: "60MI" de "Receita Líquida - 60MI")
  const extractMetaFromName = (meta: string): number | null => {
    // Procura padrões como "60MI", "60Mi", "R$7.370.000", ">90%", etc.
    const patterns = [
      /(\d+(?:[.,]\d+)?)\s*Mi/i,  // 60Mi, 60MI
      /(\d+(?:[.,]\d+)?)\s*Bi/i,  // 1Bi
      /R\$\s*(\d+(?:[.,]\d+)*)/i,  // R$7.370.000
      />?\s*(\d+(?:[.,]\d+)?)\s*%/,  // >90%, 25%
      /<?\s*(\d+(?:[.,]\d+)?)\s*%/,  // <2%
      /(\d+(?:[.,]\d+)?)\s*dias?/i,  // 10 dias
      /(\d+(?:[.,]\d+)?)\s*h/i,  // 2h
    ];
    
    for (const pattern of patterns) {
      const match = meta.match(pattern);
      if (match) {
        const value = parseFloat(match[1].replace(/\./g, '').replace(',', '.'));
        // Se é em milhões
        if (/Mi/i.test(meta)) return value * 1000000;
        if (/Bi/i.test(meta)) return value * 1000000000;
        return value;
      }
    }
    return null;
  };

  // Calcula totais para exibir Realizado vs Meta
  const totals = useMemo(() => {
    if (!metrics[currentIndex]) return { realizado: 0, previsto: 0, metaFromName: null };
    
    const metric = metrics[currentIndex];
    const totalRealizado = metric.dados.reduce((sum, d) => sum + (d.realizado ?? 0), 0);
    const totalPrevisto = metric.dados.reduce((sum, d) => sum + (d.previsto ?? 0), 0);
    const metaFromName = extractMetaFromName(metric.meta);
    
    return { realizado: totalRealizado, previsto: totalPrevisto, metaFromName };
  }, [currentIndex, metrics]);

  const currentMetric = metrics[currentIndex] ?? null;
  const metricUnit = currentMetric ? getMetricUnit(currentMetric.meta) : '';

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
              {`${currentMetric.nome} ${getMetricUnit(currentMetric.meta)}`}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {`${currentMetric.categoria} · Meta: ${currentMetric.meta}`}
            </p>
          </div>
          
          {/* Total Realizado vs Meta */}
          <div className="text-right mr-4">
            <p className="text-xs text-muted-foreground">Total Realizado / Meta</p>
            <p className="text-lg font-bold text-foreground">
              {formatValueWithDecimals(totals.realizado, metricUnit)} <span className="text-muted-foreground font-normal">/ {formatValueWithDecimals(totals.metaFromName ?? totals.previsto, metricUnit)}</span>
            </p>
          </div>
          
          {/* Pause button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPaused(!isPaused)}
            className="h-8 w-8 mr-2"
          >
            {isPaused ? (
              <Play className="h-4 w-4" />
            ) : (
              <Pause className="h-4 w-4" />
            )}
          </Button>
          
          {/* Slide indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(totalSlides, 10) }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex 
                    ? 'bg-primary w-4' 
                    : 'bg-muted-foreground/30'
                }`}
              />
            ))}
            {totalSlides > 10 && (
              <span className="text-xs text-muted-foreground">+{totalSlides - 10}</span>
            )}
          </div>
        </div>
        
        {/* Progress bar */}
        <Progress value={progress} className="h-1 mt-3" />
      </CardHeader>
      
      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={singleMetricData} margin={{ top: 25, right: 10, left: 10, bottom: 45 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))" 
                opacity={0.3}
                vertical={false}
              />
              <XAxis 
                dataKey="mes" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                axisLine={{ stroke: 'hsl(338, 85%, 55%)', strokeWidth: 3 }}
                tickLine={false}
                dy={5}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => formatValue(value)}
                width={40}
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
                  content={({ x, y, width, value }: any) => {
                    if (value === null || value === undefined) return null;
                    return (
                      <text
                        x={x + (width / 2)}
                        y={y - 8}
                        textAnchor="middle"
                        fill="hsl(var(--foreground))"
                        fontSize={11}
                        fontWeight={600}
                      >
                        {formatValueWithDecimals(value, metricUnit)}
                      </text>
                    );
                  }}
                />
                <LabelList 
                  dataKey="variacao" 
                  position="bottom"
                  content={({ x, width, value }: any) => {
                    if (value === null || value === undefined) return null;
                    // Verde se >= 100% (meta atingida), vermelho se < 100%
                    const isPositive = value >= 100;
                    const color = isPositive ? 'hsl(142, 76%, 45%)' : 'hsl(0, 84%, 60%)';
                    // Posição fixa abaixo do eixo X
                    const chartBottom = 275; // altura do gráfico - margem
                    return (
                      <text
                        x={x + (width / 2)}
                        y={chartBottom}
                        textAnchor="middle"
                        fill={color}
                        fontSize={10}
                        fontWeight={700}
                      >
                        {`${value.toFixed(0)}%`}
                      </text>
                    );
                  }}
                />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
