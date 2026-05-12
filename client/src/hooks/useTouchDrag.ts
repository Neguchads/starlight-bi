/**
 * Starlight BI - useTouchDrag Hook
 * Hook para permitir arrastar elementos em dispositivos touch
 */

import { useEffect, useRef, useState } from "react";

interface TouchDragOptions {
  onDragStart?: (e: TouchEvent) => void;
  onDrag?: (deltaX: number, deltaY: number, e: TouchEvent) => void;
  onDragEnd?: (deltaX: number, deltaY: number, e: TouchEvent) => void;
  enableX?: boolean;
  enableY?: boolean;
}

export function useTouchDrag(
  element: HTMLElement | null,
  options: TouchDragOptions = {}
) {
  const dragStartRef = useRef<{
    x: number;
    y: number;
    elementX: number;
    elementY: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const enableX = options.enableX !== false;
  const enableY = options.enableY !== false;

  useEffect(() => {
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect = element.getBoundingClientRect();

      dragStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        elementX: rect.left,
        elementY: rect.top,
      };

      setIsDragging(true);
      options.onDragStart?.(e);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragStartRef.current || !isDragging) return;

      const touch = e.touches[0];
      const deltaX = enableX ? touch.clientX - dragStartRef.current.x : 0;
      const deltaY = enableY ? touch.clientY - dragStartRef.current.y : 0;

      options.onDrag?.(deltaX, deltaY, e);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!dragStartRef.current) return;

      const touch = e.changedTouches[0];
      const deltaX = enableX ? touch.clientX - dragStartRef.current.x : 0;
      const deltaY = enableY ? touch.clientY - dragStartRef.current.y : 0;

      options.onDragEnd?.(deltaX, deltaY, e);
      setIsDragging(false);
      dragStartRef.current = null;
    };

    element.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [element, isDragging, enableX, enableY, options]);

  return { isDragging };
}
