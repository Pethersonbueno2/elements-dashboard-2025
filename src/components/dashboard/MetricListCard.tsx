import { TrendingUp, TrendingDown, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Metric } from "@/data/dashboardData";

interface MetricListCardProps {
  metric: Metric;
  onClick?: () => void;
}

export function MetricListCard({ metric, onClick }: MetricListCardProps) {
  const lastData = metric.dados.find(d => d.realizado !== null);
  const completion = lastData?.concluido ?? 0;
  const isPositive = completion >= 100;

  const categoryColors: Record<string, string> = {
    "B2B e B2BC": "bg-blue-500",
    "B2C Digital": "bg-purple-500",
    "Financeiro": "bg-green-500",
    "Logística": "bg-orange-500",
    "Marketing Growth": "bg-pink-500",
    "Marketing Branding": "bg-rose-500",
    "P&D": "bg-cyan-500",
    "RH": "bg-amber-500",
    "Atendimento": "bg-teal-500",
    "Compras Internacionais": "bg-indigo-500",
    "Legacy": "bg-slate-500",
    "Operações": "bg-emerald-500",
  };

  return (
    <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="flex items-center gap-4 p-4">
        {/* Category indicator */}
        <div className={cn(
          "w-1 h-16 rounded-full",
          categoryColors[metric.categoria] || "bg-primary"
        )} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {metric.categoria}
            </span>
          </div>
          <h3 className="font-medium text-foreground truncate">{metric.nome}</h3>
          <p className="text-sm text-muted-foreground">Meta: {metric.meta}</p>
        </div>

        {/* Stats */}
        <div className="text-right">
          <div className={cn(
            "flex items-center gap-1 text-lg font-bold",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {completion.toFixed(0)}%
          </div>
          <p className="text-xs text-muted-foreground">
            {lastData?.realizado?.toLocaleString('pt-BR') || '-'} / {lastData?.previsto?.toLocaleString('pt-BR') || '-'}
          </p>
        </div>

        {/* Action */}
        <Button 
          variant="secondary" 
          size="sm"
          onClick={onClick}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Eye className="w-4 h-4 mr-1" />
          Ver
        </Button>
      </div>
    </Card>
  );
}
