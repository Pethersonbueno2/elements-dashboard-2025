import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { TVMetricCarousel } from "@/components/dashboard/TVMetricCarousel";
import { initialMetrics, type Metric } from "@/data/dashboardData";

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const TVDashboard = () => {
  const [metrics] = useState<Metric[]>(initialMetrics);
  const [selectedMonth, setSelectedMonth] = useState("Novembro");

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
          <h1 className="text-lg font-bold text-foreground">Todos os Indicadores</h1>
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

      {/* TV Carousel - Full screen with ALL metrics */}
      <div className="flex-1">
        <TVMetricCarousel 
          metrics={metrics} 
          selectedMonth={selectedMonth}
          intervalMs={5000}
        />
      </div>
    </div>
  );
};

export default TVDashboard;
