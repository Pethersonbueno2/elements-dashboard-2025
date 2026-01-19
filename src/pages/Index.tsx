import { useState, useMemo, useCallback, useEffect } from "react";
import { 
  Tv,
  Maximize,
  Minimize
} from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { PeriodFilter, type PeriodType } from "@/components/dashboard/PeriodFilter";
import { MonthFilter, type MonthType } from "@/components/dashboard/MonthFilter";
import { IndicatorSelect } from "@/components/dashboard/IndicatorSelect";
import { IndicatorKPICard } from "@/components/dashboard/IndicatorKPICard";
import { AggregatedEvolutionChart } from "@/components/dashboard/AggregatedEvolutionChart";
import { MonthlyDetailChart } from "@/components/dashboard/MonthlyDetailChart";
import { TVCarousel } from "@/components/dashboard/TVCarousel";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useSupabaseMetrics } from "@/hooks/useSupabaseMetrics";
import { initialMetrics, type Metric } from "@/data/dashboardData";

// Retorna os índices dos meses a serem exibidos baseado no período
const getMonthsForPeriod = (period: PeriodType): number[] => {
  const currentMonth = new Date().getMonth(); // 0-11 (Janeiro = 0)
  
  switch (period) {
    case "30":
      // Último mês (mês atual)
      return [currentMonth];
    case "60":
      // Últimos 2 meses
      return [Math.max(0, currentMonth - 1), currentMonth];
    case "90":
      // Últimos 3 meses
      return [Math.max(0, currentMonth - 2), Math.max(0, currentMonth - 1), currentMonth];
    default:
      // Todos - retorna array com todos os 12 meses
      return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  }
};

// Mapeia nome do mês para índice
const monthNameToIndex: Record<string, number> = {
  "Janeiro": 0, "Fevereiro": 1, "Março": 2, "Abril": 3,
  "Maio": 4, "Junho": 5, "Julho": 6, "Agosto": 7,
  "Setembro": 8, "Outubro": 9, "Novembro": 10, "Dezembro": 11
};

// Formata valores - preserva decimais para valores pequenos
const formatValue = (value: number | null | undefined, preserveDecimals = false): string => {
  if (value === null || value === undefined || isNaN(value)) return "0";
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(2)} Bi`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(2)} Mi`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)} K`;
  // Para valores pequenos (menores que 10), preserva até 2 casas decimais se necessário
  if (preserveDecimals || (value > 0 && value < 10)) {
    if (value % 1 !== 0) return value.toFixed(2);
  }
  if (value % 1 !== 0) return value.toFixed(2);
  return value.toFixed(0);
};

const Index = () => {
  // Busca dados do Supabase
  const { data: supabaseMetrics, isLoading, error } = useSupabaseMetrics();
  
  // Usa dados do Supabase se disponíveis, senão usa dados locais
  const metrics = useMemo(() => {
    if (supabaseMetrics && supabaseMetrics.length > 0) {
      return supabaseMetrics;
    }
    return initialMetrics;
  }, [supabaseMetrics]);

  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("Todos");
  const [selectedMonth, setSelectedMonth] = useState<MonthType>("all");
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
    let filtered = metrics;
    
    if (selectedCategory === "Todas") return filtered;
    return filtered.filter((m) => m.categoria === selectedCategory);
  }, [metrics, selectedCategory]);

  // Filter by specific indicator if selected
  const indicatorFilteredMetrics = useMemo(() => {
    if (selectedIndicator === "all") return categoryFilteredMetrics;
    return categoryFilteredMetrics.filter((m) => m.id === selectedIndicator);
  }, [categoryFilteredMetrics, selectedIndicator]);

  // Filter metrics data by period and/or specific month
  const filteredMetrics = useMemo(() => {
    let result = indicatorFilteredMetrics;

    // Apply specific month filter first
    if (selectedMonth !== "all") {
      const monthIndex = monthNameToIndex[selectedMonth];
      result = result.map((metric) => ({
        ...metric,
        dados: metric.dados.filter((_, index) => index === monthIndex),
      }));
    } else if (selectedPeriod !== "Todos") {
      // Apply period filter - filtra pelos meses do período selecionado
      const monthsToShow = getMonthsForPeriod(selectedPeriod);
      result = result.map((metric) => ({
        ...metric,
        dados: metric.dados.filter((_, index) => monthsToShow.includes(index)),
      }));
    }

    return result;
  }, [indicatorFilteredMetrics, selectedPeriod, selectedMonth]);

  // Calculate KPIs for top 4 indicators
  const topKPIs = useMemo(() => {
    // Pega os primeiros 4 indicadores filtrados para exibir como KPI cards
    const topMetrics = filteredMetrics.slice(0, 4);
    
    return topMetrics.map((metric) => {
      const lastValidData = [...metric.dados].reverse().find(d => d.realizado !== null);
      
      // Calcula média apenas dos meses preenchidos
      const filledMonths = metric.dados.filter(d => d.realizado !== null || d.previsto !== null);
      const totalRealizado = filledMonths.reduce((sum, d) => sum + (d.realizado ?? 0), 0);
      const totalPrevisto = filledMonths.reduce((sum, d) => sum + (d.previsto ?? 0), 0);
      
      // Para calcular média do setor, soma % de atingimento e divide pelo número de indicadores
      const avgRealizado = filledMonths.length > 0 ? totalRealizado / filledMonths.length : 0;
      const avgPrevisto = filledMonths.length > 0 ? totalPrevisto / filledMonths.length : 0;
      
      // Calcula percentual de conclusão
      let percentage = 0;
      const concluido = lastValidData?.concluido;
      if (concluido !== null && concluido !== undefined && Number.isFinite(concluido)) {
        percentage = concluido;
      } else if (totalPrevisto > 0) {
        percentage = (totalRealizado / totalPrevisto) * 100;
      }

      // Valor principal - usa o último realizado ou percentual
      let displayValue = "";
      const meta = metric.meta.toLowerCase();
      const nome = metric.nome.toLowerCase();

      const safePercentage = Number.isFinite(percentage) ? percentage : 0;

      // Para métricas de taxa de conversão, mostra o valor realizado com decimais
      if (nome.includes('taxa de conversão') || nome.includes('taxa de conversao')) {
        const lastRealized = lastValidData?.realizado;
        if (lastRealized !== null && lastRealized !== undefined) {
          displayValue = `${lastRealized.toFixed(2)}%`;
        } else {
          displayValue = `${safePercentage.toFixed(1)}%`;
        }
      } else if (meta.includes('%') || (meta.includes('>') && !meta.includes('r$'))) {
        displayValue = `${safePercentage.toFixed(1)}%`;
      } else if (lastValidData?.realizado !== null && lastValidData?.realizado !== undefined) {
        displayValue = formatValue(lastValidData.realizado, true);
      } else if (totalRealizado > 0) {
        displayValue = formatValue(totalRealizado, true);
      } else {
        displayValue = `${safePercentage.toFixed(1)}%`;
      }

      return {
        id: metric.id,
        title: metric.nome.replace(/^[^-]+ – /, '').replace(/^[^-]+ - /, ''),
        value: displayValue,
        meta: metric.meta,
        percentage: safePercentage,
        previsto: formatValue(avgPrevisto, true),
        realizado: formatValue(lastValidData?.realizado ?? avgRealizado, true),
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
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-primary rounded-full"></div>
              <span className="text-xs text-primary uppercase tracking-wider font-medium">
                INDICADORES DE PERFORMANCE
              </span>
            </div>
            <ThemeToggle />
          </div>
          
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            2025 — {selectedCategory === "Todas" ? "Painel Geral" : selectedCategory}
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            Comparativo Previsto vs Realizado por Mês
            {isLoading && <span className="ml-2 text-xs">(Carregando dados do Supabase...)</span>}
            {error && <span className="ml-2 text-xs text-destructive">(Usando dados locais)</span>}
          </p>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <PeriodFilter 
                selected={selectedPeriod} 
                onChange={(period) => {
                  setSelectedPeriod(period);
                  if (period !== "Todos") setSelectedMonth("all"); // Reset month when period changes
                }} 
              />
              <MonthFilter
                selected={selectedMonth}
                onChange={(month) => {
                  setSelectedMonth(month);
                  if (month !== "all") setSelectedPeriod("Todos"); // Reset period when month selected
                }}
              />
            </div>
            
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
                  className="gap-2 h-8"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsTVMode(true)}
                  className="gap-2 h-8"
                >
                  <Tv className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">Modo TV</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* KPI Cards Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {topKPIs.map((kpi) => (
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
        <section className="mb-6">
          <AggregatedEvolutionChart 
            metrics={filteredMetrics}
            title="Evolução Agregada"
            subtitle="Soma de todos os indicadores por mês"
          />
        </section>

        {/* Detail Chart (replaces table) */}
        <section>
          <MonthlyDetailChart 
            metrics={filteredMetrics}
            title="Detalhamento Mensal"
            subtitle="Valores de Previsto e Realizado por mês para cada indicador"
          />
        </section>
      </main>
    </div>
  );
};

export default Index;
