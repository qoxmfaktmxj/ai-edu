# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

사내 직장인 교육생. 1회차는 비개발 직군(Microsoft Copilot 에이전트), 2회차는 코딩 경험이 없어도 따라 하는 사이트 만들기(Claude Code, Vercel).

- 수업 중: 강사가 강의실 화면에 띄우고, 교육생은 각자 노트북에서 Claude 또는 Copilot 창과 이 사이트를 나란히 놓고 따라 한다. 프롬프트를 복사해 붙여 넣는 일이 가장 잦다.
- 수업 뒤: 혼자 복습하며 장을 다시 읽고 프롬프트 모음을 찾아 쓴다.

## Product Purpose

코딩을 몰라도 AI에게 말로 부탁해 만들고, 고치고, 배포하며 AI를 업무 도구로 익히게 하는 실습형 교육 사이트. 성공은 교육생이 수업 시간 안에 자기 결과물을 끝까지 만들고, 이후 업무에서 같은 방식으로 다시 쓰는 것.

## Positioning

사이트 자체가 AI로 만든 결과물이다. 소개 영상(HTML로 만든 모션), 완성작 예시, 장마다 실린 프롬프트를 그대로 공개해 "이 정도를 말로 만들 수 있다"를 증명한다. 사이트는 강사(제작자)가 AI를 잘 다루는 개발자라는 것을 보여 주는 포트폴리오 역할도 겸한다(2026-10-15 사용자 요청).

## Operating Context

- 회차 단위 교육. 회차마다 장(chapter) HTML 조각과 부록(프롬프트 모음, 용어집 등).
- 본문 부품: 프롬프트 카드(복사 버튼), 스크린샷 자리, 안내/주의/확인 상자, 단계, 표, 코드.
- 회사망: 일부 CDN 차단, SSL 검사. 글꼴과 아이콘은 사이트에서 직접 제공해야 한다.

## Capabilities and Constraints

- Next.js App Router 정적 생성, Vercel 배포, 공개 GitHub 저장소.
- 내용 원본은 `content/courses/<회차>/` (course.json + 장별 HTML). URL, 장 구성, 문구는 디자인 작업에서 바꾸지 않는다.
- 로그인, 진도 저장 같은 서버 기능은 아직 없다.
- 공개 사이트에서는 회사 이름을 쓰지 않는다('문서 도우미', '회사 양식'처럼 일반화).
- 문자 금지: U+00B7 가운뎃점, U+2014, U+2013. 나열은 쉼표, 결합은 슬래시, 구분은 ASCII 하이픈.

## Brand Commitments

없음. 사이트 이름 'AI 사이트 교실', 파란 대표색, 다크 모드 토글 모두 개선된다면 바꿀 수 있다(사용자 확인).

## Evidence on Hand

- 소개 영상: `public/assets/video/intro.mp4`, 포스터 `intro-poster.jpg` (hyperframes 원본 `_motion/intro/`)
- 완성작 예시: `public/examples/stardust`, `deep-sea-dive`, `space` 등 (HTML/CSS/JS)
- 장별 프롬프트 카드 전체(부록 A로 자동 수집)
- 스크린샷: `public/assets/shots/` (일부 미촬영, 빌드 시 점선 자리 표시)
- 교육생 후기, 수강 인원, 성과 수치는 없다. 지어내지 않는다.

## Product Principles

1. 따라 하기가 먼저다. 지금 어디에 있고 다음에 무엇을 복사해 붙일지가 늘 분명해야 한다.
2. 만든 것으로 증명한다. 주장 대신 실제 결과물, 프롬프트, 과정을 보여 준다.
3. 강의실 화면과 노트북 반쪽 창 모두에서 읽혀야 한다.
4. 코딩을 모르는 사람에게 겁을 주지 않는다. 개발 도구 흉내(터미널 코스튬)는 장식으로 쓰지 않는다.

## Accessibility & Inclusion

WCAG AA 대비, 키보드 이동, 자동 재생 모션 정지 버튼, prefers-reduced-motion 존중(현재 구현 유지).
