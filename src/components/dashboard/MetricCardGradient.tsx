import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface MetricCardGradientProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: number | null;
  trendLabel?: string;
  gradient: "orange" | "blue" | "pink" | "green" | "purple";
  icon?: React.ReactNode;
  sparklineData?: { value: number }[];
  delay?: number;
}

const gradientStyles = {
  orange: {
    bg: "bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400",
    chart: "#fff",
    chartFill: "rgba(255,255,255,0.2)",
  },
  blue: {
    bg: "bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400",
    chart: "#fff",
    chartFill: "rgba(255,255,255,0.2)",
  },
  pink: {
    bg: "bg-gradient-to-br from-pink-500 via-rose-400 to-red-400",
    chart: "#fff",
    chartFill: "rgba(255,255,255,0.2)",
  },
  green: {
    bg: "bg-gradient-to-br from-emerald-500 via-green-400 to-teal-400",
    chart: "#fff",
    chartFill: "rgba(255,255,255,0.2)",
  },
  purple: {
    bg: "bg-gradient-to-br from-purple-500 via-violet-400 to-indigo-400",
    chart: "#fff",
    chartFill: "rgba(255,255,255,0.2)",
  },
};

export function MetricCardGradient({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  gradient,
  icon,
  sparklineData,
  delay = 0,
}: MetricCardGradientProps) {
  const style = gradientStyles[gradient];
  const isPositive = trend !== null && trend !== undefined && trend >= 0;

  // Generate sample sparkline data if not provided
  const chartData = sparklineData || [
    { value: 30 },
    { value: 45 },
    { value: 35 },
    { value: 50 },
    { value: 40 },
    { value: 60 },
    { value: 55 },
  ];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-5 text-white shadow-xl",
        style.bg,
        "animate-fade-in"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && <div className="w-6 h-6">{icon}</div>}
          <span className="text-sm font-medium opacity-90">{title}</span>
        </div>
        <button className="p-1 rounded-lg hover:bg-white/20 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Value */}
      <div className="mb-2">
        <span className="text-3xl font-bold">{value}</span>
        {subtitle && (
          <span className="text-sm opacity-80 ml-2">{subtitle}</span>
        )}
      </div>

      {/* Trend */}
      {trend !== null && trend !== undefined && (
        <div className="flex items-center gap-2 mb-4">
          <div className={cn(
            "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
            isPositive ? "bg-white/20" : "bg-white/20"
          )}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{isPositive ? "+" : ""}{trend.toFixed(1)}%</span>
          </div>
          {trendLabel && (
            <span className="text-xs opacity-70">{trendLabel}</span>
          )}
        </div>
      )}

      {/* Sparkline Chart */}
      <div className="h-16 -mx-2 -mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`gradient-${gradient}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={style.chart} stopOpacity={0.4} />
                <stop offset="100%" stopColor={style.chart} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={style.chart}
              strokeWidth={2}
              fill={`url(#gradient-${gradient})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
