import type { Metadata } from "next";

import { IsrRevalidatePlayground } from "@/components/isr-revalidate-playground";
import { IsrFaqAccordion } from "@/components/isr-faq-accordion";
import { IsrFaqJsonLdScript } from "@/components/isr-faq-json-ld";
import { IsrRuntimeNote } from "@/components/isr-runtime-note";
import { RenderingPage } from "@/components/rendering-page";
import { getIsrDemoCachedSnapshot } from "@/lib/isr-demo-cache";
import { formatSnapshotTime, getMode } from "@/lib/rendering-data";

/** 本页仅采用 ISR：与 fetch 的 revalidate 窗口对齐的增量静态再生成。 */
export const revalidate = 60;

export const metadata: Metadata = {
  title: "ISR（增量静态再生）｜常见问题与按需失效",
  description:
    "Next.js App Router 下 ISR 的失效语义、如何让页面立刻换新（revalidatePath／revalidateTag）、与 SSR、SEO 的关系。本站渲染教学示例配套 FAQ。",
  robots: { index: true, follow: true },
  openGraph: {
    title: "ISR｜常见问题：按需失效与 SEO",
    description:
      "解释增量静态再生（ISR）的时间窗口、按需再验证与对搜索引擎友好的 HTML 快照。",
    type: "article",
    locale: "zh_CN",
  },
};

export default async function IsrPage() {
  const mode = getMode("ISR");
  /** 演示用：不稳定缓存 + tags，可被 revalidateTag('isr-demo') 单次失效（见 ISR MVP 卡片） */
  const snapshot = await getIsrDemoCachedSnapshot();

  return (
    <>
      <IsrFaqJsonLdScript />
      <RenderingPage
        asidePoints={[
          "页面第一次仍然可以走静态产物，但缓存过期后，Next 会在后台按窗口重建。",
          "revalidate 不要求你放弃 SEO 和首屏速度，它更像给静态页装上节拍器。",
          "如果产品内容有规律地更新，但又没必要做到每次请求实时，这通常是最稳的方案。",
        ]}
        asideTitle="怎么识别这是 ISR"
        caution="ISR 是折中，而不是万金油。窗口过长会显旧，窗口过短又会逼近 SSR 成本。"
        description="ISR 的价值在于给静态内容加入时间维度。页面大多数时候像静态站一样快，但到期后能自动换新。"
        freshnessStrategy="每 60 秒允许后台刷新一次"
        htmlStrategy="静态优先，到期后后台重建"
        mode={mode}
        runtime="Server Component"
        snapshotLabel="当前可见内容生成时间"
        snapshotValue={formatSnapshotTime(snapshot.renderedAt)}
      >
      <IsrRuntimeNote
        isDevelopment={process.env.NODE_ENV !== "production"}
        renderedAt={snapshot.renderedAt}
        windowSeconds={60}
      />

      <IsrRevalidatePlayground
        renderedAtLabel={formatSnapshotTime(snapshot.renderedAt)}
        requestId={snapshot.requestId}
      />

      <div className="detail-card">
        <div className="card-headline">
          <h2>为什么这里比 SSG 更新</h2>
          <p>你不需要重新部署整站，只要缓存窗口到了，Next 会自动在后台再生成一次。</p>
        </div>
        <div className="demo-state">
          <article>
            <span>revalidate 窗口</span>
            <strong>60 seconds</strong>
          </article>
          <article>
            <span>本次快照 ID</span>
            <strong>{snapshot.requestId}</strong>
          </article>
        </div>
      </div>

      <IsrFaqAccordion />
    </RenderingPage>
    </>
  );
}
