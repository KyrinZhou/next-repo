import { LabSlotCard } from "@/components/lab-slot-card";
import { getMode, sleep } from "@/lib/rendering-data";

export default async function SsgSlotPage() {
  await sleep(280);
  const mode = getMode("SSG");

  return (
    <LabSlotCard
      href={mode.route}
      label={mode.key}
      marker={mode.marker}
      summary="静态插槽最像官网模块：构建时就准备好，访问时只负责极快地返回结果。"
      title="静态预生成插槽"
    />
  );
}
