"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

import { revalidateIsrDemoAction } from "@/lib/isr-demo-actions";
import { hueFromRequestId } from "@/lib/isr-demo-visual";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  renderedAtLabel: string;
  requestId: string;
};

type Delta =
  | { kind: "changed"; prev: string; next: string }
  | { kind: "same"; tried: string };

export function IsrRevalidatePlayground({ renderedAtLabel, requestId }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [delta, setDelta] = useState<Delta | null>(null);

  const awaitingId = useRef<string | null>(null);
  const skipNextCompare = useRef(false);
  /** 用来在「两轮 refresh 仍同 ID」时触发一次对比，避免误以为必须手点第二次 */
  const [refreshProbe, setRefreshProbe] = useState(0);
  const deferredRefreshRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hue = hueFromRequestId(requestId);

  function clearDeferredRefresh() {
    if (deferredRefreshRef.current !== null) {
      clearTimeout(deferredRefreshRef.current);
      deferredRefreshRef.current = null;
    }
  }

  /**
   * revalidate 成功后，第一次 router.refresh() 有时仍会拿到「刚被标脏但尚未重算完」的那版 HTML（类 SWR）。
   * 因此自动在 ~0.5s 后再 refresh 一次；只有两轮后仍同 ID 才判定为「未更替」。
   */
  useEffect(() => {
    if (!awaitingId.current) return;

    const before = awaitingId.current;
    if (skipNextCompare.current) {
      skipNextCompare.current = false;
      awaitingId.current = null;
      setRefreshProbe(0);
      return;
    }

    if (requestId !== before) {
      clearDeferredRefresh();
      setDelta({ kind: "changed", prev: before, next: requestId });
      setError(null);
      awaitingId.current = null;
      setRefreshProbe(0);
      return;
    }

    if (refreshProbe === 0) {
      return;
    }

    setDelta({ kind: "same", tried: before });
    setMessage(null);
    setError(
      "两轮拉取后快照 ID 仍未变：可能仍命中边缘或本地 RSC 缓存。可再手动刷新页面，或稍后再试。"
    );
    awaitingId.current = null;
    setRefreshProbe(0);
  }, [requestId, refreshProbe]);

  useEffect(
    () => () => {
      clearDeferredRefresh();
    },
    []
  );

  function run() {
    setMessage(null);
    setError(null);
    setDelta(null);
    clearDeferredRefresh();
    awaitingId.current = requestId;
    setRefreshProbe(0);
    startTransition(() => {
      void (async () => {
        try {
          const result = await revalidateIsrDemoAction();
          if (!result.ok) {
            setError(result.message);
            awaitingId.current = null;
            return;
          }
          setMessage(result.message);
          router.refresh();
          deferredRefreshRef.current = setTimeout(() => {
            deferredRefreshRef.current = null;
            router.refresh();
            setRefreshProbe((p) => p + 1);
          }, 480);
        } catch (e) {
          setError(e instanceof Error ? e.message : "请求失败");
          awaitingId.current = null;
        }
      })();
    });
  }

  return (
    <div className="detail-card isr-mvp">
      <div className="card-headline text-left">
        <h2>ISR 按需失效 MVP</h2>
        <p className="text-muted-foreground">
          看这个<strong className="text-foreground">色块颜色</strong>和<strong className="text-foreground">
            8 位快照 ID
          </strong>
          ：它们来自同一份 ISR 演示缓存。点击「按需失效」后，服务端会标脏缓存；但第一次{" "}
          <code className="isr-inline-code">router.refresh()</code>{" "}
          有时仍会先拿到<strong className="text-foreground">尚未重算完</strong>
          的那版页面，所以演示里会在约半秒后<strong className="text-foreground">自动再 refresh 一次</strong>
          ，一般<strong className="text-foreground">点一次按钮即可看到 ID 更替</strong>。
        </p>
      </div>

      <div
        className="isr-mvp-signal rounded-[var(--radius-lg)] border-2 px-6 py-7 text-center transition-[background,color] duration-300 md:px-10"
        style={{
          borderColor: `oklch(0.75 0.08 ${hue})`,
          background: `linear-gradient(165deg, oklch(0.94 0.06 ${hue} / 0.55), oklch(0.985 0.02 ${hue} / 0.9))`,
        }}
      >
        <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-muted-foreground">
          演示缓存代数（invalidate 成功后应变化）
        </p>
        <p
          className="mx-auto mb-2 max-[480px]:text-[clamp(1.85rem,10vw,2.75rem)] text-[clamp(2rem,5vw,2.95rem)] font-bold leading-none tracking-[0.04em]"
          lang="en"
          style={{
            wordBreak: "break-all",
            color: `hsl(${hue} 42% 24%)`,
            fontFamily:
              'ui-monospace, "SF Mono", "Cascadia Code", Menlo, "Noto Sans SC", monospace',
          }}
        >
          {requestId}
        </p>
        <p className="text-sm tabular-nums text-muted-foreground">
          <span className="text-foreground">{renderedAtLabel}</span>
        </p>
      </div>

      {delta?.kind === "changed" ? (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            "isr-mvp-compare isolate mt-5 rounded-[var(--radius-md)] border border-emerald-800/25 bg-emerald-50 px-4 py-3 text-left text-sm leading-relaxed text-emerald-950",
            "dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-50"
          )}
        >
          <p className="mb-2 font-semibold text-emerald-950 dark:text-emerald-50">检测到世代已更替</p>
          <p className="font-mono text-[0.9em] leading-relaxed tracking-tight break-all" lang="en">
            <code className="isr-mvp-code">{delta.prev}</code>
            {" → "}
            <code className="isr-mvp-code">{delta.next}</code>
          </p>
          <p className="mt-2 text-[0.94em] leading-relaxed text-emerald-900/90 dark:text-emerald-100/90">
            这就是「按需 revalidate」后重新跑 Server Component / 取样数据后的新快照；与干等 60 秒时钟到期再命中后台再生成是同一种「内容换了」，只是触发时机不同。
          </p>
        </div>
      ) : null}

      {delta?.kind === "same" ? (
        <div
          role="status"
          aria-live="polite"
          className="isolate mt-5 rounded-[var(--radius-md)] border border-amber-800/35 bg-amber-50 px-4 py-3 text-left text-sm leading-relaxed text-amber-950 dark:border-amber-500/35 dark:bg-amber-950/35 dark:text-amber-100"
        >
          <p className="m-0 break-words">
            本次<strong className="font-semibold">暂未发现</strong>
            ID 变化（仍为{" "}
            <code className="isr-mvp-code">{delta.tried}</code>
            ）。按上面提示强刷或与「仅靠时间到期」两种方式对比时再试。
          </p>
        </div>
      ) : null}

      <dl className="demo-state demo-state--mvp mt-5">
        <article>
          <span>如何判断「ISR 刷新了」</span>
          <strong className="text-left font-normal font-sans leading-snug tracking-normal normal-case">
            只要上面的色块<strong>色相</strong>或<strong>一整行 ID</strong>任一变化，就代表这份演示快照不是上一版缓存。（时间戳也一定会变）
          </strong>
        </article>
      </dl>

      <div className="isr-mvp-actions">
        <Button type="button" disabled={pending} onClick={() => run()}>
          {pending ? "触发再验证…" : "① 按需失效 ISR（服务端）"}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={pending}
          onClick={() => {
            setMessage(null);
            setError(null);
            setDelta(null);
            clearDeferredRefresh();
            skipNextCompare.current = true;
            awaitingId.current = null;
            setRefreshProbe(0);
            router.refresh();
          }}
        >
          ② 仅浏览器刷新（对照）
        </Button>
      </div>

      <p className="mt-3 text-left text-xs leading-relaxed text-muted-foreground">
        为何以前像要「点两次」：invalidate 后到真正生成新静态页之间有间隔，第一次拉取有时是旧快照；演示已自动延后半秒第二次拉取。仍不对时可点「②」或按{" "}
        <kbd className="rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[0.8em]">
          Cmd+R
        </kbd>
        。<strong className="text-foreground">仅②</strong>往往仍读到同副本，需与<strong className="text-foreground">
          ①（服务端失效）
        </strong>
        对照。
      </p>

      {error ? (
        <p className="isr-mvp-feedback isr-mvp-feedback--error" role="alert">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="isr-mvp-feedback" role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
