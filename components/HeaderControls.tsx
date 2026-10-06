"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Theme toggle (system default, manual choice remembered) and the mobile table-of-contents drawer.
export default function HeaderControls() {
  const pathname = usePathname();
  const [dark, setDark] = useState<boolean | null>(null);
  const [tocOpen, setTocOpen] = useState(false);
  const tocBtn = useRef<HTMLButtonElement>(null);
  const hasToc = /^\/courses\/[^/]+\/[^/]+/.test(pathname);

  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    setDark(t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  useEffect(() => setTocOpen(false), [pathname]);

  useEffect(() => {
    const toc = document.getElementById("toc");
    toc?.classList.toggle("is-open", tocOpen);
    if (!tocOpen) return;
    document.body.style.overflow = "hidden";
    toc?.querySelector<HTMLElement>("a")?.focus();
    const ac = new AbortController();
    const close = (refocus: boolean) => {
      setTocOpen(false);
      if (refocus) tocBtn.current?.focus();
    };
    document.addEventListener("keydown", (e) => e.key === "Escape" && close(true), { signal: ac.signal });
    document.addEventListener("click", (e) => (e.target as Element).closest("#toc a") && close(false), { signal: ac.signal });
    matchMedia("(min-width: 1101px)").addEventListener("change", (e) => e.matches && close(false), { signal: ac.signal });
    return () => {
      ac.abort();
      document.body.style.overflow = "";
    };
  }, [tocOpen]);

  const toggleTheme = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setDark(!dark);
  };

  return (
    <>
      {hasToc && (
        <button
          ref={tocBtn}
          className="icon-btn toc-btn"
          type="button"
          aria-label="목차"
          aria-expanded={tocOpen}
          aria-controls="toc"
          onClick={() => setTocOpen(!tocOpen)}
        >
          <i className={tocOpen ? "ph ph-x" : "ph ph-list"} />
        </button>
      )}
      <button
        className="icon-btn"
        type="button"
        aria-label={dark ? "밝은 화면으로 바꾸기" : "어두운 화면으로 바꾸기"}
        onClick={toggleTheme}
      >
        <i className={dark ? "ph ph-sun" : "ph ph-moon"} />
      </button>
    </>
  );
}
