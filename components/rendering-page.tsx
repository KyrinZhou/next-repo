import Link from "next/link";
import type { ReactNode } from "react";

import { CodeBlock } from "@/components/code-block";
import type { ModeDefinition } from "@/lib/rendering-data";

type RenderingPageProps = {
  mode: ModeDefinition;
  description: string;
  runtime: string;
  htmlStrategy: string;
  freshnessStrategy: string;
  snapshotLabel: string;
  snapshotValue: string;
  caution: string;
  asideTitle: string;
  asidePoints: string[];
  children?: ReactNode;
};

export function RenderingPage({
  mode,
  description,
  runtime,
  htmlStrategy,
  freshnessStrategy,
  snapshotLabel,
  snapshotValue,
  caution,
  asideTitle,
  asidePoints,
  children,
}: RenderingPageProps) {
  return (
    <main className="detail-page">
      <div className="detail-hero">
        <Link className="back-link" href="/">
          回到总览
        </Link>
        <div className="detail-hero-copy">
          <p className="eyebrow">{mode.key}</p>
          <h1>{mode.name}</h1>
          <p>{description}</p>
        </div>
      </div>

      <div className="detail-grid">
        <section className="detail-primary">
          <div className="stat-strip">
            <article>
              <span>核心标志</span>
              <strong>{mode.marker}</strong>
            </article>
            <article>
              <span>运行位置</span>
              <strong>{runtime}</strong>
            </article>
            <article>
              <span>HTML 形成方式</span>
              <strong>{htmlStrategy}</strong>
            </article>
            <article>
              <span>缓存 / 新鲜度</span>
              <strong>{freshnessStrategy}</strong>
            </article>
          </div>

          <div className="detail-card">
            <div className="card-headline">
              <h2>实现代码</h2>
              <p>这里保留最小实现标志，确保你能直接对应到 App Router 的写法。</p>
            </div>
            <CodeBlock code={mode.code} />
          </div>

          <div className="detail-card">
            <div className="card-headline">
              <h2>这次请求看到的结果</h2>
              <p>为了让差异可感知，页面把当前快照直接渲染在界面上。</p>
            </div>
            <div className="snapshot-card">
              <span>{snapshotLabel}</span>
              <strong>{snapshotValue}</strong>
              <p>{mode.summary}</p>
            </div>
          </div>

          {children}
        </section>

        <aside className="detail-aside">
          <div className="detail-card">
            <div className="card-headline">
              <h2>{asideTitle}</h2>
            </div>
            <ul className="detail-list">
              {asidePoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="detail-card caution-card">
            <div className="card-headline">
              <h2>使用提醒</h2>
            </div>
            <p>{caution}</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
