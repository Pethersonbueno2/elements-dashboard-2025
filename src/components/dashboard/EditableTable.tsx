import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { MetricData } from "@/data/dashboardData";

interface EditableTableProps {
  data: MetricData[];
  onDataChange: (newData: MetricData[]) => void;
}

type EditableField = "previsto" | "realizado" | "diferenca" | "concluido";

export function EditableTable({ data, onDataChange }: EditableTableProps) {
  const [editingCell, setEditingCell] = useState<{ row: number; field: EditableField } | null>(null);

  const handleValueChange = (index: number, field: EditableField, value: string) => {
    const numValue = value === "" ? null : parseFloat(value);
    const newData = [...data];
    
    newData[index] = {
      ...newData[index],
      [field]: numValue,
    };

    // If editing previsto or realizado, recalculate diferenca and concluido
    if (field === "previsto" || field === "realizado") {
      const previsto = field === "previsto" ? numValue : newData[index].previsto;
      const realizado = field === "realizado" ? numValue : newData[index].realizado;
      
      if (previsto !== null && realizado !== null) {
        newData[index].diferenca = realizado - previsto;
        newData[index].concluido = previsto !== 0 ? (realizado / previsto) * 100 : 0;
      }
    }
    
    onDataChange(newData);
  };

  const formatValue = (value: number | null) => {
    if (value === null) return "–";
    // Format with thousand separators and up to 2 decimal places
    return value.toLocaleString('pt-BR', { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 2 
    });
  };

  const getConclusionStyle = (concluido: number | null) => {
    if (concluido === null) return "";
    if (concluido >= 100) return "text-success font-medium";
    if (concluido >= 80) return "text-warning font-medium";
    return "text-destructive font-medium";
  };

  const renderEditableCell = (
    index: number,
    field: EditableField,
    value: number | null,
    className?: string,
    displayValue?: string
  ) => {
    const isEditing = editingCell?.row === index && editingCell?.field === field;

    if (isEditing) {
      return (
        <Input
          type="number"
          step="any"
          defaultValue={value ?? ""}
          className="w-24 h-8 text-right ml-auto"
          autoFocus
          onBlur={(e) => {
            handleValueChange(index, field, e.target.value);
            setEditingCell(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleValueChange(index, field, (e.target as HTMLInputElement).value);
              setEditingCell(null);
            }
            if (e.key === "Escape") {
              setEditingCell(null);
            }
          }}
        />
      );
    }

    return (
      <button
        onClick={() => setEditingCell({ row: index, field })}
        className={cn(
          "px-2 py-1 hover:bg-accent rounded transition-colors cursor-text w-full text-right",
          className
        )}
      >
        {displayValue ?? formatValue(value)}
      </button>
    );
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
                {renderEditableCell(index, "previsto", row.previsto)}
              </TableCell>
              <TableCell className="text-right p-2">
                {renderEditableCell(index, "realizado", row.realizado)}
              </TableCell>
              <TableCell className="text-right p-2">
                {renderEditableCell(
                  index,
                  "diferenca",
                  row.diferenca,
                  row.diferenca !== null && row.diferenca >= 0 ? "text-success" : "text-destructive",
                  row.diferenca !== null ? (row.diferenca >= 0 ? "+" : "") + formatValue(row.diferenca) : "–"
                )}
              </TableCell>
              <TableCell className="text-right p-2">
                {renderEditableCell(
                  index,
                  "concluido",
                  row.concluido,
                  getConclusionStyle(row.concluido),
                  row.concluido !== null ? `${row.concluido.toFixed(1)}%` : "–"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
