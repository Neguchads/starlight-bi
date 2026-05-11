import { DashboardCard } from "@/types";

export function KanbanContent({ card }: { card: DashboardCard }) {
  const columns = card.config.kanbanColumns || [];

  return (
    <div className="w-full h-full flex gap-4 overflow-x-auto pb-2">
      {columns.map((col) => (
        <div key={col.id} className="flex-shrink-0 w-64">
          <h4 className="text-sm font-semibold text-[#00d9ff] mb-3">{col.title}</h4>
          <div className="space-y-2">
            {col.items.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg bg-[rgba(255,0,110,0.1)] border border-[rgba(255,0,110,0.2)] hover:border-[rgba(255,0,110,0.4)] transition-colors cursor-move"
              >
                <p className="text-sm text-[#e0e6ff] font-medium">{item.title}</p>
                {item.description && (
                  <p className="text-xs text-[#8a95b8] mt-1">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
