import { useEffect, useState } from 'react';
import { ResizeObserver as Polyfill } from '@juggle/resize-observer';

const ResizeObserver =
  typeof window !== 'undefined' && 'ResizeObserver' in window
    ? (window as any).ResizeObserver
    : Polyfill;

export interface UseResizeResult {
  resizeElement: HTMLDivElement | null;
  setResizeElement: (resizeTarget: HTMLDivElement | null) => void;
  resizedHeight: number;
}

export default function useResize(): UseResizeResult {
  const [resizeElement, setResizeElement] = useState<HTMLDivElement | null>(
    null
  );
  const [resizedHeight, setResizedHeight] = useState<number>(0);

  useEffect(() => {
    if (!resizeElement) {
      return;
    }

    const observer = new ResizeObserver(() => {
      setResizedHeight(resizeElement?.offsetHeight || 0);
    });
    observer.observe(resizeElement);
    return () => observer.disconnect();
  }, [resizeElement]);

  return {
    resizeElement,
    setResizeElement,
    resizedHeight,
  };
}
