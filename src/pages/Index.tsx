import { useState, useMemo } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  Target,
  Tv,
  Clock,
  BarChart3,
  Receipt,
  PiggyBank,
  CreditCard,
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

  // Sample monthly chart data
  const monthlyChartData = useMemo(() => {
    const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", 
                   "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    return months.map((mes, i) => ({
      mes,
      valor: 500000000 + Math.random() * 200000000,
      percentual: 537 + Math.random() * 20,
    }));
  }, []);

  // Sample donut chart data
  const regionData = [
    { name: "Grande Vitória", value: 6430000000, color: "hsl(259, 100%, 60%)" },
    { name: "Outras localidades", value: 960000000, color: "hsl(200, 85%, 55%)" },
  ];

  // Sample table data
  const tableData = [
    { id: 1, nome: "Loja 4", grande_vitoria: 1637301996.62, outras: 0, total: 1637301996.62 },
    { id: 2, nome: "Loja 1", grande_vitoria: 1406053493.16, outras: 0, total: 1406053493.16 },
    { id: 3, nome: "Loja 2", grande_vitoria: 999596466.48, outras: 0, total: 999596466.48 },
    { id: 4, nome: "Loja 5", grande_vitoria: 967188556.93, outras: 0, total: 967188556.93 },
    { id: 5, nome: "Loja 7", grande_vitoria: 752093196.41, outras: 0, total: 752093196.41 },
  ];

  const tableColumns = [
    { key: "nome", label: "Nome Loja", align: "left" as const },
    { key: "grande_vitoria", label: "Grande Vitória", align: "right" as const, format: (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) },
    { key: "outras", label: "Outras localidades", align: "right" as const, format: (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) },
    { key: "total", label: "Total", align: "right" as const, format: (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) },
  ];

  // Sample horizontal bar data
  const groupData = [
    { label: "Venda Bruta d...", value: 1.15, formattedValue: "1.15 Bi" },
    { label: "Venda Líquida...", value: 1.06, formattedValue: "1.06 Bi" },
    { label: "CMV de merc...", value: 0.86, formattedValue: "0.86 Bi" },
    { label: "Margem + Bo...", value: 0.26, formattedValue: "0.26 Bi" },
    { label: "Margem Líqui...", value: 0.25, formattedValue: "0.25 Bi" },
    { label: "Total Despesas", value: 0.24, formattedValue: "0.24 Bi" },
    { label: "Margem Com...", value: 0.22, formattedValue: "0.22 Bi" },
    { label: "TOTAL Despes...", value: 0.21, formattedValue: "0.21 Bi" },
  ];

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
              {selectedCategory === "Todas" ? "EVOLUÇÃO MENSAL DAS CONTAS" : selectedCategory.toUpperCase()}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
              <Button variant="ghost" size="sm" className="text-xs">2024</Button>
              <Button variant="default" size="sm" className="text-xs">2025</Button>
            </div>
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
            title="Receita Líquida"
            value="1,25 Bi"
            icon={<DollarSign className="w-5 h-5 text-primary-foreground" />}
            iconBgColor="bg-emerald-600"
            delay={0}
          />
          <KPICardNew
            title="D. Não Recorrentes"
            value="9,58 Mi"
            icon={<Receipt className="w-5 h-5 text-primary-foreground" />}
            iconBgColor="bg-primary"
            delay={50}
          />
          <KPICardNew
            title="Despesas Financeiras"
            value="23,78 Mi"
            icon={<CreditCard className="w-5 h-5 text-primary-foreground" />}
            iconBgColor="bg-cyan-600"
            delay={100}
          />
          <KPICardNew
            title="Despesas Totais"
            value="241,54 Mi"
            icon={<PiggyBank className="w-5 h-5 text-primary-foreground" />}
            iconBgColor="bg-teal-600"
            delay={150}
          />
          <KPICardNew
            title="EBITDA"
            value="6,47 Mi"
            icon={<TrendingUp className="w-5 h-5 text-primary-foreground" />}
            iconBgColor="bg-purple-600"
            delay={200}
          />
          <KPICardNew
            title="Lucro Líquido"
            value="-38,63 Mi"
            icon={<Target className="w-5 h-5 text-primary-foreground" />}
            iconBgColor="bg-rose-600"
            valueColor="negative"
            delay={250}
          />
        </section>

        {/* Main Chart */}
        <section className="mb-5">
          <MonthlyChart 
            title="Realizado e Variação Mensal" 
            data={monthlyChartData}
            subtitle="Valor ● % da Receita Bruta"
          />
        </section>

        {/* Bottom Grid - 3 columns */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Donut Chart */}
          <DonutChart 
            title="Região" 
            data={regionData}
            centerValue="7,39 Bi"
            centerLabel="Total"
          />

          {/* Data Table */}
          <DataTable 
            title="" 
            columns={tableColumns}
            data={tableData}
            highlightColumn="total"
          />

          {/* Horizontal Bar Chart */}
          <HorizontalBarChart 
            title="Grupo da Conta" 
            data={groupData}
          />
        </section>
      </main>
    </div>
  );
};

export default Index;
