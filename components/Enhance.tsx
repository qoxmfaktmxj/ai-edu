"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const store = {
  get(k: string) {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set(k: string, v: string) {
    try {
      localStorage.setItem(k, v);
    } catch {}
  },
};

// Behavior for the static chapter HTML: copy buttons, screenshot slots, checklists,
// reveal-on-scroll, the sidebar section spy and soft navigation for in-content links.
// Re-runs on every client navigation; one AbortController removes all listeners.
export default function Enhance() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const root = document.documentElement;
    const ac = new AbortController();
    const on = { signal: ac.signal };
    const live = document.getElementById("live");
    const say = (msg: string) => live && (live.textContent = msg);

    document.querySelectorAll<HTMLElement>(".prompt, .cmd").forEach((block) => {
      const code = block.querySelector("pre");
      if (!code || block.querySelector(".copy")) return;
      const label = block.dataset.title || block.querySelector("figcaption")?.textContent?.trim() || "내용";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy";
      btn.setAttribute("aria-label", `${label} 복사`);
      btn.innerHTML = '<i class="ph ph-copy"></i>복사';
      btn.addEventListener("click", async () => {
        const text = code.innerText.replace(/\n$/, "");
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const r = document.createRange();
          r.selectNodeContents(code);
          const s = getSelection();
          s?.removeAllRanges();
          s?.addRange(r);
          document.execCommand("copy");
          s?.removeAllRanges();
        }
        btn.classList.add("is-done");
        btn.innerHTML = '<i class="ph ph-check"></i>복사됨';
        say(`${label} 복사됨`);
        setTimeout(() => {
          btn.classList.remove("is-done");
          btn.innerHTML = '<i class="ph ph-copy"></i>복사';
        }, 1600);
      });
      block.appendChild(btn);
    });

    // Missing screenshots are marked on the server; show labeled slots only locally or with ?slots.
    if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || /[?&]slots/.test(location.search)) {
      root.classList.add("show-slots");
    }

    document.querySelectorAll<HTMLInputElement>('.checklist input[type="checkbox"]').forEach((box, i) => {
      const key = "check:" + (box.id || `${pathname}:${i}`);
      box.checked = store.get(key) === "1";
      box.addEventListener("change", () => store.set(key, box.checked ? "1" : "0"), on);
    });

    // Wide tables scroll sideways on phones; make them reachable by keyboard.
    document.querySelectorAll<HTMLElement>(".table-wrap").forEach((t) => {
      t.tabIndex = 0;
      t.setAttribute("role", "region");
      t.setAttribute("aria-label", "표 (옆으로 스크롤할 수 있음)");
    });

    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            reveal.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal, .roadmap").forEach((el) => reveal.observe(el));
    ac.signal.addEventListener("abort", () => reveal.disconnect());

    // Section spy: the active section is the last h3 whose top has passed just below the header.
    const links = new Map<string, Element>();
    document.querySelectorAll('.toc-sections a[href^="#"]').forEach((a) => links.set(a.getAttribute("href")!.slice(1), a));
    const heads = [...document.querySelectorAll<HTMLElement>(".content h3[id]")];
    if (links.size && heads.length) {
      let raf = 0;
      const update = () => {
        raf = 0;
        let current: HTMLElement | undefined;
        for (const h of heads) if (h.getBoundingClientRect().top <= 120) current = h;
        links.forEach((a) => a.classList.remove("is-active"));
        if (current) links.get(current.id)?.classList.add("is-active");
      };
      addEventListener("scroll", () => (raf ||= requestAnimationFrame(update)), { passive: true, signal: ac.signal });
      addEventListener("hashchange", update, on);
      update();
      ac.signal.addEventListener("abort", () => cancelAnimationFrame(raf));
    }

    // In-content links to other course pages navigate without a full page reload.
    document.querySelector(".content")?.addEventListener(
      "click",
      (e) => {
        const ev = e as MouseEvent;
        const a = (ev.target as Element).closest<HTMLAnchorElement>('a[href^="/courses/"]');
        if (!a || ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || a.target) return;
        ev.preventDefault();
        router.push(a.getAttribute("href")!);
      },
      on,
    );

    return () => ac.abort();
  }, [pathname, router]);

  return null;
}
