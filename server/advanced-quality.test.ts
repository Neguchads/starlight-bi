import { describe, expect, it } from "vitest";
import ExcelJS from "exceljs";
import { exportToExcel } from "./exporters";
import type { DashboardData } from "./exporters";

// Bounded, reproducible property fuzz; all content is synthetic.
function title(seed: number): string {
  const alphabet = "ABCDEabcde0123456789";
  let state = seed >>> 0;
  return Array.from({ length: (seed % 25) + 1 }, () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return alphabet[state % alphabet.length];
  }).join("");
}

describe("advanced property checks — real Excel exporter", () => {
  it("roundtrips randomized dashboard titles and card counts", async () => {
    for (let seed = 1; seed <= 18; seed++) {
      const cards = Array.from({ length: seed % 7 }, (_, i) => ({
        id: String(i),
        title: title(seed + i + 10),
        type: "kpi" as const,
        content: { value: seed * 100 + i },
      }));
      const dashboard: DashboardData = {
        title: title(seed),
        cards,
        generatedAt: new Date("2026-11-24T00:00:00Z"),
      };
      const bytes = await exportToExcel(dashboard);
      expect(bytes.subarray(0, 2).toString("ascii")).toBe("PK");
      const imported = new ExcelJS.Workbook();
      await imported.xlsx.load(bytes);
      const sheet = imported.getWorksheet("Summary");
      expect(sheet?.getRow(2).getCell(2).value).toBe(dashboard.title);
      expect(sheet?.getRow(5).getCell(2).value).toBe(cards.length);
    }
  });
});
