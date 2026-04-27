import type { ReactNode } from "react";
import Link from "next/link";

import { renderModes } from "@/lib/rendering-data";

export default function RenderingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <nav className="site-shell site-nav" style={{ paddingBottom: 0 }}>
        <div className="brand-mark">Rendering Demos</div>
        <div className="nav-links">
          <Link href="/">首页</Link>
          <Link href="/lab">并行路由实验室</Link>
          {renderModes.map((mode) => (
            <Link href={mode.route} key={mode.key}>
              {mode.key}
            </Link>
          ))}
        </div>
      </nav>
      {children}
    </>
  );
}
