/**
 * Starlight BI - DashboardCard Component
 * Futurismo Minimalista: Glassmorphism + Neon Accents
 * Card base com suporte a diferentes tipos de conteúdo
 */

import { useDashboardStore } from "@/store/dashboardStore";
import { DashboardCard as DashboardCardType } from "@/types";
import { X, Settings } from "lucide-react";
import { CardContent } from "./CardContent";

interface DashboardCardProps {
  card: DashboardCardType;
}

export function DashboardCard({ card }: DashboardCardProps) {
  const { deleteCard, selectCard, selectedCardId, isEditMode } = useDashboardStore();
  const isSelected = selectedCardId === card.id;

  return (
    <div
      onClick={() => selectCard(card.id)}
      className={`relative rounded-lg backdrop-blur-md transition-all duration-300 cursor-pointer group overflow-hidden ${
        isSelected
          ? "bg-[rgba(0,217,255,0.15)] border-2 border-[#00d9ff] shadow-[0_0_20px_rgba(0,217,255,0.3)]"
          : "bg-[rgba(255,255,255,0.05)] border border-[rgba(0,217,255,0.1)] hover:border-[rgba(0,217,255,0.3)] hover:shadow-[0_0_15px_rgba(0,217,255,0.2)]"
      }`}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-[rgba(0,217,255,0.1)] flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#e0e6ff] truncate">
          {card.title}
        </h3>
        {isEditMode && isSelected && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Open settings modal
              }}
              className="p-1.5 rounded hover:bg-[rgba(0,217,255,0.2)] text-[#00d9ff] transition-colors"
              title="Configurações"
            >
              <Settings size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteCard(card.id);
              }}
              className="p-1.5 rounded hover:bg-[rgba(255,0,110,0.2)] text-[#ff006e] transition-colors"
              title="Deletar"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 min-h-[200px] flex items-center justify-center">
        <CardContent card={card} />
      </div>

      {/* Glow effect on selection */}
      {isSelected && (
        <div className="absolute inset-0 pointer-events-none rounded-lg shadow-[inset_0_0_20px_rgba(0,217,255,0.1)]" />
      )}
    </div>
  );
}
