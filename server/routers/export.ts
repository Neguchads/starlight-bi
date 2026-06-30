/**
 * Export Router
 * Endpoints para exportar dashboards em diferentes formatos
 */

import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { exportToPDF, exportToExcel, exportToPowerPoint, type DashboardData } from "../exporters";

// Validação de dados do dashboard
const dashboardDataSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  cards: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      type: z.enum(["flashcard", "table", "chart", "kpi", "kanban", "image", "divider"]),
      content: z.unknown(),
      position: z.object({ x: z.number(), y: z.number() }).optional(),
      size: z.object({ width: z.number(), height: z.number() }).optional(),
    })
  ),
  generatedAt: z.date().default(() => new Date()),
});

type DashboardInput = z.infer<typeof dashboardDataSchema>;

export const exportRouter = router({
  /**
   * Exporta dashboard para PDF
   */
  toPDF: publicProcedure.input(dashboardDataSchema).mutation(async ({ input }: { input: DashboardInput }) => {
    try {
      const buffer = await exportToPDF(input as DashboardData);
      return {
        success: true,
        data: buffer.toString("base64"),
        filename: `${input.title.replace(/\s+/g, "_")}_${Date.now()}.pdf`,
        mimeType: "application/pdf",
      };
    } catch (error) {
      console.error("[Export] PDF error:", error);
      throw new Error("Failed to export to PDF");
    }
  }),

  /**
   * Exporta dashboard para Excel
   */
  toExcel: publicProcedure.input(dashboardDataSchema).mutation(async ({ input }: { input: DashboardInput }) => {
    try {
      const buffer = await exportToExcel(input as DashboardData);
      return {
        success: true,
        data: buffer.toString("base64"),
        filename: `${input.title.replace(/\s+/g, "_")}_${Date.now()}.xlsx`,
        mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      };
    } catch (error) {
      console.error("[Export] Excel error:", error);
      throw new Error("Failed to export to Excel");
    }
  }),

  /**
   * Exporta dashboard para PowerPoint
   */
  toPowerPoint: publicProcedure.input(dashboardDataSchema).mutation(async ({ input }: { input: DashboardInput }) => {
    try {
      const buffer = await exportToPowerPoint(input as DashboardData);
      return {
        success: true,
        data: buffer.toString("base64"),
        filename: `${input.title.replace(/\s+/g, "_")}_${Date.now()}.pptx`,
        mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      };
    } catch (error) {
      console.error("[Export] PowerPoint error:", error);
      throw new Error("Failed to export to PowerPoint");
    }
  }),
});
