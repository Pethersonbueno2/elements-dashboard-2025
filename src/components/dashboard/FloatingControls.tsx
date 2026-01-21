import { useState, useEffect } from "react";
import { ZoomIn, ZoomOut, Moon, Sun, RotateCcw, Maximize, Minimize, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FloatingControls() {
  const [zoom, setZoom] = useState(100);
  const [isDark, setIsDark] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const applyZoom = (zoomPercent: number) => {
    // Smart TV browsers (Chromium variants) are inconsistent with `documentElement.style.zoom`.
    // We instead scale the app viewport container (#app-viewport).
    const zoomScale = Math.max(0.25, Math.min(1.5, zoomPercent / 100));
    document.documentElement.style.setProperty("--app-zoom", String(zoomScale));
    document.body.setAttribute("data-app-zoom", String(zoomScale));
    // Ensure legacy zoom isn't stuck from previous sessions.
    document.documentElement.style.zoom = "";
  };

  // Initialize dark mode based on document class
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  // Load saved zoom on mount
  useEffect(() => {
    const saved = localStorage.getItem("appZoom");
    const savedZoom = saved ? Number(saved) : 100;
    const normalized = Number.isFinite(savedZoom) ? Math.max(25, Math.min(150, savedZoom)) : 100;
    setZoom(normalized);
    applyZoom(normalized);
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);
  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + 10, 150);
    setZoom(newZoom);
    localStorage.setItem("appZoom", String(newZoom));
    applyZoom(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - 10, 25);
    setZoom(newZoom);
    localStorage.setItem("appZoom", String(newZoom));
    applyZoom(newZoom);
  };

  const handleResetZoom = () => {
    setZoom(100);
    localStorage.setItem("appZoom", "100");
    applyZoom(100);
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

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
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
    <div className="fixed bottom-6 left-6 z-[9999] flex flex-col gap-2 bg-card border border-border rounded-xl p-2 shadow-lg transition-all duration-300" style={{ isolation: 'isolate' }}>
      {/* Minimize Toggle */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMinimize}
            className="h-10 w-10 rounded-lg hover:bg-accent"
          >
            {isMinimized ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{isMinimized ? "Expandir Controles" : "Minimizar Controles"}</p>
        </TooltipContent>
      </Tooltip>

      {!isMinimized && (
        <>
          <div className="w-full h-px bg-border" />

          {/* Fullscreen Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="h-10 w-10 rounded-lg hover:bg-accent"
              >
                {isFullscreen ? (
                  <Minimize className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Maximize className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}</p>
            </TooltipContent>
          </Tooltip>

          <div className="w-full h-px bg-border" />

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
                disabled={zoom <= 25}
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
        </>
      )}
    </div>
  );
}
