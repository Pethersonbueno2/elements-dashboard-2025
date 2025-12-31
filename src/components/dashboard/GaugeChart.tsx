import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface GaugeChartProps {
  value: number;
  max: number;
  label: string;
  color?: string;
}

export function GaugeChart({ value, max, label, color = "hsl(264, 100%, 50%)" }: GaugeChartProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const data = [
    { name: "value", value: percentage },
    { name: "empty", value: 100 - percentage },
  ];

  const getColor = () => {
    if (percentage >= 100) return "hsl(142, 76%, 36%)";
    if (percentage >= 80) return "hsl(38, 92%, 50%)";
    return "hsl(0, 72%, 51%)";
  };

  return (
    <div className="relative w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="70%"
            startAngle={180}
            endAngle={0}
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={getColor()} />
            <Cell fill="hsl(0 0% 90%)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
        <span className="text-3xl font-bold text-foreground">
          {percentage.toFixed(1)}%
        </span>
        <span className="text-sm text-muted-foreground mt-1">{label}</span>
      </div>
    </div>
  );
}