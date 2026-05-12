/**
 * Starlight BI - Main App Component
 * Futurismo Minimalista: Glassmorphism + Neon Accents
 */

import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DashboardResponsive } from "@/components/layout/DashboardResponsive";
import { useDashboardStore } from "@/store/dashboardStore";

function App() {
  const { dashboard, createDashboard, loadFromDisk } = useDashboardStore();

  useEffect(() => {
    loadFromDisk();
    if (!dashboard) {
      createDashboard("Meu Dashboard");
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <div className="w-full h-screen bg-[#0a0e27] text-[#e0e6ff] overflow-hidden">
          <DashboardResponsive />
        </div>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
