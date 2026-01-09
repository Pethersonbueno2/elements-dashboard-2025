import { useState, useMemo, useCallback, useEffect } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  Target,
  Tv,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Clock,
  Home,
  Maximize,
  Minimize
} from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { KPICardNew } from "@/components/dashboard/KPICardNew";
import { MonthlyChartCarousel } from "@/components/dashboard/MonthlyChartCarousel";
import { TVCarousel } from "@/components/dashboard/TVCarousel";
import { Button } from "@/components/ui/button";
import { initialMetrics, type Metric } from "@/data/dashboardData";

const Index = () => {
  const [metrics] = useState<Metric[]>(initialMetrics);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
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

  // Filter metrics for TV mode based on selected category
  const tvMetrics = useMemo(() => {
    if (selectedCategory === "Todas") {
      return metrics.slice(0, 12);
    }
    return metrics.filter((m) => m.categoria === selectedCategory);
  }, [metrics, selectedCategory]);

  const filteredMetrics = useMemo(() => {
    if (selectedCategory === "Todas") return metrics;
    return metrics.filter((m) => m.categoria === selectedCategory);
  }, [metrics, selectedCategory]);

  // Metas fixas para métricas específicas (conforme planilha)
  const fixedMetas: Record<string, { previsto: number; realizado: number }> = {
    "receita-b2b": { previsto: 61622991, realizado: 39353316 },
    "receita-b2bc": { previsto: 15815042, realizado: 8681962 },
  };

  // Categorias que devem mostrar Total Previsto e Total Realizado
  const categoriasComTotais = ["B2B e B2BC", "B2C Digital", "Legacy"];
  const showTotais = categoriasComTotais.includes(selectedCategory);

  // Extrai meta do nome da métrica (ex: "60MI" de "Receita Líquida - 60MI")
  const extractMetaFromName = (meta: string): number | null => {
    const patterns = [
      /(\d+(?:[.,]\d+)?)\s*Mi/i,
      /(\d+(?:[.,]\d+)?)\s*Bi/i,
      /R\$\s*(\d+(?:[.,]\d+)*)/i,
    ];
    
    for (const pattern of patterns) {
      const match = meta.match(pattern);
      if (match) {
        const value = parseFloat(match[1].replace(/\./g, '').replace(',', '.'));
        if (/Mi/i.test(meta)) return value * 1000000;
        if (/Bi/i.test(meta)) return value * 1000000000;
        return value;
      }
    }
    return null;
  };

  // Calculate summary KPIs based on filtered metrics
  const summaryKPIs = useMemo(() => {
    const totalMetrics = filteredMetrics.length;
    
    const metricsWithData = filteredMetrics.filter(m => 
      m.dados.some(d => d.realizado !== null)
    );
    
    const achievedMetrics = metricsWithData.filter(m => {
      const lastValidData = [...m.dados].reverse().find(d => d.realizado !== null);
      return lastValidData && (lastValidData.concluido ?? 0) >= 100;
    }).length;
    
    const avgCompletion = metricsWithData.reduce((acc, m) => {
      const lastValidData = [...m.dados].reverse().find(d => d.realizado !== null);
      return acc + (lastValidData?.concluido ?? 0);
    }, 0) / (metricsWithData.length || 1);

    // Para categoria B2B e B2BC, usa apenas as métricas de receita com valores fixos
    const isB2BCategory = selectedCategory === "B2B e B2BC";
    const receitaMetrics = isB2BCategory 
      ? metricsWithData.filter(m => m.id === "receita-b2b" || m.id === "receita-b2bc")
      : metricsWithData;

    const totalRealized = receitaMetrics.reduce((acc, m) => {
      // Usa valor fixo se disponível
      if (fixedMetas[m.id]) {
        return acc + fixedMetas[m.id].realizado;
      }
      const sum = m.dados.reduce((s, d) => s + (d.realizado ?? 0), 0);
      return acc + sum;
    }, 0);

    // Usa meta extraída do nome se disponível, senão soma os previstos
    const totalPrevisto = receitaMetrics.reduce((acc, m) => {
      // Usa valor fixo se disponível
      if (fixedMetas[m.id]) {
        return acc + fixedMetas[m.id].previsto;
      }
      const metaFromName = extractMetaFromName(m.meta);
      if (metaFromName !== null) {
        return acc + metaFromName;
      }
      const sum = m.dados.reduce((s, d) => s + (d.previsto ?? 0), 0);
      return acc + sum;
    }, 0);

    return {
      total: totalMetrics,
      achieved: achievedMetrics,
      pending: metricsWithData.length - achievedMetrics,
      avgCompletion: avgCompletion.toFixed(1),
      totalRealized,
      totalPrevisto,
      variance: totalPrevisto > 0 ? ((totalRealized - totalPrevisto) / totalPrevisto * 100) : 0,
    };
  }, [filteredMetrics, selectedCategory]);

  const formatValue = (value: number): string => {
    if (value >= 1000000000) return `${(value / 1000000000).toFixed(2)} Bi`;
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)} Mi`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)} K`;
    return value.toFixed(0);
  };

  // TV Mode
  if (isTVMode) {
    return (
      <TVCarousel 
        metrics={tvMetrics} 
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
      <main className={`flex-1 p-4 md:p-5 lg:p-6 transition-all duration-300 ${isFullscreen ? 'ml-0' : 'ml-56'}`}>
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 md:mb-5">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-foreground uppercase tracking-wide">
              {selectedCategory === "Todas" ? "PAINEL DE INDICADORES" : selectedCategory.toUpperCase()}
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              {filteredMetrics.length} indicadores · Dados 2025
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="gap-2"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              <span className="hidden sm:inline">{isFullscreen ? 'Sair Fullscreen' : 'Fullscreen'}</span>
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
            <div className="hidden md:flex items-center gap-4 text-muted-foreground">
              <Home className="w-5 h-5 cursor-pointer hover:text-foreground transition-colors" />
              <BarChart3 className="w-5 h-5 cursor-pointer hover:text-foreground transition-colors" />
            </div>
          </div>
        </header>

        {/* KPI Cards - Responsive grid */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 mb-4 md:mb-5">
          <KPICardNew
            title="Total Indicadores"
            value={summaryKPIs.total.toString()}
            icon={<Target className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />}
            iconBgColor="bg-primary"
            delay={0}
          />
          <KPICardNew
            title="Metas Atingidas"
            value={summaryKPIs.achieved.toString()}
            icon={<CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />}
            iconBgColor="bg-emerald-600"
            delay={50}
          />
          <KPICardNew
            title="Pendentes"
            value={summaryKPIs.pending.toString()}
            icon={<Clock className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />}
            iconBgColor="bg-amber-600"
            delay={100}
          />
          <KPICardNew
            title="Média Conclusão"
            value={`${summaryKPIs.avgCompletion}%`}
            icon={<TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />}
            iconBgColor="bg-cyan-600"
            valueColor={parseFloat(summaryKPIs.avgCompletion) >= 100 ? "positive" : "default"}
            delay={150}
          />
          {showTotais && (
            <KPICardNew
              title="Total Previsto"
              value={formatValue(summaryKPIs.totalPrevisto)}
              icon={<Target className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />}
              iconBgColor="bg-blue-600"
              delay={200}
            />
          )}
          {showTotais && (
            <KPICardNew
              title="Total Realizado"
              value={formatValue(summaryKPIs.totalRealized)}
              icon={<DollarSign className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />}
              iconBgColor="bg-purple-600"
              delay={250}
            />
          )}
        </section>

        {/* Main Chart - Carousel (now takes full remaining space) */}
        <section className={`${isFullscreen ? 'h-[calc(100vh-220px)]' : ''}`}>
          <MonthlyChartCarousel 
            metrics={filteredMetrics.slice(0, 8)}
            slideIntervalMs={10000}
            summaryIntervalMs={60000}
          />
        </section>
      </main>
    </div>
  );
};

export default Index;
