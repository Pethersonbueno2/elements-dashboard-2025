import { useState } from "react";
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  TrendingUp,
  Building2,
  Truck,
  FlaskConical,
  Megaphone,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

const menuItems = [
  { id: "Todas", label: "Dashboard", icon: LayoutDashboard },
  { id: "B2B e B2BC", label: "B2B & B2BC", icon: Building2 },
  { id: "B2C Digital", label: "B2C Digital", icon: TrendingUp },
  { id: "Financeiro", label: "Financeiro", icon: DollarSign },
  { id: "Marketing", label: "Marketing", icon: Megaphone },
  { id: "Logística", label: "Logística", icon: Truck },
  { id: "P&D", label: "P&D", icon: FlaskConical },
  { id: "RH", label: "RH", icon: Users },
];

export function Sidebar({ onCategoryChange, selectedCategory }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-sidebar-foreground">Elements</h1>
            <p className="text-xs text-muted-foreground">Dashboard 2025</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = selectedCategory === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onCategoryChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-all">
          <Settings className="w-5 h-5" />
          Configurações
        </button>
      </div>
    </aside>
  );
}
