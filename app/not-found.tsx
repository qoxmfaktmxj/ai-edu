import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="home not-found">
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>주소가 바뀌었거나 아직 없는 페이지입니다.</p>
      <Link className="btn btn-primary" href="/">
        교육 목록으로 <i className="ph ph-arrow-right" />
      </Link>
    </main>
  );
}
