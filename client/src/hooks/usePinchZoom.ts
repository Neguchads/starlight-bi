/**
 * Starlight BI - usePinchZoom Hook
 * Hook para detectar gestos de pinch (apertar) para zoom em dispositivos touch
 */

import { useEffect, useRef, useState } from "react";

interface PinchZoomOptions {
  onZoom?: (scale: number) => void;
  onZoomStart?: () => void;
  onZoomEnd?: () => void;
  minScale?: number;
  maxScale?: number;
  sensitivity?: number; // Sensibilidade do zoom (padrão: 0.1)
}

export function usePinchZoom(
  element: HTMLElement | null,
  options: PinchZoomOptions = {}
) {
  const touchesRef = useRef<{ x: number; y: number }[]>([]);
  const initialDistanceRef = useRef<number | null>(null);
  const [scale, setScale] = useState(1);
  const [isZooming, setIsZooming] = useState(false);

  const minScale = options.minScale || 0.5;
  const maxScale = options.maxScale || 3;
  const sensitivity = options.sensitivity || 0.1;

  // Calcula distância entre dois pontos
  const getDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  useEffect(() => {
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Inicia pinch zoom
        touchesRef.current = Array.from(e.touches).map((t) => ({
          x: t.clientX,
          y: t.clientY,
        }));
        initialDistanceRef.current = getDistance(
          touchesRef.current[0],
          touchesRef.current[1]
        );
        setIsZooming(true);
        options.onZoomStart?.();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialDistanceRef.current !== null) {
        e.preventDefault();

        const currentTouches = Array.from(e.touches).map((t) => ({
          x: t.clientX,
          y: t.clientY,
        }));

        const currentDistance = getDistance(currentTouches[0], currentTouches[1]);
        const distanceRatio = currentDistance / initialDistanceRef.current;

        // Calcula novo scale com sensibilidade
        const newScale = Math.max(
          minScale,
          Math.min(maxScale, scale * (1 + (distanceRatio - 1) * sensitivity))
        );

        setScale(newScale);
        options.onZoom?.(newScale);

        touchesRef.current = currentTouches;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        // Finaliza pinch zoom
        setIsZooming(false);
        initialDistanceRef.current = null;
        touchesRef.current = [];
        options.onZoomEnd?.();
      }
    };

    element.addEventListener("touchstart", handleTouchStart, { passive: false });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [element, minScale, maxScale, sensitivity, scale, options]);

  // Reset zoom
  const resetZoom = () => {
    setScale(1);
    options.onZoom?.(1);
  };

  return { scale, isZooming, resetZoom };
}
