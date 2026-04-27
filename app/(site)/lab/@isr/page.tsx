import { LabSlotCard } from "@/components/lab-slot-card";
import { getMode, sleep } from "@/lib/rendering-data";

export default async function IsrSlotPage() {
  await sleep(760);
  const mode = getMode("ISR");

  return (
    <LabSlotCard
      href={mode.route}
      label={mode.key}
      marker={mode.marker}
      summary="ISR 把静态速度和可控刷新组合起来，是内容站里最常见的折中方案。"
      title="增量更新插槽"
    />
  );
}
