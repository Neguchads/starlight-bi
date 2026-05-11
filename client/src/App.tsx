/**
 * Starlight BI - Main App Component
 * Futurismo Minimalista: Glassmorphism + Neon Accents
 */

import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TopBar } from "@/components/layout/TopBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Dashboard } from "@/components/layout/Dashboard";
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
          <TopBar />
          <div className="flex pt-16">
            <Sidebar />
            <div className="flex-1 ml-80">
              <Dashboard />
            </div>
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
