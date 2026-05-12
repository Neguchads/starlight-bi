import { DashboardCard } from "@/types";
import { useFilteredData } from "@/hooks/useFilteredData";
import { TableZoomWrapper } from "../TableZoomWrapper";

export function TableContent({ card }: { card: DashboardCard }) {
  const filteredData = useFilteredData(card.dataSourceId);
  const rows = filteredData.length > 0 ? filteredData : (card.config.rows || []);
  const columns = card.config.tableColumns || [];

  if (rows.length === 0 || columns.length === 0) {
    return (
      <div className="text-center text-[#8a95b8]">
        <p className="text-sm">Nenhum dado para exibir</p>
      </div>
    );
  }

  return (
    <TableZoomWrapper cardId={card.id}>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[rgba(0,217,255,0.1)]">
            {columns.map((col) => (
              <th
                key={col.id}
                className="px-3 py-2 text-left text-[#00d9ff] font-semibold"
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={idx}
              className="border-b border-[rgba(0,217,255,0.05)] hover:bg-[rgba(0,217,255,0.05)] transition-colors"
            >
              {columns.map((col) => (
                <td key={col.id} className="px-3 py-2 text-[#e0e6ff]">
                  {String(row[col.name] || "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </TableZoomWrapper>
  );
}
