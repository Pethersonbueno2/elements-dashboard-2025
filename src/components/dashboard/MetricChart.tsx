import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { MetricData } from "@/data/dashboardData";

interface MetricChartProps {
  data: MetricData[];
  title: string;
}

export function MetricChart({ data, title }: MetricChartProps) {
  const chartData = data.map((item) => ({
    name: item.mes.substring(0, 3),
    previsto: item.previsto,
    realizado: item.realizado,
  }));

  return (
    <div className="h-80 w-full">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrevisto" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(160, 84%, 32%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(160, 84%, 32%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRealizado" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(200, 70%, 50%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(200, 70%, 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(160, 15%, 88%)" />
          <XAxis 
            dataKey="name" 
            stroke="hsl(160, 10%, 45%)"
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="hsl(160, 10%, 45%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(160, 15%, 88%)",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            labelStyle={{ color: "hsl(160, 25%, 12%)", fontWeight: 600 }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="previsto"
            name="Previsto"
            stroke="hsl(160, 84%, 32%)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPrevisto)"
          />
          <Area
            type="monotone"
            dataKey="realizado"
            name="Realizado"
            stroke="hsl(200, 70%, 50%)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRealizado)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
