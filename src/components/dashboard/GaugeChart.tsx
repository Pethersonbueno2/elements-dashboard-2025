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

  const gaugeColor = "hsl(0, 72%, 51%)"; // Red color

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
    <div className="relative w-full h-64 flex flex-col items-center">
      {/* Title */}
      <h4 className="text-xs font-medium text-muted-foreground mb-1">{label}</h4>
      
      {/* Gauge Chart */}
      <div className="relative w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Background track */}
            <Pie
              data={[{ value: 100 }]}
              cx="50%"
              cy="75%"
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
              cy="75%"
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
        
        {/* Center value */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: '20%' }}>
          <span 
            className="text-base font-semibold tracking-tight"
            style={{ color: gaugeColor }}
          >
            {formatValue(value)}
          </span>
        </div>

        {/* Needle indicator for target */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 200 150"
          preserveAspectRatio="xMidYMax meet"
        >
          {/* Needle line pointing to meta */}
          <line
            x1="100"
            y1="112"
            x2={100 + Math.cos(needleRadians) * 60}
            y2={112 - Math.sin(needleRadians) * 60}
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
          />
          {/* Needle center dot */}
          <circle
            cx="100"
            cy="112"
            r="4"
            fill="hsl(var(--foreground))"
          />
          {/* Meta label */}
          <text
            x={100 + Math.cos(needleRadians) * 72}
            y={112 - Math.sin(needleRadians) * 72}
            fontSize="7"
            fill="hsl(var(--muted-foreground))"
            textAnchor="middle"
          >
            {formatValue(max)}
          </text>
        </svg>

        {/* Scale markers */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-between px-6 text-[10px] text-muted-foreground">
          <span>0</span>
          <span>{formatValue(max)}</span>
        </div>
      </div>
    </div>
  );
}
