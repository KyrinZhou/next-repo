"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ISR_FAQ_ITEMS } from "@/components/isr-faq-items";
import { cn } from "@/lib/utils";

/** 与同列其它 `.detail-card` 一致，占满主栏网格宽度（与版心内的主内容区同宽），不再收窄 max-w-3xl */
export function IsrFaqAccordion() {
  return (
    <section className="detail-card isr-faq w-full min-w-0" aria-labelledby="isr-faq-heading">
      <div className="card-headline text-left">
        <h2 id="isr-faq-heading">常见问题（ISR 缓存与失效）</h2>
        <p className="max-w-none text-pretty leading-relaxed text-muted-foreground">
          下列说明针对 Next.js App Router 语境下的增量静态再生（ISR），并与本页示例配置呼应；结构化数据已通过
          JSON-LD（FAQPage）输出，便于搜索引擎理解问答要点。
        </p>
      </div>

      <Accordion multiple defaultValue={[]} className="w-full border-t border-border/60">
        {ISR_FAQ_ITEMS.map((item) => (
          <AccordionItem key={item.id} value={item.id} className="border-b border-border/50 last:border-b-0">
            <AccordionTrigger
              className={cn(
                "py-4 text-left text-base font-semibold leading-snug text-foreground",
                "hover:no-underline",
                "items-start justify-between gap-3",
                "[&_[data-slot=accordion-trigger-icon]]:mt-1 [&_[data-slot=accordion-trigger-icon]]:shrink-0"
              )}
            >
              <span className="min-w-0 flex-1 text-pretty pr-2">{item.question}</span>
            </AccordionTrigger>
            <AccordionContent
              className={cn(
                "pb-4 text-left text-muted-foreground",
                "[&_p]:m-0 [&_p]:text-pretty [&_p]:leading-relaxed",
                "[&_code]:rounded-md [&_code]:border [&_code]:border-border/80 [&_code]:bg-muted/50 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-foreground [&_code]:text-[0.9em]"
              )}
            >
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
