import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeroVideo from "@/components/HeroVideo";
import { getChapterHeads, getCourse, getCourses } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCourses().map((c) => ({ course: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> {
  const course = getCourse((await params).course);
  if (!course) return {};
  const title = `${course.no}편 ${course.title}`;
  return { title, description: course.summary, openGraph: { title, images: ["/assets/video/intro-poster.jpg"] } };
}

export default async function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const course = getCourse((await params).course);
  if (!course) notFound();
  const base = `/courses/${course.slug}`;
  const heads = getChapterHeads(course);
  // Course-specific hero and roadmap come from course.json; items pointing at missing chapters are dropped.
  const roadmap = (course.roadmap ?? []).filter((r) => course.chapters.includes(r.to));
  const second = course.secondaryCta && course.chapters.includes(course.secondaryCta.to) ? course.secondaryCta : undefined;

  return (
    <main id="main">
      <section className="hero">
        <div className="hero-anim">
          <h1 style={{ "--d": 0 } as React.CSSProperties}>
            {course.hero ? (
              <>
                {course.hero.before}
                <br />
                <em>{course.hero.em}</em> {course.hero.after}
              </>
            ) : (
              course.title
            )}
          </h1>
          <p className="hero-sub" style={{ "--d": 1 } as React.CSSProperties}>
            {course.summary}
          </p>
          <div className="hero-cta" style={{ "--d": 2 } as React.CSSProperties}>
            <Link className="btn btn-primary" href={`${base}/${course.chapters[0]}`}>
              1장부터 시작 <i className="ph ph-arrow-right" />
            </Link>
            {second && (
              <Link className="btn btn-ghost" href={`${base}/${second.to}`}>
                {second.label}
              </Link>
            )}
          </div>
        </div>
        {course.videoNote && <HeroVideo note={course.videoNote} />}
      </section>

      {roadmap.length > 0 && (
        <section className="roadmap" aria-labelledby="roadmap-title">
          <h2 id="roadmap-title" className="sr-only">
            전체 지도
          </h2>
          <ol>
            {roadmap.map((r, i) => (
              <li key={r.title} style={{ "--i": i } as React.CSSProperties}>
                <Link href={`${base}/${r.to}`}>
                  <i className={`ph ${r.icon} rm-icon`} />
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="home">
        <h2>목차</h2>
        <ol className="chapter-list">
          {heads.map((h) => (
            <li key={h.id}>
              <Link href={`${base}/${h.id}`}>
                <span className="cl-num">{h.num}</span>
                <span className="cl-title">{h.title}</span>
                {h.lead && <span className="cl-lead">{h.lead}</span>}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
