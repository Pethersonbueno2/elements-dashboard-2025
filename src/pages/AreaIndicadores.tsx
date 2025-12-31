import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Flag } from "lucide-react";
import { CompactMetricRow } from "@/components/dashboard/CompactMetricRow";
import { GaugeChart } from "@/components/dashboard/GaugeChart";
import { initialMetrics, categorias, type Metric } from "@/data/dashboardData";

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const AreaIndicadores = () => {
  const [metrics] = useState<Metric[]>(initialMetrics);
  const [selectedCategory, setSelectedCategory] = useState("B2B e B2BC");
  const [selectedMonth, setSelectedMonth] = useState("Novembro");

  const filteredMetrics = metrics.filter((m) => m.categoria === selectedCategory);

  // Calculate total revenue (sum of all channels for the year)
  const getTotalRevenue = () => {
    const revenueMetrics = ["receita-b2b", "receita-b2bc", "receita-liquida-b2c-digital"];
    let total = 0;
    let meta = 0;
    
    revenueMetrics.forEach((id) => {
      const metric = metrics.find((m) => m.id === id);
      if (metric) {
        total += metric.dados.reduce((acc, d) => acc + (d.realizado || 0), 0);
        meta += metric.dados.reduce((acc, d) => acc + (d.previsto || 0), 0);
      }
    });
    
    return { total, meta };
  };

  const { total: totalRevenue, meta: metaRevenue } = getTotalRevenue();

  // Count indicators below target
  const indicatorsBelowTarget = filteredMetrics.filter((m) => {
    const data = m.dados.find((d) => d.mes === selectedMonth);
    return data?.concluido !== null && data?.concluido !== undefined && data.concluido < 100;
  }).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl font-bold text-foreground">Indicadores por Área</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Filters */}
        <section className="mb-8 flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Área
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Mês de Referência
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {meses.map((mes) => (
                <option key={mes} value={mes}>{mes}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Revenue Gauge - Only show for revenue-related categories */}
        {(selectedCategory === "B2B e B2BC" || selectedCategory === "B2C Digital" || selectedCategory === "Financeiro") && (
          <section className="mb-8">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-4 text-center">
                Faturamento Geral (Soma de Todos os Canais)
              </h2>
              <div className="max-w-xs mx-auto">
                <GaugeChart 
                  value={totalRevenue} 
                  max={metaRevenue} 
                  label={`R$ ${(totalRevenue / 1000000).toFixed(2)}M de ${(metaRevenue / 1000000).toFixed(2)}M`}
                />
              </div>
              <div className="text-center mt-4 text-sm text-muted-foreground">
                Meta Anual {(metaRevenue / 1000000).toFixed(2)}M
              </div>
            </div>
          </section>
        )}

        {/* Alert for indicators below target */}
        {indicatorsBelowTarget > 0 && (
          <section className="mb-6">
            <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-4 flex items-center gap-3">
              <Flag className="h-5 w-5 text-destructive" fill="currentColor" />
              <span className="text-destructive font-medium">
                {indicatorsBelowTarget} indicador{indicatorsBelowTarget > 1 ? "es" : ""} abaixo da meta em {selectedMonth}
              </span>
            </div>
          </section>
        )}

        {/* Category title */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-foreground">{selectedCategory}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredMetrics.length} indicadores • Referência: {selectedMonth}
          </p>
        </section>

        {/* Metrics Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredMetrics.map((metric) => (
            <CompactMetricRow 
              key={metric.id} 
              metric={metric} 
              selectedMonth={selectedMonth}
            />
          ))}
        </section>

        {/* Legend */}
        <section className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
          <h3 className="text-sm font-medium text-foreground mb-3">Legenda</h3>
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Previsto</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(200, 70%, 50%)" }} />
              <span className="text-muted-foreground">Realizado (na meta)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-muted-foreground">Realizado (abaixo da meta)</span>
            </div>
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-destructive" fill="currentColor" />
              <span className="text-muted-foreground">Red Flag - Abaixo da meta</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 py-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>Dashboard Elements © 2025 • Dados atualizados em tempo real</p>
        </footer>
      </main>
    </div>
  );
};

export default AreaIndicadores;