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
// Períodos são cumulativos: 30=Dez, 60=Nov+Dez, 90=Out+Nov+Dez
const getMonthsForPeriod = (period: PeriodType): number[] => {
  switch (period) {
    case "30":
      // 30 dias = apenas Dezembro
      return [11];
    case "60":
      // 60 dias = Novembro e Dezembro
      return [10, 11];
    case "90":
      // 90 dias = Outubro, Novembro e Dezembro
      return [9, 10, 11];
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

  const [selectedCategory, setSelectedCategory] = useState("Compras Internacionais");
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("30");
  const [selectedMonth, setSelectedMonth] = useState<MonthType>("Dezembro");
  const [selectedIndicator, setSelectedIndicator] = useState("all");
  const [isTVMode, setIsTVMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Quando muda de categoria, reseta para Dezembro, "30 dias" e "Todos os indicadores"
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setSelectedMonth("Dezembro");
    setSelectedIndicator("all");
    setSelectedPeriod("30");
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

    const maskToMonths = (metric: typeof result[number], allowedIndices: Set<number>) => ({
      ...metric,
      dados: metric.dados.map((d, index) => {
        if (allowedIndices.has(index)) return d;
        return {
          ...d,
          previsto: null,
          realizado: null,
          diferenca: null,
          concluido: null,
        };
      }),
    });

    // Apply specific month filter first
    if (selectedMonth !== "all") {
      const monthIndex = monthNameToIndex[selectedMonth];
      const allowed = new Set([monthIndex]);
      result = result.map((metric) => maskToMonths(metric, allowed));
    } else if (selectedPeriod !== "Todos") {
      // Apply period filter - mantém o índice original dos meses (não reindexa)
      const monthsToShow = getMonthsForPeriod(selectedPeriod);
      const allowed = new Set(monthsToShow);
      result = result.map((metric) => maskToMonths(metric, allowed));
    }

    return result;
  }, [indicatorFilteredMetrics, selectedPeriod, selectedMonth]);

// Detecta a unidade com base na meta ou nome do indicador
const getUnitFromMeta = (meta: string, nome: string): { prefix: string; suffix: string } => {
  const metaLower = meta.toLowerCase();
  const nomeLower = nome.toLowerCase();
  
  // Redução de Custos de Aquisição - usa % (exceção específica antes da regra de R$)
  if (nomeLower.includes('redução de custos') || nomeLower.includes('reducao de custos') ||
      nomeLower.includes('redução_de_custos') || nomeLower.includes('reducao_de_custos')) {
    return { prefix: '', suffix: '%' };
  }
  
  // Indicadores de Financeiro e Controladoria que usam % (não R$)
  // Margem EBITDA, Margem Líquida, Margem Bruta, Margem de Contribuição, Despesas Operacionais
  // Crescimento EBITDA, Resultado Financeiro, Compliance Tributário, Carga Tributária
  // Crescimento Receita Clientes Existentes (Marketing Growth)
  if (nomeLower.includes('margem') || nomeLower.includes('despesas operacionais') || 
      nomeLower.includes('crescimento ebitda') || nomeLower.includes('resultado financeiro') ||
      nomeLower.includes('compliance') || nomeLower.includes('carga tributária') ||
      nomeLower.includes('carga tributaria') || nomeLower.includes('crescimento receita') ||
      nomeLower.includes('crescimento_receita')) {
    return { prefix: '', suffix: '%' };
  }
  
  // Endividamento sobre EBITDA e Grau de Alavancagem - são índices sem unidade
  if (nomeLower.includes('endividamento') || nomeLower.includes('alavancagem')) {
    return { prefix: '', suffix: '' };
  }
  
  // EBITDA sob Juros - usa % (não R$)
  if (nomeLower.includes('ebtida sob juros') || nomeLower.includes('ebitda sob juros')) {
    return { prefix: '', suffix: '%' };
  }
  
  // Reais - verifica primeiro por ser mais específico (exceto Headcount vs Receita que usa %)
  if ((metaLower.includes('r$') || metaLower.includes('reais') || nomeLower.includes('receita') || 
      nomeLower.includes('faturamento') || nomeLower.includes('ebtida') || nomeLower.includes('ebitda') ||
      nomeLower.includes('ticket') || nomeLower.includes('custo') || nomeLower.includes('despesa') ||
      nomeLower.includes('investimento') || nomeLower.includes('cpa') || nomeLower.includes('cpl') ||
      nomeLower.includes('ltv')) &&
      !nomeLower.includes('headcount')) {
    return { prefix: 'R$ ', suffix: '' };
  }
  // Horas - Tempo de primeira resposta (deve vir antes de dias)
  if (nomeLower.includes('primeira resposta') || nomeLower.includes('primeira_resposta') ||
      (metaLower.includes('h') && !metaLower.includes('%')) || nomeLower.includes('hora')) {
    return { prefix: '', suffix: ' horas' };
  }
  // Segundos - LCP (Largest Contentful Paint) é métrica de web performance
  if (nomeLower.includes('lcp')) {
    return { prefix: '', suffix: 's' };
  }
  // Brand Search - pesquisas
  if (nomeLower.includes('brand search')) {
    return { prefix: '', suffix: ' pesquisas' };
  }
  // Alcance - Pessoas
  if (nomeLower.includes('alcance')) {
    return { prefix: '', suffix: ' Pessoas' };
  }
  // Tráfego Orgânico - usa "sessões" (exceção antes da regra de %)
  if (nomeLower.includes('trafego organico') || nomeLower.includes('tráfego orgânico') ||
      nomeLower.includes('trafego_organico')) {
    return { prefix: '', suffix: ' sessões' };
  }
  // Dias
  if (metaLower.includes('dia') || nomeLower.includes('prazo') || nomeLower.includes('ciclo de venda') ||
      nomeLower.includes('ciclo_de_venda') || nomeLower.includes('tempo de')) {
    return { prefix: '', suffix: ' dias' };
  }
  // Percentual - mais abrangente
  if (metaLower.includes('%') || nomeLower.includes('taxa') || nomeLower.includes('margem') ||
      nomeLower.includes('churn') || nomeLower.includes('conversao') || nomeLower.includes('conversão') ||
      nomeLower.includes('roas') || nomeLower.includes('crescimento') || nomeLower.includes('indice') ||
      nomeLower.includes('índice') || nomeLower.includes('ruptura') || nomeLower.includes('avaria') ||
      nomeLower.includes('performance') || nomeLower.includes('acuracidade') || nomeLower.includes('reducao') ||
      nomeLower.includes('redução') || nomeLower.includes('compliance') || nomeLower.includes('share') ||
      nomeLower.includes('engajamento') || nomeLower.includes('trafego') || nomeLower.includes('organico') ||
      nomeLower.includes('alavancagem') || nomeLower.includes('endividamento') || nomeLower.includes('tributari') || 
      nomeLower.includes('ltv') || nomeLower.includes('base_ativa') || nomeLower.includes('base ativa')) {
    return { prefix: '', suffix: '%' };
  }
  // Pontuação/Nota (NPS, Satisfação, Reputação)
  if (nomeLower.includes('nps') || nomeLower.includes('reputação') || nomeLower.includes('satisfação') ||
      nomeLower.includes('reputacao') || nomeLower.includes('satisfacao') || nomeLower.includes('google') ||
      nomeLower.includes('reclame')) {
    return { prefix: '', suffix: ' pts' };
  }
  // Giro de Estoque - Renovação de Estoque
  if (nomeLower.includes('giro') && nomeLower.includes('estoque')) {
    return { prefix: '', suffix: ' Renovação Est.' };
  }
  // Número de Novos Clientes - usa "Novos Clientes" como unidade
  if (nomeLower.includes('novos clientes') || nomeLower.includes('novos_clientes')) {
    return { prefix: '', suffix: ' Novos Clientes' };
  }
  // Quantidade/Unidades
  if (nomeLower.includes('numero') || nomeLower.includes('número') || nomeLower.includes('clientes') ||
      nomeLower.includes('oportunidades') || nomeLower.includes('projetos') || nomeLower.includes('produtos') ||
      nomeLower.includes('agendas')) {
    return { prefix: '', suffix: ' un' };
  }
  
  // Fallback - retorna unidade genérica para não deixar vazio
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

// Helper para calcular porcentagem corretamente considerando números negativos
// Para "maior é melhor": quanto maior o realizado em relação ao previsto, melhor
// Para números negativos: -7 é melhor que -14 (mais próximo de zero)
const calculatePercentage = (realizado: number, previsto: number, isInverso: boolean): number => {
  // Caso especial: previsto é 0
  if (previsto === 0) {
    if (realizado === 0) return 0; // Ambos zero, sem dados
    // Se previsto é 0 mas realizado não, depende da lógica
    return isInverso ? 0 : (realizado > 0 ? 100 : 0);
  }
  
  // Caso especial: realizado é 0 mas previsto não é 0
  if (realizado === 0) {
    // Para métricas inversas (menor é melhor), realizado = 0 significa sucesso total
    // Ex: Índice de Avaria meta < 0.1%, realizado = 0% → (previsto/realizado) seria infinito
    // Usamos (previsto/previsto) * 100 = 100% mínimo, mas na verdade é melhor que 100%
    // Calculamos: quanto menor o realizado em relação ao previsto, melhor o percentual
    // Como realizado é 0, a performance é perfeita: retornamos um valor proporcional alto
    if (isInverso) {
      // Retorna um percentual muito alto indicando que o resultado é melhor que a meta
      // Usamos previsto * algum multiplicador para dar um número representativo
      return (previsto / 0.0001) * 100; // Simula realizado muito pequeno para evitar infinito
    }
    // Para métricas normais (maior é melhor), realizado = 0 significa falha total
    return 0;
  }
  
  // Verifica se ambos são negativos
  const bothNegative = realizado < 0 && previsto < 0;
  
  if (bothNegative) {
    // Para números negativos, usamos valores absolutos e invertemos a lógica
    const absRealizado = Math.abs(realizado);
    const absPrevisto = Math.abs(previsto);
    
    if (isInverso) {
      // Inverso (menor é melhor): valores mais negativos são melhores
      // Ex: -14 é melhor que -8 → absRealizado/absPrevisto * 100
      return (absRealizado / absPrevisto) * 100;
    } else {
      // Normal (maior é melhor): valores menos negativos são melhores
      // Ex: -7 é melhor que -14 → absPrevisto/absRealizado * 100
      return (absPrevisto / absRealizado) * 100;
    }
  }
  
  // Lógica normal para números positivos
  if (isInverso) {
    return (previsto / realizado) * 100;
  } else {
    return (realizado / previsto) * 100;
  }
};

// Helper para determinar se meta foi atingida considerando números negativos
const isMetaAtingida = (realizado: number, previsto: number, isInverso: boolean): boolean => {
  const bothNegative = realizado < 0 && previsto < 0;
  
  if (bothNegative) {
    if (isInverso) {
      // Inverso: valores mais negativos são melhores (ex: -14 melhor que -8)
      return realizado <= previsto;
    } else {
      // Normal: valores menos negativos são melhores (ex: -7 melhor que -14)
      return realizado >= previsto;
    }
  }
  
  // Lógica normal
  return isInverso ? realizado <= previsto : realizado >= previsto;
};

// Calculate KPIs for ALL indicators - SEMPRE mostra porcentagem
  const topKPIs = useMemo(() => {
    // Mostra todos os indicadores filtrados como KPI cards
    const topMetrics = filteredMetrics;
    
    // Verifica se está em modo "todos os meses" (independente se é período "Todos" ou não)
    // Quando selectedMonth é "all", sempre calcula média
    const isAllMonthsMode = selectedMonth === "all";
    
    return topMetrics.map((metric) => {
      // Para cálculo de média anual, usamos os dados originais (não filtrados)
      // encontramos a métrica original em categoryFilteredMetrics
      const originalMetric = categoryFilteredMetrics.find(m => m.id === metric.id) || metric;
      const isInverso = metric.inverso || false;
      
      let percentage = 0;
      let displayRealizado = 0;
      let displayPrevisto = 0;
      
      // Se é um mês específico (não "all"), pega o valor daquele mês
      if (selectedMonth !== "all") {
        const monthIndex = monthNameToIndex[selectedMonth];
        const monthData = metric.dados[monthIndex];
        
        if (monthData && monthData.realizado !== null && monthData.previsto !== null) {
          displayRealizado = monthData.realizado ?? 0;
          displayPrevisto = monthData.previsto ?? 0;
          
          // Calcula porcentagem usando helper que considera números negativos
          percentage = calculatePercentage(displayRealizado, displayPrevisto, isInverso);
        }
      } else if (isAllMonthsMode) {
        // "Todos os Meses" selecionado - calcula MÉDIA dos meses no período selecionado
        // Se período também é "Todos", usa todos os 12 meses
        // Se período é 30/60/90, usa apenas os meses desse período
        const monthsToInclude = selectedPeriod === "Todos" 
          ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] 
          : getMonthsForPeriod(selectedPeriod);
        
        const monthsSet = new Set(monthsToInclude);
        
        // Filtra meses que têm previsto e realizado preenchidos para calcular médias
        const periodFilledMonths = originalMetric.dados.filter((d, index) => 
          monthsSet.has(index) &&
          d.realizado !== null && d.previsto !== null && 
          d.realizado !== undefined && d.previsto !== undefined
        );
        
        // Médias para exibição (previsto e realizado) dos meses válidos
        if (periodFilledMonths.length > 0) {
          displayRealizado = periodFilledMonths.reduce((sum, d) => sum + (d.realizado ?? 0), 0) / periodFilledMonths.length;
          displayPrevisto = periodFilledMonths.reduce((sum, d) => sum + (d.previsto ?? 0), 0) / periodFilledMonths.length;
          
          // Calcula porcentagem usando helper que considera números negativos
          percentage = calculatePercentage(displayRealizado, displayPrevisto, isInverso);
        }
      }

      const safePercentage = Number.isFinite(percentage) ? percentage : 0;

      // Valor principal - mostra porcentagem sem decimais desnecessários
      // Se as casas decimais são 0, mostra só o inteiro (ex: 57.00% -> 57%)
      // Se tem decimais significativos, mostra só 2 casas (ex: 57.25% -> 57.25%)
      const formattedPercentage = safePercentage % 1 === 0 
        ? safePercentage.toFixed(0) 
        : safePercentage.toFixed(2).replace(/\.?0+$/, '');
      const displayValue = `${formattedPercentage}%`;

      // Formata previsto e realizado com nomenclatura correta
      const previstoFormatted = formatValueWithUnit(displayPrevisto, metric.meta, metric.nome);
      const realizadoFormatted = formatValueWithUnit(displayRealizado, metric.meta, metric.nome);

      // Verifica se é métrica inversa (menor é melhor)
      const inverso = metric.inverso || false;
      
      // Calcula se a meta foi atingida usando helper que considera números negativos
      const metaAtingida = isMetaAtingida(displayRealizado, displayPrevisto, inverso);

      return {
        id: metric.id,
        title: metric.nome.replace(/^[^-]+ – /, '').replace(/^[^-]+ - /, ''),
        value: displayValue,
        meta: metric.meta,
        percentage: safePercentage,
        previsto: previstoFormatted,
        realizado: realizadoFormatted,
        inverso,
        metaAtingida,
      };
    });
  }, [filteredMetrics, selectedMonth, selectedPeriod, categoryFilteredMetrics]);

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
              </div>
            </div>
          </div>
        </header>

        {/* Legend */}
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-primary"></div>
            <span className="text-xs text-muted-foreground">Previsto</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-xs text-muted-foreground">Realizado (meta atingida)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <span className="text-xs text-muted-foreground">Realizado (abaixo da meta)</span>
          </div>
        </div>

        {/* KPI Cards Row */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {topKPIs.map((kpi) => (
            <IndicatorKPICard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              meta={kpi.meta}
              percentage={kpi.percentage}
              previstoValue={kpi.previsto}
              realizadoValue={kpi.realizado}
              inverso={kpi.inverso}
              onClick={() => setSelectedIndicator(kpi.id === selectedIndicator ? "all" : kpi.id)}
              isSelected={selectedIndicator === kpi.id}
            />
          ))}
        </section>

        {/* Charts Row - Oculto quando "Todos os Indicadores" está selecionado */}
        {selectedIndicator !== "all" && (
          <section className="mb-6">
            <AggregatedEvolutionChart 
              metrics={filteredMetrics}
              title={filteredMetrics[0]?.nome?.replace(/^[^-]+ – /, '').replace(/^[^-]+ - /, '') || "Evolução Agregada"}
              subtitle="Evolução mensal do indicador selecionado"
            />
          </section>
        )}

        {/* Detail Chart - Oculto quando "Todos os Indicadores" está selecionado */}
        {selectedIndicator !== "all" && (
          <section>
            <MonthlyDetailChart 
              metrics={filteredMetrics}
              title="Detalhamento Mensal"
              subtitle="Valores de Previsto e Realizado por mês para cada indicador"
            />
          </section>
        )}

        {/* Indicadores por Setor - Visível apenas quando "Todos os Indicadores" está selecionado */}
        {selectedIndicator === "all" && (
          <section>
            <MonthlyDetailChart 
              metrics={filteredMetrics}
              title="Indicadores por Setor"
              subtitle="Evolução mensal de cada indicador"
              showOnlyIndicators={true}
            />
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
