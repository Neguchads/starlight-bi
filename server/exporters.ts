/**
 * Dashboard Export Module
 * Exporta dashboards para PDF, PowerPoint e Excel
 */

import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";
import PptxGenJS from "pptxgenjs";

export interface DashboardData {
  title: string;
  description?: string;
  cards: CardData[];
  generatedAt: Date;
}

export interface CardData {
  id: string;
  title: string;
  type: "flashcard" | "table" | "chart" | "kpi" | "kanban" | "image" | "divider";
  content: unknown;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
}

export interface TableData {
  headers: string[];
  rows: (string | number | boolean | null)[][];
}

export interface ChartData {
  type: "bar" | "line" | "pie" | "doughnut" | "area";
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

/**
 * Exporta dashboard para PDF
 */
export async function exportToPDF(dashboard: DashboardData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 40,
      });

      const chunks: Buffer[] = [];

      doc.on("data", (chunk: Buffer) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // Header
      doc.fontSize(24).font("Helvetica-Bold").text(dashboard.title, { align: "center" });
      doc.moveDown(0.5);

      if (dashboard.description) {
        doc.fontSize(12).font("Helvetica").text(dashboard.description, { align: "center" });
        doc.moveDown(1);
      }

      // Metadata
      doc.fontSize(10).font("Helvetica").fillColor("#666").text(`Generated: ${dashboard.generatedAt.toLocaleString()}`, { align: "right" });
      doc.moveDown(1);

      // Cards
      dashboard.cards.forEach((card, index) => {
        // Card Title
        doc.fontSize(14).font("Helvetica-Bold").fillColor("#000").text(`${index + 1}. ${card.title}`);
        doc.moveDown(0.3);

        // Card Content
        if (card.type === "table" && isTableData(card.content)) {
          renderTableInPDF(doc, card.content as TableData);
        } else if (card.type === "kpi" && typeof card.content === "object" && card.content !== null) {
          const kpiData = card.content as Record<string, unknown>;
          doc.fontSize(12).text(`Value: ${kpiData.value || "N/A"}`);
          if (kpiData.variation) {
            doc.text(`Variation: ${kpiData.variation}`);
          }
        } else if (card.type === "flashcard" && typeof card.content === "string") {
          doc.fontSize(11).text(card.content);
        } else {
          doc.fontSize(11).text(`[${card.type.toUpperCase()}]`);
        }

        doc.moveDown(0.8);

        // Page break if needed
        if (doc.y > 700) {
          doc.addPage();
        }
      });

      // Footer
      doc.fontSize(9).fillColor("#999").text("Starlight BI Dashboard Export", 40, doc.page.height - 40, { align: "center" });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Exporta dashboard para Excel
 */
export async function exportToExcel(dashboard: DashboardData): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();

  // Sheet 1: Summary
  const summarySheet = workbook.addWorksheet("Summary");
  summarySheet.columns = [
    { header: "Dashboard", key: "dashboard", width: 30 },
    { header: "Value", key: "value", width: 50 },
  ];

  summarySheet.addRow({ dashboard: "Title", value: dashboard.title });
  summarySheet.addRow({ dashboard: "Description", value: dashboard.description || "N/A" });
  summarySheet.addRow({ dashboard: "Generated", value: dashboard.generatedAt.toLocaleString() });
  summarySheet.addRow({ dashboard: "Total Cards", value: dashboard.cards.length });

  // Additional sheets for each card
  dashboard.cards.forEach((card, index) => {
    const sheetName = `Card ${index + 1}`;
    const sheet = workbook.addWorksheet(sheetName);

    sheet.columns = [
      { header: "Property", key: "property", width: 20 },
      { header: "Value", key: "value", width: 50 },
    ];

    sheet.addRow({ property: "Title", value: card.title });
    sheet.addRow({ property: "Type", value: card.type });

    if (card.type === "table" && isTableData(card.content)) {
      const tableData = card.content as TableData;
      sheet.addRow({ property: "Rows", value: tableData.rows.length });
      sheet.addRow({ property: "Columns", value: tableData.headers.length });

      // Add table data
      const dataSheet = workbook.addWorksheet(`${sheetName} Data`);
      dataSheet.columns = tableData.headers.map((header) => ({ header, key: header, width: 15 }));

      tableData.rows.forEach((row) => {
        const rowData: Record<string, unknown> = {};
        tableData.headers.forEach((header, idx) => {
          rowData[header] = row[idx];
        });
        dataSheet.addRow(rowData);
      });
    } else if (card.type === "kpi" && typeof card.content === "object" && card.content !== null) {
      const kpiData = card.content as Record<string, unknown>;
      sheet.addRow({ property: "Value", value: kpiData.value });
      sheet.addRow({ property: "Variation", value: kpiData.variation });
    }
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer as unknown as Buffer;
}

/**
 * Exporta dashboard para PowerPoint
 */
export async function exportToPowerPoint(dashboard: DashboardData): Promise<Buffer> {
  const prs = new PptxGenJS();

  // Slide 1: Title Slide
  const titleSlide = prs.addSlide();
  titleSlide.background = { color: "1a1a2e" };

  titleSlide.addText(dashboard.title, {
    x: 0.5,
    y: 2,
    w: 9,
    h: 1.5,
    fontSize: 44,
    bold: true,
    color: "00d9ff",
    align: "center",
  });

  if (dashboard.description) {
    titleSlide.addText(dashboard.description, {
      x: 0.5,
      y: 3.8,
      w: 9,
      h: 1,
      fontSize: 18,
      color: "ffffff",
      align: "center",
    });
  }

  titleSlide.addText(`Generated: ${dashboard.generatedAt.toLocaleString()}`, {
    x: 0.5,
    y: 5.5,
    w: 9,
    h: 0.5,
    fontSize: 12,
    color: "a100f2",
    align: "center",
  });

  // Slides for each card
  dashboard.cards.forEach((card) => {
    const slide = prs.addSlide();
    slide.background = { color: "1a1a2e" };

    // Title
    slide.addText(card.title, {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.8,
      fontSize: 32,
      bold: true,
      color: "00d9ff",
    });

    // Content
    if (card.type === "table" && isTableData(card.content)) {
      renderTableInPowerPoint(slide, card.content as TableData, 1.5);
    } else if (card.type === "kpi" && typeof card.content === "object" && card.content !== null) {
      const kpiData = card.content as Record<string, unknown>;
      slide.addText(`Value: ${kpiData.value || "N/A"}`, {
        x: 0.5,
        y: 1.8,
        w: 9,
        h: 0.6,
        fontSize: 24,
        color: "ffffff",
      });

      if (kpiData.variation) {
        slide.addText(`Variation: ${kpiData.variation}`, {
          x: 0.5,
          y: 2.6,
          w: 9,
          h: 0.6,
          fontSize: 18,
          color: "ff006e",
        });
      }
    } else if (card.type === "flashcard" && typeof card.content === "string") {
      slide.addText(card.content, {
        x: 0.5,
        y: 1.8,
        w: 9,
        h: 4,
        fontSize: 16,
        color: "ffffff",
      });
    } else {
      slide.addText(`[${card.type.toUpperCase()}]`, {
        x: 0.5,
        y: 1.8,
        w: 9,
        h: 0.6,
        fontSize: 16,
        color: "a100f2",
      });
    }
  });

  const buffer = await prs.write({ outputType: "arraybuffer" });
  return Buffer.from(buffer as unknown as ArrayBuffer);
}

/**
 * Helper: Renderiza tabela em PDF
 */
function renderTableInPDF(doc: InstanceType<typeof PDFDocument>, table: TableData): void {
  const startY = doc.y;
  const cellHeight = 20;
  const cellWidth = 60;

  // Headers
  doc.fontSize(10).font("Helvetica-Bold");
  table.headers.forEach((header, idx) => {
    doc.text(header, 40 + idx * cellWidth, startY, { width: cellWidth - 5 });
  });

  doc.moveTo(40, startY + cellHeight).lineTo(40 + table.headers.length * cellWidth, startY + cellHeight).stroke();

  // Rows (limited to first 10 for PDF)
  doc.font("Helvetica").fontSize(9);
  table.rows.slice(0, 10).forEach((row, rowIdx) => {
    const rowY = startY + cellHeight + rowIdx * cellHeight;
    row.forEach((cell, colIdx) => {
      doc.text(String(cell || ""), 40 + colIdx * cellWidth, rowY, { width: cellWidth - 5 });
    });
  });

  if (table.rows.length > 10) {
    doc.text(`... and ${table.rows.length - 10} more rows`, 40, startY + (11 * cellHeight));
  }

  doc.moveDown(Math.ceil(table.rows.length / 2) + 1);
}

/**
 * Helper: Renderiza tabela em PowerPoint
 */
function renderTableInPowerPoint(slide: PptxGenJS.Slide, table: TableData, startY: number): void {
  const tableRows: unknown[][] = [table.headers.map((h) => ({ text: h, options: { bold: true, color: "00d9ff" } }))];

  table.rows.slice(0, 8).forEach((row) => {
    tableRows.push(
      row.map((cell) => ({
        text: String(cell || ""),
        options: { color: "ffffff" },
      }))
    );
  });

  slide.addTable(tableRows as PptxGenJS.TableCell[][], {
    x: 0.5,
    y: startY,
    w: 9,
    border: { pt: 1, color: "a100f2" },
    fill: { color: "0f0f1e" },
    colW: [9 / table.headers.length],
  });
}

/**
 * Helper: Verifica se é TableData
 */
function isTableData(content: unknown): content is TableData {
  return (
    typeof content === "object" &&
    content !== null &&
    "headers" in content &&
    "rows" in content &&
    Array.isArray((content as Record<string, unknown>).headers) &&
    Array.isArray((content as Record<string, unknown>).rows)
  );
}
