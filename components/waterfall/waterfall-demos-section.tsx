"use client";

import dynamic from "next/dynamic";

import { CODE_MASONIC, CODE_TANSTACK } from "./snippet-copy";
import type { WaterfallDemoItem } from "./demo-data";

const TanStackWaterfall = dynamic(
  () =>
    import("./tanstack-waterfall").then((m) => ({ default: m.TanStackWaterfall })),
  { ssr: false, loading: () => <p className="wf-muted-lead">加载 TanStack 演示…</p> }
);

const MasonicWaterfall = dynamic(
  () =>
    import("./masonic-waterfall").then((m) => ({ default: m.MasonicWaterfall })),
  { ssr: false, loading: () => <p className="wf-muted-lead">加载 Masonic 演示…</p> }
);

export function WaterfallDemosSection({
  items,
}: {
  items: WaterfallDemoItem[];
}) {
  return (
    <section className="section-block wf-section">
      <div className="wf-two-col">
        <div className="wf-panel">
          <h2>TanStack Virtual：多列 + 单列虚拟器</h2>
          <p className="wf-muted-lead">
            先把数据源按<strong>最短列</strong>拆成若干列数组，每一列接一个{" "}
            <code>useVirtualizer</code>，共用同一个滚动父节点的 ref。
          </p>
          <TanStackWaterfall items={items} />
          <h3 className="wf-snippet-heading">关键代码</h3>
          <pre className="code-block">
            <code>{CODE_TANSTACK}</code>
          </pre>
        </div>

        <div className="wf-panel">
          <h2>Masonic：usePositioner + useMasonry</h2>
          <p className="wf-muted-lead">
            <code>usePositioner</code> 负责列宽、列数与格子坐标缓存；{" "}
            <code>useMasonry</code>{" "}
            根据 <code>scrollTop</code> / 视窗高度决定要挂载哪些格子；可选{" "}
            <code>useResizeObserver</code>{" "}
            在子项尺寸变化（例如图片 onload）后重算。
          </p>
          <MasonicWaterfall items={items} />
          <h3 className="wf-snippet-heading">关键代码</h3>
          <pre className="code-block">
            <code>{CODE_MASONIC}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
