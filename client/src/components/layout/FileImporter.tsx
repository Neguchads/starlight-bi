/**
 * Starlight BI - FileImporter Component
 * Componente para importar dados de múltiplos formatos de arquivo
 */

import { useState } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { parseFile, getSupportedFormats } from "@/lib/fileParser";
import { Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { DataPreviewModal } from "@/components/modals/DataPreviewModal";

export function FileImporter() {
  const { addDataSource } = useDashboardStore();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [previewData, setPreviewData] = useState<Record<string, any>[] | null>(null);
  const [previewFileName, setPreviewFileName] = useState("");

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const data = await parseFile(file);

      if (data.length === 0) {
        throw new Error("Nenhum dado foi extraído do arquivo");
      }

      // Abre o modal de visualização prévia
      setPreviewData(data);
      setPreviewFileName(file.name);

      // Limpa o input
      event.target.value = "";
    } catch (error) {
      setMessage({
        type: "error",
        text: `✗ Erro ao importar: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const supportedFormats = getSupportedFormats().join(", ");

  const handleConfirmImport = (dataSourceName: string) => {
    if (previewData) {
      addDataSource(dataSourceName, previewData, "json");
      setMessage({
        type: "success",
        text: `✓ ${previewFileName} importado com sucesso! ${previewData.length} registros carregados.`,
      });
      setPreviewData(null);
      setPreviewFileName("");
    }
  };

  const handleCancelPreview = () => {
    setPreviewData(null);
    setPreviewFileName("");
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="file"
          accept={supportedFormats}
          onChange={handleFileSelect}
          disabled={isLoading}
          className="hidden"
          id="file-import"
        />

        <label
          htmlFor="file-import"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[rgba(0,217,255,0.1)] hover:bg-[rgba(0,217,255,0.2)] border border-[rgba(0,217,255,0.2)] cursor-pointer transition-colors text-sm font-medium text-[#00d9ff] hover:text-[#00d9ff]"
        >
          <Upload size={16} />
          {isLoading ? "Importando..." : "Importar Arquivo"}
        </label>
      </div>

      {/* Mensagem de Status */}
      {message && (
        <div
          className={`flex items-start gap-2 px-3 py-2 rounded-lg text-sm ${
            message.type === "success"
              ? "bg-[rgba(0,217,255,0.1)] text-[#00d9ff] border border-[rgba(0,217,255,0.2)]"
              : "bg-[rgba(255,0,110,0.1)] text-[#ff006e] border border-[rgba(255,0,110,0.2)]"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          )}
          <p className="flex-1">{message.text}</p>
          <button
            onClick={() => setMessage(null)}
            className="flex-shrink-0 hover:opacity-70"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Formatos Suportados */}
      <div className="text-xs text-[#8a95b8] px-3 py-2 bg-[rgba(255,255,255,0.02)] rounded-lg">
        <p className="font-medium mb-1">Formatos suportados:</p>
        <p className="break-words">{supportedFormats}</p>
      </div>

      {/* Data Preview Modal */}
      <DataPreviewModal
        isOpen={previewData !== null}
        fileName={previewFileName}
        data={previewData || []}
        onConfirm={handleConfirmImport}
        onCancel={handleCancelPreview}
      />
    </div>
  );
}
