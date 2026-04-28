"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { CSSProperties, useLayoutEffect, useMemo, useRef, useState } from "react";

import {
  COLUMN_GAP_PX,
  ROW_GAP_PX,
  TARGET_COLUMN_WIDTH,
  WaterfallDemoItem,
} from "./demo-data";

/** 最短列投递：近似 Masonry 常见的逐格最短列填充 */
function distributeShortestColumn(
  items: WaterfallDemoItem[],
  columnCount: number
): WaterfallDemoItem[][] {
  const cols: WaterfallDemoItem[][] = Array.from(
    { length: columnCount },
    () => []
  );
  const heights = new Array(columnCount).fill(0);
  for (const item of items) {
    let best = 0;
    let minH = heights[0];
    for (let c = 1; c < columnCount; c++) {
      if (heights[c] < minH) {
        minH = heights[c];
        best = c;
      }
    }
    cols[best].push(item);
    heights[best] += item.height + ROW_GAP_PX;
  }
  return cols;
}

type ColumnProps = {
  items: WaterfallDemoItem[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
  columnWidth: number;
};

function VirtualColumn({ items, scrollRef, columnWidth }: ColumnProps) {
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: (index) => items[index].height + ROW_GAP_PX,
    overscan: 6,
  });

  return (
    <div
      style={{
        position: "relative",
        width: columnWidth,
        flexShrink: 0,
        height: virtualizer.getTotalSize(),
      }}
    >
      {virtualizer.getVirtualItems().map((vi) => {
        const item = items[vi.index];
        return (
          <div
            key={item.id}
            style={
              {
                position: "absolute",
                left: 0,
                width: columnWidth,
                transform: `translateY(${vi.start}px)`,
              } as CSSProperties
            }
          >
            <div
              role="presentation"
              style={{
                borderRadius: 14,
                border:
                  "1px solid color-mix(in srgb, var(--line-strong) 60%, transparent)",
                height: item.height,
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
          </div>
        );
      })}
    </div>
  );
}

export function TanStackWaterfall({ items }: { items: WaterfallDemoItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ columns: 3, columnWidth: 160 });

  /**
   * 必须用滚动容器自身的 clientWidth 计算列宽：纵向滚动条会吃掉一段宽度。
   * 若用外层 offsetWidth，flex 总宽会略大于内层可视宽度 → 出现横向滚动条。
   */
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const run = () => {
      const w = el.clientWidth;
      const n = Math.max(
        1,
        Math.floor((w + COLUMN_GAP_PX) / (TARGET_COLUMN_WIDTH + COLUMN_GAP_PX))
      );
      const columnWidth =
        n > 0 ? (w - COLUMN_GAP_PX * (n - 1)) / n : TARGET_COLUMN_WIDTH;
      setLayout({ columns: n, columnWidth });
    };

    run();
    const ro = new ResizeObserver(() => run());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const columns = useMemo(
    () => distributeShortestColumn(items, layout.columns),
    [items, layout.columns]
  );

  return (
    <div
      style={{
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--line)",
        background: "rgba(255, 252, 246, 0.45)",
        overflow: "hidden",
      }}
    >
      <div
        ref={scrollRef}
        style={{
          height: 420,
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarGutter: "stable",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: COLUMN_GAP_PX,
            alignItems: "flex-start",
          }}
        >
          {columns.map((colItems, ci) => (
            <VirtualColumn
              key={ci}
              items={colItems}
              scrollRef={scrollRef}
              columnWidth={layout.columnWidth}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
