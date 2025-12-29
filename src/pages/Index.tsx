import { useState, useMemo } from "react";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  Star,
  ShoppingCart
} from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { KPICard } from "@/components/dashboard/KPICard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { CategoryFilter } from "@/components/dashboard/CategoryFilter";
import { initialMetrics, categorias, type Metric, type MetricData } from "@/data/dashboardData";

const Index = () => {
  const [metrics, setMetrics] = useState<Metric[]>(initialMetrics);
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const handleDataChange = (metricId: string, newData: MetricData[]) => {
    setMetrics((prev) =>
      prev.map((m) => (m.id === metricId ? { ...m, dados: newData } : m))
    );
  };

  const filteredMetrics = useMemo(() => {
    if (selectedCategory === "Todas") return metrics;
    return metrics.filter((m) => m.categoria === selectedCategory);
  }, [metrics, selectedCategory]);

  // Calculate KPIs from current data
  const getKPIValue = (metricId: string) => {
    const metric = metrics.find((m) => m.id === metricId);
    if (!metric) return { value: "–", trend: null };
    
    const lastWithData = [...metric.dados].reverse().find((d) => d.realizado !== null);
    if (!lastWithData) return { value: "–", trend: null };

    const value = lastWithData.realizado;
    const trend = lastWithData.concluido;

    // Format based on metric type
    if (metricId === "receita-b2b" || metricId === "receita-b2bc") {
      const formatted = value >= 1000000 
        ? `R$ ${(value / 1000000).toFixed(1)}M` 
        : `R$ ${(value / 1000).toFixed(0)}K`;
      return { value: formatted, trend };
    }
    if (metricId === "satisfacao" || metricId === "margem-bruta" || metricId === "taxa-conversao-site") {
      return { value: `${value.toFixed(1)}%`, trend };
    }
    if (metricId === "reputacao-google") {
      return { value: value.toFixed(1), trend };
    }
    if (metricId === "leads") {
      return { value: value.toLocaleString("pt-BR"), trend };
    }
    return { value: value.toFixed(1), trend };
  };

  const kpis = [
    {
      id: "satisfacao",
      title: "Satisfação com Atendimento",
      meta: "> 90%",
      icon: <Star className="h-5 w-5" />,
    },
    {
      id: "receita-b2b",
      title: "Receita B2B",
      meta: "R$ 61.6M",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      id: "receita-b2bc",
      title: "Receita B2BC",
      meta: "R$ 15.8M",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      id: "leads",
      title: "Total de Leads",
      meta: "19.600",
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: "margem-bruta",
      title: "Margem Bruta",
      meta: "55%",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      id: "taxa-conversao-site",
      title: "Taxa de Conversão",
      meta: "1%",
      icon: <Target className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="mb-10">
          <div className="rounded-2xl bg-gradient-to-r from-primary via-primary/90 to-primary/80 p-8 text-primary-foreground shadow-lg">
            <h2 className="text-3xl font-bold mb-2">Painel de Indicadores 2024</h2>
            <p className="text-primary-foreground/80 text-lg">
              Acompanhe as métricas de performance da Elements em tempo real. 
              Clique nos valores das tabelas para editar.
            </p>
          </div>
        </section>

        {/* KPI Cards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-6">Visão Geral</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kpis.map((kpi, index) => {
              const { value, trend } = getKPIValue(kpi.id);
              return (
                <KPICard
                  key={kpi.id}
                  title={kpi.title}
                  value={value}
                  meta={kpi.meta}
                  trend={trend}
                  icon={kpi.icon}
                  delay={index * 100}
                />
              );
            })}
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Métricas Detalhadas</h2>
          <CategoryFilter
            categories={categorias}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </section>

        {/* Metric Cards */}
        <section className="space-y-4">
          {filteredMetrics.map((metric, index) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              onDataChange={handleDataChange}
              delay={index * 50}
            />
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-12 py-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>Dashboard Elements © 2024 • Dados atualizados em tempo real</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
