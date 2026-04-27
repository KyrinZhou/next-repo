import { LabSlotCard } from "@/components/lab-slot-card";
import { getMode, sleep } from "@/lib/rendering-data";

export default async function CsrSlotPage() {
  await sleep(160);
  const mode = getMode("CSR");

  return (
    <LabSlotCard
      href={mode.route}
      label={mode.key}
      marker={mode.marker}
      summary="客户端页面不必阻塞服务器 HTML，适合交互很重、SEO 又不关键的区域。"
      title="客户端取数插槽"
    />
  );
}
