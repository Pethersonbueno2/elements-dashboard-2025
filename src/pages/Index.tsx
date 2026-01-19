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
// Considerando os últimos meses com dados (Dezembro = 11, Novembro = 10, etc.)
const getMonthsForPeriod = (period: PeriodType): number[] => {
  // Dezembro é o último mês com dados de 2025
  switch (period) {
    case "30":
      // 30 dias = Dezembro
      return [11];
    case "60":
      // 60 dias = Novembro
      return [10];
    case "90":
      // 90 dias = Outubro
      return [9];
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
  const [selectedMonth, setSelectedMonth] = useState<MonthType>("Dezembro");
  const [selectedIndicator, setSelectedIndicator] = useState("all");
  const [isTVMode, setIsTVMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Quando muda de categoria, reseta para Dezembro e "Todos os indicadores"
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setSelectedMonth("Dezembro");
    setSelectedIndicator("all");
    setSelectedPeriod("Todos");
  }, []);

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

// Detecta a unidade com base na meta ou nome do indicador
const getUnitFromMeta = (meta: string, nome: string): { prefix: string; suffix: string } => {
  const metaLower = meta.toLowerCase();
  const nomeLower = nome.toLowerCase();
  
  // Reais
  if (metaLower.includes('r$') || metaLower.includes('reais')) {
    return { prefix: 'R$ ', suffix: '' };
  }
  // Dias
  if (metaLower.includes('dia') || nomeLower.includes('prazo') || nomeLower.includes('ciclo de venda')) {
    return { prefix: '', suffix: ' dias' };
  }
  // Horas
  if (metaLower.includes('h') && !metaLower.includes('%')) {
    return { prefix: '', suffix: 'h' };
  }
  // Percentual
  if (metaLower.includes('%') || nomeLower.includes('taxa') || nomeLower.includes('margem')) {
    return { prefix: '', suffix: '%' };
  }
  // Pontuação/Nota
  if (nomeLower.includes('nps') || nomeLower.includes('reputação') || nomeLower.includes('satisfação')) {
    return { prefix: '', suffix: '' };
  }
  
  return { prefix: '', suffix: '' };
};

// Formata valor com unidade
const formatValueWithUnit = (value: number | null | undefined, meta: string, nome: string): string => {
  if (value === null || value === undefined || isNaN(value)) return "0";
  const { prefix, suffix } = getUnitFromMeta(meta, nome);
  
  // Formata o número
  let formattedNumber = "";
  if (value >= 1000000000) {
    formattedNumber = `${(value / 1000000000).toFixed(2)} Bi`;
  } else if (value >= 1000000) {
    formattedNumber = `${(value / 1000000).toFixed(2)} Mi`;
  } else if (value >= 1000 && !suffix.includes('dia') && !suffix.includes('%')) {
    formattedNumber = `${(value / 1000).toFixed(1)} K`;
  } else if (value % 1 !== 0) {
    formattedNumber = value.toFixed(2);
  } else {
    formattedNumber = value.toFixed(0);
  }
  
  return `${prefix}${formattedNumber}${suffix}`;
};

// Calculate KPIs for top 4 indicators
  const topKPIs = useMemo(() => {
    // Pega os primeiros 4 indicadores filtrados para exibir como KPI cards
    const topMetrics = filteredMetrics.slice(0, 4);
    
    return topMetrics.map((metric) => {
      const lastValidData = [...metric.dados].reverse().find(d => d.realizado !== null);
      
      // Calcula média apenas dos meses preenchidos COM dados de concluído válidos
      const filledMonthsWithConcluido = metric.dados.filter(d => 
        d.concluido !== null && d.concluido !== undefined && Number.isFinite(d.concluido) && d.concluido > 0
      );
      const filledMonths = metric.dados.filter(d => d.realizado !== null || d.previsto !== null);
      
      const totalRealizado = filledMonths.reduce((sum, d) => sum + (d.realizado ?? 0), 0);
      const totalPrevisto = filledMonths.reduce((sum, d) => sum + (d.previsto ?? 0), 0);
      
      // Média do realizado e previsto para exibição
      const avgRealizado = filledMonths.length > 0 ? totalRealizado / filledMonths.length : 0;
      const avgPrevisto = filledMonths.length > 0 ? totalPrevisto / filledMonths.length : 0;
      
      // PERCENTUAL: Soma das % de conclusão dividido pela quantidade de meses preenchidos
      let percentage = 0;
      if (filledMonthsWithConcluido.length > 0) {
        const totalConcluido = filledMonthsWithConcluido.reduce((sum, d) => sum + (d.concluido ?? 0), 0);
        percentage = totalConcluido / filledMonthsWithConcluido.length;
      } else if (totalPrevisto > 0) {
        percentage = (totalRealizado / totalPrevisto) * 100;
      }

      const safePercentage = Number.isFinite(percentage) ? percentage : 0;

      // Valor principal - usa o último realizado ou percentual
      let displayValue = "";
      const meta = metric.meta.toLowerCase();
      const nome = metric.nome.toLowerCase();

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

      // Formata previsto e realizado com nomenclatura correta
      const previstoFormatted = formatValueWithUnit(avgPrevisto, metric.meta, metric.nome);
      const realizadoFormatted = formatValueWithUnit(lastValidData?.realizado ?? avgRealizado, metric.meta, metric.nome);

      return {
        id: metric.id,
        title: metric.nome.replace(/^[^-]+ – /, '').replace(/^[^-]+ - /, ''),
        value: displayValue,
        meta: metric.meta,
        percentage: safePercentage,
        previsto: previstoFormatted,
        realizado: realizadoFormatted,
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
          onCategoryChange={handleCategoryChange} 
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
