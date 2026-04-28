"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export type RevalidateIsrDemoResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

/** 生产环境默认关闭，避免公开页被滥用；本地 dev 始终可用。 */
function isRevalidateDemoAllowed(): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  return process.env.ENABLE_ISR_DEMO_REVALIDATE === "1";
}

/**
 * MVP：服务端按需再验证——`revalidatePath` 整路由 + `revalidateTag` 命中 `unstable_cache` 演示数据。
 */
export async function revalidateIsrDemoAction(): Promise<RevalidateIsrDemoResult> {
  if (!isRevalidateDemoAllowed()) {
    return {
      ok: false,
      message:
        "生产环境未开启演示。若需在本站线上环境测试，请在部署环境设置 ENABLE_ISR_DEMO_REVALIDATE=1 后重试。",
    };
  }

  revalidatePath("/rendering/isr");
  revalidateTag("isr-demo");

  return {
    ok: true,
    message:
      "已请求整页与 isr-demo 标签失效。下方展示将随刷新更新；若仍为旧 ID，可再点浏览器刷新。",
  };
}
