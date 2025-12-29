import { LayoutDashboard } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
            <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Elements Dashboard</h1>
            <p className="text-sm text-muted-foreground">Indicadores e Métricas de Performance</p>
          </div>
        </div>
      </div>
    </header>
  );
}
