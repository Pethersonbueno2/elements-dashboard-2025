import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
}

export function DataTable({ title, columns, data, highlightColumn }: DataTableProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                {columns.map((col) => (
                  <TableHead 
                    key={col.key}
                    className={`text-muted-foreground font-medium text-xs ${
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
              {data.map((row, index) => (
                <TableRow 
                  key={row.id} 
                  className="border-border hover:bg-secondary/30"
                >
                  {columns.map((col) => {
                    const value = row[col.key];
                    const formattedValue = col.format ? col.format(value) : value;
                    const isHighlight = col.key === highlightColumn;
                    
                    return (
                      <TableCell 
                        key={col.key}
                        className={`text-sm py-3 ${
                          col.align === "right" ? "text-right" : 
                          col.align === "center" ? "text-center" : "text-left"
                        } ${isHighlight ? "text-primary font-semibold" : "text-foreground"}`}
                      >
                        {formattedValue}
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
