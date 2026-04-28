import type { ReactNode } from "react";

/** 与页面正文及 JSON-LD 保持一致（便于搜索引擎识别 FAQ 富结果） */
export const ISR_FAQ_ITEMS: readonly {
  id: string;
  question: string;
  answerText: string;
  answer: ReactNode;
}[] = [
  {
    id: "isr-invalidate-meaning",
    question: "ISR 页面「失效」指的是什么？",
    answerText:
      "指原先生成的静态 HTML 与数据不再被当作长期有效。时间窗口到了之后，一次新的访问会触发在后台的再生成；你也可以在发生业务事件时主动做按需再验证，而不必等时间窗口。",
    answer: (
      <p>
        指原先生成的静态 HTML 与数据不再被当作长期有效。时间窗口到了之后，一次新的访问会触发在后台的再生成；你也可以在发生业务事件时主动做按需再验证，而不必等时间窗口。
      </p>
    ),
  },
  {
    id: "isr-on-demand-revalidate",
    question: "如何让 ISR 页面立刻失效并换新内容？",
    answerText:
      "在 Next.js App Router 中通常使用 next/cache 提供的按需再验证：revalidatePath 针对路径，revalidateTag 针对你在 fetch 上声明的 next.tags。也可通过重新部署让构建产物整体更新。",
    answer: (
      <p>
        在 Next.js App Router 中通常使用 <code>next/cache</code> 提供的按需再验证：{" "}
        <code>revalidatePath</code> 针对路径，<code>revalidateTag</code> 针对你在{" "}
        <code>fetch</code> 上声明的 <code>next.tags</code>。也可通过重新部署让构建产物整体更新。
      </p>
    ),
  },
  {
    id: "isr-route-vs-fetch-revalidate",
    question: "路由段上的 export const revalidate 和 fetch 的 next.revalidate 有什么关系？",
    answerText:
      "前者约束这一路由静态再生成（ISR）的预设节奏；后者只影响这一处 fetch 的数据缓存。两者可以同屏出现，项目里以你实际写下的策略及 Next 文档的语义为准，调试时建议对照缓存命中与再生成日志。",
    answer: (
      <p>
        前者约束这一路由<strong>静态再生成（ISR）</strong>的预设节奏；后者只影响这一处{" "}
        <code>fetch</code> 的数据缓存。两者可以同屏出现，项目里以你实际写下的策略及 Next
        文档的语义为准，调试时建议对照缓存命中与再生成日志。
      </p>
    ),
  },
  {
    id: "isr-demo-60s",
    question: "本教学页的「60 秒」失效窗口是什么意思？",
    answerText:
      "本页示例把路由级 revalidate 与示例接口 fetch 都设在约 60 秒的节拍上，便于你刷新页面观察快照时间变化。线上环境仍应按业务设置合理的窗口，并与按需再验证搭配使用。",
    answer: (
      <p>
        本页示例把<strong>路由级</strong> <code>revalidate</code> 与示例接口{" "}
        <code>fetch</code> 都设在约 60 秒的节拍上，便于你刷新页面观察快照时间变化。线上环境仍应按业务设置合理的窗口，并与按需再验证搭配使用。
      </p>
    ),
  },
  {
    id: "isr-vs-realtime",
    question: "ISR 适合「每次请求都必须最新」的数据吗？",
    answerText:
      "不适合。需要请求级新鲜度时应采用 SSR（例如在服务端使用 cache 为 no-store 的 fetch），或为特定片段单独使用动态渲染策略。ISR 更适合多数访问可接受短暂滞后、但需要周期性或按需刷新的内容。",
    answer: (
      <p>
        <strong>不适合。</strong>
        需要请求级新鲜度时应采用 SSR（例如在服务端使用 <code>cache: &quot;no-store&quot;</code>{" "}
        的 <code>fetch</code>
        ），或为特定片段单独使用动态渲染策略。ISR 更适合多数访问可接受短暂滞后、但需要周期性或按需刷新的内容。
      </p>
    ),
  },
  {
    id: "isr-seo",
    question: "ISR 对 SEO 有影响吗？",
    answerText:
      "搜索引擎抓取到的通常是完整的 HTML 快照，形式上接近静态页，有利于收录；内容会按你的再验证周期或按需再验证更新。应避免把关键正文完全放在仅客户端渲染的脚本结果里，否则会削弱与 ISR 无关的 SEO 风险。",
    answer: (
      <p>
        搜索引擎抓取到的通常是<strong>完整的 HTML 快照</strong>，形式上接近静态页，有利于收录；内容会按你的再验证周期或按需再验证更新。应避免把关键正文完全放在仅客户端渲染的脚本结果里，否则会削弱与
        ISR 无关的 SEO 风险。
      </p>
    ),
  },
];
