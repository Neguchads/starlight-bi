/**
 * Starlight BI - TopBar Component
 * Futurismo Minimalista: Glassmorphism + Neon Accents
 * Barra superior com título editável, botões de ação e tema
 */

import { useState } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { Download, Upload, Eye, EyeOff, Moon, Sun, Save } from "lucide-react";

export function TopBar() {
  const {
    dashboard,
    isEditMode,
    theme,
    updateDashboardName,
    toggleEditMode,
    updateDashboardTheme,
    exportDashboard,
    importDashboard,
    saveToDisk,
  } = useDashboardStore();

  const [isEditingName, setIsEditingName] = useState(false);
  const [dashboardName, setDashboardName] = useState(dashboard?.name || "");

  const handleNameChange = () => {
    if (dashboardName.trim()) {
      updateDashboardName(dashboardName);
    }
    setIsEditingName(false);
  };

  const handleExport = () => {
    const json = exportDashboard();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${dashboard?.name || "dashboard"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const json = event.target?.result as string;
          if (importDashboard(json)) {
            alert("Dashboard importado com sucesso!");
          } else {
            alert("Erro ao importar dashboard");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#0a0e27] to-[#0f1329] border-b border-[rgba(0,217,255,0.1)] backdrop-blur-md z-40 flex items-center justify-between px-6">
      {/* Left: Logo + Dashboard Name */}
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d9ff] to-[#ff006e] flex items-center justify-center">
            <span className="text-[#0a0e27] font-bold text-sm">⚡</span>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-[#00d9ff] to-[#ff006e] bg-clip-text text-transparent">
            Starlight BI
          </span>
        </div>

        {/* Dashboard Name */}
        <div className="flex-1 ml-4">
          {isEditingName ? (
            <input
              type="text"
              value={dashboardName}
              onChange={(e) => setDashboardName(e.target.value)}
              onBlur={handleNameChange}
              onKeyDown={(e) => e.key === "Enter" && handleNameChange()}
              autoFocus
              className="bg-[rgba(255,255,255,0.05)] border border-[#00d9ff] rounded px-3 py-1 text-sm text-[#e0e6ff] focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
            />
          ) : (
            <h1
              onClick={() => setIsEditingName(true)}
              className="text-lg font-semibold text-[#e0e6ff] cursor-pointer hover:text-[#00d9ff] transition-colors"
            >
              {dashboard?.name || "Novo Dashboard"}
            </h1>
          )}
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Save Button */}
        <button
          onClick={saveToDisk}
          className="p-2 rounded-lg hover:bg-[rgba(0,217,255,0.1)] transition-colors text-[#00d9ff] hover:text-[#ff006e] group"
          title="Salvar"
        >
          <Save size={18} className="group-hover:scale-110 transition-transform" />
        </button>

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="p-2 rounded-lg hover:bg-[rgba(0,217,255,0.1)] transition-colors text-[#00d9ff] hover:text-[#ff006e] group"
          title="Exportar JSON"
        >
          <Download size={18} className="group-hover:scale-110 transition-transform" />
        </button>

        {/* Import Button */}
        <button
          onClick={handleImport}
          className="p-2 rounded-lg hover:bg-[rgba(0,217,255,0.1)] transition-colors text-[#00d9ff] hover:text-[#ff006e] group"
          title="Importar JSON"
        >
          <Upload size={18} className="group-hover:scale-110 transition-transform" />
        </button>

        {/* Edit/Preview Toggle */}
        <button
          onClick={toggleEditMode}
          className="p-2 rounded-lg hover:bg-[rgba(0,217,255,0.1)] transition-colors text-[#00d9ff] hover:text-[#ff006e] group"
          title={isEditMode ? "Modo Preview" : "Modo Edição"}
        >
          {isEditMode ? (
            <Eye size={18} className="group-hover:scale-110 transition-transform" />
          ) : (
            <EyeOff size={18} className="group-hover:scale-110 transition-transform" />
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => updateDashboardTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg hover:bg-[rgba(0,217,255,0.1)] transition-colors text-[#00d9ff] hover:text-[#ff006e] group"
          title="Alternar Tema"
        >
          {theme === "dark" ? (
            <Sun size={18} className="group-hover:scale-110 transition-transform" />
          ) : (
            <Moon size={18} className="group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>
    </div>
  );
}
