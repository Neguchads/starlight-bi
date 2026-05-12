/**
 * Starlight BI - SidebarMobile Component
 * Sidebar otimizado para mobile com drawer deslizável
 */

import { useState } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import {
  Plus,
  Type,
  Table2,
  PieChart,
  BarChart3,
  LineChart,
  Circle,
  AreaChart,
  Kanban,
  Gauge,
  Image,
  Minus,
  Database,
  ChevronDown,
  ChevronUp,
  X,
  Menu,
} from "lucide-react";
import { CardType } from "@/types";
import { FileImporter } from "./FileImporter";

const CARD_TYPES: { type: CardType; label: string; icon: React.ReactNode }[] = [
  { type: "flashcard", label: "Texto Rico", icon: <Type size={18} /> },
  { type: "table", label: "Tabela", icon: <Table2 size={18} /> },
  { type: "pie", label: "Gráfico Pizza", icon: <PieChart size={18} /> },
  { type: "bar", label: "Gráfico Barras", icon: <BarChart3 size={18} /> },
  { type: "line", label: "Gráfico Linha", icon: <LineChart size={18} /> },
  { type: "doughnut", label: "Rosca", icon: <Circle size={18} /> },
  { type: "area", label: "Gráfico Área", icon: <AreaChart size={18} /> },
  { type: "kanban", label: "Kanban", icon: <Kanban size={18} /> },
  { type: "kpi", label: "KPI/Métrica", icon: <Gauge size={18} /> },
  { type: "image", label: "Imagem", icon: <Image size={18} /> },
  { type: "divider", label: "Divisor", icon: <Minus size={18} /> },
];

export function SidebarMobile() {
  const { addCard, dashboard } = useDashboardStore();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{
    addElement: boolean;
    data: boolean;
  }>({
    addElement: true,
    data: false,
  });

  const toggleSection = (section: "addElement" | "data") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAddCard = (type: CardType) => {
    addCard(type);
    setIsOpen(false);
  };

  return (
    <>
      {/* Botão de Menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-br from-[#00d9ff] to-[#a100f2] hover:shadow-lg hover:shadow-[#00d9ff]/50 transition-all text-[#0a0e27] md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-[#0f1329] border-t border-[rgba(0,217,255,0.2)] rounded-t-2xl z-30 md:hidden transition-transform duration-300 max-h-[80vh] overflow-y-auto ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Adicionar Elemento */}
          <div>
            <button
              onClick={() => toggleSection("addElement")}
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-[rgba(0,217,255,0.1)] transition-colors text-[#e0e6ff] font-semibold"
            >
              <span className="flex items-center gap-2">
                <Plus size={18} className="text-[#00d9ff]" />
                Adicionar Elemento
              </span>
              {expandedSections.addElement ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {expandedSections.addElement && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {CARD_TYPES.map(({ type, label, icon }) => (
                  <button
                    key={type}
                    onClick={() => handleAddCard(type)}
                    className="flex flex-col items-center gap-2 px-3 py-3 rounded-lg bg-[rgba(0,217,255,0.05)] hover:bg-[rgba(0,217,255,0.15)] transition-colors text-[#e0e6ff] text-xs group"
                  >
                    <span className="text-[#00d9ff] group-hover:text-[#ff006e] transition-colors">
                      {icon}
                    </span>
                    <span className="text-center">{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dados */}
          <div className="border-t border-[rgba(0,217,255,0.1)] pt-6">
            <button
              onClick={() => toggleSection("data")}
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-[rgba(0,217,255,0.1)] transition-colors text-[#e0e6ff] font-semibold"
            >
              <span className="flex items-center gap-2">
                <Database size={18} className="text-[#ff006e]" />
                Dados
              </span>
              {expandedSections.data ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {expandedSections.data && (
              <div className="mt-3 space-y-3">
                {/* Data Sources List */}
                {dashboard && dashboard.dataSources.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-xs text-[#8a95b8] uppercase tracking-wider px-2">
                      Fontes de Dados
                    </p>
                    {dashboard.dataSources.map((ds) => (
                      <div
                        key={ds.id}
                        className="px-4 py-2 rounded-lg bg-[rgba(255,0,110,0.05)] border border-[rgba(255,0,110,0.1)] text-sm text-[#e0e6ff]"
                      >
                        <p className="font-medium truncate">{ds.name}</p>
                        <p className="text-xs text-[#8a95b8]">
                          {ds.data.length} registros
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#8a95b8] px-2">
                    Nenhuma fonte de dados adicionada
                  </p>
                )}

                {/* File Importer */}
                <FileImporter />

                {/* JSON Editor */}
                <button className="w-full px-4 py-2 rounded-lg bg-[rgba(161,0,242,0.1)] hover:bg-[rgba(161,0,242,0.2)] transition-colors text-[#a100f2] text-sm font-medium">
                  📝 Editor JSON
                </button>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="border-t border-[rgba(0,217,255,0.1)] pt-6 text-xs text-[#8a95b8] space-y-2">
            <p>
              <strong>Dica:</strong> Arraste e redimensione os cards no dashboard
            </p>
            <p>
              <strong>Dados:</strong> Todos os gráficos atualizam automaticamente
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
