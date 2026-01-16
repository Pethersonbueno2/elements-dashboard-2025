import { useState, useMemo, useCallback, useEffect } from "react";
import { 
  Tv,
  Maximize,
  Minimize
} from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { PeriodFilter, type PeriodType } from "@/components/dashboard/PeriodFilter";
import { IndicatorSelect } from "@/components/dashboard/IndicatorSelect";
import { IndicatorKPICard } from "@/components/dashboard/IndicatorKPICard";
import { ComparativeChart } from "@/components/dashboard/ComparativeChart";
import { AggregatedEvolutionChart } from "@/components/dashboard/AggregatedEvolutionChart";
import { MonthlyDetailTable } from "@/components/dashboard/MonthlyDetailTable";
import { TVCarousel } from "@/components/dashboard/TVCarousel";
import { Button } from "@/components/ui/button";
import { initialMetrics, type Metric } from "@/data/dashboardData";

// Mapeia os meses para facilitar filtro por período
const getMonthIndex = (period: PeriodType): number => {
  const currentMonth = new Date().getMonth(); // 0-11
  
  switch (period) {
    case "30":
      return Math.max(0, currentMonth - 1);
    case "60":
      return Math.max(0, currentMonth - 2);
    case "90":
      return Math.max(0, currentMonth - 3);
    default:
      return 0; // Todos
  }
};

// Formata valores monetários
const formatValue = (value: number): string => {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(2)} Bi`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(2)} Mi`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)} K`;
  return value.toFixed(0);
};

const Index = () => {
  const [metrics] = useState<Metric[]>(initialMetrics);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("Todos");
  const [selectedIndicator, setSelectedIndicator] = useState("all");
  const [isTVMode, setIsTVMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
  }, []);

  // Sync fullscreen state with browser
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Filter metrics by category
  const categoryFilteredMetrics = useMemo(() => {
    if (selectedCategory === "Todas") return metrics;
    return metrics.filter((m) => m.categoria === selectedCategory);
  }, [metrics, selectedCategory]);

  // Filter by specific indicator if selected
  const indicatorFilteredMetrics = useMemo(() => {
    if (selectedIndicator === "all") return categoryFilteredMetrics;
    return categoryFilteredMetrics.filter((m) => m.id === selectedIndicator);
  }, [categoryFilteredMetrics, selectedIndicator]);

  // Filter metrics data by period
  const filteredMetrics = useMemo(() => {
    const startIndex = getMonthIndex(selectedPeriod);
    
    if (selectedPeriod === "Todos") {
      return indicatorFilteredMetrics;
    }

    return indicatorFilteredMetrics.map((metric) => ({
      ...metric,
      dados: metric.dados.slice(startIndex),
    }));
  }, [indicatorFilteredMetrics, selectedPeriod]);

  // Calculate KPIs for top 4 indicators
  const topKPIs = useMemo(() => {
    // Pega os primeiros 4 indicadores filtrados para exibir como KPI cards
    const topMetrics = filteredMetrics.slice(0, 4);
    
    return topMetrics.map((metric) => {
      const lastValidData = [...metric.dados].reverse().find(d => d.realizado !== null);
      const totalRealizado = metric.dados.reduce((sum, d) => sum + (d.realizado ?? 0), 0);
      const totalPrevisto = metric.dados.reduce((sum, d) => sum + (d.previsto ?? 0), 0);
      
      // Calcula percentual de conclusão
      let percentage = 0;
      if (lastValidData && lastValidData.concluido !== null) {
        percentage = lastValidData.concluido;
      } else if (totalPrevisto > 0) {
        percentage = (totalRealizado / totalPrevisto) * 100;
      }

      // Valor principal - usa o último realizado ou percentual
      let displayValue = "";
      const meta = metric.meta.toLowerCase();
      
      if (meta.includes('%') || meta.includes('>') && !meta.includes('r$')) {
        displayValue = `${percentage.toFixed(1)}%`;
      } else if (totalRealizado > 0) {
        displayValue = formatValue(totalRealizado);
      } else {
        displayValue = `${percentage.toFixed(1)}%`;
      }

      return {
        id: metric.id,
        title: metric.nome.replace(/^[^-]+ – /, '').replace(/^[^-]+ - /, ''),
        value: displayValue,
        meta: metric.meta,
        percentage,
        previsto: formatValue(totalPrevisto),
        realizado: formatValue(totalRealizado),
      };
    });
  }, [filteredMetrics]);

  // TV Mode
  if (isTVMode) {
    return (
      <TVCarousel 
        metrics={filteredMetrics.slice(0, 12)} 
        slideIntervalMs={12000} 
        summaryIntervalMs={25000}
        categoria={selectedCategory !== "Todas" ? selectedCategory : undefined}
        onExitTVMode={() => setIsTVMode(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - hidden in fullscreen */}
      {!isFullscreen && (
        <Sidebar 
          onCategoryChange={setSelectedCategory} 
          selectedCategory={selectedCategory} 
        />
      )}

      {/* Main Content */}
      <main className={`flex-1 p-4 md:p-6 transition-all duration-300 ${isFullscreen ? 'ml-0' : 'ml-56'}`}>
        {/* Header */}
        <header className="mb-6">
          {/* Top bar with accent line */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-4 bg-orange-500 rounded-full"></div>
            <span className="text-xs text-orange-500 uppercase tracking-wider font-medium">
              INDICADORES DE PERFORMANCE
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            2025 — {selectedCategory === "Todas" ? "Painel Geral" : selectedCategory}
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            Comparativo Previsto vs Realizado por Mês
          </p>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <PeriodFilter 
              selected={selectedPeriod} 
              onChange={setSelectedPeriod} 
            />
            
            <div className="flex items-center gap-4">
              <IndicatorSelect
                metrics={categoryFilteredMetrics}
                selected={selectedIndicator}
                onChange={setSelectedIndicator}
              />
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="gap-2"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsTVMode(true)}
                  className="gap-2"
                >
                  <Tv className="w-4 h-4" />
                  <span className="hidden sm:inline">Modo TV</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* KPI Cards Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {topKPIs.map((kpi, index) => (
            <IndicatorKPICard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              meta={kpi.meta}
              percentage={kpi.percentage}
              previstoValue={kpi.previsto}
              realizadoValue={kpi.realizado}
            />
          ))}
        </section>

        {/* Charts Row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <ComparativeChart 
            metrics={filteredMetrics}
            title="Comparativo Mensal"
            subtitle={`${selectedCategory} - Previsto vs Realizado`}
          />
          <AggregatedEvolutionChart 
            metrics={filteredMetrics}
            title="Evolução Agregada"
            subtitle="Soma de todos os indicadores por mês"
          />
        </section>

        {/* Detail Table */}
        <section>
          <MonthlyDetailTable 
            metrics={filteredMetrics.slice(0, 5)}
            title="Detalhamento Mensal"
            subtitle="Valores de Previsto e Realizado por mês para cada indicador"
          />
        </section>
      </main>
    </div>
  );
};

export default Index;
