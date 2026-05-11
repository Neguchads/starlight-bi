/**
 * Starlight BI - FilterBar Component
 * Barra de filtros globais que afetam múltiplos gráficos
 */

import { useState } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { Plus, X, ChevronDown } from "lucide-react";

export function FilterBar() {
  const {
    globalFilters,
    addGlobalFilter,
    updateGlobalFilter,
    deleteGlobalFilter,
  } = useDashboardStore();

  const [isAddingFilter, setIsAddingFilter] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  const filterTypes = [
    { value: "text", label: "Texto" },
    { value: "select", label: "Seleção" },
    { value: "date", label: "Data" },
    { value: "daterange", label: "Intervalo de Datas" },
    { value: "number", label: "Número" },
  ];

  const handleAddFilter = (type: any) => {
    addGlobalFilter(`Filtro ${globalFilters.length + 1}`, type);
    setIsAddingFilter(false);
  };

  return (
    <div className="px-6 py-4 border-b border-[rgba(0,217,255,0.1)] bg-gradient-to-r from-[#0a0e27] to-[#0f1329]">
      <div className="flex items-center gap-3 flex-wrap">
        {/* Filtros Existentes */}
        {globalFilters.map((filter) => (
          <div
            key={filter.id}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[rgba(0,217,255,0.1)] border border-[rgba(0,217,255,0.2)] hover:border-[rgba(0,217,255,0.4)] transition-colors"
          >
            <button
              onClick={() =>
                setExpandedFilter(
                  expandedFilter === filter.id ? null : filter.id
                )
              }
              className="flex items-center gap-2 flex-1 text-sm text-[#e0e6ff] hover:text-[#00d9ff] transition-colors"
            >
              <span className="font-medium">{filter.name}</span>
              <ChevronDown
                size={14}
                className={`transition-transform ${
                  expandedFilter === filter.id ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Input do Filtro */}
            {expandedFilter === filter.id && (
              <div className="absolute top-16 left-6 z-50 bg-[#0f1329] border border-[rgba(0,217,255,0.2)] rounded-lg p-3 min-w-64 shadow-lg">
                {filter.type === "text" && (
                  <input
                    type="text"
                    placeholder="Digite para filtrar..."
                    value={(filter.value as string) || ""}
                    onChange={(e) =>
                      updateGlobalFilter(filter.id, e.target.value)
                    }
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[#00d9ff] rounded px-3 py-2 text-sm text-[#e0e6ff] focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
                  />
                )}

                {filter.type === "select" && filter.options && (
                  <select
                    multiple
                    value={(filter.value as string[]) || []}
                    onChange={(e) =>
                      updateGlobalFilter(
                        filter.id,
                        Array.from(e.target.selectedOptions, (o) => o.value)
                      )
                    }
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[#00d9ff] rounded px-3 py-2 text-sm text-[#e0e6ff] focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
                  >
                    {filter.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {filter.type === "date" && (
                  <input
                    type="date"
                    value={(filter.value as string) || ""}
                    onChange={(e) =>
                      updateGlobalFilter(filter.id, e.target.value)
                    }
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[#00d9ff] rounded px-3 py-2 text-sm text-[#e0e6ff] focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
                  />
                )}

                {filter.type === "daterange" && (
                  <div className="space-y-2">
                    <input
                      type="date"
                      value={
                        (filter.value as any)?.start ||
                        ""
                      }
                      onChange={(e) =>
                        updateGlobalFilter(filter.id, {
                          start: e.target.value,
                          end: (filter.value as any)?.end || "",
                        })
                      }
                      placeholder="Data inicial"
                      className="w-full bg-[rgba(255,255,255,0.05)] border border-[#00d9ff] rounded px-3 py-2 text-sm text-[#e0e6ff] focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
                    />
                    <input
                      type="date"
                      value={
                        (filter.value as any)?.end ||
                        ""
                      }
                      onChange={(e) =>
                        updateGlobalFilter(filter.id, {
                          start: (filter.value as any)?.start || "",
                          end: e.target.value,
                        })
                      }
                      placeholder="Data final"
                      className="w-full bg-[rgba(255,255,255,0.05)] border border-[#00d9ff] rounded px-3 py-2 text-sm text-[#e0e6ff] focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
                    />
                  </div>
                )}

                {filter.type === "number" && (
                  <input
                    type="number"
                    placeholder="Digite um número..."
                    value={(filter.value as number) || ""}
                    onChange={(e) =>
                      updateGlobalFilter(
                        filter.id,
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[#00d9ff] rounded px-3 py-2 text-sm text-[#e0e6ff] focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
                  />
                )}
              </div>
            )}

            {/* Delete Button */}
            <button
              onClick={() => deleteGlobalFilter(filter.id)}
              className="p-1 rounded hover:bg-[rgba(255,0,110,0.2)] text-[#ff006e] transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {/* Add Filter Button */}
        {!isAddingFilter && (
          <button
            onClick={() => setIsAddingFilter(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[rgba(0,217,255,0.1)] hover:bg-[rgba(0,217,255,0.2)] border border-[rgba(0,217,255,0.2)] text-[#00d9ff] transition-colors text-sm font-medium"
          >
            <Plus size={16} />
            Novo Filtro
          </button>
        )}

        {/* Add Filter Menu */}
        {isAddingFilter && (
          <div className="flex items-center gap-2">
            {filterTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => handleAddFilter(type.value)}
                className="px-3 py-1 rounded-lg bg-[#00d9ff] text-[#0a0e27] text-xs font-medium hover:bg-[#ff006e] transition-colors"
              >
                {type.label}
              </button>
            ))}
            <button
              onClick={() => setIsAddingFilter(false)}
              className="px-3 py-1 rounded-lg bg-[rgba(255,0,110,0.2)] text-[#ff006e] text-xs font-medium hover:bg-[rgba(255,0,110,0.3)] transition-colors"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
