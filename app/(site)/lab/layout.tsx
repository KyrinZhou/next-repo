import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

type LabLayoutProps = {
  children: ReactNode;
  csr: ReactNode;
  ssr: ReactNode;
  ssg: ReactNode;
  isr: ReactNode;
};

export default function LabLayout({
  children,
  csr,
  ssr,
  ssg,
  isr,
}: LabLayoutProps) {
  return (
    <div className="lab-page">
      {children}
      <section className="lab-grid">
        {csr}
        {ssr}
        {ssg}
        {isr}
      </section>
    </div>
  );
}
