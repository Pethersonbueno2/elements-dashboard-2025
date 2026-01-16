import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

export type MonthType = "all" | "Janeiro" | "Fevereiro" | "Março" | "Abril" | "Maio" | "Junho" | "Julho" | "Agosto" | "Setembro" | "Outubro" | "Novembro" | "Dezembro";

interface MonthFilterProps {
  selected: MonthType;
  onChange: (month: MonthType) => void;
}

const months: { value: MonthType; label: string }[] = [
  { value: "all", label: "Todos os Meses" },
  { value: "Janeiro", label: "Janeiro" },
  { value: "Fevereiro", label: "Fevereiro" },
  { value: "Março", label: "Março" },
  { value: "Abril", label: "Abril" },
  { value: "Maio", label: "Maio" },
  { value: "Junho", label: "Junho" },
  { value: "Julho", label: "Julho" },
  { value: "Agosto", label: "Agosto" },
  { value: "Setembro", label: "Setembro" },
  { value: "Outubro", label: "Outubro" },
  { value: "Novembro", label: "Novembro" },
  { value: "Dezembro", label: "Dezembro" },
];

export function MonthFilter({ selected, onChange }: MonthFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Calendar className="w-4 h-4 text-muted-foreground" />
      <Select value={selected} onValueChange={(value) => onChange(value as MonthType)}>
        <SelectTrigger className="w-[160px] h-8 text-sm bg-card border-border">
          <SelectValue placeholder="Selecionar mês" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value} className="text-sm">
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
