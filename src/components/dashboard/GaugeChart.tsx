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

  // Purple when goal is met, red when not
  const isGoalMet = value >= max;
  const gaugeColor = isGoalMet ? "hsl(264, 100%, 65%)" : "hsl(0, 85%, 55%)";

  const formatValue = (val: number) => {
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(2)}M`;
    }
    if (val >= 1000) {
      return `${(val / 1000).toFixed(2)}K`;
    }
    return val.toFixed(0);
  };

  // Calculate needle angle (180 = left, 0 = right)
  const needleAngle = 180 - (percentage * 180) / 100;
  const needleRadians = (needleAngle * Math.PI) / 180;

  return (
    <div className="relative w-full h-72 flex flex-col items-center">
      {/* Title */}
      <h4 className="text-sm font-medium text-muted-foreground mb-2">{label}</h4>
      
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
              innerRadius="50%"
              outerRadius="90%"
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
              innerRadius="50%"
              outerRadius="90%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={gaugeColor} />
              <Cell fill="transparent" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Needle indicator for target */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 200 120"
          preserveAspectRatio="xMidYMax meet"
        >
          {/* Needle line pointing to meta */}
          <line
            x1="100"
            y1="102"
            x2={100 + Math.cos(needleRadians) * 55}
            y2={102 - Math.sin(needleRadians) * 55}
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
          />
          {/* Needle center dot */}
          <circle
            cx="100"
            cy="102"
            r="4"
            fill="hsl(var(--foreground))"
          />
          {/* Value label near needle */}
          <text
            x={100 + Math.cos(needleRadians) * 68}
            y={102 - Math.sin(needleRadians) * 68}
            fontSize="9"
            fill="hsl(var(--muted-foreground))"
            textAnchor="middle"
          >
            {formatValue(value)}
          </text>
        </svg>

        {/* Scale markers */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-end px-4 text-sm text-muted-foreground font-medium">
          <span>{formatValue(max)}</span>
        </div>
      </div>

      {/* Value below chart */}
      <div className="mt-2 flex flex-col items-center">
        <span 
          className="text-lg font-bold tracking-tight"
          style={{ color: gaugeColor }}
        >
          {formatValue(value)}
        </span>
      </div>
    </div>
  );
}
