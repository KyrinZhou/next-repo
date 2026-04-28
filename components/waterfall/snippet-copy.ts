export const CODE_TANSTACK = `// 1) 最短列分配：把你的 items[] 分成 N 个子数组（每列一栈）
function distributeShortestColumn(items, columnCount) { /* … */ }

// 2) 每列独立的纵向虚拟列表，共用 scrollRef（同一滚动父元素）
function VirtualColumn({ items, scrollRef, columnWidth }) {
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: (i) => items[i].height + ROW_GAP_PX,
    overscan: 6,
  });

  return (
    <div style={{ height: virtualizer.getTotalSize(), width: columnWidth, position: "relative" }}>
      {virtualizer.getVirtualItems().map((vi) => (
        <div key={items[vi.index].id} style={{ transform: \`translateY(\${vi.start}px)\`, position: "absolute" }}>
          {/* 卡片 */}
        </div>
      ))}
    </div>
  );
}

// 3) 外层 flex 排布多列 + ResizeObserver 计算列数与列宽
`;

export const CODE_MASONIC = `// Masonic：positioner（布局）与 masonry renderer（挂载/测量）拆分
const positioner = usePositioner({
  width: viewportW,          // 与滚动容器宽度一致（或 useContainerPosition + window）
  columnWidth: 160,
  columnGutter: 12,
  rowGutter: 12,
}, [viewportW]);

const resizeObserver = useResizeObserver(positioner); // 子项 DOM 尺寸变化→重布局

const grid = useMasonry({
  items,
  height: viewportH,         // 视口或滚动元素的 clientHeight
  scrollTop,                 // 元素 scrollTop（或 window 场景下 window.scrollY）
  isScrolling,
  positioner,
  resizeObserver,
  containerRef,
  render: YourCard,
  itemKey: (d) => d.id,
});

// 开箱即用：<Masonry items={items} render={YourCard} />（默认跟随浏览器窗口滚动）
`;
