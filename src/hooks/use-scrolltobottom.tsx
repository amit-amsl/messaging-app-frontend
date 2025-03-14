import { useEffect } from "react";

export function useScrollToBottom(
  ref: React.MutableRefObject<HTMLDivElement | null>,
  trigger: unknown
) {
  useEffect(() => {
    const scrollToBottom = () => {
      if (ref.current) {
        ref.current?.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollToBottom();
  }, [ref, trigger]);
}
