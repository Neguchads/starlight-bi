/**
 * Starlight BI - CardContent Component
 * Renderiza conteúdo específico de cada tipo de card
 */

import { DashboardCard } from "@/types";
import { FlashcardContent } from "./types/FlashcardContent";
import { TableContent } from "./types/TableContent";
import { ChartContent } from "./types/ChartContent";
import { KPIContent } from "./types/KPIContent";
import { KanbanContent } from "./types/KanbanContent";
import { ImageContent } from "./types/ImageContent";
import { DividerContent } from "./types/DividerContent";

interface CardContentProps {
  card: DashboardCard;
}

export function CardContent({ card }: CardContentProps) {
  switch (card.type) {
    case "flashcard":
      return <FlashcardContent card={card} />;
    case "table":
      return <TableContent card={card} />;
    case "pie":
    case "bar":
    case "line":
    case "doughnut":
    case "area":
      return <ChartContent card={card} />;
    case "kpi":
      return <KPIContent card={card} />;
    case "kanban":
      return <KanbanContent card={card} />;
    case "image":
      return <ImageContent card={card} />;
    case "divider":
      return <DividerContent card={card} />;
    default:
      return <div className="text-[#8a95b8]">Tipo de card não suportado</div>;
  }
}
