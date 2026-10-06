import fs from "node:fs";
import path from "node:path";

// Each course is a folder: content/courses/<slug>/course.json + one HTML fragment per chapter.
// Fragments are our own trusted content and are rendered as-is.
const ROOT = path.join(process.cwd(), "content", "courses");
const PUBLIC = path.join(process.cwd(), "public");

export type Course = {
  slug: string;
  no: number;
  title: string;
  summary: string;
  chapters: string[];
  hero?: { before: string; em: string; after: string };
  secondaryCta?: { to: string; label: string };
  videoNote?: string;
  roadmap?: { to: string; icon: string; title: string; text: string }[];
};
export type ChapterHead = { id: string; num: string; title: string; lead: string };
export type Chapter = ChapterHead & { html: string; sections: { id: string; title: string }[] };

const strip = (s: string) => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

export function getCourses(): Course[] {
  return fs
    .readdirSync(ROOT)
    .filter((d) => fs.existsSync(path.join(ROOT, d, "course.json")))
    .map((d) => JSON.parse(fs.readFileSync(path.join(ROOT, d, "course.json"), "utf8")) as Course)
    .sort((a, b) => a.no - b.no);
}

export function getCourse(slug: string): Course | undefined {
  return getCourses().find((c) => c.slug === slug);
}

function readFragment(course: string, id: string): string {
  return fs.readFileSync(path.join(ROOT, course, `${id}.html`), "utf8");
}

function headOf(id: string, html: string): ChapterHead {
  return {
    id,
    num: strip(html.match(/<span class="chapter-num">(.*?)<\/span>/)?.[1] ?? ""),
    title: strip(html.match(/<h2>(.*?)<\/h2>/s)?.[1] ?? id),
    lead: strip(html.match(/<p class="chapter-lead">(.*?)<\/p>/s)?.[1] ?? ""),
  };
}

// Appendix A: every prompt card of the course, grouped by chapter.
function promptsHtml(course: Course): string {
  const blocks: string[] = [];
  let count = 0;
  for (const id of course.chapters) {
    if (id === "prompts" || id === "glossary") continue;
    const html = readFragment(course.slug, id);
    const cards = [...html.matchAll(/<figure class="prompt([^"]*)" data-title="([^"]+)">[\s\S]*?<pre>([\s\S]*?)<\/pre>/g)];
    if (!cards.length) continue;
    blocks.push(`<h3><a href="/courses/${course.slug}/${id}">${headOf(id, html).title}</a></h3>`);
    for (const [, extra, title, pre] of cards) {
      blocks.push(
        `<figure class="prompt${extra}" data-title="${title}"><figcaption><i class="ph ph-chat-circle-text"></i>${title}</figcaption><pre>${pre}</pre></figure>`,
      );
      count++;
    }
  }
  return `<section class="chapter" id="prompts">
  <header class="chapter-head">
    <span class="chapter-num">A</span>
    <h2>프롬프트 모음</h2>
    <p class="chapter-lead">이 교육에 나온 프롬프트 ${count}개를 장 순서대로 모았습니다. 복사한 뒤 [대괄호] 부분만 내 내용으로 바꿔 쓰세요.</p>
  </header>
  <div class="prompt-index">${blocks.join("\n")}</div>
</section>`;
}

export function getChapterHeads(course: Course): ChapterHead[] {
  return course.chapters.map((id) =>
    id === "prompts"
      ? { id, num: "A", title: "프롬프트 모음", lead: "" }
      : headOf(id, readFragment(course.slug, id)),
  );
}

export function getChapter(course: Course, id: string): Chapter | undefined {
  if (!course.chapters.includes(id)) return undefined;
  const isAppendix = id === "prompts";
  let html = isAppendix ? promptsHtml(course) : readFragment(course.slug, id);
  const head = headOf(id, html);
  // The chapter title is the page's h1.
  html = html.replace(/<h2>(.*?)<\/h2>/s, "<h1>$1</h1>");
  // Give every h3 an id so the sidebar can list and link the sections (appendix h3s are chapter names, not sections).
  const sections: Chapter["sections"] = [];
  if (!isAppendix) {
    html = html.replace(/<h3>(.*?)<\/h3>/gs, (_, inner: string) => {
      const sid = `s${sections.length + 1}`;
      sections.push({ id: sid, title: strip(inner) });
      return `<h3 id="${sid}">${inner}</h3>`;
    });
  }
  // Screenshots not taken yet: mark at build time and drop src so the live site makes no 404 requests.
  html = html.replace(/<figure class="shot"([^>]*)>([\s\S]*?)<\/figure>/g, (fig, attrs: string, body: string) => {
    const src = body.match(/<img[^>]*\ssrc="([^"]+)"/)?.[1];
    if (!src || fs.existsSync(path.join(PUBLIC, src))) return fig;
    return `<figure class="shot is-missing"${attrs}>${body.replace(/\ssrc="[^"]+"/, "")}</figure>`;
  });
  return { ...head, html, sections };
}
