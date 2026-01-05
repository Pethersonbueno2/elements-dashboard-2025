import { useState, useEffect } from "react";
import { ZoomIn, ZoomOut, Moon, Sun, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FloatingControls() {
  const [zoom, setZoom] = useState(100);
  const [isDark, setIsDark] = useState(false);

  // Initialize dark mode based on document class
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + 10, 150);
    setZoom(newZoom);
    document.documentElement.style.zoom = `${newZoom}%`;
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - 10, 50);
    setZoom(newZoom);
    document.documentElement.style.zoom = `${newZoom}%`;
  };

  const handleResetZoom = () => {
    setZoom(100);
    document.documentElement.style.zoom = "100%";
  };

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 bg-card border border-border rounded-xl p-2 shadow-lg">
      {/* Theme Toggle */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="h-10 w-10 rounded-lg hover:bg-accent"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-warning" />
            ) : (
              <Moon className="h-5 w-5 text-muted-foreground" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{isDark ? "Modo Claro" : "Modo Escuro"}</p>
        </TooltipContent>
      </Tooltip>

      <div className="w-full h-px bg-border" />

      {/* Zoom Controls */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            disabled={zoom >= 150}
            className="h-10 w-10 rounded-lg hover:bg-accent"
          >
            <ZoomIn className="h-5 w-5 text-muted-foreground" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Aumentar Zoom</p>
        </TooltipContent>
      </Tooltip>

      <div className="text-center text-sm font-medium text-muted-foreground">
        {zoom}%
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            disabled={zoom <= 50}
            className="h-10 w-10 rounded-lg hover:bg-accent"
          >
            <ZoomOut className="h-5 w-5 text-muted-foreground" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Diminuir Zoom</p>
        </TooltipContent>
      </Tooltip>

      {zoom !== 100 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleResetZoom}
              className="h-10 w-10 rounded-lg hover:bg-accent"
            >
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Resetar Zoom</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
