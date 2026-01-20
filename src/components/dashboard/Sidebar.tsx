import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  TrendingUp,
  Building2,
  Truck,
  FlaskConical,
  DollarSign,
  Package,
  Headphones,
  Cog,
  Palette,
  ShoppingCart
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

const menuItems = [
  { id: "Compras Internacionais", label: "2025 - Compras Internacionais", icon: ShoppingCart },
  { id: "Financeiro e Controladoria", label: "2025 - Financeiro e Controladoria", icon: DollarSign },
  { id: "B2BC", label: "2025 - B2BC", icon: Building2 },
  { id: "B2B", label: "2025 - B2B", icon: Building2 },
  { id: "Marketing Growth", label: "2025 - Marketing Growth", icon: TrendingUp },
  { id: "B2C | Digital", label: "2025 - B2C | Digital", icon: Package },
  { id: "Marketing Branding", label: "2025 - Marketing Branding", icon: Palette },
  { id: "Logística", label: "2025 - Logística", icon: Truck },
  { id: "Atendimento", label: "2025 - Atendimento", icon: Headphones },
  { id: "Operações", label: "2025 - Operações", icon: Cog },
  { id: "People", label: "2025 - People", icon: Users },
  { id: "P&D", label: "2025 - P&D", icon: FlaskConical },
];

export function Sidebar({ onCategoryChange, selectedCategory }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-sidebar border-r border-sidebar-border flex flex-col z-40">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-sidebar-foreground text-sm">Elements</h1>
            <p className="text-xs text-muted-foreground">Dashboard 2025</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = selectedCategory === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onCategoryChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-2 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-all">
          <Settings className="w-4 h-4" />
          Configurações
        </button>
      </div>
    </aside>
  );
}
