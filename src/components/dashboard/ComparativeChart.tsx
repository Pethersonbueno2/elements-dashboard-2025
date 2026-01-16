import { useMemo } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Metric } from "@/data/dashboardData";

interface ComparativeChartProps {
  metrics: Metric[];
  title?: string;
  subtitle?: string;
}

const formatValue = (value: number): string => {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}Bi`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}Mi`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  if (value % 1 !== 0) return value.toFixed(1);
  return value.toFixed(0);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-foreground">
              {formatValue(entry.value || 0)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function ComparativeChart({
  metrics,
  title = "Comparativo Mensal",
  subtitle = "Previsto vs Realizado",
}: ComparativeChartProps) {
  const chartData = useMemo(() => {
    const months = [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ];

    return months.map((mes, index) => {
      let totalPrevisto = 0;
      let totalRealizado = 0;

      metrics.forEach((metric) => {
        const monthData = metric.dados[index];
        if (monthData) {
          totalPrevisto += monthData.previsto ?? 0;
          totalRealizado += monthData.realizado ?? 0;
        }
      });

      return {
        mes,
        previsto: totalPrevisto,
        realizado: totalRealizado,
      };
    });
  }, [metrics]);

  return (
    <Card className="bg-card border-border h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          {title}
        </CardTitle>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.3}
                vertical={false}
              />
              <XAxis
                dataKey="mes"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => formatValue(value)}
                width={45}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: 10 }}
                formatter={(value) => (
                  <span className="text-xs text-muted-foreground">{value}</span>
                )}
              />
              <Bar
                dataKey="previsto"
                name="Previsto"
                fill="hsl(220, 40%, 35%)"
                radius={[4, 4, 0, 0]}
                maxBarSize={25}
              >
                <LabelList
                  dataKey="previsto"
                  position="top"
                  content={({ x, y, width, value }: any) => {
                    if (!value) return null;
                    return (
                      <text
                        x={x + width / 2}
                        y={y - 5}
                        textAnchor="middle"
                        fill="hsl(var(--muted-foreground))"
                        fontSize={9}
                      >
                        {formatValue(value)}
                      </text>
                    );
                  }}
                />
              </Bar>
              <Bar
                dataKey="realizado"
                name="Realizado"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                maxBarSize={25}
              >
                <LabelList
                  dataKey="realizado"
                  position="top"
                  content={({ x, y, width, value }: any) => {
                    if (!value) return null;
                    return (
                      <text
                        x={x + width / 2}
                        y={y - 5}
                        textAnchor="middle"
                        fill="hsl(var(--foreground))"
                        fontSize={9}
                        fontWeight={600}
                      >
                        {formatValue(value)}
                      </text>
                    );
                  }}
                />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
