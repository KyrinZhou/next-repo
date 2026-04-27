import Link from "next/link";
import type { Metadata } from "next";

import { ClientOnlyTimeDemo } from "@/components/client-only-time-demo";
import { CodeBlock } from "@/components/code-block";
import { hydrationPitfalls } from "@/lib/hydration-pitfalls-data";

export const metadata: Metadata = {
  title: "常见水合问题清单 | Next.js Rendering Playbook",
  description:
    "列举 Next.js App Router 中与 React hydration 相关的典型陷阱与规避思路。",
};

export default function HydrationPitfallsPage() {
  return (
    <main className="detail-page site-shell">
      <div className="detail-hero">
        <Link className="back-link" href="/">
          回到首页
        </Link>
        <div className="detail-hero-copy">
          <p className="eyebrow">Hydration</p>
          <h1>可能产生水合问题的常见情况</h1>
          <p>
            水合是 React 用客户端逻辑「接上」服务端下发的 HTML。只要<strong>首帧</strong>
            在 Node 与浏览器里算出的 UI 不一致，就可能报错或出现闪烁。下列条目均为高频原因；示例代码用于说明反模式，本页运行时代码已按安全方式编写。
          </p>
        </div>
      </div>

      <div className="detail-card">
        <div className="card-headline">
          <h2>可运行对照：客户端挂载后再读时间</h2>
          <p>下面组件不在首帧读取 Date，因此不会制造 SSR 与浏览器文本不一致。</p>
        </div>
        <ClientOnlyTimeDemo />
      </div>

      <div className="hydration-pitfall-stack">
        {hydrationPitfalls.map((item) => (
          <section className="detail-card hydration-pitfall-card" key={item.title}>
            <div className="card-headline">
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
            </div>
            <div className="pitfall-columns">
              <div>
                <p className="pitfall-label">典型反模式</p>
                <CodeBlock code={item.badExample} />
              </div>
              <div>
                <p className="pitfall-label">规避思路</p>
                <p className="pitfall-fix">{item.fix}</p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="detail-card caution-card">
        <div className="card-headline">
          <h2>延伸阅读</h2>
        </div>
        <ul className="detail-list">
          <li>
            <a href="https://react.dev/link/hydration-mismatch" rel="noreferrer" target="_blank">
              React 文档：Hydration mismatch
            </a>
          </li>
          <li>
            <a
              href="https://nextjs.org/docs/messages/react-hydration-error"
              rel="noreferrer"
              target="_blank"
            >
              Next.js：React hydration error
            </a>
          </li>
          <li>
            本站示例修复见 <Link href="/rendering/isr">ISR 页</Link> 内倒计时说明（不在 useState 初始值中读
            Date.now）。
          </li>
        </ul>
      </section>
    </main>
  );
}
