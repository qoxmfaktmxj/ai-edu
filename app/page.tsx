import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import { type Course, getChapterHeads, getCourses, getWorks } from "@/lib/content";

// Numbered chapters only (appendices like "A" are not counted as chapters).
const numbered = (c: Course) =>
  getChapterHeads(c)
    .filter((h) => /^\d+$/.test(h.num))
    .map((h) => h.id);

export default function Home() {
  const courses = getCourses();
  const first = courses[0];
  const works = getWorks();

  return (
    <main id="main">
      <section className="home-hero">
        <div className="hero-anim">
          <h1 style={{ "--d": 0 } as React.CSSProperties}>
            말로 부탁하고, <em>직접 만들며</em> 배우는 AI
          </h1>
          <p className="hero-sub" style={{ "--d": 1 } as React.CSSProperties}>
            코딩을 몰라도 따라 할 수 있는 실습형 AI 교육입니다. 한 회차씩 직접 만들면서 AI를 업무 도구로 익힙니다.
          </p>
          <div className="hero-cta" style={{ "--d": 2 } as React.CSSProperties}>
            <Link className="btn btn-primary" href={`/courses/${first.slug}`}>
              {first.no}회차 시작하기 <i className="ph ph-arrow-right" />
            </Link>
            <a className="btn btn-ghost" href="#courses">
              교육 목록 보기
            </a>
          </div>
        </div>
        <div className="hero-video">
          <HeroVideo note="이 소개 영상도 HTML로 만들었습니다. 2회차 7장에서 같은 방법으로 직접 만들어 봅니다." />
        </div>
      </section>

      <section className="band" aria-labelledby="courses">
        <div className="section">
          <div className="section-head">
            <h2 id="courses">교육 목록</h2>
          </div>
          <div className="course-grid">
            {courses.map((c) => (
              <Link key={c.slug} className="course-card" href={`/courses/${c.slug}`}>
                <span className="course-thumb is-type" aria-hidden="true">
                  <i className={`ph ${c.icon ?? "ph-book-open"}`} />
                  <b>{c.no}회차</b>
                </span>
                <span className="course-body">
                  <h3>
                    <span className="sr-only">{c.no}회차 </span>
                    {c.title}
                  </h3>
                  <p>{c.summary}</p>
                  {/* Filled in the browser from saved progress (components/Enhance.tsx). */}
                  <span className="course-progress" data-progress={c.slug} data-chapters={numbered(c).join(" ")} hidden />
                  <span className="course-meta">
                    {numbered(c).length}개 장 <i className="ph ph-arrow-right" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <p className="course-note">다음 교육은 준비 중입니다.</p>
        </div>
      </section>

      {works.length > 0 && (
        <section className="section" aria-labelledby="works">
          <div className="section-head">
            <h2 id="works">완성작</h2>
            <p>프롬프트 한 번으로 구성한 다음 조금씩 다듬은 결과물입니다. 눌러서 직접 만져 보세요.</p>
          </div>
          <div className="works">
            {works.map((w) => (
              <article key={w.href} className="work">
                <a className="work-shot" href={w.href} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">
                  <img src={w.img} alt="" loading="lazy" />
                  {/* Plays on hover or focus only (Enhance.tsx); never preloaded. */}
                  {w.video && <video src={w.video} muted loop playsInline preload="none" />}
                </a>
                <div className="work-body">
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                  <ul className="work-meta" aria-label="만든 방법">
                    {w.meta.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                    {w.promptChars && <li>프롬프트 {w.promptChars.toLocaleString("ko-KR")}자</li>}
                  </ul>
                  <div className="work-links">
                    <a href={w.href} target="_blank" rel="noopener" aria-label={`${w.title} 사이트 열기 (새 창)`}>
                      사이트 열기 <i className="ph ph-arrow-up-right" />
                    </a>
                    {w.prompt && <Link href={w.prompt}>프롬프트 보기</Link>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
