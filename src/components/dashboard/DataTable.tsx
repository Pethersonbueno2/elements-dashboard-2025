import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface TableDataRow {
  id: string | number;
  [key: string]: any;
}

interface DataTableProps {
  title: string;
  columns: {
    key: string;
    label: string;
    align?: "left" | "center" | "right";
    format?: (value: any) => string;
  }[];
  data: TableDataRow[];
  highlightColumn?: string;
  months?: string[];
  selectedMonth?: string;
  onMonthChange?: (month: string) => void;
}

export function DataTable({ 
  title, 
  columns, 
  data, 
  highlightColumn,
  months,
  selectedMonth,
  onMonthChange 
}: DataTableProps) {
  return (
    <Card className="bg-card border-border h-full flex flex-col">
      <CardHeader className="pb-2 pt-3 px-3 flex-shrink-0">
        <CardTitle className="text-sm font-semibold text-foreground flex flex-col gap-2">
          <div className="flex items-center justify-between">
            {title}
            <span className="text-xs font-normal text-muted-foreground">{data.length} itens</span>
          </div>
          {months && onMonthChange && (
            <Select value={selectedMonth} onValueChange={onMonthChange}>
              <SelectTrigger className="h-7 text-xs w-full">
                <Calendar className="w-3 h-3 mr-1.5 text-muted-foreground" />
                <SelectValue placeholder="Selecione o mês" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month} className="text-xs">
                    {month === "Todos" ? "📊 Visão Acumulada (Macro)" : `📅 ${month}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-hidden">
        <div className="overflow-y-auto max-h-[280px]">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow className="border-border hover:bg-transparent">
                {columns.map((col) => (
                  <TableHead 
                    key={col.key}
                    className={`text-muted-foreground font-medium text-[10px] uppercase py-1.5 px-2 ${
                      col.align === "right" ? "text-right" : 
                      col.align === "center" ? "text-center" : "text-left"
                    }`}
                  >
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow 
                  key={row.id} 
                  className="border-border/50 hover:bg-secondary/30"
                >
                  {columns.map((col) => {
                    const value = row[col.key];
                    const formattedValue = col.format ? col.format(value) : value;
                    const isHighlight = col.key === highlightColumn;
                    
                    // Color coding for completion percentage
                    let highlightColor = "text-primary";
                    if (isHighlight && typeof value === "number") {
                      if (value >= 100) highlightColor = "text-emerald-500";
                      else if (value >= 80) highlightColor = "text-amber-500";
                      else highlightColor = "text-rose-500";
                    }
                    
                    return (
                      <TableCell 
                        key={col.key}
                        className={`text-[11px] py-1 px-2 ${
                          col.align === "right" ? "text-right" : 
                          col.align === "center" ? "text-center" : "text-left"
                        } ${isHighlight ? `${highlightColor} font-semibold` : "text-foreground"}`}
                      >
                        {col.key === "nome" ? (
                          <span className="line-clamp-1" title={String(formattedValue)}>
                            {formattedValue}
                          </span>
                        ) : formattedValue}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
