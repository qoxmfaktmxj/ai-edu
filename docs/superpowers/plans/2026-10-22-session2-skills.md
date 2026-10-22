# 2회차 스킬 장 추가 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 2회차에 개발 스킬 장(07)을 추가하고, 부록 C를 지우고, REA 부록에 Horilla 휴가 기능 역공학 실습을 넣는다.

**Architecture:** 내용은 `content/courses/interactive-site/*.html` 조각과 `course.json`만 바꾼다. 화면 코드(`app/`, `lib/`, `components/`, CSS)는 건드리지 않는다. 그림은 Codex CLI로 생성해 `public/assets/img/`, 실제 실행 화면은 `public/assets/shots/`에 둔다.

**Tech Stack:** Next.js 16 정적 생성, Python 스크립트(`_prompts/*.py`), Codex CLI 0.161.0 (`image_generation`), Claude Code CLI(`claude -p`), REA MCP, ffmpeg.

**Spec:** `docs/superpowers/specs/2026-10-22-session2-skills-design.md`

## Global Constraints

- 금지 문자: U+00B7, U+2014, U+2013. 나열은 쉼표, 결합은 슬래시, 구분은 ASCII 하이픈.
- 공개 사이트에 회사 이름, 실제 고객사, 실제 개인정보 금지. 예시 데이터는 가짜(홍길동, 가상 회사)만.
- 참고 영상(scratchpad/yt)의 프레임, 그림, 문장을 사이트에 넣지 않는다. 출처 링크만 `https://youtu.be/nTwbveOwuS4`.
- 그림에 실제 로고, 실제 인물 얼굴 금지. 사이트 스타일(DESIGN.md: 초록 기반, 둥근 모서리, 굵은 테두리, 흰 배경).
- GitHub 별 수 미표기. "조사 기준일 2026-10" 한 줄.
- 기존 부품만 사용: `figure.prompt[data-title]`, `p.prompt-note`, `div.callout.(info|warn|danger)`, `ol.steps > li.step`, `div.table-wrap > table`, `figure.shot[data-shot]`, `div.examples > a.example`.
- 장 HTML 머리: `<section class="chapter" id="<id>"><header class="chapter-head"><span class="chapter-num">NN</span><h2>..</h2><p class="chapter-lead">..</p></header>`.
- 1회차(`content/courses/copilot-agent`) 무수정.

## Review Focus

- 다른 장에 남은 `/courses/interactive-site/copilot` 링크: 빌드는 되지만 404. 검증 grep으로 0건 확인 (Task 7).
- 금지 문자: 새 HTML, 새 MD 전체 grep 0건 (Task 7).
- 그림 속 한글 깨짐: 생성 후 직접 열어 보고, 깨졌으면 글자 없는 버전으로 재생성 (Task 2).
- 실습 화면에 개인정보(이메일, 계정명, 토큰, 경로의 사용자명) 노출: 촬영 후 확인, 보이면 자르거나 가림 (Task 3, 4).
- 프롬프트 카드 `data-title` 중복: 부록 A 자동 수집이 제목으로 묶임. `python _prompts/prompts.py export` 결과에서 새 제목이 한 번씩만 나오는지 확인 (Task 7).

---

### Task 1: 부록 C 삭제와 번호 정리

**Files:**
- Delete: `content/courses/interactive-site/copilot.html`
- Modify: `content/courses/interactive-site/course.json` (`chapters`에서 `copilot` 제거, `work` 다음에 `skills` 추가)
- Modify: `content/courses/interactive-site/goal.html:33` (부록 C 링크 문장 삭제. 문장 앞뒤 흐름만 맞춘다)
- Modify: `content/courses/interactive-site/rea.html:3` (`D` 를 `C`로)
- Modify: `PRODUCT.md` Users 줄: "2회차는 Claude Code로 개발 업무를 하는 개발자(사이트 만들기, 스킬, REA)"
- Maybe delete: `public/assets/shots/c-vercel-drop.png` (다른 파일에서 참조 0건일 때만)

- [ ] Step 1: `grep -rn "copilot\|c-vercel-drop" content/courses/interactive-site app lib components _prompts` 로 참조 목록 확보
- [ ] Step 2: 위 수정 적용. `skills.html`은 Task 5가 만든다. 그 전까지 빌드가 깨지지 않게 이 단계에서는 `course.json`에 `skills`를 넣지 않고 Task 5에서 넣는다.
- [ ] Step 3: 같은 grep 재실행. 기대: `copilot` 관련 0건 (1회차 폴더 제외)
- [ ] Step 4: Commit `Remove appendix C from session 2`

### Task 2: 그림 생성 (Codex CLI)

**Files:**
- Create: `public/assets/img/skills-stages.png` (4단계 흐름: 요구사항 파랑, 설계 초록, 구현 보라, 검증 주황 띠. 글자 없이 아이콘만)
- Create: `public/assets/img/skills-leave-app.png` (가상 휴가 신청 화면: 신청자 홍길동, 휴가 종류, 기간, 남은 연차, 승인자. 가짜 데이터)
- Create: `public/assets/img/skills-step-req.png`, `skills-step-design.png`, `skills-step-build.png`, `skills-step-verify.png` (각 단계 장면: 예외 질문 말풍선, 설계안 A/B/C 비교, 얇은 수직 조각 하나 완성, 체크리스트 2/3)

**Produces:** 위 6개 파일 경로 (Task 5가 `<img>`로 사용)

- [ ] Step 1: `codex exec` 로 한 장 시험 생성. 출력 위치와 형식 확인. 명령 형태는 `codex exec --skip-git-repo-check "<그림 지시>, save to <절대경로>"`. 안 되면 `codex exec --help`로 이미지 저장 방법 확인
- [ ] Step 2: 6장 생성. 지시문 공통: 흰 배경, 평면 일러스트, 둥근 카드, 굵은 외곽선, 메인 초록 #58cc02, 로고/실제 인물 금지, 한글이 필요하면 짧은 단어만
- [ ] Step 3: 각 파일을 열어 확인. 한글 깨지면 글자 없이 재생성. 1600px 이하로 줄이고 300KB 이하로 압축 (`ffmpeg -i in.png -vf scale=1280:-1 out.png` 또는 jpg 변환. jpg로 바꾸면 이름 확장자도 Task 5에 알림)
- [ ] Step 4: Commit `Add skill chapter illustrations`

### Task 3: 실습 1 실제 실행 (superpowers 전후)

**Files:**
- Create: `public/assets/shots/07-superpowers-before.png`, `07-superpowers-after.png`
- Create (scratchpad, 저장소 밖): 실행 기록 `before.txt`, `after.txt`

**Produces:** 두 PNG + 각 응답의 실제 발췌 2~4줄 (Task 5가 인용)

- [ ] Step 1: scratchpad에 빈 폴더 `lab-sp`. `claude --help`로 플러그인, 훅을 끄는 옵션 확인 (`--bare`, `--settings`, `--plugin-dir`, 프로젝트 `.claude/settings.json`의 `enabledPlugins`). caveman, ponytail, claude-mem 등 다른 플러그인 영향도 같이 끈다. "설치 전"은 모든 플러그인 끔, "설치 후"는 superpowers만 켬
- [ ] Step 2: 두 상태에서 같은 요청 실행: `claude -p "사내 인사시스템에 휴가 신청 화면 만들어 줘"` (권한 프롬프트로 멈추지 않게 파일 쓰기는 허용하지 않는 기본 모드). 출력 저장
- [ ] Step 3: 기대: before는 바로 코드/계획, after는 brainstorming 질문이 먼저. 다르게 나오면 그대로 기록하고 사용자에게 보고 (결과를 꾸미지 않는다)
- [ ] Step 4: 촬영: Windows Terminal 대화형 실행 화면을 찍을 수 없으면, 실제 출력 텍스트를 그대로 실은 HTML(터미널 모양 장식 없이 흰 상자)로 렌더해 `capture_web_screenshot`으로 PNG. 사용자 이름, 경로 가림
- [ ] Step 5: 이 PC의 플러그인 설정이 원래대로인지 확인 (`claude plugin list`). Commit `Add superpowers before/after shots`

### Task 4: 실습 2 실제 실행 (frontend-design 전후)

**Files:**
- Create: `public/assets/shots/07-frontend-before.png`, `07-frontend-after.png`

- [ ] Step 1: scratchpad `lab-fd-before`, `lab-fd-after` 빈 폴더. Task 3과 같은 방식으로 before는 플러그인 모두 끔, after는 frontend-design만 켬 (없으면 `claude plugin install frontend-design@claude-plugins-official`, 끝나고 원래 상태로)
- [ ] Step 2: 같은 요청: `claude -p --permission-mode acceptEdits "휴가 신청 화면을 index.html 하나로 만들어 줘. 가짜 데이터만 써. 외부 CDN 쓰지 마."`
- [ ] Step 3: 두 index.html을 브라우저로 열어 1280x800 스크린샷
- [ ] Step 4: Commit `Add frontend-design before/after shots`

### Task 5: 새 장 `skills.html`

**Files:**
- Create: `content/courses/interactive-site/skills.html` (`id="skills"`, `chapter-num` `07`, 제목 "스킬로 일하는 법")
- Modify: `content/courses/interactive-site/course.json` (`work` 다음에 `skills`)
- Modify: `content/courses/interactive-site/glossary.html` (스킬, 플러그인, 마켓플레이스, TDD, 서브에이전트, 명세 주도 개발 중 없는 것만 추가)

**Consumes:** Task 2 그림 경로, Task 3, 4 PNG 이름과 실제 응답 발췌, 스펙 부록의 스킬 표

- [ ] Step 1: 절 순서는 스펙 "강의 흐름" 1~12 그대로. 단계 절마다 해당 `skills-step-*.png` 1장, 휴가 신청 예시로 각 스킬의 접근을 2~4줄씩
- [ ] Step 2: 7 x 4 비교 표는 `table-wrap` HTML 표. 열: 스킬, 시작 명령, 요구사항, 설계, 구현, 검증, 설치 부담
- [ ] Step 3: 실습 1, 2는 `ol.steps` + 프롬프트 카드(`data-title`: "스킬 실습: superpowers 설치", "스킬 실습: frontend-design 비교") + `figure.shot` 2개씩 + 실제 응답 발췌 + 프록시 callout(warn) + superpowers 끄는 법, `SUPERPOWERS_DISABLE_TELEMETRY`
- [ ] Step 4: 더 보기 표(스펙 부록 "더 보기"), 디자인 레퍼런스 4곳(awwwards.com, bestfreefonts.com, getdesign.md, gdweb.co.kr)과 프롬프트 연결 한 줄씩
- [ ] Step 5: 출처 줄: 흐름 참고 영상 링크, 조사 기준일 2026-10
- [ ] Step 6: `npm run build` 통과, `npm run dev` 후 `/courses/interactive-site/skills` 열어 그림, 표, 카드 확인
- [ ] Step 7: Commit `Add chapter 07 on coding skills`

### Task 6: REA 실습 3 (Horilla 휴가 기능)

**Files:**
- Modify: `content/courses/interactive-site/rea.html` (실습 2 완성 예시 뒤, "잘 쓰는 법" 앞에 `<h3>실습 3. ...</h3>` 절)

- [ ] Step 1: REA로 hr.demo.horilla.com(`admin/admin`) 휴가 신청, 승인, 반려 흐름 분석. 요청 수 최소. 데모 데이터는 바꾸지 않는다(신청 생성 금지, 관찰만). 확인할 것: 화면 순서, 요청 URL과 메서드, 응답 형식(HTML 조각 여부), 상태 값, 화면에서 추정되는 데이터 항목(직원, 휴가 종류, 기간, 남은 일수, 승인자). 근거/추론/미확인 구분
- [ ] Step 2: 실습 절 작성: 상황 설명, 대상과 라이선스, 공용 데모 주의 callout(warn), 프롬프트 카드(`data-title` "REA 실습: SaaS 휴가 기능 역공학") 분석 + 새로 구현(Next.js) + Vercel 배포 + Neon 연결, 예시 주소 `https://my-leave-app.vercel.app`, Hobby 비상업 callout(warn), 확인된 결과 표
- [ ] Step 3: 실행이 막히면(데모 다운, 로그인 실패) 사실대로 사용자에게 보고하고 OrangeHRM 2순위 확인
- [ ] Step 4: Commit `Add REA lab 3 on a SaaS leave feature`

### Task 7: 전체 검증

- [ ] Step 1: `npm run build` 성공
- [ ] Step 2: 금지 문자 0건: `grep -rnP "[\x{00B7}\x{2014}\x{2013}]" content/courses/interactive-site PRODUCT.md docs/superpowers`
- [ ] Step 3: `grep -rn "interactive-site/copilot" content app lib components` 0건
- [ ] Step 4: `python _prompts/prompts.py export`, `python _prompts/shots.py` 실행. 새 프롬프트 제목 각 1회, 새 shot 4개 "완료"
- [ ] Step 5: Commit `Refresh prompt and shot lists`
