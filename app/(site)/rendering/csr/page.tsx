"use client";

/**
 * 本页仅采用 CSR：整页为 Client Component，业务数据在浏览器 hydration 之后请求。
 */

import { useEffect, useState } from "react";

import { RenderingPage } from "@/components/rendering-page";
import { formatSnapshotTime, getMode, type ModeSnapshot } from "@/lib/rendering-data";

export default function CsrPage() {
  const mode = getMode("CSR");
  const [snapshot, setSnapshot] = useState<ModeSnapshot | null>(null);
  const [status, setStatus] = useState("浏览器正在发起请求...");

  useEffect(() => {
    let active = true;

    async function load() {
      const response = await fetch("/api/live-snapshot?mode=csr", {
        cache: "no-store",
      });
      const payload = (await response.json()) as ModeSnapshot;

      if (!active) {
        return;
      }

      setSnapshot(payload);
      setStatus("客户端请求已完成，界面由浏览器补齐。");
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  return (
    <RenderingPage
      asidePoints={[
        "页面本体就是 Client Component，所以可以直接写状态、事件和副作用。",
        "数据请求发生在 hydration 之后，SEO 拿到的是骨架而非完整业务数据。",
        "如果你后续接 SWR、React Query，本质仍然是 CSR 的客户端取数模型。",
      ]}
      asideTitle="怎么识别这是 CSR"
      caution="CSR 在交互后台里非常合理，但如果你把文案页也做成纯 CSR，用户和搜索引擎都会先看到空壳。"
      description="这个页面本身就是 Client Component。你能看到它先渲染壳子，再在 useEffect 里通过浏览器 fetch 拉取实时快照。"
      freshnessStrategy="每次进入由浏览器重新请求"
      htmlStrategy="服务端先给壳，数据由客户端补"
      mode={mode}
      runtime="Browser"
      snapshotLabel="客户端拿到数据的时间"
      snapshotValue={snapshot ? formatSnapshotTime(snapshot.renderedAt) : status}
    >
      <div className="detail-card">
        <div className="card-headline">
          <h2>客户端状态</h2>
          <p>这里可以直接看到 hydration 完成后请求数据的结果。</p>
        </div>
        <div className="demo-state">
          <article>
            <span>请求状态</span>
            <strong>{status}</strong>
          </article>
          <article>
            <span>请求 ID</span>
            <strong>{snapshot?.requestId ?? "waiting..."}</strong>
          </article>
        </div>
      </div>
    </RenderingPage>
  );
}
