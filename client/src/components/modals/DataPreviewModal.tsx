/**
 * Starlight BI - DataPreviewModal Component
 * Modal para visualizar e revisar dados antes de importar
 */

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Check, Edit2, Save } from "lucide-react";

interface DataPreviewModalProps {
  isOpen: boolean;
  fileName: string;
  data: Record<string, any>[];
  onConfirm: (dataSourceName: string) => void;
  onCancel: () => void;
}

export function DataPreviewModal({
  isOpen,
  fileName,
  data,
  onConfirm,
  onCancel,
}: DataPreviewModalProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [dataSourceName, setDataSourceName] = useState(
    fileName.replace(/\.[^/.]+$/, "")
  );
  const [editingCell, setEditingCell] = useState<{
    row: number;
    col: string;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editedData, setEditedData] = useState<Record<string, any>[]>(data);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(editedData.length / itemsPerPage);
  const startIdx = currentPage * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentData = editedData.slice(startIdx, endIdx);

  // Extrai as colunas do primeiro registro
  const columns = editedData.length > 0 ? Object.keys(editedData[0]) : [];

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (dataSourceName.trim()) {
      onConfirm(dataSourceName);
    }
  };

  const handleCellClick = (rowIdx: number, col: string) => {
    const actualRowIdx = startIdx + rowIdx;
    setEditingCell({ row: actualRowIdx, col });
    setEditValue(String(editedData[actualRowIdx][col]));
  };

  const handleSaveEdit = () => {
    if (editingCell) {
      const newData = [...editedData];
      newData[editingCell.row][editingCell.col] = editValue;
      setEditedData(newData);
      setEditingCell(null);
    }
  };

  const handleDeleteRow = (rowIdx: number) => {
    const actualRowIdx = startIdx + rowIdx;
    const newData = editedData.filter((_, idx) => idx !== actualRowIdx);
    setEditedData(newData);
    if (currentPage >= Math.ceil(newData.length / itemsPerPage) && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f1329] border border-[rgba(0,217,255,0.2)] rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[rgba(0,217,255,0.1)]">
          <div>
            <h2 className="text-xl font-bold text-[#e0e6ff]">Visualizar Dados</h2>
            <p className="text-sm text-[#8a95b8] mt-1">
              {editedData.length} registros encontrados em {columns.length} colunas
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-[rgba(255,0,110,0.1)] rounded-lg transition-colors text-[#ff006e]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {editedData.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-[#8a95b8]">
              <p>Nenhum dado para visualizar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Nome da Fonte de Dados */}
              <div>
                <label className="block text-sm font-medium text-[#e0e6ff] mb-2">
                  Nome da Fonte de Dados
                </label>
                <input
                  type="text"
                  value={dataSourceName}
                  onChange={(e) => setDataSourceName(e.target.value)}
                  className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[#00d9ff] rounded-lg text-[#e0e6ff] focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
                  placeholder="Nome da fonte de dados"
                />
              </div>

              {/* Tabela de Dados */}
              <div className="overflow-x-auto border border-[rgba(0,217,255,0.1)] rounded-lg">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(0,217,255,0.2)]">
                      <th className="px-4 py-3 text-left font-semibold text-[#8a95b8] bg-[rgba(0,217,255,0.05)] w-12">
                        #
                      </th>
                      {columns.map((col) => (
                        <th
                          key={col}
                          className="px-4 py-3 text-left font-semibold text-[#00d9ff] bg-[rgba(0,217,255,0.05)]"
                        >
                          {col}
                        </th>
                      ))}
                      <th className="px-4 py-3 text-center font-semibold text-[#ff006e] bg-[rgba(0,217,255,0.05)] w-12">
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((row, rowIdx) => (
                      <tr
                        key={rowIdx}
                        className="border-b border-[rgba(0,217,255,0.1)] hover:bg-[rgba(0,217,255,0.05)] transition-colors"
                      >
                        <td className="px-4 py-3 text-[#8a95b8] font-medium">
                          {startIdx + rowIdx + 1}
                        </td>
                        {columns.map((col) => (
                          <td
                            key={`${rowIdx}-${col}`}
                            className="px-4 py-3 text-[#e0e6ff] max-w-xs"
                          >
                            {editingCell?.row === startIdx + rowIdx &&
                            editingCell?.col === col ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  autoFocus
                                  className="flex-1 px-2 py-1 bg-[rgba(255,255,255,0.1)] border border-[#00d9ff] rounded text-[#e0e6ff] text-xs"
                                />
                                <button
                                  onClick={handleSaveEdit}
                                  className="p-1 hover:bg-[rgba(0,217,255,0.2)] rounded transition-colors text-[#00d9ff]"
                                >
                                  <Save size={14} />
                                </button>
                              </div>
                            ) : (
                              <div
                                onClick={() => handleCellClick(rowIdx, col)}
                                className="cursor-pointer hover:bg-[rgba(0,217,255,0.1)] px-2 py-1 rounded transition-colors group flex items-center justify-between"
                              >
                                <span className="truncate">
                                  {String(row[col]).substring(0, 50)}
                                </span>
                                <Edit2
                                  size={12}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0"
                                />
                              </div>
                            )}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleDeleteRow(rowIdx)}
                            className="px-2 py-1 rounded bg-[rgba(255,0,110,0.1)] hover:bg-[rgba(255,0,110,0.2)] text-[#ff006e] text-xs font-medium transition-colors"
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-[rgba(0,217,255,0.05)] rounded-lg border border-[rgba(0,217,255,0.1)]">
                <div>
                  <p className="text-xs text-[#8a95b8] uppercase tracking-wider">
                    Total de Registros
                  </p>
                  <p className="text-lg font-bold text-[#00d9ff]">{editedData.length}</p>
                </div>
                <div>
                  <p className="text-xs text-[#8a95b8] uppercase tracking-wider">
                    Colunas
                  </p>
                  <p className="text-lg font-bold text-[#a100f2]">{columns.length}</p>
                </div>
                <div>
                  <p className="text-xs text-[#8a95b8] uppercase tracking-wider">
                    Página
                  </p>
                  <p className="text-lg font-bold text-[#ff006e]">
                    {totalPages > 0 ? `${currentPage + 1} / ${totalPages}` : "0 / 0"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[rgba(0,217,255,0.1)] bg-[rgba(0,217,255,0.02)]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="p-2 rounded-lg bg-[rgba(0,217,255,0.1)] hover:bg-[rgba(0,217,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[#00d9ff]"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-sm text-[#8a95b8] px-4">
              {totalPages > 0 ? `${currentPage + 1} de ${totalPages}` : "0 de 0"}
            </span>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
              }
              disabled={currentPage >= totalPages - 1}
              className="p-2 rounded-lg bg-[rgba(0,217,255,0.1)] hover:bg-[rgba(0,217,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[#00d9ff]"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="px-6 py-2 rounded-lg bg-[rgba(255,0,110,0.1)] hover:bg-[rgba(255,0,110,0.2)] border border-[rgba(255,0,110,0.2)] text-[#ff006e] font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={!dataSourceName.trim() || editedData.length === 0}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#00d9ff] hover:bg-[#00b8cc] disabled:opacity-50 disabled:cursor-not-allowed text-[#0a0e27] font-medium transition-colors"
            >
              <Check size={18} />
              Confirmar Importação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
