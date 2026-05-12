/**
 * Starlight BI - useIsMobile Hook
 * Hook para detectar automaticamente se o dispositivo é mobile ou desktop
 */

import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768; // Tailwind md breakpoint

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    // Verificação inicial no servidor/cliente
    if (typeof window === "undefined") return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  useEffect(() => {
    // Função para atualizar o estado quando a janela é redimensionada
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Adiciona listener de resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
}
