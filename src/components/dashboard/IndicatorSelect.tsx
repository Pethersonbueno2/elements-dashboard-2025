import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Metric } from "@/data/dashboardData";

interface IndicatorSelectProps {
  metrics: Metric[];
  selected: string;
  onChange: (value: string) => void;
}

export function IndicatorSelect({ metrics, selected, onChange }: IndicatorSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Indicador:</span>
      <Select value={selected} onValueChange={onChange}>
        <SelectTrigger className="w-[200px] bg-card border-border">
          <SelectValue placeholder="Todos os Indicadores" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border z-50">
          <SelectItem value="all">Todos os Indicadores</SelectItem>
          {metrics.map((metric) => (
            <SelectItem key={metric.id} value={metric.id}>
              {metric.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
