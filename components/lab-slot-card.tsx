import Link from "next/link";

type LabSlotCardProps = {
  title: string;
  label: string;
  marker: string;
  summary: string;
  href: string;
};

export function LabSlotCard({
  title,
  label,
  marker,
  summary,
  href,
}: LabSlotCardProps) {
  return (
    <article className="lab-slot-card">
      <div className="lab-slot-top">
        <span>{label}</span>
        <h3>{title}</h3>
      </div>
      <p>{summary}</p>
      <small>{marker}</small>
      <Link href={href}>打开独立演示</Link>
    </article>
  );
}
