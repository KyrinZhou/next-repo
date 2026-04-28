/** 演示用瀑布流数据源：每项带固定高度，便于虚拟滚动估算与对比 */
export type WaterfallDemoItem = {
  id: number;
  height: number;
  hue: number;
};

export const COLUMN_GAP_PX = 12;
export const ROW_GAP_PX = 12;

/** Masonic `columnWidth` 与手写列对齐用 */
export const TARGET_COLUMN_WIDTH = 160;

export function createWaterfallDemoItems(length: number): WaterfallDemoItem[] {
  return Array.from({ length }, (_, i) => ({
    id: i,
    height: 120 + ((i * 37) % 180),
    hue: (i * 47) % 360,
  }));
}
