import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface GaugeChartProps {
  value: number;
  max: number;
  label: string;
  color?: string;
}

export function GaugeChart({ value, max, label }: GaugeChartProps) {
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

  const formatValue = (val: number) => {
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(2)} Mil`;
    }
    if (val >= 1000) {
      return `${(val / 1000).toFixed(2)} K`;
    }
    return val.toFixed(0);
  };

  // Calculate needle angle (180 = left, 0 = right)
  const needleAngle = 180 - (percentage * 180) / 100;
  const needleRadians = (needleAngle * Math.PI) / 180;

  return (
    <div className="relative w-full h-52 flex flex-col items-center">
      {/* Title */}
      <h4 className="text-sm font-medium text-muted-foreground mb-2">{label}</h4>
      
      {/* Gauge Chart */}
      <div className="relative w-full h-36">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Background track */}
            <Pie
              data={[{ value: 100 }]}
              cx="50%"
              cy="80%"
              startAngle={180}
              endAngle={0}
              innerRadius="55%"
              outerRadius="85%"
              dataKey="value"
              stroke="none"
            >
              <Cell fill="hsl(var(--muted))" />
            </Pie>
            {/* Value arc */}
            <Pie
              data={data}
              cx="50%"
              cy="80%"
              startAngle={180}
              endAngle={0}
              innerRadius="55%"
              outerRadius="85%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={getColor()} />
              <Cell fill="transparent" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center value */}
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span 
            className="text-2xl font-semibold tracking-tight"
            style={{ color: getColor() }}
          >
            {formatValue(value)}
          </span>
        </div>

        {/* Needle indicator for target */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 200 120"
          preserveAspectRatio="xMidYMax meet"
        >
          {/* Needle line pointing to meta */}
          <line
            x1="100"
            y1="96"
            x2={100 + Math.cos(needleRadians) * 55}
            y2={96 - Math.sin(needleRadians) * 55}
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
          {/* Needle center dot */}
          <circle
            cx="100"
            cy="96"
            r="4"
            fill="hsl(var(--primary))"
          />
          {/* Meta label */}
          <text
            x={100 + Math.cos(needleRadians) * 65}
            y={96 - Math.sin(needleRadians) * 65}
            fontSize="8"
            fill="hsl(var(--muted-foreground))"
            textAnchor="middle"
          >
            {formatValue(max)}
          </text>
        </svg>

        {/* Scale markers */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-muted-foreground">
          <span>0</span>
          <span>{formatValue(max)}</span>
        </div>
      </div>
    </div>
  );
}