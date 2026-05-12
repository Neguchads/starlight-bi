/**
 * Starlight BI - DashboardCardMobile Component
 * Card otimizado para mobile com suporte a touch drag
 */

import { useRef, useState } from "react";
import { useTouchDrag } from "@/hooks/useTouchDrag";
import { DashboardCard as DashboardCardType } from "@/types";
import { CardContent } from "./CardContent";
import { Trash2, Settings } from "lucide-react";

interface DashboardCardMobileProps {
  card: DashboardCardType;
  isEditMode: boolean;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

export function DashboardCardMobile({
  card,
  isEditMode,
  onDelete,
  onSelect,
  isSelected,
}: DashboardCardMobileProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const { isDragging: isTouchDragging } = useTouchDrag(cardRef.current, {
    enableX: isEditMode,
    enableY: isEditMode,
    onDragStart: () => {
      setIsDragging(true);
      onSelect(card.id);
    },
    onDrag: (deltaX, deltaY) => {
      setTransform({ x: deltaX, y: deltaY });
    },
    onDragEnd: () => {
      setIsDragging(false);
      setTransform({ x: 0, y: 0 });
    },
  });

  return (
    <div
      ref={cardRef}
      onClick={() => !isDragging && onSelect(card.id)}
      className={`relative rounded-xl border transition-all cursor-pointer touch-none ${
        isSelected
          ? "border-[#00d9ff] bg-[rgba(0,217,255,0.1)] shadow-lg shadow-[#00d9ff]/20"
          : "border-[rgba(0,217,255,0.2)] bg-[rgba(0,217,255,0.05)] hover:bg-[rgba(0,217,255,0.1)]"
      } ${isEditMode && "cursor-grab active:cursor-grabbing"} ${
        isTouchDragging ? "shadow-xl shadow-[#00d9ff]/40" : ""
      }`}
      style={{
        transform: isDragging
          ? `translate(${transform.x}px, ${transform.y}px)`
          : "translate(0, 0)",
        transition: isDragging ? "none" : "transform 0.2s ease-out",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[rgba(0,217,255,0.1)]">
        <h3 className="text-sm font-semibold text-[#e0e6ff] truncate flex-1">
          {(card.config as any).title || "Sem título"}
        </h3>

        {isEditMode && (
          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Abrir modal de configuração
              }}
              className="p-1.5 hover:bg-[rgba(0,217,255,0.2)] rounded transition-colors text-[#00d9ff]"
            >
              <Settings size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(card.id);
              }}
              className="p-1.5 hover:bg-[rgba(255,0,110,0.2)] rounded transition-colors text-[#ff006e]"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 min-h-[200px]">
        <CardContent card={card} />
      </div>

      {/* Drag Indicator */}
      {isEditMode && (
        <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-[#00d9ff] opacity-50" />
      )}
    </div>
  );
}
