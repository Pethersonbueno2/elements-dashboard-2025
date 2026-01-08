import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DonutDataItem {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  title: string;
  data: DonutDataItem[];
  centerLabel?: string;
  centerValue?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
        <div className="flex items-center gap-2 text-sm">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: payload[0].payload.color }}
          />
          <span className="text-foreground font-medium">{payload[0].name}</span>
          <span className="text-muted-foreground">
            {payload[0].value.toLocaleString('pt-BR')}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export function DonutChart({ title, data, centerLabel, centerValue }: DonutChartProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {centerValue && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-foreground">{centerValue}</span>
              {centerLabel && (
                <span className="text-xs text-muted-foreground">{centerLabel}</span>
              )}
            </div>
          )}
        </div>
        
        {/* Legend with values */}
        <div className="mt-4 space-y-1.5">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-2 px-2">
              <div className="flex items-center gap-2 min-w-0">
                <div 
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground truncate">{item.name}</span>
              </div>
              <span className="text-xs font-semibold text-foreground tabular-nums">
                {item.value.toLocaleString('pt-BR')}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
