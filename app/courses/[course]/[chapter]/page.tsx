import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getChapter, getChapterHeads, getCourse, getCourses } from "@/lib/content";

export const dynamicParams = false;

type Params = Promise<{ course: string; chapter: string }>;

export function generateStaticParams() {
  return getCourses().flatMap((c) => c.chapters.map((chapter) => ({ course: c.slug, chapter })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { course: slug, chapter: id } = await params;
  const course = getCourse(slug);
  const chapter = course && getChapter(course, id);
  if (!chapter) return {};
  const title = `${chapter.num} ${chapter.title}`;
  return { title, description: chapter.lead || course.summary, openGraph: { title, images: ["/assets/video/intro-poster.jpg"] } };
}

export default async function ChapterPage({ params }: { params: Params }) {
  const { course: slug, chapter: id } = await params;
  const course = getCourse(slug);
  const chapter = course && getChapter(course, id);
  if (!course || !chapter) notFound();

  const base = `/courses/${course.slug}`;
  const heads = getChapterHeads(course);
  const i = heads.findIndex((h) => h.id === id);
  const prev = heads[i - 1];
  const next = heads[i + 1];

  return (
    <div className="layout">
      <nav className="toc" id="toc" aria-label="목차">
        <p>
          <Link href={base}>
            {course.no}편 {course.title}
          </Link>
        </p>
        <ol>
          {heads.map((h) => (
            <li key={h.id}>
              <Link href={`${base}/${h.id}`} className={h.id === id ? "is-current" : undefined} aria-current={h.id === id ? "page" : undefined}>
                <span>{h.num}</span>
                {h.title}
              </Link>
              {h.id === id && chapter.sections.length > 0 && (
                <ol className="toc-sections">
                  {chapter.sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`}>{s.title}</a>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <main className="content" id="main">
        <div dangerouslySetInnerHTML={{ __html: chapter.html }} />
        <nav className="pager" aria-label="이전, 다음 장">
          {prev ? (
            <Link href={`${base}/${prev.id}`} className="pager-prev">
              <span>이전</span>
              {prev.num} {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`${base}/${next.id}`} className="pager-next">
              <span>다음</span>
              {next.num} {next.title}
            </Link>
          )}
        </nav>
      </main>
    </div>
  );
}
