import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { MetricData } from "@/data/dashboardData";

interface EditableTableProps {
  data: MetricData[];
  onDataChange: (newData: MetricData[]) => void;
}

export function EditableTable({ data, onDataChange }: EditableTableProps) {
  const [editingCell, setEditingCell] = useState<{ row: number; field: "previsto" | "realizado" } | null>(null);

  const handleValueChange = (index: number, field: "previsto" | "realizado", value: string) => {
    const numValue = value === "" ? null : parseFloat(value);
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [field]: numValue,
    };
    
    // Recalculate diferenca and concluido
    const previsto = field === "previsto" ? numValue : newData[index].previsto;
    const realizado = field === "realizado" ? numValue : newData[index].realizado;
    
    if (previsto !== null && realizado !== null) {
      newData[index].diferenca = realizado - previsto;
      newData[index].concluido = previsto !== 0 ? (realizado / previsto) * 100 : 0;
    } else {
      newData[index].diferenca = null;
      newData[index].concluido = null;
    }
    
    onDataChange(newData);
  };

  const formatValue = (value: number | null) => {
    if (value === null) return "–";
    if (Math.abs(value) >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`;
    }
    if (Math.abs(value) >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toFixed(2);
  };

  const getConclusionStyle = (concluido: number | null) => {
    if (concluido === null) return "";
    if (concluido >= 100) return "text-success font-medium";
    if (concluido >= 80) return "text-warning font-medium";
    return "text-destructive font-medium";
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Mês</TableHead>
            <TableHead className="font-semibold text-right">Previsto</TableHead>
            <TableHead className="font-semibold text-right">Realizado</TableHead>
            <TableHead className="font-semibold text-right">Diferença</TableHead>
            <TableHead className="font-semibold text-right">% Concluído</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.mes} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-medium">{row.mes}</TableCell>
              <TableCell className="text-right p-2">
                {editingCell?.row === index && editingCell?.field === "previsto" ? (
                  <Input
                    type="number"
                    defaultValue={row.previsto ?? ""}
                    className="w-24 h-8 text-right ml-auto"
                    autoFocus
                    onBlur={(e) => {
                      handleValueChange(index, "previsto", e.target.value);
                      setEditingCell(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleValueChange(index, "previsto", (e.target as HTMLInputElement).value);
                        setEditingCell(null);
                      }
                      if (e.key === "Escape") {
                        setEditingCell(null);
                      }
                    }}
                  />
                ) : (
                  <button
                    onClick={() => setEditingCell({ row: index, field: "previsto" })}
                    className="px-2 py-1 hover:bg-accent rounded transition-colors cursor-text w-full text-right"
                  >
                    {formatValue(row.previsto)}
                  </button>
                )}
              </TableCell>
              <TableCell className="text-right p-2">
                {editingCell?.row === index && editingCell?.field === "realizado" ? (
                  <Input
                    type="number"
                    defaultValue={row.realizado ?? ""}
                    className="w-24 h-8 text-right ml-auto"
                    autoFocus
                    onBlur={(e) => {
                      handleValueChange(index, "realizado", e.target.value);
                      setEditingCell(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleValueChange(index, "realizado", (e.target as HTMLInputElement).value);
                        setEditingCell(null);
                      }
                      if (e.key === "Escape") {
                        setEditingCell(null);
                      }
                    }}
                  />
                ) : (
                  <button
                    onClick={() => setEditingCell({ row: index, field: "realizado" })}
                    className="px-2 py-1 hover:bg-accent rounded transition-colors cursor-text w-full text-right"
                  >
                    {formatValue(row.realizado)}
                  </button>
                )}
              </TableCell>
              <TableCell className={cn("text-right", row.diferenca !== null && row.diferenca >= 0 ? "text-success" : "text-destructive")}>
                {row.diferenca !== null ? (row.diferenca >= 0 ? "+" : "") + formatValue(row.diferenca) : "–"}
              </TableCell>
              <TableCell className={cn("text-right", getConclusionStyle(row.concluido))}>
                {row.concluido !== null ? `${row.concluido.toFixed(1)}%` : "–"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
