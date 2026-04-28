import type { Metadata } from "next";
import Link from "next/link";

import { createWaterfallDemoItems } from "@/components/waterfall/demo-data";
import { WaterfallDemosSection } from "@/components/waterfall/waterfall-demos-section";

export const metadata: Metadata = {
  title: "瀑布流虚拟列表：TanStack Virtual 与 Masonic",
  description:
    "对比 @tanstack/react-virtual 多列纵向虚拟化与 masonic（Pinterest 式 Masonry）的定位与选型。",
};

const DEMO_ITEMS = createWaterfallDemoItems(260);

export default function WaterfallVirtualPage() {
  return (
    <main className="detail-page site-shell">
      <div className="detail-hero">
        <Link className="back-link" href="/">
          回到首页
        </Link>
        <div className="detail-hero-copy">
          <p className="eyebrow">瀑布流 · Virtual</p>
          <h1>@tanstack/react-virtual 与 masonic</h1>
          <p>
            两段演示使用<strong>相同的合成数据与同高度滚动容器</strong>：TanStack 采用「分列 +
            每列独立 useVirtualizer」；Masonic 自带 Masonry positioner +
            区间树驱动的可见格子裁剪。下文附关键片段与选型差异。
          </p>
        </div>
      </div>

      <article className="detail-card detail-grid wf-compare-intro">
        <div className="detail-primary">
          <h2 className="wf-compare-title">核心差异一览</h2>
          <dl className="wf-diff-dl">
            <dt>TanStack Virtual</dt>
            <dd>
              <strong>@tanstack/react-virtual</strong>{" "}
              是无头<strong>单列/轴向</strong>虚拟化 Primitive；瀑布流需要自己写「分列 + 最短列投递」或等价布局。
            </dd>
            <dt>masonic</dt>
            <dd>
              Pinterest 式 <strong>Masonry</strong>{" "}
              专用虚拟化网格：列宽与区间树裁剪、以及与 <code>ResizeObserver</code> 的集成开箱可用。
            </dd>
          </dl>
          <ul className="wf-diff-ul">
            <li>
              <strong>复杂度</strong>：TanStack 行为透明、可裁剪；glue 代码更多。masonic
              一条龙，但要理解 positioner 与 masonry renderer 的分工。
            </li>
            <li>
              <strong>可变高度（图片）</strong>：两边都要测量；TanStack 可用{" "}
              <code>measureElement</code> 或手写高度缓存；masonic 默认附带{" "}
              <code>useResizeObserver</code> 与 positioner 再平衡。
            </li>
            <li>
              <strong>滚动坐标</strong>：两边都需把<strong>滚动容器的 scrollTop</strong>（或窗口场景）喂给虚拟化层；开箱{" "}
              <code>&lt;Masonry /&gt;</code> 默认跟浏览器窗口。
            </li>
          </ul>
        </div>
        <aside className="detail-aside hero-note">
          <strong>怎么用这一页</strong>
          <p>
            先滚动左右两个预览，再对照代码摘录。TanStack 更偏底层积木；masonic 把瀑布流动线、批量测量与
            ResizeObserver 串成一条链路。
          </p>
        </aside>
      </article>

      <WaterfallDemosSection items={DEMO_ITEMS} />
    </main>
  );
}
