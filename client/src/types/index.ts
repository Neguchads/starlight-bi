/**
 * Starlight BI - Type Definitions
 * Futurismo Minimalista: Glassmorphism + Neon Accents
 */

export type CardType =
  | "flashcard"
  | "table"
  | "pie"
  | "bar"
  | "line"
  | "doughnut"
  | "area"
  | "kanban"
  | "kpi"
  | "image"
  | "divider";

export type ChartType =
  | "pie"
  | "bar"
  | "line"
  | "doughnut"
  | "area";

export interface Position {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DashboardCard {
  id: string;
  type: CardType;
  title: string;
  position: Position;
  config: CardConfig;
  dataSourceId?: string;
  createdAt: number;
  updatedAt: number;
}

export interface CardConfig {
  // Common
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  showBorder?: boolean;

  // Chart specific
  chartType?: ChartType;
  chartOptions?: Record<string, any>;
  dataKeys?: string[];
  xAxisKey?: string;
  yAxisKey?: string;

  // Flashcard/Text
  content?: string;
  fontSize?: number;
  fontWeight?: number;
  textAlign?: "left" | "center" | "right";

  // Table
  tableColumns?: TableColumn[];
  rows?: Record<string, any>[];

  // KPI
  value?: number | string;
  unit?: string;
  trend?: number;
  trendDirection?: "up" | "down" | "neutral";

  // Image
  imageUrl?: string;
  imageAlt?: string;

  // Kanban
  kanbanColumns?: KanbanColumn[];

  // Divider
  dividerStyle?: "solid" | "dashed" | "dotted";
  dividerColor?: string;
}

export interface TableColumn {
  id: string;
  name: string;
  type: "text" | "number" | "date" | "select";
  width?: number;
}

export interface KanbanColumn {
  id: string;
  title: string;
  items: KanbanItem[];
}

export interface KanbanItem {
  id: string;
  title: string;
  description?: string;
  color?: string;
}

export interface DataSource {
  id: string;
  name: string;
  type: "json" | "csv" | "excel" | "manual";
  data: Record<string, any>[];
  columns: string[];
  createdAt: number;
  updatedAt: number;
}

export interface Dashboard {
  id: string;
  name: string;
  description?: string;
  cards: DashboardCard[];
  dataSources: DataSource[];
  theme: "dark" | "light";
  createdAt: number;
  updatedAt: number;
}

export interface AppState {
  dashboard: Dashboard | null;
  selectedCardId: string | null;
  isEditMode: boolean;
  theme: "dark" | "light";
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
}

export interface GlobalFilter {
  id: string;
  name: string;
  type: "text" | "select" | "date" | "daterange" | "number";
  value: string | string[] | { start: string; end: string } | number | null;
  options?: { label: string; value: string }[];
  appliedToCards: string[];
}

export interface FilteredData {
  [cardId: string]: Record<string, any>[];
}
