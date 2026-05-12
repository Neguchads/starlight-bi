/**
 * Starlight BI - TopBarResponsive Component
 * TopBar otimizado para mobile e desktop
 */

import { useState } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  Download,
  Upload,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Edit2,
  Check,
  X,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function TopBarResponsive() {
  const isMobile = useIsMobile();
  const { theme, toggleTheme } = useTheme();
  const { dashboard, setDashboardName, toggleEditMode, isEditMode } =
    useDashboardStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(dashboard?.name || "Meu Dashboard");

  const handleSaveName = () => {
    if (editedName.trim()) {
      setDashboardName(editedName);
      setIsEditingName(false);
    }
  };

  const handleExport = () => {
    if (!dashboard) return;
    const dataStr = JSON.stringify(dashboard, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${dashboard.name}-backup.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        // Aqui você pode adicionar lógica para importar o dashboard
        console.log("Dashboard importado:", imported);
      } catch (error) {
        console.error("Erro ao importar dashboard:", error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-[#0f1329] border-b border-[rgba(0,217,255,0.2)] px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
      {/* Logo e Título */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <img src="/manus-storage/logo_063e4c18.png" alt="Starlight BI" className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex-shrink-0" />
        {isEditingName ? (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              autoFocus
              className="flex-1 min-w-0 px-3 py-1 bg-[rgba(255,255,255,0.05)] border border-[#00d9ff] rounded-lg text-[#e0e6ff] text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
            />
            <button
              onClick={handleSaveName}
              className="p-1.5 hover:bg-[rgba(0,217,255,0.2)] rounded transition-colors text-[#00d9ff] flex-shrink-0"
            >
              <Check size={16} />
            </button>
            <button
              onClick={() => setIsEditingName(false)}
              className="p-1.5 hover:bg-[rgba(255,0,110,0.2)] rounded transition-colors text-[#ff006e] flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditingName(true)}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity min-w-0"
          >
            <h1 className="text-lg md:text-2xl font-bold text-[#e0e6ff] truncate">
              {editedName}
            </h1>
            <Edit2 size={16} className="text-[#8a95b8] flex-shrink-0" />
          </button>
        )}
      </div>

      {/* Ações */}
      <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-end">
        {/* Modo Edição */}
        <button
        onClick={toggleEditMode}
        className={`p-2 md:p-2.5 rounded-lg transition-colors flex-shrink-0 ${
          isEditMode
            ? "bg-[rgba(0,217,255,0.2)] text-[#00d9ff]"
            : "bg-[rgba(0,217,255,0.1)] hover:bg-[rgba(0,217,255,0.2)] text-[#00d9ff]"
        }`}
        title={isEditMode ? "Modo Edição Ativo" : "Ativar Modo Edição"}
      >
        {isEditMode ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>

        {/* Export */}
        <button
          onClick={handleExport}
          className="p-2 md:p-2.5 rounded-lg bg-[rgba(0,217,255,0.1)] hover:bg-[rgba(0,217,255,0.2)] transition-colors text-[#00d9ff] flex-shrink-0"
          title="Exportar Dashboard"
        >
          <Download size={18} />
        </button>

        {/* Import */}
        <label className="p-2 md:p-2.5 rounded-lg bg-[rgba(0,217,255,0.1)] hover:bg-[rgba(0,217,255,0.2)] transition-colors text-[#00d9ff] cursor-pointer flex-shrink-0">
          <Upload size={18} />
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>

        {/* Tema */}
        <button
          onClick={toggleTheme}
          className="p-2 md:p-2.5 rounded-lg bg-[rgba(161,0,242,0.1)] hover:bg-[rgba(161,0,242,0.2)] transition-colors text-[#a100f2] flex-shrink-0"
          title={theme === "dark" ? "Modo Claro" : "Modo Escuro"}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
}
