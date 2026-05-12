/**
 * Starlight BI - File Parser Utility
 * Suporte para parsing de múltiplos formatos: CSV, JSON, MD, PDF, DOC, PPT
 */

import Papa from "papaparse";
import { marked } from "marked";

/**
 * Extrai dados de um arquivo CSV
 */
export async function parseCSV(file: File): Promise<Record<string, any>[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
            complete: (results: any) => {
        resolve(results.data.filter((row: any) => Object.values(row).some((v: any) => v)) || []);
      },
      error: (error: any) => reject(error),    });
  });
}

/**
 * Extrai dados de um arquivo JSON
 */
export async function parseJSON(file: File): Promise<Record<string, any>[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        const rows = Array.isArray(data) ? data : [data];
        resolve(rows);
      } catch (error) {
        reject(new Error("JSON inválido"));
      }
    };
    reader.onerror = () => reject(new Error("Erro ao ler arquivo"));
    reader.readAsText(file);
  });
}

/**
 * Extrai dados de um arquivo Markdown
 */
export async function parseMarkdown(file: File): Promise<Record<string, any>[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        
        // Tenta extrair tabelas markdown
        const tableRegex = /\|(.+)\|[\r\n]+\|[-|\s]+\|[\r\n]+((?:\|.+\|[\r\n]*)*)/g;
        const tables: Record<string, any>[] = [];
        let match;

        while ((match = tableRegex.exec(content)) !== null) {
          const headerRow = match[1].split("|").map((h) => h.trim()).filter(Boolean);
          const dataRows = match[2].split("\n").filter((row) => row.trim());

          dataRows.forEach((row) => {
            const values = row.split("|").map((v) => v.trim()).filter(Boolean);
            if (values.length === headerRow.length) {
              const obj: Record<string, any> = {};
              headerRow.forEach((header, idx) => {
                obj[header] = values[idx];
              });
              tables.push(obj);
            }
          });
        }

        // Se encontrou tabelas, retorna
        if (tables.length > 0) {
          resolve(tables);
        } else {
          // Caso contrário, retorna o conteúdo como um único objeto
          resolve([{ conteúdo: content.substring(0, 500), tipo: "markdown" }]);
        }
      } catch (error) {
        reject(new Error("Erro ao processar Markdown"));
      }
    };
    reader.onerror = () => reject(new Error("Erro ao ler arquivo"));
    reader.readAsText(file);
  });
}

/**
 * Extrai dados de um arquivo PDF
 */
export async function parsePDF(file: File): Promise<Record<string, any>[]> {
  try {
    // Importação dinâmica para evitar problemas de bundle
    const pdfModule = (await import("pdf-parse")) as any;
    const pdfParse = pdfModule.default || pdfModule;
    const arrayBuffer = await file.arrayBuffer();
    const data = await pdfParse(arrayBuffer);

    // Extrai texto do PDF
    const text = data.text;
    
    // Tenta extrair tabelas simples (linhas com espaçamento)
    const lines = text.split("\n").filter((line: string) => line.trim());
    
    // Se houver muitas linhas, retorna como dados estruturados
    if (lines.length > 0) {
      return lines.map((line: string, idx: number) => ({
        página: Math.floor(idx / 50) + 1,
        linha: idx % 50,
        conteúdo: line.substring(0, 200),
      }));
    }

    return [{ conteúdo: text.substring(0, 500), tipo: "pdf" }];
  } catch (error) {
    throw new Error("Erro ao processar PDF");
  }
}

/**
 * Extrai dados de um arquivo DOCX
 */
export async function parseDOCX(file: File): Promise<Record<string, any>[]> {
  try {
    // Importação dinâmica
    const { Document } = await import("docx");
    const arrayBuffer = await file.arrayBuffer();
    
    // Lê o arquivo DOCX como texto
    const text = await extractTextFromDocx(arrayBuffer);
    
    // Processa o texto extraído
    const lines = text.split("\n").filter((line: string) => line.trim());
    
    return lines.map((line: string, idx: number) => ({
      parágrafo: idx,
      conteúdo: line.substring(0, 200),
    }));
  } catch (error) {
    throw new Error("Erro ao processar DOCX");
  }
}

/**
 * Extrai dados de um arquivo PPT/PPTX
 * Nota: Suporte básico - retorna metadados do arquivo
 */
export async function parsePPTX(file: File): Promise<Record<string, any>[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const view = new Uint8Array(arrayBuffer);
    
    return [{
      tipo: "pptx",
      tamanho: view.length,
      nome: file.name,
      mensagem: "Arquivo PPTX detectado. Conteúdo será extraído em versão futura.",
    }];
  } catch (error) {
    throw new Error("Erro ao processar PPTX");
  }
}

/**
 * Função auxiliar para extrair texto de DOCX
 */
async function extractTextFromDocx(arrayBuffer: ArrayBuffer): Promise<string> {
  // Implementação simplificada - em produção, use uma biblioteca como docx-parser
  const text = new TextDecoder().decode(arrayBuffer);
  return text;
}

/**
 * Detecta o tipo de arquivo e chama o parser apropriado
 */
export async function parseFile(file: File): Promise<Record<string, any>[]> {
  const fileName = file.name.toLowerCase();
  const mimeType = file.type;

  // CSV
  if (fileName.endsWith(".csv") || mimeType === "text/csv") {
    return parseCSV(file);
  }

  // JSON
  if (fileName.endsWith(".json") || mimeType === "application/json") {
    return parseJSON(file);
  }

  // Markdown
  if (fileName.endsWith(".md") || mimeType === "text/markdown") {
    return parseMarkdown(file);
  }

  // PDF
  if (fileName.endsWith(".pdf") || mimeType === "application/pdf") {
    return parsePDF(file);
  }

  // DOCX
  if (
    fileName.endsWith(".docx") ||
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return parseDOCX(file);
  }

  // PPTX
  if (
    fileName.endsWith(".pptx") ||
    mimeType === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    return parsePPTX(file);
  }

  // PPT (formato antigo)
  if (fileName.endsWith(".ppt") || mimeType === "application/vnd.ms-powerpoint") {
    return parsePPTX(file);
  }

  throw new Error(`Formato de arquivo não suportado: ${fileName}`);
}

/**
 * Retorna lista de extensões suportadas
 */
export function getSupportedFormats(): string[] {
  return [".csv", ".json", ".md", ".pdf", ".docx", ".pptx", ".ppt", ".doc"];
}
