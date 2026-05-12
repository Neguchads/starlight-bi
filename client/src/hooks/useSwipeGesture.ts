/**
 * Starlight BI - useSwipeGesture Hook
 * Hook para detectar gestos de swipe (deslizar) em dispositivos touch
 */

import { useEffect, useRef } from "react";

interface SwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number; // Distância mínima em pixels para considerar um swipe
  minVelocity?: number; // Velocidade mínima em pixels/ms
}

export function useSwipeGesture(
  element: HTMLElement | null,
  options: SwipeGestureOptions
) {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
    null
  );
  const threshold = options.threshold || 50;
  const minVelocity = options.minVelocity || 0.5;

  useEffect(() => {
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = e.changedTouches[0];
      const endX = touch.clientX;
      const endY = touch.clientY;
      const endTime = Date.now();

      const diffX = endX - touchStartRef.current.x;
      const diffY = endY - touchStartRef.current.y;
      const timeDiff = endTime - touchStartRef.current.time;

      // Calcula velocidade do swipe
      const velocityX = Math.abs(diffX) / timeDiff;
      const velocityY = Math.abs(diffY) / timeDiff;

      // Verifica se foi um swipe horizontal
      if (Math.abs(diffX) > threshold && velocityX > minVelocity) {
        if (diffX > 0) {
          // Swipe para direita
          options.onSwipeRight?.();
        } else {
          // Swipe para esquerda
          options.onSwipeLeft?.();
        }
      }

      // Verifica se foi um swipe vertical
      if (Math.abs(diffY) > threshold && velocityY > minVelocity) {
        if (diffY > 0) {
          // Swipe para baixo
          options.onSwipeDown?.();
        } else {
          // Swipe para cima
          options.onSwipeUp?.();
        }
      }

      touchStartRef.current = null;
    };

    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [element, threshold, minVelocity, options]);
}
