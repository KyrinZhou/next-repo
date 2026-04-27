"use client";

import { useEffect, useState } from "react";

export function ClientOnlyTimeDemo() {
  const [timeLabel, setTimeLabel] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      setTimeLabel(
        new Date().toLocaleTimeString("zh-CN", {
          hour12: false,
        }),
      );
    };

    tick();
    const id = window.setInterval(tick, 1000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="demo-state hydration-demo-strip">
      <article>
        <span>安全演示：挂载后再显示本地时间</span>
        <strong>{timeLabel ?? "—"}</strong>
      </article>
      <p className="demo-caption">
        服务端与客户端首次渲染均为「—」；hydration 完成后由 useEffect 写入真实时间。
      </p>
    </div>
  );
}
