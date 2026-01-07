import { useState, useMemo } from "react";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Target,
  Tv,
  Clock
} from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MetricCardGradient } from "@/components/dashboard/MetricCardGradient";
import { MainChart } from "@/components/dashboard/MainChart";
import { MetricListCard } from "@/components/dashboard/MetricListCard";
import { TVCarousel } from "@/components/dashboard/TVCarousel";
import { Button } from "@/components/ui/button";
import { initialMetrics, type Metric, type MetricData } from "@/data/dashboardData";

const Index = () => {
  const [metrics, setMetrics] = useState<Metric[]>(initialMetrics);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isTVMode, setIsTVMode] = useState(false);

  // Filter metrics for B2B e B2BC category for TV mode
  const b2bMetrics = useMemo(() => {
    return metrics.filter((m) => m.categoria === "B2B e B2BC");
  }, [metrics]);

  const filteredMetrics = useMemo(() => {
    if (selectedCategory === "Todas") return metrics;
    return metrics.filter((m) => m.categoria === selectedCategory);
  }, [metrics, selectedCategory]);

  // Get main chart data from first metric with data
  const mainChartData = useMemo(() => {
    const metricsWithData = filteredMetrics.filter(m => m.dados.some(d => d.realizado !== null));
    if (metricsWithData.length === 0) return [];
    
    // Use the first metric for chart demo
    const metric = metricsWithData[0];
    return metric.dados.map(d => ({
      mes: d.mes.substring(0, 3),
      previsto: d.previsto || 0,
      realizado: d.realizado || 0,
    }));
  }, [filteredMetrics]);

  // Calculate summary KPIs
  const summaryKPIs = useMemo(() => {
    const totalMetrics = filteredMetrics.length;
    const achievedMetrics = filteredMetrics.filter(m => {
      const lastData = m.dados.find(d => d.realizado !== null);
      return lastData && (lastData.concluido ?? 0) >= 100;
    }).length;
    
    const avgCompletion = filteredMetrics.reduce((acc, m) => {
      const lastData = m.dados.find(d => d.realizado !== null);
      return acc + (lastData?.concluido ?? 0);
    }, 0) / (totalMetrics || 1);

    return {
      total: totalMetrics,
      achieved: achievedMetrics,
      avgCompletion: avgCompletion.toFixed(1),
      pending: totalMetrics - achievedMetrics,
    };
  }, [filteredMetrics]);

  // TV Mode
  if (isTVMode) {
    return (
      <TVCarousel 
        metrics={b2bMetrics} 
        slideIntervalMs={10000} 
        summaryIntervalMs={20000} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar 
        onCategoryChange={setSelectedCategory} 
        selectedCategory={selectedCategory} 
      />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {selectedCategory === "Todas" ? "Dashboard" : selectedCategory}
            </h1>
            <p className="text-muted-foreground">
              Acompanhe os indicadores de performance em tempo real
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsTVMode(true)}
              className="gap-2"
            >
              <Tv className="w-4 h-4" />
              Modo TV
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Atualizado agora</span>
            </div>
          </div>
        </header>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <MetricCardGradient
            title="Total de Indicadores"
            value={summaryKPIs.total.toString()}
            subtitle="métricas"
            trend={null}
            gradient="purple"
            icon={<Target className="w-6 h-6" />}
            delay={0}
          />
          <MetricCardGradient
            title="Metas Atingidas"
            value={summaryKPIs.achieved.toString()}
            subtitle="indicadores"
            trend={(summaryKPIs.achieved / summaryKPIs.total) * 100 - 50}
            trendLabel="vs meta"
            gradient="green"
            icon={<TrendingUp className="w-6 h-6" />}
            delay={100}
          />
          <MetricCardGradient
            title="Conclusão Média"
            value={`${summaryKPIs.avgCompletion}%`}
            trend={parseFloat(summaryKPIs.avgCompletion) - 100}
            trendLabel="vs 100%"
            gradient="blue"
            icon={<DollarSign className="w-6 h-6" />}
            delay={200}
          />
          <MetricCardGradient
            title="Pendentes"
            value={summaryKPIs.pending.toString()}
            subtitle="a atingir"
            trend={summaryKPIs.pending > 0 ? -((summaryKPIs.pending / summaryKPIs.total) * 100) : 0}
            gradient="orange"
            icon={<Users className="w-6 h-6" />}
            delay={300}
          />
        </section>

        {/* Main Chart */}
        <section className="mb-8">
          <MainChart 
            title="Evolução Mensal" 
            data={mainChartData}
          />
        </section>

        {/* Metrics List */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Indicadores Detalhados
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredMetrics.length} indicadores
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredMetrics.slice(0, 10).map((metric, index) => (
              <MetricListCard
                key={metric.id}
                metric={metric}
              />
            ))}
          </div>
          {filteredMetrics.length > 10 && (
            <div className="mt-4 text-center">
              <Button variant="outline">
                Ver todos ({filteredMetrics.length} indicadores)
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Index;
