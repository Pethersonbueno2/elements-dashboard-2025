import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { TVMetricGrid } from "@/components/dashboard/TVMetricGrid";
import { useMetricsFromDB } from "@/hooks/useMetricsFromDB";

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const TVDashboard = () => {
  const { data, isLoading, error } = useMetricsFromDB();
  const [selectedMonth, setSelectedMonth] = useState("Novembro");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const categories = data?.categories || [];
  const metrics = data?.metrics || [];
  
  const selectedCategory = categories[selectedCategoryIndex] || "";
  
  const filteredMetrics = useMemo(() => {
    return metrics.filter(m => m.categoria === selectedCategory);
  }, [metrics, selectedCategory]);

  const goToPrevCategory = () => {
    if (categories.length === 0) return;
    setSelectedCategoryIndex((prev) => 
      prev === 0 ? categories.length - 1 : prev - 1
    );
  };

  const goToNextCategory = () => {
    if (categories.length === 0) return;
    setSelectedCategoryIndex((prev) => 
      prev === categories.length - 1 ? 0 : prev + 1
    );
  };

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
          
          {/* Category Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevCategory}
              className="p-1 rounded hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold text-foreground min-w-[200px] text-center">
              {selectedCategory}
            </h1>
            <button
              onClick={goToNextCategory}
              className="p-1 rounded hover:bg-muted transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          <span className="text-xs text-muted-foreground">
            ({categories.length > 0 ? selectedCategoryIndex + 1 : 0}/{categories.length})
          </span>
        </div>
        
        {/* Month Filter */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-3 py-1 text-sm rounded border border-border bg-card text-foreground"
        >
          {meses.map((mes) => (
            <option key={mes} value={mes}>{mes}</option>
          ))}
        </select>
      </header>

      {/* TV Grid - Shows ALL metrics for selected category on same page */}
      <div className="flex-1 overflow-hidden">
        {filteredMetrics.length > 0 ? (
          <TVMetricGrid 
            metrics={filteredMetrics} 
            selectedMonth={selectedMonth}
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

export default TVDashboard;
