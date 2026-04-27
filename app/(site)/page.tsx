import Link from "next/link";

import { RenderingTable } from "@/components/rendering-table";
import { renderModes } from "@/lib/rendering-data";

export default function HomePage() {
  return (
    <main className="site-shell">
      <nav className="site-nav">
        <div className="brand-mark">Next.js Rendering Playbook</div>
        <div className="nav-links">
          <Link href="#summary">口诀总览</Link>
          <Link href="/lab">并行路由实验室</Link>
          <Link href="/hydration-pitfalls">水合问题清单</Link>
          <Link href="/rendering/ssr">看一个完整示例</Link>
        </div>
      </nav>

      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Next 15 / App Router</p>
          <h1>一张表吃透 四种渲染模式</h1>
          <p>
            这不是抽象概念页，而是一个把 <code>CSR</code>、<code>SSR</code>、
            <code>SSG</code>、<code>ISR</code> 放在同一套官网里讲透的教学型站点。
            首页给你口诀，二级页给你实现，实验室再用并行路由把四个模式拆开并排展示。
          </p>
          <div className="hero-actions">
            <Link href="#summary">先看总表</Link>
            <Link href="/lab">打开并行路由实验室</Link>
          </div>
        </div>

        <aside className="hero-aside">
          <article className="hero-note">
            <strong>先记住这个判断顺序</strong>
            <ul>
              <li>需要浏览器接管后取数：CSR</li>
              <li>需要每次请求都最新：SSR</li>
              <li>内容稳定、追求极致快：SSG</li>
              <li>想要静态快又定时更新：ISR</li>
            </ul>
          </article>

          <article className="hero-note">
            <strong>这次站点里用了什么新能力</strong>
            <ul>
              <li>App Router 目录路由</li>
              <li>并行路由 `@slot` 结构</li>
              <li>Server Component 数据获取</li>
              <li>`loading` 风格的独立分段体验</li>
            </ul>
          </article>
        </aside>
      </section>

      <div id="summary">
        <RenderingTable />
      </div>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Pick The Right Mode</p>
          <h2>如果你只看一个决策面板，就看这里</h2>
          <p>
            真正做项目时，渲染模式不是“哪种更高级”，而是“谁来拿数据、什么时候拿、能不能缓存”。
          </p>
        </div>

        <div className="route-links">
          {renderModes.map((mode) => (
            <Link className="route-link" href={mode.route} key={mode.key}>
              <span>{mode.key}</span>
              <strong>{mode.name}</strong>
              <small>{mode.summary}</small>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
