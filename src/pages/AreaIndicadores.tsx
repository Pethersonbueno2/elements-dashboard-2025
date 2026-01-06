import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Flag, ChevronLeft, ChevronRight, Tv, Grid } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { initialMetrics, categorias, type Metric } from "@/data/dashboardData";
import { cn } from "@/lib/utils";

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Extract unit from meta field
function getUnit(meta: string): string {
  if (meta.includes("%")) return "%";
  if (meta.includes("R$")) return "R$";
  if (meta.toLowerCase().includes("dias") || meta.toLowerCase().includes("dia")) return "dias";
  if (meta.toLowerCase().includes("h") || meta.toLowerCase().includes("hora")) return "h";
  return "";
}

const AreaIndicadores = () => {
  const [metrics] = useState<Metric[]>(initialMetrics);
  const [selectedCategory, setSelectedCategory] = useState("B2B e B2BC");
  const [selectedMonth, setSelectedMonth] = useState("Novembro");
  const [tvMode, setTvMode] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredMetrics = metrics.filter((m) => m.categoria === selectedCategory);

  // Total slides = individual metrics + 1 summary slide
  const totalSlides = filteredMetrics.length + 1;
  const isOnSummarySlide = currentIndex === filteredMetrics.length;

  // Auto-rotate every 15 seconds in TV mode
  useEffect(() => {
    if (!tvMode || filteredMetrics.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 15000);

    return () => clearInterval(interval);
  }, [tvMode, filteredMetrics.length, totalSlides]);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const currentMetric = filteredMetrics[currentIndex];

  const formatValue = (val: number | null, unit: string) => {
    if (val === null) return "–";
    if (unit === "R$") {
      if (val >= 1000000) return `R$ ${(val / 1000000).toFixed(2)}M`;
      if (val >= 1000) return `R$ ${(val / 1000).toFixed(0)}K`;
      return `R$ ${val.toFixed(0)}`;
    }
    return val.toLocaleString("pt-BR", { maximumFractionDigits: 2 }) + (unit ? ` ${unit}` : "");
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  // TV Mode Header Component
  const TvHeader = () => (
    <header className="border-b border-border bg-card/95 backdrop-blur px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-border bg-card text-foreground text-sm"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-border bg-card text-foreground text-sm"
          >
            {meses.map((mes) => (
              <option key={mes} value={mes}>{mes}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setTvMode(false)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-sm"
        >
          <Grid className="h-4 w-4" />
          <span>Grid</span>
        </button>
      </div>
    </header>
  );

  // TV Mode - Summary slide (all indicators together)
  if (tvMode && isOnSummarySlide) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <TvHeader />
        
        <main className="flex-1 flex flex-col px-6 py-4 relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-card/80 border border-border hover:bg-muted transition-colors z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-card/80 border border-border hover:bg-muted transition-colors z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Title */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-foreground">Resumo Geral</h1>
            <p className="text-lg text-muted-foreground">{selectedCategory} • {selectedMonth}</p>
          </div>

          {/* All indicators grid */}
          <div className="flex-1 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 animate-scale-in">
            {filteredMetrics.map((metric) => {
              const unit = getUnit(metric.meta);
              const data = metric.dados.find((d) => d.mes === selectedMonth);
              const completionPercent = data?.concluido ?? 0;
              const isBelowTarget = completionPercent < 100;

              const pieData = [
                { name: "Realizado", value: Math.min(completionPercent, 100) },
                { name: "Restante", value: Math.max(100 - completionPercent, 0) }
              ];

              return (
                <div 
                  key={metric.id}
                  className="flex flex-col items-center"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <h3 className="font-semibold text-foreground text-sm text-center line-clamp-1">
                      {metric.nome}
                    </h3>
                    {isBelowTarget && (
                      <Flag className="h-3 w-3 text-destructive flex-shrink-0" fill="currentColor" />
                    )}
                  </div>
                  
                  <div className="w-28 h-28 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          innerRadius="30%"
                          outerRadius="90%"
                          startAngle={90}
                          endAngle={-270}
                          strokeWidth={0}
                        >
                          <Cell fill={isBelowTarget ? "hsl(0, 72%, 51%)" : "hsl(142, 71%, 45%)"} />
                          <Cell fill="hsl(var(--muted))" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={cn(
                        "text-sm font-bold",
                        isBelowTarget ? "text-destructive" : "text-green-500"
                      )}>
                        {completionPercent.toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <div className="text-center text-[10px] mt-1">
                    <div className={cn(
                      "font-semibold",
                      isBelowTarget ? "text-destructive" : "text-foreground"
                    )}>
                      {formatValue(data?.realizado ?? null, unit)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all",
                  idx === currentIndex 
                    ? "bg-primary scale-125" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-2">
            Próximo em 15s • Resumo ({totalSlides} de {totalSlides})
          </p>
        </main>
      </div>
    );
  }

  // TV Mode - Full screen pie chart carousel (individual metrics)
  if (tvMode && currentMetric) {
    const unit = getUnit(currentMetric.meta);
    const currentData = currentMetric.dados.find((d) => d.mes === selectedMonth);
    const completionPercent = currentData?.concluido ?? 0;
    const isBelowTarget = completionPercent < 100;

    const pieData = [
      { name: "Realizado", value: Math.min(completionPercent, 100) },
      { name: "Restante", value: Math.max(100 - completionPercent, 0) }
    ];

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <TvHeader />

        {/* Main Content - Full Screen Pie */}
        <main className="flex-1 flex flex-col items-center justify-center px-8 py-6 relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-card/80 border border-border hover:bg-muted transition-colors z-10"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-card/80 border border-border hover:bg-muted transition-colors z-10"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Metric Title */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-4xl font-bold text-foreground">{currentMetric.nome}</h1>
              {isBelowTarget && (
                <Flag className="h-8 w-8 text-destructive" fill="currentColor" />
              )}
            </div>
            <p className="text-xl text-muted-foreground mt-2">{selectedCategory} • {selectedMonth}</p>
          </div>

          {/* Giant Pie Chart */}
          <div className="w-[55vh] h-[55vh] max-w-[550px] max-h-[550px] relative animate-scale-in">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius="30%"
                  outerRadius="90%"
                  startAngle={90}
                  endAngle={-270}
                  strokeWidth={0}
                >
                  <Cell fill={isBelowTarget ? "hsl(0, 72%, 51%)" : "hsl(142, 71%, 45%)"} />
                  <Cell fill="hsl(var(--muted))" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn(
                "text-4xl font-bold",
                isBelowTarget ? "text-destructive" : "text-green-500"
              )}>
                {completionPercent.toFixed(0)}%
              </span>
              <span className="text-sm text-muted-foreground">concluído</span>
            </div>
          </div>

          {/* Values */}
          <div className="flex gap-12 mt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Meta</p>
              <p className="text-3xl font-bold text-foreground">
                {formatValue(currentData?.previsto ?? null, unit)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Realizado</p>
              <p className={cn(
                "text-3xl font-bold",
                isBelowTarget ? "text-destructive" : "text-green-500"
              )}>
                {formatValue(currentData?.realizado ?? null, unit)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Diferença</p>
              <p className={cn(
                "text-3xl font-bold",
                (currentData?.diferenca ?? 0) < 0 ? "text-destructive" : "text-green-500"
              )}>
                {formatValue(currentData?.diferenca ?? null, unit)}
              </p>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  idx === currentIndex 
                    ? "bg-primary scale-125" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>

          {/* Auto-rotate indicator */}
          <p className="text-sm text-muted-foreground mt-4">
            Próximo em 15s • {currentIndex + 1} de {totalSlides}
          </p>
        </main>
      </div>
    );
  }

  // Grid Mode (original view)
  const indicatorsBelowTarget = filteredMetrics.filter((m) => {
    const data = m.dados.find((d) => d.mes === selectedMonth);
    return data?.concluido !== null && data?.concluido !== undefined && data.concluido < 100;
  }).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
            <button
              onClick={() => setTvMode(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Tv className="h-4 w-4" />
              <span>Modo TV</span>
            </button>
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
        <section className="mb-1">
          <h2 className="text-sm font-bold text-foreground">{selectedCategory}</h2>
          <p className="text-[10px] text-muted-foreground">
            {filteredMetrics.length} indicadores • {selectedMonth}
          </p>
        </section>

        {/* Metrics Grid - 6 colunas para TV */}
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredMetrics.map((metric) => {
            const unit = getUnit(metric.meta);
            const currentData = metric.dados.find((d) => d.mes === selectedMonth);
            const completionPercent = currentData?.concluido ?? 0;
            const isBelowTarget = completionPercent < 100;

            const pieData = [
              { name: "Realizado", value: Math.min(completionPercent, 100) },
              { name: "Restante", value: Math.max(100 - completionPercent, 0) }
            ];

            return (
              <div 
                key={metric.id}
                className={cn(
                  "rounded-xl border bg-card p-4 flex flex-col items-center",
                  isBelowTarget ? "border-destructive/40 bg-destructive/5" : "border-border"
                )}
              >
                <div className="flex items-center gap-1 mb-2">
                  <h3 className="font-semibold text-foreground text-sm text-center truncate">
                    {metric.nome}
                  </h3>
                  {isBelowTarget && (
                    <Flag className="h-3 w-3 text-destructive flex-shrink-0" fill="currentColor" />
                  )}
                </div>
                
                <div className="w-24 h-24 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius="35%"
                        outerRadius="90%"
                        startAngle={90}
                        endAngle={-270}
                        strokeWidth={0}
                      >
                        <Cell fill={isBelowTarget ? "hsl(0, 72%, 51%)" : "hsl(142, 71%, 45%)"} />
                        <Cell fill="hsl(var(--muted))" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={cn(
                      "text-lg font-bold",
                      isBelowTarget ? "text-destructive" : "text-green-500"
                    )}>
                      {completionPercent.toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-center text-xs">
                  <div className="text-muted-foreground">
                    Meta: {formatValue(currentData?.previsto ?? null, unit)}
                  </div>
                  <div className={cn(
                    "font-semibold",
                    isBelowTarget ? "text-destructive" : "text-foreground"
                  )}>
                    Real: {formatValue(currentData?.realizado ?? null, unit)}
                  </div>
                </div>
              </div>
            );
          })}
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