import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MetricChart } from "./MetricChart";
import { EditableTable } from "./EditableTable";
import { cn } from "@/lib/utils";
import type { Metric, MetricData } from "@/data/dashboardData";

interface MetricCardProps {
  metric: Metric;
  onDataChange: (metricId: string, newData: MetricData[]) => void;
  delay?: number;
}

export function MetricCard({ metric, onDataChange, delay = 0 }: MetricCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getLatestCompletion = () => {
    const lastWithData = [...metric.dados].reverse().find((d) => d.concluido !== null);
    return lastWithData?.concluido ?? null;
  };

  const completion = getLatestCompletion();

  const getCompletionStyle = () => {
    if (completion === null) return "bg-muted text-muted-foreground";
    if (completion >= 100) return "bg-success/10 text-success";
    if (completion >= 80) return "bg-warning/10 text-warning";
    return "bg-destructive/10 text-destructive";
  };

  return (
    <div 
      className={cn(
        "rounded-xl border border-border/50 bg-card overflow-hidden",
        "shadow-card transition-all duration-300",
        "animate-slide-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center justify-between hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div>
            <h3 className="font-semibold text-foreground text-left">{metric.nome}</h3>
            <p className="text-sm text-muted-foreground text-left">Meta: {metric.meta}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className={cn("px-3 py-1 rounded-full text-sm font-medium", getCompletionStyle())}>
            {completion !== null ? `${completion.toFixed(1)}%` : "–"}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="p-5 pt-0 space-y-6 animate-fade-in">
          <MetricChart data={metric.dados} title="Comparativo Previsto vs Realizado" />
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Editar dados (clique nos valores para alterar)
            </h4>
            <EditableTable
              data={metric.dados}
              onDataChange={(newData) => onDataChange(metric.id, newData)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
