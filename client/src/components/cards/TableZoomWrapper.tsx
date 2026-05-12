/**
 * Starlight BI - TableZoomWrapper Component
 * Wrapper para tabelas com suporte a pinch-to-zoom em mobile
 */

import { useRef, ReactNode } from "react";
import { usePinchZoom } from "@/hooks/usePinchZoom";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface TableZoomWrapperProps {
  children: ReactNode;
  cardId: string;
}

export function TableZoomWrapper({ children, cardId }: TableZoomWrapperProps) {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scale, isZooming, resetZoom } = usePinchZoom(containerRef.current, {
    minScale: 0.75,
    maxScale: 2,
    sensitivity: 0.15,
  });

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="relative w-full h-full">
      {/* Container com zoom */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-auto touch-none"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          transition: isZooming ? "none" : "transform 0.2s ease-out",
        }}
      >
        {children}
      </div>

      {/* Controles de zoom */}
      {scale !== 1 && (
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-[rgba(0,217,255,0.1)] backdrop-blur-md border border-[rgba(0,217,255,0.2)] rounded-lg p-2 z-10">
          <button
            onClick={() => {
              const newScale = Math.min(2, scale + 0.15);
              // Aqui você pode adicionar lógica para atualizar o zoom
            }}
            className="p-2 hover:bg-[rgba(0,217,255,0.2)] rounded transition-colors text-[#00d9ff]"
            title="Ampliar"
          >
            <ZoomIn size={18} />
          </button>

          <button
            onClick={() => {
              const newScale = Math.max(0.75, scale - 0.15);
              // Aqui você pode adicionar lógica para atualizar o zoom
            }}
            className="p-2 hover:bg-[rgba(0,217,255,0.2)] rounded transition-colors text-[#00d9ff]"
            title="Reduzir"
          >
            <ZoomOut size={18} />
          </button>

          <div className="w-8 h-px bg-[rgba(0,217,255,0.2)]" />

          <button
            onClick={resetZoom}
            className="p-2 hover:bg-[rgba(255,0,110,0.2)] rounded transition-colors text-[#ff006e]"
            title="Resetar zoom"
          >
            <RotateCcw size={18} />
          </button>

          {/* Indicador de zoom */}
          <div className="text-xs text-[#8a95b8] text-center px-2 py-1 bg-[rgba(0,217,255,0.05)] rounded">
            {Math.round(scale * 100)}%
          </div>
        </div>
      )}

      {/* Dica de pinch */}
      {scale === 1 && (
        <div className="absolute top-2 left-2 text-xs text-[#8a95b8] bg-[rgba(0,217,255,0.05)] px-2 py-1 rounded pointer-events-none">
          👆 Pinch para zoom
        </div>
      )}
    </div>
  );
}
