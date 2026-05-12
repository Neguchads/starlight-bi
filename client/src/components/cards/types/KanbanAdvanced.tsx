/**
 * Starlight BI - Advanced Kanban Component
 * Kanban board com funcionalidades avançadas: drag-and-drop, story points, prioridades, etc
 */

import { useState, useCallback } from "react";
import { DashboardCard } from "@/types";
import {
  KanbanCard,
  KanbanColumn,
  KanbanCardPriority,
  KanbanFilter,
} from "@/types/kanban";
import {
  Plus,
  Trash2,
  Flag,
  Users,
  Calendar,
  Tag,
  MessageSquare,
  Paperclip,
  CheckSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface KanbanAdvancedProps {
  card: DashboardCard;
  onUpdate?: (card: DashboardCard) => void;
}

const PRIORITY_COLORS: Record<KanbanCardPriority, string> = {
  low: "bg-blue-500/20 border-blue-500/50 text-blue-400",
  medium: "bg-yellow-500/20 border-yellow-500/50 text-yellow-400",
  high: "bg-orange-500/20 border-orange-500/50 text-orange-400",
  critical: "bg-red-500/20 border-red-500/50 text-red-400",
};

const PRIORITY_ICONS: Record<KanbanCardPriority, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};

export function KanbanAdvanced({ card, onUpdate }: KanbanAdvancedProps) {
  const [columns, setColumns] = useState<KanbanColumn[]>(
    card.config.columns || []
  );
  const [filter, setFilter] = useState<KanbanFilter>({});
  const [draggedCard, setDraggedCard] = useState<KanbanCard | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Filtrar cards baseado em filtros
  const getFilteredCards = (cards: KanbanCard[]) => {
    return cards.filter((c) => {
      if (filter.priority && !filter.priority.includes(c.priority))
        return false;
      if (filter.status && !filter.status.includes(c.status)) return false;
      if (filter.assignee && !filter.assignee.includes(c.assignee?.id || ""))
        return false;
      if (
        filter.searchText &&
        !c.title.toLowerCase().includes(filter.searchText.toLowerCase())
      )
        return false;
      return true;
    });
  };

  // Drag and drop
  const handleDragStart = (e: React.DragEvent, card: KanbanCard) => {
    setDraggedCard(card);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedCard) return;

    setColumns((prevColumns) =>
      prevColumns.map((col) => {
        if (col.id === draggedCard.columnId) {
          return {
            ...col,
            cards: col.cards.filter((c) => c.id !== draggedCard.id),
          };
        }
        if (col.id === targetColumnId) {
          return {
            ...col,
            cards: [...col.cards, { ...draggedCard, columnId: targetColumnId }],
          };
        }
        return col;
      })
    );

    setDraggedCard(null);
  };

  // Adicionar novo card
  const addCard = (columnId: string) => {
    const newCard: KanbanCard = {
      id: `card-${Date.now()}`,
      title: "Novo Card",
      columnId,
      priority: "medium",
      status: "todo",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      position: 0,
    };

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
      )
    );
  };

  // Deletar card
  const deleteCard = (columnId: string, cardId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
          : col
      )
    );
  };

  // Atualizar card
  const updateCard = (columnId: string, updatedCard: KanbanCard) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map((c) =>
                c.id === updatedCard.id ? updatedCard : c
              ),
            }
          : col
      )
    );
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0a0e27] to-[#141829] rounded-lg p-4 overflow-x-auto">
      {/* Barra de Filtros */}
      <div className="mb-4 flex gap-2 pb-4 border-b border-[rgba(0,217,255,0.1)]">
        <input
          type="text"
          placeholder="Buscar cards..."
          value={filter.searchText || ""}
          onChange={(e) =>
            setFilter({ ...filter, searchText: e.target.value })
          }
          className="px-3 py-2 bg-[rgba(0,217,255,0.05)] border border-[rgba(0,217,255,0.2)] rounded-lg text-sm text-[#e0e6ff] placeholder-[#8a95b8] focus:outline-none focus:border-[#00d9ff]"
        />

        {/* Filtro de Prioridade */}
        <select
          multiple
          value={filter.priority || []}
          onChange={(e) =>
            setFilter({
              ...filter,
              priority: Array.from(e.target.selectedOptions, (o) =>
                o.value as KanbanCardPriority
              ),
            })
          }
          className="px-3 py-2 bg-[rgba(0,217,255,0.05)] border border-[rgba(0,217,255,0.2)] rounded-lg text-sm text-[#e0e6ff] focus:outline-none focus:border-[#00d9ff]"
        >
          <option value="">Prioridade</option>
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
          <option value="critical">Crítica</option>
        </select>
      </div>

      {/* Colunas */}
      <div className="flex gap-4 h-full">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex-shrink-0 w-80 bg-[rgba(0,217,255,0.05)] border border-[rgba(0,217,255,0.1)] rounded-lg p-4 flex flex-col"
          >
            {/* Header da Coluna */}
            <div className="mb-4 pb-3 border-b border-[rgba(0,217,255,0.1)]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-[#00d9ff]">{column.title}</h3>
                <span className="text-xs text-[#8a95b8] bg-[rgba(0,217,255,0.1)] px-2 py-1 rounded">
                  {getFilteredCards(column.cards).length}
                </span>
              </div>
              {column.limit && (
                <div className="text-xs text-[#8a95b8]">
                  Limite: {column.limit} cards
                </div>
              )}
            </div>

            {/* Cards */}
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
              className="flex-1 space-y-2 overflow-y-auto"
            >
              {getFilteredCards(column.cards).map((kanbanCard) => (
                <div
                  key={kanbanCard.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, kanbanCard)}
                  className={`p-3 bg-[rgba(20,24,41,0.8)] border border-[rgba(0,217,255,0.2)] rounded-lg cursor-move hover:border-[#00d9ff] transition-all group ${
                    PRIORITY_COLORS[kanbanCard.priority]
                  }`}
                >
                  {/* Título */}
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-[#e0e6ff] flex-1 text-sm">
                      {kanbanCard.title}
                    </h4>
                    <button
                      onClick={() => deleteCard(column.id, kanbanCard.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ff006e] hover:text-[#ff006e]/80"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Descrição */}
                  {kanbanCard.description && (
                    <p className="text-xs text-[#8a95b8] mb-2 line-clamp-2">
                      {kanbanCard.description}
                    </p>
                  )}

                  {/* Story Points */}
                  {kanbanCard.storyPoints && (
                    <div className="mb-2 inline-block px-2 py-1 bg-[rgba(161,0,242,0.2)] border border-[rgba(161,0,242,0.3)] rounded text-xs text-[#a100f2]">
                      {kanbanCard.storyPoints} pts
                    </div>
                  )}

                  {/* Tags */}
                  {kanbanCard.tags && kanbanCard.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {kanbanCard.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            backgroundColor: `${tag.color}20`,
                            color: tag.color,
                            border: `1px solid ${tag.color}50`,
                          }}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer com Metadados */}
                  <div className="flex items-center justify-between text-xs text-[#8a95b8] mt-2 pt-2 border-t border-[rgba(0,217,255,0.1)]">
                    <div className="flex gap-2">
                      {kanbanCard.comments && kanbanCard.comments.length > 0 && (
                        <div className="flex items-center gap-1">
                          <MessageSquare size={12} />
                          {kanbanCard.comments.length}
                        </div>
                      )}
                      {kanbanCard.attachments &&
                        kanbanCard.attachments.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Paperclip size={12} />
                            {kanbanCard.attachments.length}
                          </div>
                        )}
                      {kanbanCard.checklist && kanbanCard.checklist.length > 0 && (
                        <div className="flex items-center gap-1">
                          <CheckSquare size={12} />
                          {kanbanCard.checklist.filter((c) => c.completed)
                            .length}/{kanbanCard.checklist.length}
                        </div>
                      )}
                    </div>

                    {/* Avatar do Assignee */}
                    {kanbanCard.assignee && (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{
                          backgroundColor: kanbanCard.assignee.color || "#00d9ff",
                        }}
                      >
                        {kanbanCard.assignee.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Due Date */}
                  {kanbanCard.dueDate && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-[#8a95b8]">
                      <Calendar size={12} />
                      {new Date(kanbanCard.dueDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Botão Adicionar Card */}
            <button
              onClick={() => addCard(column.id)}
              className="mt-4 w-full py-2 px-3 bg-[rgba(0,217,255,0.1)] hover:bg-[rgba(0,217,255,0.2)] border border-[rgba(0,217,255,0.2)] rounded-lg text-sm text-[#00d9ff] transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              Adicionar Card
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
