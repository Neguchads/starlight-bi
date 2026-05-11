import { DashboardCard } from "@/types";
import { useDashboardStore } from "@/store/dashboardStore";
import { useState } from "react";

export function ImageContent({ card }: { card: DashboardCard }) {
  const { updateCardConfig, isEditMode } = useDashboardStore();
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(card.config.imageUrl || "");

  const handleSave = () => {
    updateCardConfig(card.id, { imageUrl });
    setIsEditing(false);
  };

  if (isEditMode && isEditing) {
    return (
      <div className="w-full h-full flex flex-col gap-2 p-4">
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Cole a URL da imagem..."
          className="bg-[rgba(255,255,255,0.08)] border border-[#00d9ff] rounded px-3 py-2 text-[#e0e6ff] text-sm focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 px-3 py-1 rounded bg-[#00d9ff] text-[#0a0e27] text-sm font-medium hover:bg-[#ff006e] transition-colors"
          >
            Salvar
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="flex-1 px-3 py-1 rounded bg-[rgba(255,0,110,0.2)] text-[#ff006e] text-sm font-medium hover:bg-[rgba(255,0,110,0.3)] transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  if (!card.config.imageUrl) {
    return (
      <div
        onClick={() => isEditMode && setIsEditing(true)}
        className="w-full h-full flex items-center justify-center cursor-pointer text-[#8a95b8]"
      >
        <p className="text-sm">Clique para adicionar uma imagem</p>
      </div>
    );
  }

  return (
    <div
      onClick={() => isEditMode && setIsEditing(true)}
      className="w-full h-full flex items-center justify-center cursor-pointer"
    >
      <img
        src={card.config.imageUrl}
        alt={card.config.imageAlt || "Imagem"}
        className="max-w-full max-h-full object-contain rounded"
      />
    </div>
  );
}
