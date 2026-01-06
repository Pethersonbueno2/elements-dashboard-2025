import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { TVMetricCarousel } from "@/components/dashboard/TVMetricCarousel";
import { useMetricsFromDB } from "@/hooks/useMetricsFromDB";

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const AreaIndicadores = () => {
  const { data, isLoading, error } = useMetricsFromDB();
  const [selectedCategory, setSelectedCategory] = useState("B2B e B2BC");
  const [selectedMonth, setSelectedMonth] = useState("Novembro");

  const categories = data?.categories || [];
  const metrics = data?.metrics || [];

  const filteredMetrics = useMemo(() => {
    return metrics.filter((m) => m.categoria === selectedCategory);
  }, [metrics, selectedCategory]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive text-xl">Erro ao carregar dados</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Compact Header for TV */}
      <header className="border-b border-border bg-card/95 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <h1 className="text-lg font-bold text-foreground">{selectedCategory}</h1>
        </div>
        
        {/* Filters */}
        <div className="flex gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1 text-sm rounded border border-border bg-card text-foreground"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-1 text-sm rounded border border-border bg-card text-foreground"
          >
            {meses.map((mes) => (
              <option key={mes} value={mes}>{mes}</option>
            ))}
          </select>
        </div>
      </header>

      {/* TV Carousel - Full screen */}
      <div className="flex-1">
        {filteredMetrics.length > 0 ? (
          <TVMetricCarousel 
            metrics={filteredMetrics} 
            selectedMonth={selectedMonth}
            intervalMs={5000}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center h-full">
            <p className="text-muted-foreground text-2xl">
              Nenhum indicador nesta categoria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AreaIndicadores;
