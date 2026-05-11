/**
 * Starlight BI - Sidebar Component
 * Futurismo Minimalista: Glassmorphism + Neon Accents
 * Sidebar esquerda com opções de adicionar elementos e gerenciar dados
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
} from "lucide-react";
import { CardType } from "@/types";

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

export function Sidebar() {
  const { addCard, dashboard } = useDashboardStore();
  const [expandedSections, setExpandedSections] = useState<{
    addElement: boolean;
    data: boolean;
  }>({
    addElement: true,
    data: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="fixed left-0 top-16 bottom-0 w-80 bg-gradient-to-b from-[#0f1329] to-[#0a0e27] border-r border-[rgba(0,217,255,0.1)] backdrop-blur-md overflow-y-auto z-30">
      {/* Adicionar Elemento */}
      <div className="p-4 border-b border-[rgba(0,217,255,0.1)]">
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
          <div className="mt-3 space-y-2">
            {CARD_TYPES.map(({ type, label, icon }) => (
              <button
                key={type}
                onClick={() => addCard(type)}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-[rgba(0,217,255,0.05)] hover:bg-[rgba(0,217,255,0.15)] transition-colors text-[#e0e6ff] text-sm group"
              >
                <span className="text-[#00d9ff] group-hover:text-[#ff006e] transition-colors">
                  {icon}
                </span>
                <span className="flex-1 text-left">{label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dados */}
      <div className="p-4 border-b border-[rgba(0,217,255,0.1)]">
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
                    <p className="font-medium">{ds.name}</p>
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

            {/* Upload Data */}
            <button className="w-full px-4 py-2 rounded-lg bg-[rgba(0,217,255,0.1)] hover:bg-[rgba(0,217,255,0.2)] transition-colors text-[#00d9ff] text-sm font-medium">
              + Upload CSV/Excel
            </button>

            {/* JSON Editor */}
            <button className="w-full px-4 py-2 rounded-lg bg-[rgba(161,0,242,0.1)] hover:bg-[rgba(161,0,242,0.2)] transition-colors text-[#a100f2] text-sm font-medium">
              📝 Editor JSON
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 text-xs text-[#8a95b8] space-y-2">
        <p>
          <strong>Dica:</strong> Arraste e redimensione os cards no dashboard
        </p>
        <p>
          <strong>Dados:</strong> Todos os gráficos atualizam automaticamente
        </p>
      </div>
    </div>
  );
}
