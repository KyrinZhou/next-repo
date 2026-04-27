import { RenderingPage } from "@/components/rendering-page";
import { fetchInlineSnapshot, formatSnapshotTime, getMode } from "@/lib/rendering-data";

/** 本页仅采用 SSG 取向：构建期静态化；运行时不再为整页做动态渲染。 */
export const dynamic = "force-static";

export default async function SsgPage() {
  const mode = getMode("SSG");
  const snapshot = await fetchInlineSnapshot("SSG", {
    cache: "force-cache",
  });

  return (
    <RenderingPage
      asidePoints={[
        "在 App Router 里，这种模式几乎就是默认思路：没有动态依赖，就倾向静态化。",
        "force-cache 等于明确告诉 Next：这份结果可以复用，不必每次都重新请求。",
        "生产构建后，页面时间会停在构建产物生成的那一刻，直到下次重新部署。",
      ]}
      asideTitle="怎么识别这是 SSG"
      caution="SSG 最大的问题不是慢，而是旧。只要业务要求内容准实时变化，就不要机械地套静态化。"
      description="这个页面强调静态生成思路。它在构建期把结果固定下来，所以最适合官网、文档和说明型内容。"
      freshnessStrategy="构建产物缓存，直到下次重新部署"
      htmlStrategy="构建期提前生成 HTML"
      mode={mode}
      runtime="Server Component"
      snapshotLabel="静态内容生成时间"
      snapshotValue={formatSnapshotTime(snapshot.renderedAt)}
    />
  );
}
