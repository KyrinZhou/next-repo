import type { ReactNode } from "react";
import Link from "next/link";

import { StickySiteNav } from "@/components/sticky-site-nav";
import { renderModes } from "@/lib/rendering-data";

export default function RenderingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <StickySiteNav className="site-shell site-nav">
        <div className="brand-mark">Rendering Demos</div>
        <div className="nav-links">
          <Link href="/">首页</Link>
          <Link href="/lab">并行路由实验室</Link>
          <Link href="/rendering">四种模式</Link>
          {renderModes.map((mode) => (
            <Link href={mode.route} key={mode.key}>
              {mode.key}
            </Link>
          ))}
        </div>
      </StickySiteNav>
      {children}
    </>
  );
}
