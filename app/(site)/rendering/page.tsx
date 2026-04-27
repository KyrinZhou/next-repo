import Link from "next/link";
import type { Metadata } from "next";

import { renderModes } from "@/lib/rendering-data";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "四种渲染模式 · 独立页面 | Next.js Rendering Playbook",
  description:
    "CSR、SSR、SSG、ISR 各对应一条独立路由；每条路由只用一种模式生成页面内容与取数方式。",
};

export default function RenderingIndexPage() {
  return (
    <main className="detail-page site-shell">
      <div className="detail-hero">
        <Link className="back-link" href="/">
          回到首页
        </Link>
        <div className="detail-hero-copy">
          <p className="eyebrow">One mode, one route</p>
          <h1>四种模式，四套独立页面</h1>
          <p>
            下面四条链接各打开<strong>单独一页</strong>，整页只采用该模式约定的取数方式：CSR 为 Client
            Component；SSR / SSG / ISR 为 Server Component，仅靠 <code>fetch</code> 的缓存语义区分。
            没有「一锅炖」——你要对比行为时，请分别打开、分别刷新验证。
          </p>
        </div>
      </div>

      <section className="section-block" style={{ marginTop: 0 }}>
        <div className="route-links modes-index-links">
          {renderModes.map((mode) => (
            <Link className="route-link" href={mode.route} key={mode.key}>
              <span>{mode.key}</span>
              <strong>{mode.name}</strong>
              <small>{mode.summary}</small>
            </Link>
          ))}
        </div>
      </section>

      <div className="detail-card">
        <div className="card-headline">
          <h2>路由与文件</h2>
          <p>在仓库里，四条页面分别对应下列路径（便于你对照 App Router 结构）。</p>
        </div>
        <ul className="detail-list">
          <li>
            <strong>CSR</strong> — <code>app/(site)/rendering/csr/page.tsx</code>（<code>&quot;use client&quot;</code>
            ）
          </li>
          <li>
            <strong>SSR</strong> — <code>app/(site)/rendering/ssr/page.tsx</code>（
            <code>fetch(..., &#123; cache: &quot;no-store&quot; &#125;)</code> +{" "}
            <code>dynamic = &quot;force-dynamic&quot;</code>）
          </li>
          <li>
            <strong>SSG</strong> — <code>app/(site)/rendering/ssg/page.tsx</code>（
            <code>fetch(..., &#123; cache: &quot;force-cache&quot; &#125;)</code> +{" "}
            <code>dynamic = &quot;force-static&quot;</code>）
          </li>
          <li>
            <strong>ISR</strong> — <code>app/(site)/rendering/isr/page.tsx</code>（
            <code>fetch(..., &#123; next: &#123; revalidate: 60 &#125; &#125;)</code> + 段级{" "}
            <code>revalidate</code>）
          </li>
        </ul>
      </div>
    </main>
  );
}
