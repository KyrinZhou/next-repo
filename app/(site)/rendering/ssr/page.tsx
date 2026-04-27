import { RenderingPage } from "@/components/rendering-page";
import { fetchInlineSnapshot, formatSnapshotTime, getMode } from "@/lib/rendering-data";

export default async function SsrPage() {
  const mode = getMode("SSR");
  const snapshot = await fetchInlineSnapshot("SSR", {
    cache: "no-store",
  });

  return (
    <RenderingPage
      asidePoints={[
        "页面仍然是 Server Component，但通过 no-store 告诉 Next 这份数据不能复用。",
        "每次请求都会重新执行服务端逻辑，所以 renderedAt 和 requestId 会不断变化。",
        "首屏 HTML 天然完整，适合 SEO 和实时信息。",
      ]}
      asideTitle="怎么识别这是 SSR"
      caution="SSR 不代表“最好”，它只是最实时。实时换来的代价是服务器压力和更高的响应成本。"
      description="这里的数据发生在服务端，而且每次请求都重新执行。只要你看到 no-store，就该先想到“这页更偏 SSR”。"
      freshnessStrategy="关闭缓存，每次请求都重新算"
      htmlStrategy="请求时生成完整 HTML"
      mode={mode}
      runtime="Server Component"
      snapshotLabel="这次服务端生成时间"
      snapshotValue={formatSnapshotTime(snapshot.renderedAt)}
    />
  );
}
