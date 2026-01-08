import { useState, useMemo } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  Target,
  Tv,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Clock,
  Home
} from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { KPICardNew } from "@/components/dashboard/KPICardNew";
import { MonthlyChart } from "@/components/dashboard/MonthlyChart";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { DataTable } from "@/components/dashboard/DataTable";
import { HorizontalBarChart } from "@/components/dashboard/HorizontalBarChart";
import { TVCarousel } from "@/components/dashboard/TVCarousel";
import { Button } from "@/components/ui/button";
import { initialMetrics, type Metric } from "@/data/dashboardData";

const Index = () => {
  const [metrics] = useState<Metric[]>(initialMetrics);
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

  // Calculate summary KPIs based on filtered metrics
  const summaryKPIs = useMemo(() => {
    const totalMetrics = filteredMetrics.length;
    
    // Get metrics with valid data
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

    // Sum realized values
    const totalRealized = metricsWithData.reduce((acc, m) => {
      const sum = m.dados.reduce((s, d) => s + (d.realizado ?? 0), 0);
      return acc + sum;
    }, 0);

    const totalPrevisto = metricsWithData.reduce((acc, m) => {
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
  }, [filteredMetrics]);

  // Monthly chart data from actual metrics
  const monthlyChartData = useMemo(() => {
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
                   "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    return months.map((mes) => {
      const monthData = filteredMetrics.reduce((acc, m) => {
        const data = m.dados.find(d => d.mes === mes);
        return {
          realizado: acc.realizado + (data?.realizado ?? 0),
          previsto: acc.previsto + (data?.previsto ?? 0),
        };
      }, { realizado: 0, previsto: 0 });

      const percentual = monthData.previsto > 0 
        ? (monthData.realizado / monthData.previsto) * 100 
        : 0;

      return {
        mes: mes.substring(0, 3),
        valor: monthData.realizado,
        percentual,
      };
    });
  }, [filteredMetrics]);

  // Category distribution for donut chart
  const categoryData = useMemo(() => {
    const colors = [
      "hsl(259, 100%, 60%)",
      "hsl(200, 85%, 55%)", 
      "hsl(142, 76%, 45%)",
      "hsl(38, 92%, 55%)",
      "hsl(338, 85%, 55%)",
      "hsl(280, 70%, 50%)",
    ];

    if (selectedCategory !== "Todas") {
      // Show metrics within category
      return filteredMetrics.slice(0, 6).map((m, i) => {
        const total = m.dados.reduce((acc, d) => acc + (d.realizado ?? 0), 0);
        return {
          name: m.nome.substring(0, 20) + (m.nome.length > 20 ? "..." : ""),
          value: total,
          color: colors[i % colors.length],
        };
      });
    }

    // Group by category
    const categoryTotals: Record<string, number> = {};
    metrics.forEach(m => {
      const total = m.dados.reduce((acc, d) => acc + (d.realizado ?? 0), 0);
      categoryTotals[m.categoria] = (categoryTotals[m.categoria] || 0) + total;
    });

    return Object.entries(categoryTotals)
      .slice(0, 6)
      .map(([name, value], i) => ({
        name: name.substring(0, 15) + (name.length > 15 ? "..." : ""),
        value,
        color: colors[i % colors.length],
      }));
  }, [metrics, filteredMetrics, selectedCategory]);

  // Table data from metrics
  const tableData = useMemo(() => {
    return filteredMetrics.slice(0, 6).map((m, index) => {
      const lastData = [...m.dados].reverse().find(d => d.realizado !== null);
      const totalRealizado = m.dados.reduce((acc, d) => acc + (d.realizado ?? 0), 0);
      const totalPrevisto = m.dados.reduce((acc, d) => acc + (d.previsto ?? 0), 0);
      
      return {
        id: index + 1,
        nome: m.nome.substring(0, 25) + (m.nome.length > 25 ? "..." : ""),
        previsto: totalPrevisto,
        realizado: totalRealizado,
        concluido: lastData?.concluido ?? 0,
      };
    });
  }, [filteredMetrics]);

  const tableColumns = [
    { key: "nome", label: "Indicador", align: "left" as const },
    { key: "previsto", label: "Previsto", align: "right" as const, format: (v: number) => v.toLocaleString('pt-BR', { maximumFractionDigits: 0 }) },
    { key: "realizado", label: "Realizado", align: "right" as const, format: (v: number) => v.toLocaleString('pt-BR', { maximumFractionDigits: 0 }) },
    { key: "concluido", label: "% Concluído", align: "right" as const, format: (v: number) => `${v.toFixed(1)}%` },
  ];

  // Horizontal bar data - top performing metrics
  const topMetrics = useMemo(() => {
    return filteredMetrics
      .map(m => {
        const lastData = [...m.dados].reverse().find(d => d.realizado !== null);
        return {
          label: m.nome.substring(0, 18) + (m.nome.length > 18 ? "..." : ""),
          value: lastData?.concluido ?? 0,
          formattedValue: `${(lastData?.concluido ?? 0).toFixed(1)}%`,
        };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [filteredMetrics]);

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
      <main className="flex-1 ml-56 p-5">
        {/* Header */}
        <header className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-foreground uppercase tracking-wide">
              {selectedCategory === "Todas" ? "PAINEL DE INDICADORES" : selectedCategory.toUpperCase()}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredMetrics.length} indicadores · Dados 2025
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
            <div className="flex items-center gap-4 text-muted-foreground">
              <Home className="w-5 h-5 cursor-pointer hover:text-foreground transition-colors" />
              <BarChart3 className="w-5 h-5 cursor-pointer hover:text-foreground transition-colors" />
            </div>
          </div>
        </header>

        {/* KPI Cards */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
          <KPICardNew
            title="Total Indicadores"
            value={summaryKPIs.total.toString()}
            icon={<Target className="w-5 h-5 text-primary-foreground" />}
            iconBgColor="bg-primary"
            delay={0}
          />
          <KPICardNew
            title="Metas Atingidas"
            value={summaryKPIs.achieved.toString()}
            icon={<CheckCircle2 className="w-5 h-5 text-primary-foreground" />}
            iconBgColor="bg-emerald-600"
            delay={50}
          />
          <KPICardNew
            title="Pendentes"
            value={summaryKPIs.pending.toString()}
            icon={<Clock className="w-5 h-5 text-primary-foreground" />}
            iconBgColor="bg-amber-600"
            delay={100}
          />
          <KPICardNew
            title="Média Conclusão"
            value={`${summaryKPIs.avgCompletion}%`}
            icon={<TrendingUp className="w-5 h-5 text-primary-foreground" />}
            iconBgColor="bg-cyan-600"
            valueColor={parseFloat(summaryKPIs.avgCompletion) >= 100 ? "positive" : "default"}
            delay={150}
          />
          <KPICardNew
            title="Total Realizado"
            value={formatValue(summaryKPIs.totalRealized)}
            icon={<DollarSign className="w-5 h-5 text-primary-foreground" />}
            iconBgColor="bg-purple-600"
            delay={200}
          />
          <KPICardNew
            title="Variação"
            value={`${summaryKPIs.variance >= 0 ? '+' : ''}${summaryKPIs.variance.toFixed(1)}%`}
            icon={<AlertCircle className="w-5 h-5 text-primary-foreground" />}
            iconBgColor={summaryKPIs.variance >= 0 ? "bg-emerald-600" : "bg-rose-600"}
            valueColor={summaryKPIs.variance >= 0 ? "positive" : "negative"}
            delay={250}
          />
        </section>

        {/* Main Chart */}
        <section className="mb-5">
          <MonthlyChart 
            title="Evolução Mensal - Realizado vs Meta" 
            data={monthlyChartData}
            subtitle="Valor acumulado ● % de conclusão"
          />
        </section>

        {/* Bottom Grid - 3 columns */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Donut Chart */}
          <DonutChart 
            title={selectedCategory === "Todas" ? "Por Categoria" : "Por Indicador"} 
            data={categoryData}
            centerValue={formatValue(summaryKPIs.totalRealized)}
            centerLabel="Total"
          />

          {/* Data Table */}
          <DataTable 
            title="Indicadores Detalhados" 
            columns={tableColumns}
            data={tableData}
            highlightColumn="concluido"
          />

          {/* Horizontal Bar Chart */}
          <HorizontalBarChart 
            title="Top Performance (%)" 
            data={topMetrics}
            maxValue={200}
          />
        </section>
      </main>
    </div>
  );
};

export default Index;
