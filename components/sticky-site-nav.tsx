"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type StickySiteNavProps = {
  children: ReactNode;
  className?: string;
};

export function StickySiteNav({ children, className = "" }: StickySiteNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [stuck, setStuck] = useState(false);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }

    const update = () => {
      setStuck(nav.getBoundingClientRect().top <= 1);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`${className.trim()} ${stuck ? "site-nav--stuck" : "site-nav--at-top"}`}
    >
      {children}
    </nav>
  );
}
