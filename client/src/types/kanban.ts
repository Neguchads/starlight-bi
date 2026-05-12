/**
 * Starlight BI - Kanban Types
 * Tipos avançados para funcionalidades de Kanban
 */

export type KanbanCardPriority = "low" | "medium" | "high" | "critical";
export type KanbanCardStatus = "todo" | "in-progress" | "review" | "done";
export type KanbanCardSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  priority: KanbanCardPriority;
  status: KanbanCardStatus;
  storyPoints?: number;
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
    color?: string;
  };
  tags?: KanbanTag[];
  dueDate?: number;
  attachments?: KanbanAttachment[];
  comments?: KanbanComment[];
  checklist?: KanbanChecklistItem[];
  subtasks?: KanbanCard[];
  createdAt: number;
  updatedAt: number;
  createdBy?: string;
  position: number; // Ordem dentro da coluna
}

export interface KanbanColumn {
  id: string;
  title: string;
  color?: string;
  icon?: string;
  cards: KanbanCard[];
  limit?: number; // Limite de cards na coluna
  collapsed?: boolean;
  position: number;
}

export interface KanbanBoard {
  id: string;
  title: string;
  description?: string;
  columns: KanbanColumn[];
  settings: KanbanBoardSettings;
  createdAt: number;
  updatedAt: number;
}

export interface KanbanBoardSettings {
  showStoryPoints?: boolean;
  showAssignees?: boolean;
  showDueDate?: boolean;
  showTags?: boolean;
  allowComments?: boolean;
  allowAttachments?: boolean;
  cardSize?: KanbanCardSize;
  theme?: "light" | "dark";
  layout?: "compact" | "comfortable" | "spacious";
}

export interface KanbanTag {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface KanbanAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: number;
  uploadedBy?: string;
}

export interface KanbanComment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  text: string;
  createdAt: number;
  updatedAt?: number;
  replies?: KanbanComment[];
}

export interface KanbanChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: number;
  assignee?: string;
}

export interface KanbanDragEvent {
  sourceColumnId: string;
  targetColumnId: string;
  cardId: string;
  sourcePosition: number;
  targetPosition: number;
}

export interface KanbanFilter {
  priority?: KanbanCardPriority[];
  status?: KanbanCardStatus[];
  assignee?: string[];
  tags?: string[];
  storyPoints?: { min: number; max: number };
  dueDateRange?: { start: number; end: number };
  searchText?: string;
}
