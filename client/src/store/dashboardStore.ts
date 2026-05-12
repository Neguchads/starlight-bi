/**
 * Starlight BI - Dashboard Store (Zustand)
 * Gerencia estado global: dashboard, cards, dados e tema
 */

import { create } from "zustand";
import { Dashboard, DashboardCard, DataSource, CardType, CardConfig, Position, ChartType, GlobalFilter, FilteredData } from "@/types";
import { nanoid } from "nanoid";

interface DashboardStore {
  // State
  dashboard: Dashboard | null;
  selectedCardId: string | null;
  isEditMode: boolean;
  theme: "dark" | "light";
  globalFilters: GlobalFilter[];
  filteredData: FilteredData;

  // Dashboard actions
  createDashboard: (name: string) => void;
  loadDashboard: (dashboard: Dashboard) => void;
  updateDashboardName: (name: string) => void;
  setDashboardName: (name: string) => void;
  updateDashboardTheme: (theme: "dark" | "light") => void;

  // Card actions
  addCard: (type: CardType, position?: Position) => void;
  updateCard: (id: string, updates: Partial<DashboardCard>) => void;
  deleteCard: (id: string) => void;
  selectCard: (id: string | null) => void;
  updateCardConfig: (id: string, config: Partial<CardConfig>) => void;
  updateCardPosition: (id: string, position: Position) => void;

  // Data source actions
  addDataSource: (name: string, data: Record<string, any>[], type: "json" | "csv" | "excel" | "manual") => void;
  updateDataSource: (id: string, data: Record<string, any>[]) => void;
  deleteDataSource: (id: string) => void;

  // UI actions
  toggleEditMode: () => void;
  setEditMode: (isEditMode: boolean) => void;

  // Filter actions
  addGlobalFilter: (name: string, type: GlobalFilter["type"], options?: { label: string; value: string }[]) => void;
  updateGlobalFilter: (filterId: string, value: any, appliedToCards?: string[]) => void;
  deleteGlobalFilter: (filterId: string) => void;
  applyFilters: () => void;

  // Persistence
  exportDashboard: () => string;
  importDashboard: (json: string) => boolean;
  saveToDisk: () => void;
  loadFromDisk: () => void;
}

const DEFAULT_DASHBOARD: Dashboard = {
  id: nanoid(),
  name: "Novo Dashboard",
  description: "",
  cards: [],
  dataSources: [],
  theme: "dark",
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  get editMode() {
    return get().isEditMode;
  },
  dashboard: null,
  selectedCardId: null,
  isEditMode: true,
  theme: "dark",
  globalFilters: [],
  filteredData: {},

  // Dashboard actions
  createDashboard: (name: string) => {
    const newDashboard: Dashboard = {
      ...DEFAULT_DASHBOARD,
      id: nanoid(),
      name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    set({ dashboard: newDashboard });
    get().saveToDisk();
  },

  loadDashboard: (dashboard: Dashboard) => {
    set({ dashboard, theme: dashboard.theme });
    get().saveToDisk();
  },

  updateDashboardName: (name: string) => {
    set((state) => ({
      dashboard: state.dashboard
        ? { ...state.dashboard, name, updatedAt: Date.now() }
        : null,
    }));
    get().saveToDisk();
  },

  setDashboardName: (name: string) => {
    set((state) => ({
      dashboard: state.dashboard
        ? { ...state.dashboard, name, updatedAt: Date.now() }
        : null,
    }));
    get().saveToDisk();
  },

  updateDashboardTheme: (theme: "dark" | "light") => {
    set((state) => ({
      dashboard: state.dashboard
        ? { ...state.dashboard, theme, updatedAt: Date.now() }
        : null,
      theme,
    }));
    get().saveToDisk();
  },

  // Card actions
  addCard: (type: CardType, position?: Position) => {
    set((state) => {
      if (!state.dashboard) return state;

      const defaultPosition: Position = position || {
        x: state.dashboard.cards.length % 4,
        y: Math.floor(state.dashboard.cards.length / 4),
        w: 2,
        h: 2,
      };

      const newCard: DashboardCard = {
        id: nanoid(),
        type,
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} ${state.dashboard.cards.length + 1}`,
        position: defaultPosition,
        config: getDefaultConfig(type),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      return {
        dashboard: {
          ...state.dashboard,
          cards: [...state.dashboard.cards, newCard],
          updatedAt: Date.now(),
        },
        selectedCardId: newCard.id,
      };
    });
    get().saveToDisk();
  },

  updateCard: (id: string, updates: Partial<DashboardCard>) => {
    set((state) => ({
      dashboard: state.dashboard
        ? {
            ...state.dashboard,
            cards: state.dashboard.cards.map((card) =>
              card.id === id
                ? { ...card, ...updates, updatedAt: Date.now() }
                : card
            ),
            updatedAt: Date.now(),
          }
        : null,
    }));
    get().saveToDisk();
  },

  deleteCard: (id: string) => {
    set((state) => ({
      dashboard: state.dashboard
        ? {
            ...state.dashboard,
            cards: state.dashboard.cards.filter((card) => card.id !== id),
            updatedAt: Date.now(),
          }
        : null,
      selectedCardId: state.selectedCardId === id ? null : state.selectedCardId,
    }));
    get().saveToDisk();
  },

  selectCard: (id: string | null) => {
    set({ selectedCardId: id });
  },

  updateCardConfig: (id: string, config: Partial<CardConfig>) => {
    set((state) => ({
      dashboard: state.dashboard
        ? {
            ...state.dashboard,
            cards: state.dashboard.cards.map((card) =>
              card.id === id
                ? {
                    ...card,
                    config: { ...card.config, ...config },
                    updatedAt: Date.now(),
                  }
                : card
            ),
            updatedAt: Date.now(),
          }
        : null,
    }));
    get().saveToDisk();
  },

  updateCardPosition: (id: string, position: Position) => {
    set((state) => ({
      dashboard: state.dashboard
        ? {
            ...state.dashboard,
            cards: state.dashboard.cards.map((card) =>
              card.id === id
                ? { ...card, position, updatedAt: Date.now() }
                : card
            ),
            updatedAt: Date.now(),
          }
        : null,
    }));
    get().saveToDisk();
  },

  // Data source actions
  addDataSource: (name: string, data: Record<string, any>[], type: "json" | "csv" | "excel" | "manual") => {
    set((state) => {
      if (!state.dashboard) return state;

      const columns = data.length > 0 ? Object.keys(data[0]) : [];
      const newDataSource: DataSource = {
        id: nanoid(),
        name,
        type,
        data,
        columns,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      return {
        dashboard: {
          ...state.dashboard,
          dataSources: [...state.dashboard.dataSources, newDataSource],
          updatedAt: Date.now(),
        },
      };
    });
    get().saveToDisk();
  },

  updateDataSource: (id: string, data: Record<string, any>[]) => {
    set((state) => ({
      dashboard: state.dashboard
        ? {
            ...state.dashboard,
            dataSources: state.dashboard.dataSources.map((ds) =>
              ds.id === id
                ? {
                    ...ds,
                    data,
                    columns: data.length > 0 ? Object.keys(data[0]) : [],
                    updatedAt: Date.now(),
                  }
                : ds
            ),
            updatedAt: Date.now(),
          }
        : null,
    }));
    get().saveToDisk();
  },

  deleteDataSource: (id: string) => {
    set((state) => ({
      dashboard: state.dashboard
        ? {
            ...state.dashboard,
            dataSources: state.dashboard.dataSources.filter((ds) => ds.id !== id),
            cards: state.dashboard.cards.filter((card) => card.dataSourceId !== id),
            updatedAt: Date.now(),
          }
        : null,
    }));
    get().saveToDisk();
  },

  // UI actions
  toggleEditMode: () => {
    set((state) => ({ isEditMode: !state.isEditMode }));
  },

  setEditMode: (isEditMode: boolean) => {
    set({ isEditMode });
  },

  // Filter actions
  addGlobalFilter: (name: string, type: GlobalFilter["type"], options?: { label: string; value: string }[]) => {
    const newFilter: GlobalFilter = {
      id: nanoid(),
      name,
      type,
      value: null,
      options,
      appliedToCards: [],
    };
    set((state) => ({
      globalFilters: [...state.globalFilters, newFilter],
    }));
    get().saveToDisk();
  },

  updateGlobalFilter: (filterId: string, value: any, appliedToCards?: string[]) => {
    set((state) => ({
      globalFilters: state.globalFilters.map((f) =>
        f.id === filterId
          ? { ...f, value, appliedToCards: appliedToCards || f.appliedToCards }
          : f
      ),
    }));
    get().applyFilters();
    get().saveToDisk();
  },

  deleteGlobalFilter: (filterId: string) => {
    set((state) => ({
      globalFilters: state.globalFilters.filter((f) => f.id !== filterId),
    }));
    get().applyFilters();
    get().saveToDisk();
  },

  applyFilters: () => {
    const state = get();
    if (!state.dashboard) return;

    const filtered: FilteredData = {};

    state.dashboard.dataSources.forEach((dataSource) => {
      let filteredData = [...dataSource.data];

      state.globalFilters.forEach((filter) => {
        if (filter.value === null || filter.value === "") return;

        filteredData = filteredData.filter((row) => {
          if (filter.type === "text") {
            return Object.values(row).some((val) =>
              String(val).toLowerCase().includes(String(filter.value).toLowerCase())
            );
          } else if (filter.type === "select" && Array.isArray(filter.value)) {
            return filter.value.some((v) => Object.values(row).includes(v));
          } else if (filter.type === "number") {
            return Object.values(row).some((val) => Number(val) === filter.value);
          } else if (filter.type === "date") {
            return Object.values(row).some((val) => String(val).includes(String(filter.value)));
          } else if (filter.type === "daterange" && typeof filter.value === "object" && filter.value !== null && "start" in filter.value) {
            const { start, end } = filter.value as { start: string; end: string };
            return Object.values(row).some((val) => {
              const valStr = String(val);
              return valStr >= start && valStr <= end;
            });
          }
          return true;
        });
      });

      filtered[dataSource.id] = filteredData;
    });

    set({ filteredData: filtered });
  },

  // Persistence
  exportDashboard: () => {
    const state = get();
    if (!state.dashboard) return "{}";
    return JSON.stringify(state.dashboard, null, 2);
  },

  importDashboard: (json: string) => {
    try {
      const dashboard = JSON.parse(json) as Dashboard;
      get().loadDashboard(dashboard);
      return true;
    } catch {
      return false;
    }
  },

  saveToDisk: () => {
    const state = get();
    if (state.dashboard) {
      localStorage.setItem("starlight-dashboard", JSON.stringify(state.dashboard));
    }
  },

  loadFromDisk: () => {
    const saved = localStorage.getItem("starlight-dashboard");
    if (saved) {
      try {
        const dashboard = JSON.parse(saved) as Dashboard;
        set({ dashboard, theme: dashboard.theme });
      } catch {
        console.error("Failed to load dashboard from localStorage");
      }
    }
  },
}));

// Helper function to get default config for each card type
function getDefaultConfig(type: CardType): CardConfig {
  const baseConfig = {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    textColor: "#e0e6ff",
    borderColor: "rgba(0, 217, 255, 0.1)",
    showBorder: true,
  };

  switch (type) {
    case "flashcard":
      return {
        ...baseConfig,
        content: "Clique para editar...",
        fontSize: 16,
        fontWeight: 400,
        textAlign: "left",
      };
    case "kpi":
      return {
        ...baseConfig,
        value: 0,
        unit: "",
        trend: 0,
        trendDirection: "neutral",
      };
    case "table":
      return {
        ...baseConfig,
        tableColumns: [],
        rows: [],
      };
    case "kanban":
      return {
        ...baseConfig,
        kanbanColumns: [
          { id: "1", title: "To Do", items: [] },
          { id: "2", title: "In Progress", items: [] },
          { id: "3", title: "Done", items: [] },
        ],
      };
    case "pie":
    case "doughnut":
    case "bar":
    case "line":
    case "area":
      return {
        ...baseConfig,
        chartType: type as ChartType,
        dataKeys: [],
        xAxisKey: "",
        yAxisKey: "",
        chartOptions: {},
      };
    case "image":
      return {
        ...baseConfig,
        imageUrl: "",
        imageAlt: "Imagem",
      };
    case "divider":
      return {
        ...baseConfig,
        dividerStyle: "solid",
        dividerColor: "rgba(0, 217, 255, 0.2)",
      };
    default:
      return baseConfig;
  }
}
