import { DashboardCard } from "@/types";
import Chart from "react-apexcharts";
import { useFilteredData } from "@/hooks/useFilteredData";

export function ChartContent({ card }: { card: DashboardCard }) {
  const chartType = card.config.chartType || "line";
  const dataKeys = card.config.dataKeys || [];
  const filteredData = useFilteredData(card.dataSourceId);

  if (dataKeys.length === 0) {
    return (
      <div className="text-center text-[#8a95b8]">
        <p className="text-sm">Configure as chaves de dados para exibir o gráfico</p>
      </div>
    );
  }

  const options: ApexCharts.ApexOptions = {
    theme: { mode: "dark" } as any,
    colors: ["#00d9ff", "#ff006e", "#a100f2"],
    chart: {
      background: "transparent",
      toolbar: { show: false },
    },
    xaxis: {
      labels: { style: { colors: "#8a95b8" } },
    },
    yaxis: {
      labels: { style: { colors: "#8a95b8" } },
    },
    legend: {
      labels: { colors: "#e0e6ff" },
    },
    tooltip: {
      theme: "dark",
    },
  };

  const series = [
    {
      name: dataKeys[0] || "Dados",
      data: filteredData.length > 0
        ? filteredData.map((row) => row[dataKeys[0]] || 0)
        : [30, 40, 35, 50, 49, 60, 70],
    },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Chart
        options={options}
        series={series}
        type={chartType as any}
        height="100%"
        width="100%"
      />
    </div>
  );
}
