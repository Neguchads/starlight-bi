/**
 * Starlight BI - Dashboard Page
 * Página principal do dashboard
 */

import { DashboardResponsive } from "@/components/layout/DashboardResponsive";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { useDashboardStore } from "@/store/dashboardStore";

export default function DashboardPage() {
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
