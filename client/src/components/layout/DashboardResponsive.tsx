/**
 * Starlight BI - DashboardResponsive Component
 * Dashboard otimizado para mobile e desktop
 */

import { useDashboardStore } from "@/store/dashboardStore";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Dashboard } from "./Dashboard";
import { SidebarMobile } from "./SidebarMobile";
import { Sidebar } from "./Sidebar";
import { TopBarResponsive } from "./TopBarResponsive";
import { FilterBar } from "./FilterBar";

export function DashboardResponsive() {
  const isMobile = useIsMobile();
  const { dashboard } = useDashboardStore();

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#8a95b8] text-lg">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] flex flex-col md:flex-row">
      {/* TopBar */}
      <TopBarResponsive />

      {/* Layout Principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop Only */}
        {!isMobile && (
          <div className="w-80 border-r border-[rgba(0,217,255,0.2)] overflow-y-auto">
            <Sidebar />
          </div>
        )}

        {/* Área Principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Filter Bar */}
          <FilterBar />

          {/* Dashboard */}
          <div className="flex-1 overflow-auto">
            <Dashboard />
          </div>
        </div>
      </div>

      {/* Sidebar Mobile - Mobile Only */}
      {isMobile && <SidebarMobile />}
    </div>
  );
}
