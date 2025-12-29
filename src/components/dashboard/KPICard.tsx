import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  meta: string;
  trend: number | null;
  icon: React.ReactNode;
  delay?: number;
}

export function KPICard({ title, value, meta, trend, icon, delay = 0 }: KPICardProps) {
  const getTrendColor = () => {
    if (trend === null) return "text-muted-foreground";
    if (trend >= 100) return "text-success";
    if (trend >= 80) return "text-warning";
    return "text-destructive";
  };

  const getTrendIcon = () => {
    if (trend === null) return <Minus className="h-4 w-4" />;
    if (trend >= 100) return <ArrowUpRight className="h-4 w-4" />;
    return <ArrowDownRight className="h-4 w-4" />;
  };

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6",
        "shadow-card hover:shadow-lg transition-all duration-300",
        "hover:border-primary/30 hover:-translate-y-1",
        "animate-slide-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">Meta: {meta}</p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
          {trend !== null && (
            <div className={cn("flex items-center gap-1 text-sm font-medium", getTrendColor())}>
              {getTrendIcon()}
              <span>{trend.toFixed(1)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
