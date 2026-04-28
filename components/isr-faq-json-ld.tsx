import { ISR_FAQ_ITEMS } from "@/components/isr-faq-items";

export function IsrFaqJsonLdScript() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage" as const,
    mainEntity: ISR_FAQ_ITEMS.map((item) => ({
      "@type": "Question" as const,
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: item.answerText,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
