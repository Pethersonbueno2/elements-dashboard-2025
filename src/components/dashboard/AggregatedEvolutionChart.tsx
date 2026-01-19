import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Metric } from "@/data/dashboardData";

interface AggregatedEvolutionChartProps {
  metrics: Metric[];
  title?: string;
  subtitle?: string;
}

// Formata valores - preserva decimais para valores pequenos
const formatValue = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "0";
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}Bi`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}Mi`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  // Preserva decimais para valores pequenos
  if (value > 0 && value < 10) return value.toFixed(2);
  if (value % 1 !== 0) return value.toFixed(2);
  return value.toFixed(0);
};

const CustomLabelPrevisto = (props: any) => {
  const { x, y, value } = props;
  if (value === 0 || value === null || value === undefined) return null;
  
  return (
    <text
      x={x}
      y={y - 20}
      fill="hsl(var(--primary))"
      textAnchor="middle"
      fontSize={9}
      fontWeight={600}
    >
      {formatValue(value)}
    </text>
  );
};

const CustomLabelRealizado = (props: any) => {
  const { x, y, value, payload } = props;
  if (value === 0 || value === null || value === undefined) return null;
  
  const isMetaAtingida = payload && payload.realizado >= payload.previsto;
  const color = isMetaAtingida ? "hsl(142 76% 36%)" : "hsl(0 84% 60%)";
  
  return (
    <text
      x={x}
      y={y + 15}
      fill={color}
      textAnchor="middle"
      fontSize={9}
      fontWeight={600}
    >
      {formatValue(value)}
    </text>
  );
};

// Dot customizado que muda de cor baseado no atingimento da meta
const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (!payload || payload.realizado === 0 || payload.realizado === null) return null;
  
  const isMetaAtingida = payload.realizado >= payload.previsto;
  const color = isMetaAtingida ? "hsl(142 76% 36%)" : "hsl(0 84% 60%)";
  
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill={color}
      stroke={color}
      strokeWidth={2}
    />
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => {
          // Define cor dinâmica para Realizado
          let dotColor = entry.color;
          if (entry.name === "Realizado" && entry.payload) {
            const isMetaAtingida = entry.payload.realizado >= entry.payload.previsto;
            dotColor = isMetaAtingida ? "hsl(142 76% 36%)" : "hsl(0 84% 60%)";
          }
          return (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: dotColor }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-medium text-foreground">
                {formatValue(entry.value || 0)}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export function AggregatedEvolutionChart({
  metrics,
  title = "Evolução Agregada",
  subtitle = "Comparativo Previsto vs Realizado por mês",
}: AggregatedEvolutionChartProps) {
  const chartData = useMemo(() => {
    const fullMonthNames = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const shortMonthNames = [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ];

    // Pega os meses únicos dos dados filtrados
    const monthsInData = new Set<string>();
    metrics.forEach((metric) => {
      metric.dados.forEach((d) => {
        if (d.mes) monthsInData.add(d.mes);
      });
    });

    // Ordena os meses na ordem correta
    const orderedMonths = fullMonthNames.filter(m => monthsInData.has(m));

    return orderedMonths.map((mesCompleto) => {
      const index = fullMonthNames.indexOf(mesCompleto);
      const mesAbrev = shortMonthNames[index] || mesCompleto.substring(0, 3);
      
      let totalRealizado = 0;
      let totalPrevisto = 0;

      metrics.forEach((metric) => {
        const monthData = metric.dados.find(d => d.mes === mesCompleto);
        if (monthData) {
          if (monthData.realizado !== null) {
            totalRealizado += monthData.realizado;
          }
          if (monthData.previsto !== null) {
            totalPrevisto += monthData.previsto;
          }
        }
      });

      return {
        mes: mesAbrev,
        previsto: totalPrevisto,
        realizado: totalRealizado,
        metaAtingida: totalRealizado >= totalPrevisto,
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
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 30, right: 10, left: 10, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorPrevisto" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="colorRealizadoGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142 76% 36%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(142 76% 36%)" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="colorRealizadoRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0 84% 60%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(0 84% 60%)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
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
                width={50}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                height={36}
                formatter={(value) => <span className="text-xs text-foreground">{value}</span>}
              />
              <Area
                type="monotone"
                dataKey="previsto"
                name="Previsto"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#colorPrevisto)"
              >
                <LabelList content={<CustomLabelPrevisto />} dataKey="previsto" position="top" />
              </Area>
              <Area
                type="monotone"
                dataKey="realizado"
                name="Realizado"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                fill="transparent"
                dot={<CustomDot />}
                activeDot={<CustomDot />}
              >
                <LabelList content={<CustomLabelRealizado />} dataKey="realizado" position="bottom" />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
