import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PeriodType = "Todos" | "30" | "60" | "90";

interface PeriodFilterProps {
  selected: PeriodType;
  onChange: (period: PeriodType) => void;
}

const periods: { value: PeriodType; label: string }[] = [
  { value: "Todos", label: "Todos" },
  { value: "30", label: "30 dias" },
  { value: "60", label: "60 dias" },
  { value: "90", label: "90 dias" },
];

export function PeriodFilter({ selected, onChange }: PeriodFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2">Período:</span>
      <div className="flex gap-1">
        {periods.map((period) => (
          <Button
            key={period.value}
            variant={selected === period.value ? "default" : "outline"}
            size="sm"
            onClick={() => onChange(period.value)}
            className={cn(
              "text-xs h-8 px-3",
              selected === period.value && "bg-muted text-foreground hover:bg-muted/80"
            )}
          >
            {period.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
