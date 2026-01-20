import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type Metric } from "@/data/dashboardData";

interface IndicatorSelectProps {
  metrics: Metric[];
  selected: string;
  onChange: (value: string) => void;
}

export function IndicatorSelect({ metrics, selected, onChange }: IndicatorSelectProps) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Fallback to area-indicadores if no history
      navigate('/area-indicadores');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleGoBack}
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>
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
