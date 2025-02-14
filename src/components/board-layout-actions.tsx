"use client";

import { SlidersVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function BoardLayoutActions() {
  const [activeTab, setActiveTab] = useState(2);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeTabRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const activeTabEl = activeTabRef.current;
    if (activeTab && activeTabEl && container) {
      const { offsetLeft, offsetWidth } = activeTabEl;
      const parentWidth = container.parentElement?.offsetWidth;
      if (!parentWidth) return;

      container.style.left = `${Number(
        (offsetLeft / parentWidth) * 100
      ).toFixed(2)}%`;

      container.style.width = `${offsetWidth}px`;
    }
  }, [activeTab]);

  return (
    <div className="flex items-center justify-between w-full">
      <div className=" basis-3/4 shrink-0 bg-background rounded-3xl flex items-center relative">
        {/* Animated border container */}
        <div
          ref={containerRef}
          className="absolute h-full inset-0 border border-amber-400 rounded-3xl bg-background animate-fadeIn opacity-0"
          style={{
            transition: "all 0.25s ease",
            animationDelay: "600ms",
          }}
        />

        {/* Buttons layer */}
        <div className="relative flex w-full">
          <button
            className="px-8 py-4 text-sm font-semibold"
            ref={activeTab === 1 ? activeTabRef : null}
            onClick={() => setActiveTab(1)}
          >
            List View
          </button>
          <button
            ref={activeTab === 2 ? activeTabRef : null}
            className="px-8 py-4 text-sm font-semibold"
            onClick={() => setActiveTab(2)}
          >
            Board View
          </button>
        </div>
      </div>

      <button className="text-sm bg-background px-4 py-2 flex items-center justify-center border border-amber-400 border-opacity-60">
        View Tender Details
      </button>
      <button className="text-sm rounded-2xl px-4 py-2 border border-foreground flex items-center gap-2">
        <SlidersVertical size={16} />
        <span>Columns</span>
      </button>
    </div>
  );
}
