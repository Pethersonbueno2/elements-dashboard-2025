import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Trophy, Target, ClipboardCheck } from "lucide-react";
import { Metric, categorias } from "@/data/dashboardData";

interface ExecutivePanelProps {
  metrics: Metric[];
  selectedMonth?: string;
}

export function ExecutivePanel({ metrics, selectedMonth = "Novembro" }: ExecutivePanelProps) {
  const analysis = useMemo(() => {
    const byCategory: Record<string, { total: number; achieved: number; notAchieved: number; notReported: number }> = {};

    // Initialize all categories
    categorias.forEach((cat) => {
      byCategory[cat] = { total: 0, achieved: 0, notAchieved: 0, notReported: 0 };
    });

    // Analyze each metric for the selected month
    metrics.forEach((metric) => {
      const monthData = metric.dados.find((d) => d.mes === selectedMonth);
      const cat = metric.categoria;

      if (!byCategory[cat]) {
        byCategory[cat] = { total: 0, achieved: 0, notAchieved: 0, notReported: 0 };
      }

      byCategory[cat].total++;

      if (!monthData || monthData.realizado === null || monthData.previsto === null) {
        byCategory[cat].notReported++;
      } else if (monthData.concluido !== null && monthData.concluido >= 100) {
        byCategory[cat].achieved++;
      } else {
        byCategory[cat].notAchieved++;
      }
    });

    // Calculate totals
    let totalAchieved = 0;
    let totalNotAchieved = 0;
    let totalNotReported = 0;

    Object.values(byCategory).forEach((cat) => {
      totalAchieved += cat.achieved;
      totalNotAchieved += cat.notAchieved;
      totalNotReported += cat.notReported;
    });

    return {
      byCategory,
      totals: {
        achieved: totalAchieved,
        notAchieved: totalNotAchieved,
        notReported: totalNotReported,
        total: totalAchieved + totalNotAchieved + totalNotReported,
      },
    };
  }, [metrics, selectedMonth]);

  // Data for general performance pie chart
  const performanceData = [
    { name: "Atingidos", value: analysis.totals.achieved, color: "#22c55e" },
    { name: "Não Atingidos", value: analysis.totals.notAchieved, color: "#ef4444" },
  ];

  // Data for ranking by area (sorted by achieved count)
  const rankingData = Object.entries(analysis.byCategory)
    .map(([category, data]) => ({
      category: category.length > 12 ? category.substring(0, 12) + "..." : category,
      fullCategory: category,
      atingidos: data.achieved,
      total: data.total,
      percentual: data.total > 0 ? Math.round((data.achieved / data.total) * 100) : 0,
    }))
    .filter((item) => item.total > 0)
    .sort((a, b) => b.atingidos - a.atingidos);

  // Data for unreported indicators alert
  const alertData = Object.entries(analysis.byCategory)
    .map(([category, data]) => ({
      category,
      notReported: data.notReported,
      total: data.total,
    }))
    .filter((item) => item.notReported > 0)
    .sort((a, b) => b.notReported - a.notReported);

  // Data for report discipline (stacked bar)
  const disciplineData = Object.entries(analysis.byCategory)
    .map(([category, data]) => ({
      category: category.length > 10 ? category.substring(0, 10) + "..." : category,
      fullCategory: category,
      preenchidos: data.achieved + data.notAchieved,
      naoPreenchidos: data.notReported,
      total: data.total,
    }))
    .filter((item) => item.total > 0)
    .sort((a, b) => b.total - a.total);

  const achievedPercentage = analysis.totals.total > 0 
    ? Math.round((analysis.totals.achieved / (analysis.totals.achieved + analysis.totals.notAchieved)) * 100) 
    : 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{payload[0].payload.fullCategory || payload[0].name}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color || entry.fill }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-semibold text-foreground">Painel de Controle Mensal</h2>
        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
          {selectedMonth}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* 1. Performance Geral dos Indicadores */}
        <Card className="animate-fade-in">
          <CardHeader className="pb-1 pt-3 px-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-semibold">Performance Geral</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex items-center gap-4">
              <div className="h-[140px] w-[140px] flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={performanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={60}
                      dataKey="value"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-500" />
                  <div>
                    <p className="text-xl font-bold text-green-600">{analysis.totals.achieved}</p>
                    <p className="text-xs text-muted-foreground">Atingidos ({achievedPercentage}%)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-red-500" />
                  <div>
                    <p className="text-xl font-bold text-red-600">{analysis.totals.notAchieved}</p>
                    <p className="text-xs text-muted-foreground">Não Atingidos</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total: {analysis.totals.achieved + analysis.totals.notAchieved} reportados
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Ranking de Performance por Área */}
        <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <CardHeader className="pb-1 pt-3 px-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <CardTitle className="text-sm font-semibold">Ranking por Área</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <div className="h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rankingData} layout="vertical" margin={{ left: 0, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis 
                    type="category" 
                    dataKey="category" 
                    width={80} 
                    tick={{ fontSize: 9 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="atingidos" 
                    name="Indicadores Atingidos"
                    radius={[0, 4, 4, 0]}
                  >
                    {rankingData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index < 3 ? "hsl(264, 100%, 50%)" : "hsl(264, 80%, 70%)"} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-1.5 mt-2 flex-wrap">
              {rankingData.slice(0, 3).map((item, index) => (
                <div 
                  key={item.fullCategory}
                  className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 rounded-full text-xs"
                >
                  <span className="font-bold text-primary">#{index + 1}</span>
                  <span className="text-foreground truncate max-w-[80px]">{item.fullCategory}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 3. Indicadores Não Reportados - Alerta */}
        <Card className="animate-fade-in border-amber-500/50 bg-amber-500/5" style={{ animationDelay: "200ms" }}>
          <CardHeader className="pb-1 pt-3 px-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <CardTitle className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                Não Reportados – Alerta
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-3">
            {alertData.length > 0 ? (
              <div className="space-y-2">
                <div className="text-xs text-amber-700 dark:text-amber-400 mb-2">
                  Total de {analysis.totals.notReported} indicadores pendentes
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-[140px] overflow-y-auto">
                  {alertData.map((item) => (
                    <div
                      key={item.category}
                      className="flex items-center justify-between p-2 bg-amber-500/10 rounded-lg border border-amber-500/20"
                    >
                      <span className="text-xs font-medium truncate mr-1">{item.category}</span>
                      <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                        {item.notReported}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[140px] text-green-600">
                <div className="text-center">
                  <p className="text-sm font-medium">Todos reportados!</p>
                  <p className="text-xs text-muted-foreground">Excelente disciplina</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 4. Disciplina de Reporte por Área */}
        <Card className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <CardHeader className="pb-1 pt-3 px-4">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4 text-blue-500" />
              <CardTitle className="text-sm font-semibold">Disciplina de Reporte</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={disciplineData} margin={{ left: 0, right: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis 
                    dataKey="category" 
                    tick={{ fontSize: 8 }} 
                    angle={-45} 
                    textAnchor="end" 
                    height={50}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar 
                    dataKey="preenchidos" 
                    name="Preenchidos" 
                    stackId="a" 
                    fill="hsl(264, 100%, 50%)" 
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar 
                    dataKey="naoPreenchidos" 
                    name="Não Preenchidos" 
                    stackId="a" 
                    fill="#f59e0b" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 5. Resumo de Metas - Card Extra */}
        <Card className="animate-fade-in bg-gradient-to-br from-primary/5 to-primary/10" style={{ animationDelay: "400ms" }}>
          <CardHeader className="pb-1 pt-3 px-4">
            <CardTitle className="text-sm font-semibold">Resumo de Metas</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-background/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">{analysis.totals.total}</p>
                <p className="text-xs text-muted-foreground">Total Indicadores</p>
              </div>
              <div className="text-center p-3 bg-background/50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{achievedPercentage}%</p>
                <p className="text-xs text-muted-foreground">Taxa de Sucesso</p>
              </div>
              <div className="text-center p-3 bg-background/50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{Object.keys(analysis.byCategory).length}</p>
                <p className="text-xs text-muted-foreground">Áreas</p>
              </div>
              <div className="text-center p-3 bg-background/50 rounded-lg">
                <p className="text-2xl font-bold text-amber-600">{analysis.totals.notReported}</p>
                <p className="text-xs text-muted-foreground">Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6. Top Performers */}
        <Card className="animate-fade-in" style={{ animationDelay: "500ms" }}>
          <CardHeader className="pb-1 pt-3 px-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <CardTitle className="text-sm font-semibold">Top Performers</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <div className="space-y-2">
              {rankingData.slice(0, 5).map((item, index) => (
                <div 
                  key={item.fullCategory}
                  className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-amber-700 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="text-xs font-medium truncate max-w-[100px]">{item.fullCategory}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{item.atingidos}/{item.total}</p>
                    <p className="text-xs text-muted-foreground">{item.percentual}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
