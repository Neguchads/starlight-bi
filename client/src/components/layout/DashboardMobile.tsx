/**
 * Starlight BI - DashboardMobile Component
 * Dashboard otimizado para mobile com grid responsivo
 */

import { useDashboardStore } from "@/store/dashboardStore";
import { DashboardCardMobile } from "@/components/cards/DashboardCardMobile";

export function DashboardMobile() {
  const { dashboard, deleteCard, selectCard, selectedCardId } =
    useDashboardStore();
  const { isEditMode } = useDashboardStore();

  if (!dashboard || dashboard.cards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-center p-4">
        <div>
          <p className="text-[#8a95b8] text-lg mb-2">Dashboard vazio</p>
          <p className="text-[#8a95b8] text-sm">
            Use a sidebar para adicionar elementos
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {dashboard.cards.map((card) => (
        <DashboardCardMobile
          key={card.id}
          card={card}
          isEditMode={isEditMode}
          onDelete={deleteCard}
          onSelect={selectCard}
          isSelected={selectedCardId === card.id}
        />
      ))}
    </div>
  );
}
