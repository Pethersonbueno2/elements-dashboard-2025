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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Performance Geral dos Indicadores */}
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Performance Geral dos Indicadores</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="h-[200px] w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={performanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-green-600">{analysis.totals.achieved}</p>
                    <p className="text-sm text-muted-foreground">Atingidos ({achievedPercentage}%)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-red-500" />
                  <div>
                    <p className="text-2xl font-bold text-red-600">{analysis.totals.notAchieved}</p>
                    <p className="text-sm text-muted-foreground">Não Atingidos</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Total: {analysis.totals.achieved + analysis.totals.notAchieved} indicadores reportados
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Ranking de Performance por Área */}
        <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <CardTitle className="text-lg">Ranking de Performance por Área</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rankingData} layout="vertical" margin={{ left: 10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="category" 
                    width={100} 
                    tick={{ fontSize: 11 }}
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
                        fill={index < 3 ? "#22c55e" : "#86efac"} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-2 mt-3">
              {rankingData.slice(0, 3).map((item, index) => (
                <div 
                  key={item.fullCategory}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full text-sm"
                >
                  <span className="font-bold text-green-600">#{index + 1}</span>
                  <span className="text-foreground truncate max-w-[120px]">{item.fullCategory}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 3. Indicadores Não Reportados - Alerta */}
        <Card className="animate-fade-in border-amber-500/50 bg-amber-500/5" style={{ animationDelay: "200ms" }}>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-lg text-amber-700 dark:text-amber-400">
                Indicadores Não Reportados – Alerta
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {alertData.length > 0 ? (
              <div className="space-y-3">
                <div className="text-sm text-amber-700 dark:text-amber-400 mb-4">
                  Total de {analysis.totals.notReported} indicadores pendentes de preenchimento
                </div>
                <div className="grid grid-cols-2 gap-3 max-h-[180px] overflow-y-auto">
                  {alertData.map((item) => (
                    <div
                      key={item.category}
                      className="flex items-center justify-between p-3 bg-amber-500/10 rounded-lg border border-amber-500/20"
                    >
                      <span className="text-sm font-medium truncate mr-2">{item.category}</span>
                      <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                        {item.notReported}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[150px] text-green-600">
                <div className="text-center">
                  <p className="text-lg font-medium">Todos os indicadores foram reportados!</p>
                  <p className="text-sm text-muted-foreground">Excelente disciplina de reporte</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 4. Disciplina de Reporte por Área */}
        <Card className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg">Disciplina de Reporte por Área</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={disciplineData} margin={{ left: 10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis 
                    dataKey="category" 
                    tick={{ fontSize: 10 }} 
                    angle={-45} 
                    textAnchor="end" 
                    height={60}
                  />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="preenchidos" 
                    name="Preenchidos" 
                    stackId="a" 
                    fill="#22c55e" 
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
      </div>
    </section>
  );
}
