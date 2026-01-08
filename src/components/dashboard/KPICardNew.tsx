import { cn } from "@/lib/utils";

interface KPICardNewProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  valueColor?: "default" | "positive" | "negative";
  delay?: number;
}

export function KPICardNew({
  title,
  value,
  subtitle,
  icon,
  iconBgColor = "bg-primary",
  valueColor = "default",
  delay = 0,
}: KPICardNewProps) {
  return (
    <div
      className="bg-card border border-border rounded-lg p-4 flex items-center gap-4 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn(
        "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
        iconBgColor
      )}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className={cn(
          "text-2xl font-bold truncate",
          valueColor === "positive" && "text-success",
          valueColor === "negative" && "text-destructive",
          valueColor === "default" && "text-foreground"
        )}>
          {value}
        </p>
        <p className="text-sm text-muted-foreground truncate">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground/70 truncate">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
