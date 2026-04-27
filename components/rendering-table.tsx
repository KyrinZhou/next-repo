import Link from "next/link";

import { differenceRows, renderModes } from "@/lib/rendering-data";

export function RenderingTable() {
  return (
    <section className="section-block">
      <div className="section-heading">
        <p className="eyebrow">One Table, Four Modes</p>
        <h2>先看口诀，再拆差异</h2>
        <p>
          App Router 下最常用的判断标准不是概念定义，而是“你在这个页面里到底写了哪一类
          fetch”。
        </p>
      </div>

      <div className="table-shell">
        <table className="render-table">
          <thead>
            <tr>
              <th>渲染模式</th>
              <th>核心实现标志</th>
              <th>数据发生时机</th>
              <th>首屏体验</th>
              <th>典型使用场景</th>
            </tr>
          </thead>
          <tbody>
            {renderModes.map((mode) => (
              <tr key={mode.key}>
                <td>
                  <div className="table-mode">
                    <strong>{mode.key}</strong>
                    <span>{mode.subtitle}</span>
                  </div>
                </td>
                <td>{mode.marker}</td>
                <td>{mode.dataPhase}</td>
                <td>{mode.firstScreen}</td>
                <td>{mode.fitFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="difference-grid">
        {differenceRows.map((row) => (
          <article className="difference-card" key={row.label}>
            <h3>{row.label}</h3>
            <ul>
              {renderModes.map((mode) => (
                <li key={`${row.label}-${mode.key}`}>
                  <span>{mode.key}</span>
                  <strong>{row.values[mode.key]}</strong>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="route-links">
        {renderModes.map((mode) => (
          <Link className="route-link" href={mode.route} key={mode.key}>
            <span>{mode.key}</span>
            <strong>{mode.name}</strong>
            <small>{mode.marker}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
