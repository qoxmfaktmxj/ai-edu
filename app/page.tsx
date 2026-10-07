import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import { getChapterHeads, getCourses } from "@/lib/content";

export default function Home() {
  const courses = getCourses();
  const first = courses[0];

  return (
    <main id="main">
      <section className="hero">
        <div className="hero-anim">
          <h1 style={{ "--d": 0 } as React.CSSProperties}>
            말로 부탁하고,
            <br />
            <em>직접 만들며</em> 배우는 AI
          </h1>
          <p className="hero-sub" style={{ "--d": 1 } as React.CSSProperties}>
            코딩을 몰라도 따라 할 수 있는 실습형 AI 교육입니다. 한 편씩 직접 만들면서 AI를 업무 도구로 익힙니다.
          </p>
          <div className="hero-cta" style={{ "--d": 2 } as React.CSSProperties}>
            <Link className="btn btn-primary" href={`/courses/${first.slug}`}>
              {first.no}편 시작하기 <i className="ph ph-arrow-right" />
            </Link>
            <a className="btn btn-ghost" href="#courses">
              교육 목록 보기
            </a>
          </div>
        </div>
        <HeroVideo note="이 소개 영상도 HTML로 만들었습니다. 1편 7장에서 같은 방법으로 직접 만들어 봅니다." />
      </section>

      <div className="home">
        <h2 id="courses">교육 목록</h2>
        <div className="course-grid">
          {courses.map((c) => (
            <Link key={c.slug} className="course-card" href={`/courses/${c.slug}`}>
              <span className="course-no">{c.no}편</span>
              <h3>{c.title}</h3>
              <p>{c.summary}</p>
              <span className="course-meta">
                {getChapterHeads(c).filter((h) => /^\d+$/.test(h.num)).length}개 장 <i className="ph ph-arrow-right" />
              </span>
            </Link>
          ))}
        </div>
        <p className="course-note">다음 교육은 준비 중입니다.</p>
      </div>
    </main>
  );
}
