import { useEffect, useState } from "react";

export const useOnScreen = <T extends Element>(
  ref: React.RefObject<T>,
  rootMargin = "0px",
) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        observer.disconnect();
      }
    }, { rootMargin });

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
};
