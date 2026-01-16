import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Metric } from "@/data/dashboardData";
import { cn } from "@/lib/utils";

interface MonthlyDetailTableProps {
  metrics: Metric[];
  title?: string;
  subtitle?: string;
}

const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

const formatValue = (value: number | null): string => {
  if (value === null || value === undefined) return "-";
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}Bi`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}Mi`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  if (value % 1 !== 0) return value.toFixed(1);
  return value.toFixed(0);
};

export function MonthlyDetailTable({
  metrics,
  title = "Detalhamento Mensal",
  subtitle = "Valores de Previsto e Realizado por mês para cada indicador",
}: MonthlyDetailTableProps) {
  const tableData = useMemo(() => {
    return metrics.map((metric) => {
      const monthlyData: Record<string, { previsto: number | null; realizado: number | null }> = {};
      let total = 0;

      metric.dados.forEach((d, index) => {
        monthlyData[months[index]] = {
          previsto: d.previsto,
          realizado: d.realizado,
        };
        if (d.previsto !== null) {
          total += d.previsto;
        }
      });

      return {
        id: metric.id,
        nome: metric.nome,
        monthlyData,
        total,
      };
    });
  }, [metrics]);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          {title}
        </CardTitle>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground text-xs font-medium min-w-[200px]">
                INDICADOR
              </TableHead>
              {months.map((month) => (
                <TableHead
                  key={month}
                  className="text-muted-foreground text-xs font-medium text-center min-w-[60px]"
                >
                  {month}
                </TableHead>
              ))}
              <TableHead className="text-orange-500 text-xs font-medium text-center min-w-[70px]">
                TOTAL
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <>
                {/* Previsto Row */}
                <TableRow key={`${row.id}-previsto`} className="border-border hover:bg-muted/20">
                  <TableCell className="text-xs">
                    <div>
                      <span className="text-primary font-medium">{row.nome}</span>
                      <span className="text-muted-foreground ml-2">Previsto</span>
                    </div>
                  </TableCell>
                  {months.map((month) => (
                    <TableCell
                      key={`${row.id}-${month}-previsto`}
                      className="text-center text-xs"
                    >
                      <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">
                        {formatValue(row.monthlyData[month]?.previsto)}
                      </span>
                    </TableCell>
                  ))}
                  <TableCell className="text-center text-xs font-semibold text-foreground">
                    {formatValue(row.total)}
                  </TableCell>
                </TableRow>
                {/* Realizado Row */}
                <TableRow key={`${row.id}-realizado`} className="border-border hover:bg-muted/20">
                  <TableCell className="text-xs text-muted-foreground pl-8">
                    Realizado
                  </TableCell>
                  {months.map((month) => {
                    const realizado = row.monthlyData[month]?.realizado;
                    const previsto = row.monthlyData[month]?.previsto;
                    const isAchieved = realizado !== null && previsto !== null && realizado >= previsto;
                    
                    return (
                      <TableCell
                        key={`${row.id}-${month}-realizado`}
                        className="text-center text-xs"
                      >
                        <span
                          className={cn(
                            "px-2 py-1 rounded text-xs font-medium",
                            realizado === null && "text-muted-foreground",
                            realizado !== null && isAchieved && "bg-success/20 text-success",
                            realizado !== null && !isAchieved && "bg-orange-500/20 text-orange-500"
                          )}
                        >
                          {formatValue(realizado)}
                        </span>
                      </TableCell>
                    );
                  })}
                  <TableCell className="text-center text-xs">-</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
