import { useState, useEffect, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Flag, Grid, Tv } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { initialMetrics, categorias, type Metric } from "@/data/dashboardData";
import { FloatingControls } from "@/components/dashboard/FloatingControls";

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

// Format value helper
const formatValue = (val: number | null, unit: string) => {
  if (val === null) return "–";
  if (unit === "R$") {
    if (val >= 1000000) return `R$ ${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `R$ ${(val / 1000).toFixed(0)}K`;
    return `R$ ${val.toFixed(0)}`;
  }
  return val.toLocaleString("pt-BR", { maximumFractionDigits: 2 }) + (unit ? ` ${unit}` : "");
};

const formatDiferenca = (val: number | null, unit: string) => {
  if (val === null) return "–";
  if (unit === "R$") {
    return `R$ ${val >= 0 ? "" : "-"}${Math.abs(val).toLocaleString("pt-BR")}`;
  }
  return `${val >= 0 ? "+" : ""}${val.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}${unit ? ` ${unit}` : ""}`;
};

// Single Slide Component - memoized and outside main component
const SingleSlide = memo(({ metric, selectedMonth }: { metric: Metric; selectedMonth: string }) => {
  const unit = getUnit(metric.meta);
  const data = metric.dados.find((d) => d.mes === selectedMonth);
  const previsto = data?.previsto ?? 0;
  const realizado = data?.realizado ?? 0;
  const concluido = data?.concluido ?? 0;
  const diferenca = data?.diferenca ?? 0;
  const isBelowTarget = concluido < 100;

  const pieData = useMemo(() => [
    { name: "Realizado", value: Math.min(concluido, 100) },
    { name: "Restante", value: Math.max(100 - concluido, 0) }
  ], [concluido]);

  const mainColor = isBelowTarget ? "#DC2626" : "#7C3AED";
  const bgColor = "hsl(var(--muted))";

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
      {/* Title with flag */}
      <div className="flex items-center gap-3">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center">
          {metric.nome}
        </h1>
        <Flag className={`w-8 h-8 ${isBelowTarget ? "text-red-600" : "text-purple-600"} fill-current`} />
      </div>

      {/* Category and month */}
      <p className="text-muted-foreground text-lg">
        {metric.categoria} • {selectedMonth}
      </p>

      {/* Giant Pie Chart */}
      <div className="relative my-4" style={{ width: 400, height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={180}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              isAnimationActive={false}
            >
              <Cell fill={mainColor} />
              <Cell fill={bgColor} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl md:text-6xl font-bold ${isBelowTarget ? "text-red-600" : "text-purple-600"}`}>
            {concluido.toFixed(0)}%
          </span>
          <span className="text-muted-foreground text-lg mt-1">concluído</span>
        </div>
      </div>

      {/* Values: META, REALIZADO, DIFERENÇA */}
      <div className="flex gap-12 md:gap-20 mt-2">
        <div className="text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-wide mb-1">Meta</p>
          <p className="text-foreground text-2xl md:text-3xl font-bold">
            {formatValue(previsto, unit)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-wide mb-1">Realizado</p>
          <p className={`text-2xl md:text-3xl font-bold ${isBelowTarget ? "text-red-600" : "text-purple-600"}`}>
            {formatValue(realizado, unit)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-wide mb-1">Diferença</p>
          <p className={`text-2xl md:text-3xl font-bold ${diferenca >= 0 ? "text-purple-600" : "text-red-600"}`}>
            {formatDiferenca(diferenca, unit)}
          </p>
        </div>
      </div>
    </div>
  );
});

SingleSlide.displayName = "SingleSlide";

// Summary Slide Component - memoized and outside main component
const SummarySlide = memo(({ 
  filteredMetrics, 
  selectedCategory, 
  selectedMonth 
}: { 
  filteredMetrics: Metric[]; 
  selectedCategory: string; 
  selectedMonth: string;
}) => {
  const gridCols = filteredMetrics.length <= 4 ? 2 : filteredMetrics.length <= 6 ? 3 : 4;

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-full px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center">
        Resumo Geral - {selectedCategory}
      </h1>
      <p className="text-muted-foreground text-lg mb-4">{selectedMonth} • Todos os indicadores</p>
      
      <div 
        className="grid gap-4 w-full max-w-6xl"
        style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
      >
        {filteredMetrics.map((metric) => {
          const unit = getUnit(metric.meta);
          const data = metric.dados.find((d) => d.mes === selectedMonth);
          const previsto = data?.previsto ?? 0;
          const realizado = data?.realizado ?? 0;
          const concluido = data?.concluido ?? 0;
          const isBelowTarget = concluido < 100;

          const pieData = [
            { name: "Realizado", value: Math.min(concluido, 100) },
            { name: "Restante", value: Math.max(100 - concluido, 0) }
          ];
          const mainColor = isBelowTarget ? "#DC2626" : "#7C3AED";
          const bgColor = "hsl(var(--muted))";

          return (
            <div 
              key={metric.id} 
              className="bg-card rounded-xl p-3 flex flex-col items-center border border-border"
            >
              <h3 className="text-foreground text-xs font-medium text-center mb-1 line-clamp-2 h-8">
                {metric.nome}
              </h3>
              
              <div className="relative" style={{ width: 100, height: 100 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={45}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      stroke="none"
                      isAnimationActive={false}
                    >
                      <Cell fill={mainColor} />
                      <Cell fill={bgColor} />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-sm font-bold ${isBelowTarget ? "text-red-600" : "text-purple-600"}`}>
                    {concluido.toFixed(0)}%
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-1 text-xs">
                <div className="text-center">
                  <p className="text-muted-foreground">Meta</p>
                  <p className="text-foreground font-semibold">
                    {formatValue(previsto, unit)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Real</p>
                  <p className={`font-semibold ${isBelowTarget ? "text-red-600" : "text-purple-600"}`}>
                    {formatValue(realizado, unit)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

SummarySlide.displayName = "SummarySlide";

// Header Component - memoized
const Header = memo(({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedMonth, 
  setSelectedMonth, 
  tvMode, 
  setTvMode 
}: {
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedMonth: string;
  setSelectedMonth: (v: string) => void;
  tvMode: boolean;
  setTvMode: (v: boolean) => void;
}) => (
  <header className="border-b border-border bg-background px-6 py-3">
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
          className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm"
        >
          {categorias.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm"
        >
          {meses.map((mes) => (
            <option key={mes} value={mes}>{mes}</option>
          ))}
        </select>
      </div>
      <button
        onClick={() => setTvMode(!tvMode)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-sm text-foreground"
      >
        {tvMode ? <Grid className="h-4 w-4" /> : <Tv className="h-4 w-4" />}
        <span>{tvMode ? "Grid" : "TV"}</span>
      </button>
    </div>
  </header>
));

Header.displayName = "Header";

// Timer display - memoized
const TimerDisplay = memo(({ 
  timeLeft, 
  isSummarySlide, 
  currentIndex, 
  totalMetrics 
}: { 
  timeLeft: number; 
  isSummarySlide: boolean; 
  currentIndex: number; 
  totalMetrics: number;
}) => (
  <p className="text-muted-foreground text-sm mt-4">
    {isSummarySlide 
      ? `Reiniciando em ${timeLeft} segundos • Resumo`
      : `Próximo indicador em ${timeLeft} segundos • ${currentIndex + 1} de ${totalMetrics}`
    }
  </p>
));

TimerDisplay.displayName = "TimerDisplay";

// Navigation dots - memoized
const NavigationDots = memo(({ 
  totalSlides, 
  currentIndex, 
  metricsLength, 
  onSelect 
}: { 
  totalSlides: number; 
  currentIndex: number; 
  metricsLength: number;
  onSelect: (idx: number) => void;
}) => (
  <div className="flex gap-2 mt-8">
    {[...Array(totalSlides)].map((_, idx) => (
      <button
        key={idx}
        onClick={() => onSelect(idx)}
        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
          idx === currentIndex
            ? idx === metricsLength 
              ? "bg-green-500 scale-125" 
              : "bg-blue-600 scale-125"
            : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
        }`}
      />
    ))}
  </div>
));

NavigationDots.displayName = "NavigationDots";

const AreaIndicadores = () => {
  const [metrics] = useState<Metric[]>(initialMetrics);
  const [selectedCategory, setSelectedCategory] = useState("B2B e B2BC");
  const [selectedMonth, setSelectedMonth] = useState("Novembro");
  const [tvMode, setTvMode] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const filteredMetrics = useMemo(() => 
    metrics.filter((m) => m.categoria === selectedCategory), 
    [metrics, selectedCategory]
  );
  
  // Total slides = individual metrics + 1 summary slide
  const totalSlides = filteredMetrics.length + 1;
  const isSummarySlide = currentIndex === filteredMetrics.length;
  const slideInterval = isSummarySlide ? 60 : 30; // 60s for summary, 30s for individual

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Countdown timer - only updates timeLeft state
  useEffect(() => {
    if (!tvMode) return;
    
    setTimeLeft(slideInterval);
    
    const countdown = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentIndex, tvMode, slideInterval]);

  // Auto-advance slides
  useEffect(() => {
    if (!tvMode) return;
    
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, slideInterval * 1000);

    return () => clearTimeout(timeout);
  }, [currentIndex, totalSlides, tvMode, slideInterval]);

  const currentMetric = !isSummarySlide ? filteredMetrics[currentIndex] : null;

  // TV Mode
  if (tvMode) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          tvMode={tvMode}
          setTvMode={setTvMode}
        />
        
        <main className="flex-1 flex flex-col items-center justify-center px-8 py-6">
          {isSummarySlide ? (
            <SummarySlide 
              filteredMetrics={filteredMetrics}
              selectedCategory={selectedCategory}
              selectedMonth={selectedMonth}
            />
          ) : (
            currentMetric && (
              <SingleSlide 
                metric={currentMetric} 
                selectedMonth={selectedMonth}
              />
            )
          )}
          
          <NavigationDots 
            totalSlides={totalSlides}
            currentIndex={currentIndex}
            metricsLength={filteredMetrics.length}
            onSelect={setCurrentIndex}
          />

          <TimerDisplay 
            timeLeft={timeLeft}
            isSummarySlide={isSummarySlide}
            currentIndex={currentIndex}
            totalMetrics={filteredMetrics.length}
          />
          <FloatingControls />
        </main>
      </div>
    );
  }

  // Grid Mode
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        tvMode={tvMode}
        setTvMode={setTvMode}
      />
      
      <main className="flex-1 p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">{selectedCategory}</h1>
          <p className="text-lg text-muted-foreground">{selectedMonth}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMetrics.map((metric) => {
            const unit = getUnit(metric.meta);
            const data = metric.dados.find((d) => d.mes === selectedMonth);
            const previsto = data?.previsto ?? 0;
            const realizado = data?.realizado ?? 0;
            const concluido = data?.concluido ?? 0;
            const isBelowTarget = concluido < 100;

            const pieData = [
              { name: "Realizado", value: Math.min(concluido, 100) },
              { name: "Restante", value: Math.max(100 - concluido, 0) }
            ];
            const mainColor = isBelowTarget ? "#DC2626" : "#7C3AED";
            const bgColor = "hsl(var(--muted))";

            return (
              <div 
                key={metric.id} 
                className="bg-card rounded-xl p-4 flex flex-col items-center border border-border"
              >
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-foreground text-sm font-medium text-center line-clamp-2">
                    {metric.nome}
                  </h3>
                  {isBelowTarget && <Flag className="w-4 h-4 text-red-500 fill-current flex-shrink-0" />}
                </div>
                
                <div className="relative" style={{ width: 120, height: 120 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={55}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                        stroke="none"
                        isAnimationActive={false}
                      >
                        <Cell fill={mainColor} />
                        <Cell fill={bgColor} />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-lg font-bold ${isBelowTarget ? "text-red-600" : "text-purple-600"}`}>
                      {concluido.toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 mt-2 text-xs">
                  <div className="text-center">
                    <p className="text-muted-foreground">Meta</p>
                    <p className="text-foreground font-semibold">
                      {formatValue(previsto, unit)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Real</p>
                    <p className={`font-semibold ${isBelowTarget ? "text-red-600" : "text-purple-600"}`}>
                      {formatValue(realizado, unit)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <FloatingControls />
      </main>
    </div>
  );
};

export default AreaIndicadores;
