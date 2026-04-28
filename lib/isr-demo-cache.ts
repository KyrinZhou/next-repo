import { unstable_cache } from "next/cache";

import { createSnapshot, type ModeSnapshot } from "@/lib/rendering-data";

/** 带 `tags: ['isr-demo']`，可与 `revalidateTag('isr-demo')` 配合做按需失效 */
export const getIsrDemoCachedSnapshot = unstable_cache(
  async (): Promise<ModeSnapshot> => createSnapshot("ISR"),
  ["isr-demo-snapshot-v1"],
  { revalidate: 60, tags: ["isr-demo"] }
);
