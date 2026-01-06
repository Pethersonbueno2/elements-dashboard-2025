import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { TVMetricGrid } from "@/components/dashboard/TVMetricGrid";
import { initialMetrics, categorias, type Metric } from "@/data/dashboardData";

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const TVDashboard = () => {
  const [metrics] = useState<Metric[]>(initialMetrics);
  const [selectedMonth, setSelectedMonth] = useState("Novembro");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const selectedCategory = categorias[selectedCategoryIndex];
  
  const filteredMetrics = useMemo(() => {
    return metrics.filter(m => m.categoria === selectedCategory);
  }, [metrics, selectedCategory]);

  const goToPrevCategory = () => {
    setSelectedCategoryIndex((prev) => 
      prev === 0 ? categorias.length - 1 : prev - 1
    );
  };

  const goToNextCategory = () => {
    setSelectedCategoryIndex((prev) => 
      prev === categorias.length - 1 ? 0 : prev + 1
    );
  };

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
            ({selectedCategoryIndex + 1}/{categorias.length})
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
