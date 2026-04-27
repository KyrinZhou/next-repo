import { LabSlotCard } from "@/components/lab-slot-card";
import { getMode, sleep } from "@/lib/rendering-data";

export default async function SsrSlotPage() {
  await sleep(520);
  const mode = getMode("SSR");

  return (
    <LabSlotCard
      href={mode.route}
      label={mode.key}
      marker={mode.marker}
      summary="这个插槽模拟实时型内容：等服务端拿完数据再把完整 HTML 一次性送出来。"
      title="实时服务端插槽"
    />
  );
}
