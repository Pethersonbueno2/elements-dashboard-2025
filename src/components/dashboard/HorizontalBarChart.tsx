import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BarItem {
  label: string;
  value: number;
  formattedValue: string;
}

interface HorizontalBarChartProps {
  title: string;
  data: BarItem[];
  maxValue?: number;
}

export function HorizontalBarChart({ title, data, maxValue }: HorizontalBarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value));
  
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground truncate max-w-[180px]">
                {item.label}
              </span>
              <span className="text-foreground font-medium ml-2">
                {item.formattedValue}
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
