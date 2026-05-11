import { DashboardCard } from "@/types";
import { TrendingUp, TrendingDown } from "lucide-react";

export function KPIContent({ card }: { card: DashboardCard }) {
  const value = card.config.value || 0;
  const unit = card.config.unit || "";
  const trend = card.config.trend || 0;
  const trendDirection = card.config.trendDirection || "neutral";

  const trendColor =
    trendDirection === "up"
      ? "#00d9ff"
      : trendDirection === "down"
        ? "#ff006e"
        : "#8a95b8";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="text-5xl font-bold text-[#00d9ff]">
        {value}
        <span className="text-2xl text-[#8a95b8] ml-2">{unit}</span>
      </div>
      {trend !== 0 && (
        <div className="flex items-center gap-2" style={{ color: trendColor }}>
          {trendDirection === "up" ? (
            <TrendingUp size={20} />
          ) : (
            <TrendingDown size={20} />
          )}
          <span className="text-lg font-semibold">{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
  );
}
