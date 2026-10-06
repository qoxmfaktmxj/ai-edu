import type { Metadata } from "next";
import Link from "next/link";
import Enhance from "@/components/Enhance";
import HeaderControls from "@/components/HeaderControls";
// Fonts and icons are bundled and served from this site, so blocked CDNs on company networks do not matter.
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@phosphor-icons/web/regular";
import "./globals.css";

// Site name in one place; the course platform will be renamed later.
const SITE_NAME = "AI 사이트 교실";

// Absolute base for Open Graph image URLs (Vercel sets the production host at build time).
const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const metadata: Metadata = {
  metadataBase: new URL(host ? `https://${host}` : "http://localhost:3000"),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: "코딩을 몰라도 Claude에게 말로 부탁해 만들고, 고치고, 배포하며 배우는 실습형 AI 교육",
  openGraph: { title: SITE_NAME, type: "website", images: ["/assets/video/intro-poster.jpg"] },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='9' fill='%231f45d3'/%3E%3Cpath d='M9 22l7-12 7 12' stroke='%23f7f8ff' stroke-width='3' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E",
  },
};

// Set the saved theme before first paint to avoid a flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">
          본문으로 건너뛰기
        </a>
        <header className="topbar">
          <Link className="brand" href="/">
            <span className="brand-mark">
              <i className="ph ph-cursor-click" />
            </span>
            {SITE_NAME}
          </Link>
          <nav className="topbar-links" aria-label="주요 메뉴">
            {/* Plain anchor: a same-URL hash jump with next/link does not scroll. */}
            <a href="/#courses">교육 목록</a>
          </nav>
          <HeaderControls />
          <span className="progress" aria-hidden="true" />
        </header>
        {children}
        <footer className="footer">
          <div className="footer-in">
            <span>{SITE_NAME}. 사내 AI 활용 실습 교육</span>
            <span>Next.js로 만들고 Vercel로 배포했습니다.</span>
          </div>
        </footer>
        <p id="live" className="sr-only" aria-live="polite" />
        <Enhance />
      </body>
    </html>
  );
}
