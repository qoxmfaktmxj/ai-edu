# 2회차 개편: 개발 스킬 장 추가, 부록 정리

작성: 2026-10-22

## 의도

2회차(`content/courses/interactive-site`) 교육생은 개발자다. 지금 2회차에는 비개발자용 부록 C(Copilot만 있을 때)가 남아 있고, 개발자가 Claude Code를 더 잘 쓰게 해 주는 "스킬" 이야기가 없다.

이번 개편으로 교육생은 다음을 얻는다.

- 유명한 AI 코딩 스킬 7종이 개발의 4단계(요구사항, 설계, 구현, 검증)에서 각각 어떻게 다르게 일하는지 이해한다.
- 개발 스킬 1개, UI 스킬 1개를 직접 설치하고, 설치 전과 후의 차이를 체감한다.
- 프롬프트만으로 원하는 결과가 안 나올 때, 이미 있는 결과물을 REA로 분석해 똑같이 만들게 하는 방법을 안다.
- 수업 뒤 혼자 찾아 쓸 스킬 목록과 디자인 레퍼런스 사이트를 갖는다.

## 목표

1. 새 본편 장 `skills` 추가 (본편 07장, `work` 다음)
2. 부록 C `copilot` 삭제
3. 부록 `rea`에 실습 3 추가 (별이 된 문장 역공학)
4. 새 장에 쓸 그림을 GPT(Codex CLI 이미지 생성)로 새로 만든다

## 하지 않을 것

- 1회차(`copilot-agent`)는 건드리지 않는다.
- 사이트 디자인(DESIGN.md), 레이아웃 코드, 다른 장 내용은 바꾸지 않는다. 장 번호와 링크 정리만 예외.
- 스킬을 많이 설치시키지 않는다. 실습 설치는 개발 1개, UI 1개뿐이다.

## 실패로 보는 것 (기술적으로 돌아가도)

- 참고 영상의 화면, 그림, 문장을 그대로 또는 살짝 바꿔 옮긴 것. 영상은 강의 흐름을 잡는 참고일 뿐이다. 캡처는 저장소 밖(scratchpad)에만 두고 사이트에 넣지 않는다.
- 공개 사이트에 회사 이름, 실제 고객사, 실제 인사 데이터가 들어간 것 (PRODUCT.md 규칙).
- 교육생이 수업 중 설치에 막혀 실습을 못 끝내는 것. 설치 명령은 한 줄짜리 공식 마켓 명령을 우선한다.
- 금지 문자(U+00B7, U+2014, U+2013) 사용.

## 새 장 `skills` 설계

### 강의 흐름 (참고 영상의 뼈대를 따르되 내용, 예시, 그림은 새로 만든다)

참고: 영상 https://youtu.be/nTwbveOwuS4 (10분 14초). 사이트에는 "흐름 참고" 출처로 링크한다.

1. **도입**: 7개 스킬 모두 "요구사항을 정리하고 설계하고 구현하고 검증한다"고 말하지만 무엇에 힘을 주는지가 다르다. 선택 기준은 "내 작업 방식에서 가장 보완하고 싶은 단계"다.
2. **공통 예시 소개**: 인사시스템, SaaS형 업무 시스템 개발. 예시 기능은 **휴가 신청과 승인** 하나로 고정해 4단계 내내 끌고 간다 (내 결정, 바꿀 수 있음).
   - 요구사항: 직원이 휴가를 신청하고, 팀장이 승인하고, 남은 연차가 줄어든다.
   - 빠지기 쉬운 예외: 팀장이 없거나 부재 중일 때 누가 승인하나, 반차, 승인 뒤 취소, 남은 연차보다 많이 신청.
   - 모든 데이터는 가짜 예시(홍길동, 가상 회사)만 쓴다.
3. **요구사항 단계** (색: 파랑): superpowers brainstorming(한 번에 질문 하나), mattpocock grill-me / grill-with-docs(예외를 집요하게, 용어와 결정을 문서로), addyosmani interview-me / idea-refine, gstack office-hours("만들 필요가 있나"부터), Spec Kit specify / clarify(명세 문서가 기준), feature-dev(기존 코드부터 탐색), pstack poteto-mode(목표와 완료 조건으로 플레이북 선택).
4. **설계 단계** (색: 초록): superpowers writing-plans(수정할 파일과 테스트까지), addyosmani planning-and-task-breakdown(완료 기준, 선행 작업), Spec Kit plan / tasks, feature-dev(아키텍처 대안 비교), gstack plan-ceo-review / plan-eng-review / design-review, mattpocock wayfinder(여러 세션에 걸친 큰 계획), pstack architect / arena(여러 설계안 비교).
5. **구현 단계** (색: 보라): superpowers TDD + 서브에이전트, addyosmani incremental-implementation(얇은 수직 조각 하나씩), Spec Kit implement(tasks.md 순서), feature-dev(기존 코드 규칙에 맞춰), mattpocock(필요한 스킬만 골라), gstack, pstack.
6. **검증 단계** (색: 주황): superpowers 리뷰 절차, feature-dev 병렬 리뷰 3종(단순성, 버그, 규칙), gstack review와 qa 분리(빌드 성공과 실제 동작은 다르다), Spec Kit analyze / converge(빠진 요구사항을 다시 작업 목록에), addyosmani 보안, 브라우저 테스트, pstack interrogate(다른 모델끼리 교차 검토).
7. **비교 표**: 7개 스킬 x 4단계 한 장 요약 + 시작 명령 + 설치 난이도.
8. **성향별 추천** + "많이 깔면 오히려 겹치고 충돌한다" 주의. 부가: OpenSpec(가벼운 명세), Compound Engineering(배운 점을 쌓기).
9. **실습 1: 개발 스킬 설치 (superpowers)**
   - 설치: `/plugin install superpowers@claude-plugins-official`
   - 체험: 설치 전과 후에 같은 요청("휴가 신청 화면 만들어 줘")을 보내고, 설치 후에는 코드 대신 질문이 먼저 나오는 것을 확인.
   - 끄는 법, 텔레메트리 끄는 환경변수 `SUPERPOWERS_DISABLE_TELEMETRY` 안내.
10. **실습 2: UI 스킬 설치 (frontend-design)**
    - 설치: `/plugin install frontend-design@claude-plugins-official`
    - 체험: 같은 휴가 신청 화면을 스킬 없이, 스킬로 한 번씩 만들어 비교.
    - 비교 소개: impeccable(audit, polish 같은 명령), ui-ux-pro-max(스타일, 색, 폰트 DB), taste-skill(템플릿 티 제거).
11. **더 보기: 스킬 목록** (설치는 선택): diagram-design, archify, graphify, hyperframes, ponytail, caveman, claude-mem, humanize-korean 등. 저장소 링크, 한 줄 설명, 설치 명령.
12. **더 보기: 디자인 레퍼런스**: awwwards.com, bestfreefonts.com, getdesign.md(VoltAgent/awesome-design-md), gdweb.co.kr. 각 사이트를 어떻게 프롬프트에 연결하는지 한 줄씩.

### 스킬 정보 출처

2026-10-22 조사 결과(각 저장소 README, gh API)를 쓴다. 영상 요약과 다른 점은 README를 따른다.

- pstack: 명령 이름은 `/poteto-mode`(Potato 아님), 위치는 `cursor/plugins`의 pstack.
- Spec Kit: 명령 형식은 `/speckit-specify`. Claude Code 연동 옵션 값은 미확인이라 본문에서 설치 명령은 싣지 않고 저장소 링크만 건다.
- 별 수는 싣지 않는다 (금방 낡는다). "조사 기준일 2026-10" 한 줄만 둔다.

### 그림

- 이 사이트 스타일(DESIGN.md, 초록 기반, 둥근 모서리, 굵은 테두리)에 맞춘 새 그림. 참고 영상 그림을 따라 그리지 않는다.
- 필요한 그림 (초안, 빌더가 줄여도 됨):
  1. 4단계 흐름 그림 (요구사항, 설계, 구현, 검증 색 띠)
  2. 휴가 신청 예시 화면 (가짜 데이터)
  3. 단계별 장면 4장 (예: 요구사항 단계의 예외 질문 말풍선, 설계 단계의 설계안 비교, 구현 단계의 얇은 조각, 검증 단계의 체크리스트 2/3)
  4. 7개 스킬 x 4단계 비교 표 (그림이 아니라 HTML 표로 만든다)
- 도구: Codex CLI 0.161.0 (`image_generation` stable, 이 PC에 설치됨). 생성 결과는 `public/assets/img/skills-*.png` (또는 .jpg, 용량 300KB 이하 목표).
- 글자가 들어가는 그림은 한글이 깨질 수 있다. 깨지면 그림에서 글자를 빼고 HTML 캡션으로 처리한다.
- 인물 사진, 실제 로고(GitHub, Anthropic 등), 실제 개발자 얼굴은 그리지 않는다.

## 부록 C 삭제

- `content/courses/interactive-site/copilot.html` 삭제, `course.json`의 `chapters`에서 `copilot` 제거.
- `goal.html:33`의 부록 C 링크 문장 수정 (Copilot만 있는 사람 안내를 빼거나 1회차로 연결).
- `rea`의 장 번호를 D에서 C로 바꾼다.
- `public/assets/shots/c-vercel-drop.png`가 다른 곳에서 안 쓰이면 함께 삭제. 삭제 전 사용처를 확인한다.
- `_prompts/prompts.md`, `_prompts/shots.md` 다시 생성.

## 부록 REA 실습 3: SaaS 기능 하나 역공학해서 다시 만들기

(사용자 결정 2026-10-22: 별이 된 문장 대신 SaaS형 웹사이트를 대상으로 한다.)

- 대상 (내 추천): **Horilla HRMS** (github horilla/horilla-hr, LGPL-2.1). 공식 공개 데모 hr.demo.horilla.com, 계정 `admin/admin`을 데모 허브 페이지에 공식 게시. 가입 없이 접속 확인. 약관에 리버스 엔지니어링, 자동화 금지 조항 없음.
  - 분석 기능: 휴가 신청, 승인, 반려 흐름.
  - 학습 포인트: Django + HTMX라 서버가 JSON이 아니라 HTML 조각을 돌려준다. 네트워크 분석에서 이 점을 짚는다.
  - 2순위: OrangeHRM 공개 데모(GPL-3.0, REST API). 데모 계정은 실습 전에 직접 확인해야 한다.
  - 제외: IceHrm(데모 접속 오류), Frappe HR(공개 데모 없음), Twenty, Kanboard(공식 데모 없음 또는 가입 필요).
- 공용 데모 주의: 공유 계정이라 남의 데이터가 보이거나 바뀔 수 있다. 반복 캡처, 대량 요청은 최소로 하고, 실제 개인정보는 입력하지 않는다.
- DB (내 추천): **Neon** (Vercel Marketplace 연동). Vercel Postgres는 종료되어 Neon으로 넘어갔다. 카드 없이 무료, 프로젝트당 1GB, 5분 유휴 시 자동 정지. 연결하면 `DATABASE_URL`이 자동으로 들어간다.
  - Supabase는 1주일 쓰지 않으면 일시정지되어 대안으로만 소개.
- Vercel Hobby는 개인, 비상업 용도 전용이다. 개인 계정의 학습용 배포만 하고 회사 업무, 고객 시연에 쓰지 않는다고 본문에 적는다.

- 상황: 프롬프트만으로는 업무 시스템 기능이 원하는 대로 안 나온다. 잘 만든 SaaS의 기능 하나를 REA로 분석해 동작 규칙을 뽑고, 그 규칙으로 새로 만든다.
- 대상 조건: 오픈소스 라이선스, 공개 데모, 가능하면 인사시스템. 상용 SaaS는 대상으로 쓰지 않는다 (REA 장의 "하지 말아야 할 것"과 맞춤).
- 흐름: 데모 화면에서 기능 하나(예: 휴가 신청과 승인) 분석, 화면 흐름, 네트워크 호출, 추정 데이터 구조를 근거와 함께 정리, 원본 코드 복사 없이 새로 구현, Vercel에 배포, Vercel 마켓의 무료 DB 연결.
- 프롬프트 카드의 배포 주소는 예시(`https://my-leave-app.vercel.app`)로 채운다. 강사는 Vercel을 쓰지 않으므로 실제 배포 주소는 싣지 않는다.
- 강사(빌더)가 REA로 한 번 직접 돌려 실제로 뽑힌 규칙만 표로 싣는다.

## 정해진 것 (사용자 결정)

- 2회차만 수정, 1회차 유지.
- 부록 C 삭제.
- 개발 스킬 1개, UI 스킬 1개 설치 실습.
- 참고 영상을 장의 강의 흐름 뼈대로 쓴다. 그림은 새로 만든다.
- 공통 예시는 인사시스템, SaaS형 업무 시스템 개발.
- 그림은 GPT로 생성해도 된다.

## 내 판단 (사용자가 바꿀 수 있음)

- 새 장 위치: 본편 07장, `work` 다음.
- 대표 스킬: 개발 superpowers, UI frontend-design. 이유: 공식 마켓 한 줄 설치, 효과가 1분 안에 보임.
- 공통 예시 기능: 휴가 신청과 승인.
- 별 수 미표기.

## 빌더에게 맡기는 것

- 장 HTML의 세부 문장, 표 구성, 그림 개수 조정.
- 그림 프롬프트와 스타일 세부.
- 기존 부품(프롬프트 카드, callout, steps, table-wrap) 재사용 방식.

## 검토 뒤 정한 것 (사용자 결정)

- 실습 1, 2의 설치 전후 비교는 실제로 돌린 결과로 싣는다. 같은 요청을 스킬 없이, 스킬로 한 번씩 보내고 화면을 찍는다. `public/assets/shots/`에 넣고 `_prompts/shots.py`로 목록을 갱신한다. 이 PC에 이미 깔린 superpowers는 "설치 전" 촬영 동안만 끄고 다시 켠다.
- `PRODUCT.md`의 2회차 대상을 개발자로 고친다 (Users 줄 한 곳).
- 용어(TDD, 서브에이전트 등)는 짧은 설명을 붙여 그대로 쓴다. 필요한 것만 부록 B 용어집에 추가한다.

## 검토 뒤 정한 것 (내 판단)

- 4단계 색은 그림에만 쓴다. HTML은 기존 `table-wrap`, `callout`, `steps` 그대로 쓰고 CSS는 건드리지 않는다.
- 사내 프록시 대비: 실습 1, 2에 callout 하나만 둔다. "설치가 막히면 오류 문구를 그대로 Claude에 전달하고 강사에게 알린다" (REA 장의 인증서 오류 안내와 같은 방식). 별도 대체 설치 절은 만들지 않는다.
- 스킬 정보 원본은 아래 부록 표를 따른다. 빌더가 다시 조사하지 않는다.

## 부록: 스킬 조사 결과 (2026-10-22, 각 README 기준)

| 스킬 | 저장소 | Claude Code 설치 | 시작 |
|---|---|---|---|
| Superpowers | obra/superpowers | `/plugin install superpowers@claude-plugins-official` | 자동 (brainstorming) |
| Matt Pocock | mattpocock/skills | `claude plugin install mattpocock-skills@claude-plugins-official` 후 `/setup-matt-pocock-skills` | `/grill-me`, `/grill-with-docs` |
| Addy Osmani | addyosmani/agent-skills | `/plugin marketplace add addyosmani/agent-skills` 후 `/plugin install agent-skills@addy-agent-skills` (SSH 키 없으면 실패, README의 HTTPS 우회) | `/spec`, `/plan`, `/build` |
| gstack | garrytan/gstack | git clone 후 `./setup` (Bun 1.3.3 이상, Windows는 Node 추가, Chromium 다운로드) | `/office-hours` |
| Spec Kit | github/spec-kit | `uv tool install specify-cli` 후 `specify init` (Python 3.11, uv) | `/speckit-specify` |
| Feature Dev | anthropics/claude-code plugins/feature-dev | `/plugin install feature-dev@claude-plugins-official` | `/feature-dev <기능>` |
| pstack | cursor/plugins (pstack) | `/plugin marketplace add cursor/plugins` 후 `/plugin install pstack@cursor-plugins` | `/pstack:poteto-mode` |
| OpenSpec | Fission-AI/OpenSpec | `npm install -g @fission-ai/openspec@latest` 후 `openspec init` | `/opsx:propose` |
| Compound Engineering | EveryInc/compound-engineering-plugin | `/plugin marketplace add EveryInc/compound-engineering-plugin` 후 `/plugin install compound-engineering`, `/ce-setup` | `/ce-brainstorm` |

UI 스킬

| 스킬 | 저장소 | 설치 |
|---|---|---|
| frontend-design | anthropics/claude-plugins-official | `/plugin install frontend-design@claude-plugins-official` |
| impeccable | pbakaus/impeccable | `npx impeccable install` |
| ui-ux-pro-max | nextlevelbuilder/ui-ux-pro-max-skill | `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill` 후 `/plugin install ui-ux-pro-max@ui-ux-pro-max-skill` |
| taste-skill | Leonxlnx/taste-skill | `/plugin marketplace add Leonxlnx/taste-skill` 후 `/plugin install taste-skill@taste-skill` |

더 보기

| 스킬 | 저장소 | 설치 |
|---|---|---|
| diagram-design | cathrynlavery/diagram-design | `/plugin marketplace add cathrynlavery/diagram-design` 후 `/plugin install diagram-design@diagram-design` |
| archify | tt-a1i/archify | `npx skills add tt-a1i/archify -g` |
| graphify | Graphify-Labs/graphify | `uv tool install graphifyy` |
| hyperframes | heygen-com/hyperframes | `claude plugin marketplace add heygen-com/hyperframes` 후 `claude plugin install hyperframes@hyperframes` |
| ponytail | DietrichGebert/ponytail | `/plugin marketplace add DietrichGebert/ponytail` 후 `/plugin install ponytail@ponytail` |
| caveman | JuliusBrussee/caveman | `/plugin marketplace add JuliusBrussee/caveman` 후 `/plugin install caveman@caveman` |
| claude-mem | thedotmack/claude-mem | `npx claude-mem install` |
| humanize-korean | epoko77-ai/im-not-ai | `/plugin marketplace add epoko77-ai/im-not-ai` 후 `/plugin install humanize-korean@im-not-ai` |

## 확인이 필요한 위험

- 사내 프록시에서 `/plugin install`이 되는지 미확인. 수업 전 회사 PC에서 강사가 확인한다.
- superpowers는 설치 후 이후 실습에도 자동으로 끼어든다. 실습 2 전에 끌지 안내가 필요하다.
