import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { type Metric } from "@/data/dashboardData";

interface MonthlyDetailChartProps {
  metrics: Metric[];
  title?: string;
  subtitle?: string;
}

const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const formatValue = (value: number | null): string => {
  if (value === null || value === undefined) return "-";
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}Bi`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}Mi`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  if (value % 1 !== 0) return value.toFixed(1);
  return value.toFixed(0);
};

// Componente de label customizado para exibir valores
const CustomLabel = (props: any) => {
  const { x, y, width, value } = props;
  if (value === null || value === undefined || value === 0) return null;
  
  return (
    <text
      x={x + width / 2}
      y={y - 5}
      fill="hsl(var(--foreground))"
      textAnchor="middle"
      fontSize={10}
      fontWeight={500}
    >
      {formatValue(value)}
    </text>
  );
};

// Tooltip customizado
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const previsto = payload.find((p: any) => p.dataKey === 'previsto');
    const realizado = payload.find((p: any) => p.dataKey === 'realizado');

    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
        {previsto && (
          <p className="text-xs text-primary">
            Previsto: <span className="font-medium">{formatValue(previsto.value)}</span>
          </p>
        )}
        {realizado && (
          <p className="text-xs text-success">
            Realizado: <span className="font-medium">{formatValue(realizado.value)}</span>
          </p>
        )}
        {previsto && realizado && previsto.value && realizado.value && (
          <p className={`text-xs mt-1 ${realizado.value >= previsto.value ? 'text-success' : 'text-orange-500'}`}>
            {realizado.value >= previsto.value ? '✓ Meta atingida' : '⚠ Abaixo da meta'}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export function MonthlyDetailChart({
  metrics,
  title = "Detalhamento Mensal",
  subtitle = "Valores de Previsto e Realizado por mês para cada indicador",
}: MonthlyDetailChartProps) {
  // Agregar dados por mês
  const chartData = useMemo(() => {
    const aggregated: Record<string, { previsto: number; realizado: number }> = {};
    
    // Inicializa todos os meses
    monthNames.forEach((month, index) => {
      aggregated[months[index]] = { previsto: 0, realizado: 0 };
    });

    // Soma os valores de todos os indicadores por mês
    metrics.forEach((metric) => {
      metric.dados.forEach((d, index) => {
        const monthKey = months[index];
        if (aggregated[monthKey]) {
          aggregated[monthKey].previsto += d.previsto || 0;
          aggregated[monthKey].realizado += d.realizado || 0;
        }
      });
    });

    return months.map((month) => ({
      month,
      previsto: aggregated[month].previsto,
      realizado: aggregated[month].realizado,
      atingido: aggregated[month].realizado >= aggregated[month].previsto,
    }));
  }, [metrics]);

  // Gráfico individual por indicador
  const indicatorCharts = useMemo(() => {
    return metrics.slice(0, 4).map((metric) => {
      const data = metric.dados.map((d, index) => ({
        month: months[index],
        previsto: d.previsto,
        realizado: d.realizado,
        atingido: d.realizado !== null && d.previsto !== null && d.realizado >= d.previsto,
      }));

      return {
        id: metric.id,
        nome: metric.nome.replace(/^[^-]+ – /, '').replace(/^[^-]+ - /, ''),
        meta: metric.meta,
        data,
      };
    });
  }, [metrics]);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          {title}
        </CardTitle>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gráfico agregado */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tickFormatter={formatValue}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                width={50}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="previsto" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Previsto">
                <LabelList dataKey="previsto" content={<CustomLabel />} />
              </Bar>
              <Bar dataKey="realizado" radius={[4, 4, 0, 0]} name="Realizado">
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.atingido ? 'hsl(var(--success))' : 'hsl(25 95% 53%)'} 
                  />
                ))}
                <LabelList dataKey="realizado" content={<CustomLabel />} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legenda */}
        <div className="flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary" />
            <span className="text-muted-foreground">Previsto</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-success" />
            <span className="text-muted-foreground">Realizado (meta atingida)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(25 95% 53%)' }} />
            <span className="text-muted-foreground">Realizado (abaixo da meta)</span>
          </div>
        </div>

        {/* Grid de gráficos por indicador */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {indicatorCharts.map((chart) => (
            <div key={chart.id} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {chart.nome}
                </h4>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  Meta: {chart.meta}
                </span>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chart.data} margin={{ top: 15, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 8 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="previsto" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} barSize={8}>
                      <LabelList dataKey="previsto" position="top" fontSize={8} fill="hsl(var(--muted-foreground))" formatter={formatValue} />
                    </Bar>
                    <Bar dataKey="realizado" radius={[2, 2, 0, 0]} barSize={8}>
                      {chart.data.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.atingido ? 'hsl(var(--success))' : 'hsl(25 95% 53%)'} 
                        />
                      ))}
                      <LabelList dataKey="realizado" position="top" fontSize={8} fill="hsl(var(--muted-foreground))" formatter={formatValue} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
