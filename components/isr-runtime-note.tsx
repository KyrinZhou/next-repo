"use client";

import { useEffect, useState } from "react";

type IsrRuntimeNoteProps = {
  renderedAt: string;
  windowSeconds: number;
  isDevelopment: boolean;
};

function getSecondsUntilWindow(renderedAt: string, windowSeconds: number): number {
  const eligibleAt = new Date(renderedAt).getTime() + windowSeconds * 1000;
  const diff = Math.ceil((eligibleAt - Date.now()) / 1000);

  return Math.max(0, diff);
}

export function IsrRuntimeNote({
  renderedAt,
  windowSeconds,
  isDevelopment,
}: IsrRuntimeNoteProps) {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      setSecondsLeft(getSecondsUntilWindow(renderedAt, windowSeconds));
    };

    tick();
    const timer = window.setInterval(tick, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [renderedAt, windowSeconds]);

  return (
    <div className="detail-card">
      <div className="card-headline">
        <h2>为什么你等了 60 秒，页面没自己变</h2>
        <p>ISR 是缓存重建，不是实时推送。当前打开着的标签页不会在后台自己替换内容。</p>
      </div>

      <div className="demo-state">
        <article>
          <span>当前运行模式</span>
          <strong>{isDevelopment ? "development" : "production"}</strong>
        </article>
        <article>
          <span>距离进入可重建窗口</span>
          <strong>
            {secondsLeft === null
              ? "…"
              : secondsLeft > 0
                ? `${secondsLeft}s`
                : "已到可重建窗口"}
          </strong>
        </article>
      </div>

      <ul className="detail-list">
        {isDevelopment ? (
          <li>
            你现在跑的是 <code>next dev</code>。Next.js 官方文档明确说明：开发模式下页面按请求即时渲染，不按 ISR 缓存窗口工作。
          </li>
        ) : (
          <li>
            到了 60 秒后，下一次请求通常仍会先拿到旧页面，同时在后台重建；再下一次请求才更容易看到新内容。
          </li>
        )}
        <li>所以“等着不动”不会更新；必须产生新的请求，最直接就是刷新页面。</li>
      </ul>

      <div className="hero-actions">
        <button
          className="refresh-button"
          onClick={() => {
            window.location.reload();
          }}
          type="button"
        >
          刷新当前页面验证 ISR
        </button>
      </div>
    </div>
  );
}
