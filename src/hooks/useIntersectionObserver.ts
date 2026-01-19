import { useEffect, useRef, useState } from 'react';
import type { IUseIntersectionObserverProps, IUseIntersectionObserverResult } from '@/types/common/index.types';

export const useIntersectionObserver = ({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
  enabled = true,
}: IUseIntersectionObserverProps = {}): IUseIntersectionObserverResult => {
  const [inView, setInView] = useState<boolean>(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const observeInView = (): void | (() => void) => {
    if (!enabled || !targetRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
        });
      },
      {
        threshold,
        root,
        rootMargin,
      },
    );

    observer.observe(targetRef.current);

    return (): void => {
      observer.disconnect();
    };
  };

  useEffect(observeInView, [threshold, root, rootMargin, enabled]);

  return { targetRef, inView };
};
