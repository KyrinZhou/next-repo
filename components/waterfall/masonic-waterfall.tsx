"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  useMasonry,
  usePositioner,
  useResizeObserver,
  type RenderComponentProps,
} from "masonic";

import {
  COLUMN_GAP_PX,
  ROW_GAP_PX,
  TARGET_COLUMN_WIDTH,
  WaterfallDemoItem,
} from "./demo-data";

function MasonicCard({
  data: item,
  width,
}: RenderComponentProps<WaterfallDemoItem>) {
  return (
    <div
      role="presentation"
      style={{
        borderRadius: 14,
        border:
          "1px solid color-mix(in srgb, var(--line-strong) 60%, transparent)",
        height: item.height,
        width,
        boxSizing: "border-box",
        background: `hsl(${item.hue} 52% 92%)`,
        color: `hsl(${item.hue} 25% 22%)`,
        display: "grid",
        placeItems: "center",
        fontSize: "0.88rem",
        fontWeight: 600,
      }}
    >
      #{item.id}
    </div>
  );
}

const SCROLL_PANEL_H = 420;

/** `useMasonry` + `usePositioner` + `useResizeObserver`，滚动来自外层 div（与 TanStack Demo 同高） */
export function MasonicWaterfall({ items }: { items: WaterfallDemoItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [viewportH, setViewportH] = useState(SCROLL_PANEL_H);
  const [viewportW, setViewportW] = useState(0);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const sync = () => {
      setViewportH(el.clientHeight);
      setViewportW(el.clientWidth);
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!isScrolling) return;
    const fps = 12;
    const id = window.setTimeout(() => setIsScrolling(false), 40 + 1000 / fps);
    return () => window.clearTimeout(id);
  }, [scrollTop, isScrolling]);

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
    setIsScrolling(true);
  }, []);

  const widthForPositioner = Math.max(viewportW, 280);

  const positioner = usePositioner(
    {
      width: widthForPositioner,
      columnWidth: TARGET_COLUMN_WIDTH,
      columnGutter: COLUMN_GAP_PX,
      rowGutter: ROW_GAP_PX,
    },
    [viewportW]
  );

  const resizeObserver = useResizeObserver(positioner);

  const grid = useMasonry({
    items,
    height: viewportH,
    scrollTop,
    isScrolling,
    positioner,
    resizeObserver,
    containerRef,
    render: MasonicCard,
    itemKey: (d) => d.id,
    overscanBy: 2,
    itemHeightEstimate: 200,
    role: "grid",
    tabIndex: 0,
  });

  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      style={{
        height: SCROLL_PANEL_H,
        overflow: "auto",
        scrollbarGutter: "stable",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--line)",
        background: "rgba(255, 252, 246, 0.45)",
      }}
    >
      {grid}
    </div>
  );
}
