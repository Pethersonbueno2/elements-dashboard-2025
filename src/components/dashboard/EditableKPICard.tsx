import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Minus, Pencil, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface EditableKPICardProps {
  title: string;
  value: string;
  meta: string;
  trend: number | null;
  icon: React.ReactNode;
  delay?: number;
  onValueChange?: (newValue: string) => void;
  editable?: boolean;
}

export function EditableKPICard({ 
  title, 
  value, 
  meta, 
  trend, 
  icon, 
  delay = 0,
  onValueChange,
  editable = true
}: EditableKPICardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const getTrendColor = () => {
    if (trend === null) return "text-muted-foreground";
    if (trend >= 100) return "text-success";
    if (trend >= 80) return "text-warning";
    return "text-destructive";
  };

  const getTrendIcon = () => {
    if (trend === null) return <Minus className="h-4 w-4" />;
    if (trend >= 100) return <ArrowUpRight className="h-4 w-4" />;
    return <ArrowDownRight className="h-4 w-4" />;
  };

  const handleEdit = () => {
    setEditValue(value);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onValueChange) {
      onValueChange(editValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6",
        "shadow-card hover:shadow-lg transition-all duration-300",
        "hover:border-primary/30 hover:-translate-y-1",
        "animate-slide-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-9 text-lg font-bold w-32"
                autoFocus
              />
              <button
                onClick={handleSave}
                className="p-1.5 rounded-md bg-success/10 text-success hover:bg-success/20 transition-colors"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1.5 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-foreground">{value}</p>
              {editable && (
                <button
                  onClick={handleEdit}
                  className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}
          
          <p className="text-xs text-muted-foreground mt-1">Meta: {meta}</p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
          {trend !== null && (
            <div className={cn("flex items-center gap-1 text-sm font-medium", getTrendColor())}>
              {getTrendIcon()}
              <span>{trend.toFixed(1)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
