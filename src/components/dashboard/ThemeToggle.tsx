import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="gap-2 h-8"
    >
      {theme === "dark" ? (
        <>
          <Sun className="w-4 h-4" />
          <span className="hidden sm:inline text-xs">Claro</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4" />
          <span className="hidden sm:inline text-xs">Escuro</span>
        </>
      )}
    </Button>
  );
}
