/**
 * Starlight BI - Dashboard Component
 * Grid arrastável e redimensionável com React-Grid-Layout
 */

import { useEffect } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import GridLayout from "react-grid-layout";
import { DashboardCard } from "@/components/cards/DashboardCard";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export function Dashboard() {
  const { dashboard, updateCardPosition, isEditMode, loadFromDisk } = useDashboardStore();

  useEffect(() => {
    loadFromDisk();
  }, [loadFromDisk]);

  if (!dashboard) {
    return (
      <div className="flex items-center justify-center h-full text-[#8a95b8]">
        <p>Carregando dashboard...</p>
      </div>
    );
  }

  const layout = dashboard.cards.map((card) => ({
    x: card.position.x,
    y: card.position.y,
    w: card.position.w,
    h: card.position.h,
    i: card.id,
  }));

  const handleLayoutChange = (newLayout: any) => {
    newLayout.forEach((item: any) => {
      const card = dashboard.cards.find((c) => c.id === item.i);
      if (card) {
        updateCardPosition(item.i, {
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
        });
      }
    });
  };

  return (
    <div className="w-full h-full p-6 overflow-auto">
      <GridLayout
        className="grid-layout"
        layout={layout}
        onLayoutChange={handleLayoutChange}
        rowHeight={60}
        cols={12}
        {...({} as any)}
      >
        {dashboard.cards.map((card) => (
          <div key={card.id} className="bg-[rgba(255,255,255,0.02)] rounded-lg">
            <DashboardCard card={card} />
          </div>
        ))}
      </GridLayout>

      {dashboard.cards.length === 0 && (
        <div className="flex items-center justify-center h-96 text-[#8a95b8]">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">Dashboard vazio</p>
            <p className="text-sm">Use a sidebar para adicionar elementos</p>
          </div>
        </div>
      )}
    </div>
  );
}
