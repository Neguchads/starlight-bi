/**
 * Starlight BI - useFilteredData Hook
 * Hook para obter dados filtrados para um card específico
 */

import { useDashboardStore } from "@/store/dashboardStore";
import { useMemo } from "react";

export function useFilteredData(dataSourceId?: string): Record<string, any>[] {
  const { dashboard, filteredData, globalFilters } = useDashboardStore();

  return useMemo(() => {
    if (!dataSourceId || !dashboard) return [];

    // Se há filtros aplicados, retorna dados filtrados
    if (globalFilters.length > 0 && filteredData[dataSourceId]) {
      return filteredData[dataSourceId];
    }

    // Caso contrário, retorna dados originais da fonte
    const dataSource = dashboard.dataSources.find((ds) => ds.id === dataSourceId);
    return dataSource?.data || [];
  }, [dataSourceId, dashboard, filteredData, globalFilters]);
}
