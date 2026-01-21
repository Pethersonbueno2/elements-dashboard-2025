import { useMemo, useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  ComposedChart,
  Legend,
  Dot,
} from "recharts";
import { type Metric } from "@/data/dashboardData";
import { Clock, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MonthlyDetailChartProps {
  metrics: Metric[];
  title?: string;
  subtitle?: string;
  showOnlyIndicators?: boolean;
  onVisibleIndicatorsChange?: (indicatorIds: string[]) => void;
}

const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

// Formata valores - preserva decimais para valores pequenos
const formatValue = (value: number | null): string => {
  if (value === null || value === undefined) return "-";
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}Bi`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}Mi`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  // Preserva decimais para valores pequenos
  if (value > 0 && value < 10) return value.toFixed(2);
  if (value % 1 !== 0) return value.toFixed(2);
  return value.toFixed(0);
};

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "Não informado";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateString;
  }
};

// Componente de label customizado para exibir valores
const CustomLabel = (props: any) => {
  const { x, y, width, value } = props;
  if (value === null || value === undefined || value === 0) return null;
  
  return (
    <text
      x={x + width / 2}
      y={y - 5}
      fill="hsl(var(--foreground))"
      textAnchor="middle"
      fontSize={10}
      fontWeight={500}
    >
      {formatValue(value)}
    </text>
  );
};

// Tooltip customizado
const CustomTooltip = ({ active, payload, label, inverso }: any) => {
  if (active && payload && payload.length) {
    const previsto = payload.find((p: any) => p.dataKey === 'previsto');
    const realizado = payload.find((p: any) => p.dataKey === 'realizado');
    const entry = payload[0]?.payload;

    // Lógica para determinar se meta foi atingida
    const metaAtingida = previsto && realizado && previsto.value != null && realizado.value != null
      ? inverso 
        ? realizado.value <= previsto.value // Para métricas inversas, menor é melhor
        : realizado.value >= previsto.value // Para métricas normais, maior é melhor
      : false;

    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
        {previsto && (
          <p className="text-xs text-primary">
            Previsto: <span className="font-medium">{formatValue(previsto.value)}</span>
          </p>
        )}
        {realizado && (
          <p className="text-xs text-success">
            Realizado: <span className="font-medium">{formatValue(realizado.value)}</span>
          </p>
        )}
        {entry?.totalMetas !== undefined && (
          <p className="text-xs text-muted-foreground mt-1">
            Metas atingidas: {entry.metasAtingidas}/{entry.totalMetas} ({entry.percentualAtingido?.toFixed(0)}%)
          </p>
        )}
        {previsto && realizado && previsto.value != null && realizado.value != null && (
          <p className={`text-xs mt-1 ${metaAtingida ? 'text-success' : 'text-red-500'}`}>
            {metaAtingida ? '✓ Meta atingida' : '⚠ Abaixo da meta'}
            {inverso && <span className="text-muted-foreground ml-1">(quanto menor, melhor)</span>}
          </p>
        )}
      </div>
    );
  }
  return null;
};

// Função para verificar se meta foi atingida considerando inversão
const isMetaAtingida = (previsto: number | null, realizado: number | null, inverso?: boolean): boolean => {
  if (previsto === null || realizado === null) return false;
  return inverso ? realizado <= previsto : realizado >= previsto;
};

export function MonthlyDetailChart({
  metrics,
  title = "Detalhamento Mensal",
  subtitle = "Valores de Previsto e Realizado por mês para cada indicador",
  showOnlyIndicators = false,
  onVisibleIndicatorsChange,
}: MonthlyDetailChartProps) {
  // Agregar dados por mês considerando o contexto inverso de cada métrica
  const chartData = useMemo(() => {
    const aggregated: Record<string, { 
      previsto: number; 
      realizado: number; 
      totalMetas: number; 
      metasAtingidas: number 
    }> = {};
    
    // Inicializa todos os meses
    monthNames.forEach((month, index) => {
      aggregated[months[index]] = { previsto: 0, realizado: 0, totalMetas: 0, metasAtingidas: 0 };
    });

    // Soma os valores e conta metas atingidas considerando o contexto inverso
    metrics.forEach((metric) => {
      const inverso = metric.inverso || false;
      
      metric.dados.forEach((d, index) => {
        const monthKey = months[index];
        if (aggregated[monthKey] && d.previsto !== null && d.realizado !== null) {
          aggregated[monthKey].previsto += d.previsto || 0;
          aggregated[monthKey].realizado += d.realizado || 0;
          aggregated[monthKey].totalMetas += 1;
          
          // Verifica se a meta foi atingida considerando o contexto
          const metaAtingida = inverso 
            ? d.realizado <= d.previsto  // Menor = Melhor
            : d.realizado >= d.previsto; // Maior = Melhor
          
          if (metaAtingida) {
            aggregated[monthKey].metasAtingidas += 1;
          }
        }
      });
    });

    return months.map((month) => {
      const data = aggregated[month];
      // Meta atingida se pelo menos 50% das métricas atingiram a meta
      const percentualAtingido = data.totalMetas > 0 
        ? (data.metasAtingidas / data.totalMetas) * 100 
        : 0;
      
      return {
        month,
        previsto: data.previsto,
        realizado: data.realizado,
        atingido: percentualAtingido >= 50,
        percentualAtingido,
        metasAtingidas: data.metasAtingidas,
        totalMetas: data.totalMetas,
      };
    });
  }, [metrics]);

  // Gráfico individual por indicador
  const indicatorCharts = useMemo(() => {
    return metrics.map((metric) => {
      const inverso = metric.inverso || false;
      
      const data = metric.dados.map((d, index) => ({
        month: months[index] || d.mes?.substring(0, 3).toUpperCase() || 'N/A',
        previsto: d.previsto,
        realizado: d.realizado,
        atingido: isMetaAtingida(d.previsto, d.realizado, inverso),
        atualizadoEm: d.atualizadoEm,
      }));

      return {
        id: metric.id,
        nome: metric.nome.replace(/^[^-]+ – /, '').replace(/^[^-]+ - /, ''),
        meta: metric.meta,
        data,
        inverso,
        ultimaAtualizacao: metric.ultimaAtualizacao,
      };
    });
  }, [metrics]);

  return (
    <div className="space-y-4">
      {/* Card 1: Gráfico agregado - Oculto quando showOnlyIndicators é true */}
      {!showOnlyIndicators && (
        <Card id="monthly-detail-aggregated" className="bg-card border-border monthly-detail-aggregated">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground">
              {title}
            </CardTitle>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <YAxis 
                    tickFormatter={formatValue}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    width={50}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="previsto" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Previsto">
                    <LabelList dataKey="previsto" content={<CustomLabel />} />
                  </Bar>
                  <Bar dataKey="realizado" radius={[4, 4, 0, 0]} name="Realizado">
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.atingido ? 'hsl(var(--success))' : 'hsl(0 84% 60%)'} 
                      />
                    ))}
                    <LabelList dataKey="realizado" content={<CustomLabel />} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legenda */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary" />
                <span className="text-muted-foreground">Previsto</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-success" />
                <span className="text-muted-foreground">Realizado (meta atingida)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(0 84% 60%)' }} />
                <span className="text-muted-foreground">Realizado (abaixo da meta)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Card 2: Grid de gráficos por indicador */}
      <IndicatorChartsSection 
        indicatorCharts={indicatorCharts}
        showOnlyIndicators={showOnlyIndicators}
        title={title}
        subtitle={subtitle}
        metrics={metrics}
        onVisibleIndicatorsChange={onVisibleIndicatorsChange}
      />
    </div>
  );
}

// Componente separado para renderizar um único gráfico de indicador
function IndicatorChartItem({ chart, formatValue }: { chart: any; formatValue: (value: number | null) => string }) {
  return (
    <div className="bg-muted/30 rounded-lg p-5">
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center justify-between">
          <h4 className="text-3xl font-semibold text-foreground truncate max-w-[65%]">
            {chart.nome}
          </h4>
          <span className="text-2xl text-muted-foreground bg-muted px-4 py-2 rounded-lg font-medium">
            Meta: {chart.meta}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xl text-muted-foreground">
          <Clock className="w-6 h-6" />
          <span>Atualizado: {formatDate(chart.ultimaAtualizacao)}</span>
          {chart.inverso && (
            <span className="ml-2 bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded text-xl">
              ↓ Menor = Melhor
            </span>
          )}
        </div>
      </div>
      <div className="h-[50vh] min-h-[350px] w-full overflow-visible">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chart.data} margin={{ top: 60, right: 30, left: 20, bottom: 15 }}>
            <defs>
              <linearGradient id={`gradient-${chart.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
            <XAxis 
              dataKey="month" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 30, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              height={50}
              interval={0}
              padding={{ left: 15, right: 15 }}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 26, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={formatValue}
            />
            <Tooltip content={<CustomTooltip inverso={chart.inverso} />} cursor={{ fill: 'transparent' }} />
            
            {/* Área de Previsto */}
            <Area
              type="monotone"
              dataKey="previsto"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              strokeDasharray="5 5"
              fill={`url(#gradient-${chart.id})`}
              dot={(props: any) => {
                const { cx, cy, payload } = props;
                if (payload.previsto === null || payload.previsto === undefined) return null;
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={10}
                    fill="hsl(var(--primary))"
                    stroke="hsl(var(--card))"
                    strokeWidth={3}
                  />
                );
              }}
              label={(props: any) => {
                const { x, y, value } = props;
                if (value === null || value === undefined) return null;
                return (
                  <text
                    x={x}
                    y={y + 50}
                    fill="white"
                    fontSize={30}
                    fontWeight={700}
                    textAnchor="middle"
                  >
                    {formatValue(value)}
                  </text>
                );
              }}
            />
            
            {/* Linha de Realizado com dots coloridos */}
            <Line
              type="monotone"
              dataKey="realizado"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={3}
              dot={(props: any) => {
                const { cx, cy, payload } = props;
                if (payload.realizado === null || payload.realizado === undefined) return null;
                const color = payload.atingido ? 'hsl(var(--success))' : 'hsl(0 84% 60%)';
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={12}
                    fill={color}
                    stroke="hsl(var(--card))"
                    strokeWidth={4}
                  />
                );
              }}
              label={(props: any) => {
                const { x, y, value, index } = props;
                if (value === null || value === undefined) return null;
                const entry = chart.data[index];
                const color = entry?.atingido ? 'hsl(var(--success))' : 'hsl(0 84% 60%)';
                return (
                  <text
                    x={x}
                    y={y - 35}
                    fill={color}
                    fontSize={30}
                    fontWeight={700}
                    textAnchor="middle"
                  >
                    {formatValue(value)}
                  </text>
                );
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Componente de Carrossel para Financeiro e Controladoria
function FinanceiroCarousel({ 
  charts, 
  formatValue,
  onVisibleIndicatorsChange 
}: { 
  charts: any[]; 
  formatValue: (value: number | null) => string;
  onVisibleIndicatorsChange?: (indicatorIds: string[]) => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // Cada slide contém 1 gráfico
  const slides = useMemo(() => {
    return charts.map(chart => [chart]);
  }, [charts]);

  const totalSlides = slides.length;

  // Notifica o pai sobre quais indicadores estão visíveis
  useEffect(() => {
    if (onVisibleIndicatorsChange && slides[currentSlide]) {
      const visibleIds = slides[currentSlide].map((chart: any) => chart.id);
      onVisibleIndicatorsChange(visibleIds);
    }
  }, [currentSlide, slides, onVisibleIndicatorsChange]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setCountdown(10);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setCountdown(10);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setCountdown(10);
  }, []);

  // Auto-avançar a cada 10 segundos
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          nextSlide();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <div className="space-y-4 relative z-0">
      {/* Controles do carrossel */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {currentSlide + 1} / {totalSlides}
          </span>
          {!isPaused && (
            <span className="text-xs text-primary font-medium">
              {countdown}s
            </span>
          )}
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-1000 ease-linear"
          style={{ width: `${((10 - countdown) / 10) * 100}%` }}
        />
      </div>

      {/* Slides - 1 gráfico por vez */}
      <div className="relative overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slideCharts, slideIndex) => (
            <div 
              key={slideIndex} 
              className="w-full flex-shrink-0 px-1"
              style={{ minWidth: '100%' }}
            >
              {slideCharts.map((chart) => (
                <IndicatorChartItem 
                  key={chart.id} 
                  chart={chart} 
                  formatValue={formatValue} 
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores de slide (dots) */}
      <div className="flex items-center justify-center gap-2 relative z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-primary w-4' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Componente principal que decide entre grid ou carrossel
function IndicatorChartsSection({ 
  indicatorCharts, 
  showOnlyIndicators, 
  title, 
  subtitle,
  metrics,
  onVisibleIndicatorsChange
}: { 
  indicatorCharts: any[]; 
  showOnlyIndicators: boolean; 
  title: string; 
  subtitle: string;
  metrics: Metric[];
  onVisibleIndicatorsChange?: (indicatorIds: string[]) => void;
}) {
  // Usa carrossel para qualquer setor com mais de 1 gráfico
  const useCarousel = indicatorCharts.length > 1;

  // Quando não usar carrossel, notifica todos os indicadores como visíveis
  useEffect(() => {
    if (!useCarousel && onVisibleIndicatorsChange) {
      onVisibleIndicatorsChange(indicatorCharts.map(c => c.id));
    }
  }, [useCarousel, indicatorCharts, onVisibleIndicatorsChange]);

  return (
    <Card id="monthly-detail-indicators" className="bg-card border-border monthly-detail-indicators">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-foreground">
              {showOnlyIndicators ? title : "Indicadores por Setor"}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {showOnlyIndicators ? subtitle : "Evolução mensal de cada indicador"}
            </p>
          </div>
          {useCarousel && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              Modo Carrossel
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {useCarousel ? (
          <FinanceiroCarousel 
            charts={indicatorCharts} 
            formatValue={formatValue} 
            onVisibleIndicatorsChange={onVisibleIndicatorsChange}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {indicatorCharts.map((chart) => (
              <IndicatorChartItem key={chart.id} chart={chart} formatValue={formatValue} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
