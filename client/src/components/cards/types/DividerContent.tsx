import { DashboardCard } from "@/types";

export function DividerContent({ card }: { card: DashboardCard }) {
  const dividerStyle = card.config.dividerStyle || "solid";
  const dividerColor = card.config.dividerColor || "rgba(0, 217, 255, 0.2)";

  const borderStyle = {
    solid: "solid",
    dashed: "dashed",
    dotted: "dotted",
  }[dividerStyle] as any;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="w-full"
        style={{
          borderTop: `2px ${borderStyle} ${dividerColor}`,
        }}
      />
    </div>
  );
}
