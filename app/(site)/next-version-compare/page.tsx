import Link from "next/link";
import type { Metadata } from "next";

import { CodeBlock } from "@/components/code-block";
import {
  nextVersionCompareResources,
  nextVersionCompareRows,
} from "@/lib/next-15-16-compare-data";

export const metadata: Metadata = {
  title: "Next.js 15 与 16 差异对照 | Next.js Rendering Playbook",
  description:
    "从构建工具、缓存、异步请求 API、Middleware/Proxy 等维度概括 Next.js 16 相对 15 的主要变化，并附官方升级链接。",
};

export default function NextVersionComparePage() {
  return (
    <main className="detail-page site-shell">
      <div className="detail-hero">
        <Link className="back-link" href="/">
          回到首页
        </Link>
        <div className="detail-hero-copy">
          <p className="eyebrow">Version 15 → 16</p>
          <h1>Next.js 15 与 16：版本差异速览</h1>
          <p>
            本页是<strong>对照表 + 迁移线索</strong>，便于你在升级前建立心智模型。细节、边界行为与次版本修正请以
            Next.js 官方文档与 Release Note 为准；本站示例代码仍锁定在 Next 15.x。
          </p>
        </div>
      </div>

      <div className="table-shell version-compare-shell">
        <table className="render-table version-compare-table">
          <thead>
            <tr>
              <th scope="col">维度</th>
              <th scope="col">Next.js 15（典型状态）</th>
              <th scope="col">Next.js 16（主要变化方向）</th>
            </tr>
          </thead>
          <tbody>
            {nextVersionCompareRows.map((row) => (
              <tr key={row.topic}>
                <td className="version-compare-topic">{row.topic}</td>
                <td>{row.next15}</td>
                <td>{row.next16}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="detail-card">
        <div className="card-headline">
          <h2>异步 API：升级时最先要改的一类代码</h2>
          <p>
            在 16 中，对请求期数据的访问更严格地要求异步；下面左侧为易在 15 后期仍常见的写法示意，右侧为迁移方向示意（以官方升级指南中的示例为准）。
          </p>
        </div>
        <div className="pitfall-columns">
          <div>
            <p className="pitfall-label">需逐步淘汰的同步思路</p>
            <CodeBlock
              code={`// 示意：直接同步取 cookies / headers（在 v16 不适用）
import { cookies } from "next/headers";

export default function Page() {
  const store = cookies();
  // ...
}`}
            />
          </div>
          <div>
            <p className="pitfall-label">迁移方向（示意）</p>
            <CodeBlock
              code={`import { cookies } from "next/headers";

export default async function Page() {
  const store = await cookies();
  // ...
}`}
            />
          </div>
        </div>
      </div>

      <div className="detail-card caution-card">
        <div className="card-headline">
          <h2>官方文档与工具</h2>
        </div>
        <ul className="detail-list">
          {nextVersionCompareResources.map((item) => (
            <li key={item.href}>
              <a href={item.href} rel="noreferrer" target="_blank">
                {item.label}
              </a>
            </li>
          ))}
          <li>
            可使用{" "}
            <code>npx @next/codemod@latest upgrade latest</code> 或文档推荐的 codemod 分批自动改写（务必在 Git
            分支上Review 差异）。
          </li>
        </ul>
      </div>
    </main>
  );
}
