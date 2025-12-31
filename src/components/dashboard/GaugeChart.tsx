import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface GaugeChartProps {
  value: number;
  max: number;
  label: string;
  color?: string;
}

export function GaugeChart({ value, max, label, color = "hsl(var(--primary))" }: GaugeChartProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const data = [
    { name: "value", value: percentage },
    { name: "empty", value: 100 - percentage },
  ];

  const getColor = () => {
    if (percentage >= 100) return "hsl(142, 76%, 36%)";
    if (percentage >= 80) return "hsl(var(--primary))";
    if (percentage >= 60) return "hsl(38, 92%, 50%)";
    return "hsl(0, 72%, 51%)";
  };

  const formatCurrency = (val: number) => {
    if (val >= 1000000) {
      return `R$ ${(val / 1000000).toFixed(1)}M`;
    }
    if (val >= 1000) {
      return `R$ ${(val / 1000).toFixed(1)}K`;
    }
    return `R$ ${val.toFixed(0)}`;
  };

  return (
    <div className="relative w-full h-64 flex flex-col items-center">
      {/* Gauge Chart */}
      <div className="relative w-full h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Background track */}
            <Pie
              data={[{ value: 100 }]}
              cx="50%"
              cy="85%"
              startAngle={180}
              endAngle={0}
              innerRadius="65%"
              outerRadius="95%"
              dataKey="value"
              stroke="none"
            >
              <Cell fill="hsl(var(--muted))" />
            </Pie>
            {/* Value arc */}
            <Pie
              data={data}
              cx="50%"
              cy="85%"
              startAngle={180}
              endAngle={0}
              innerRadius="65%"
              outerRadius="95%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={getColor()} />
              <Cell fill="transparent" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span 
            className="text-5xl font-bold tracking-tight"
            style={{ color: getColor() }}
          >
            {percentage.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Legend below */}
      <div className="flex flex-col items-center gap-1 mt-2">
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1.5">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: getColor() }}
            />
            <span className="text-foreground font-medium">
              Realizado: {formatCurrency(value)}
            </span>
          </div>
          <span className="text-muted-foreground">|</span>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-muted" />
            <span className="text-muted-foreground">
              Meta: {formatCurrency(max)}
            </span>
          </div>
        </div>
        <span className="text-xs text-muted-foreground mt-1">{label}</span>
      </div>
    </div>
  );
}