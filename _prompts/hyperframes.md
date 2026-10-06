# hyperframes 프롬프트 다시 쓰기 요청

## 부탁드리는 일
아래 프롬프트 13개를 더 길고, 더 구체적이고, 결과가 안정적으로 나오게 다시 써 주세요.
이 프롬프트들은 사내 AI 교육 사이트에 "복사 버튼이 달린 카드"로 실립니다. 수강생은 카드를 복사해 Claude 데스크톱 앱의 Code 탭(Claude Code)에 그대로 붙여 넣습니다.

## 수강생과 상황
- 코딩 경험이 없는 사무직 직장인. Windows PC가 대부분입니다.
- 앞 장에서 이미 끝낸 것: Claude 데스크톱 앱과 Claude Code 설치, Git for Windows와 Node.js 설치, GitHub 저장소 `ai-site`를 문서 폴더에 내려받기(clone), Vercel 연결, 스킬 설치(hyperframes 포함).
- 수강생 사이트는 HTML, CSS, JavaScript 파일만 쓰는 정적 사이트입니다(빌드 도구 없음, DB 없음). GitHub에 올리면 Vercel이 자동으로 다시 배포합니다.
- 8장 목표: hyperframes로 내 사이트를 소개하는 짧은 모션 영상(MP4)을 만들고, 사이트 첫 화면에 넣고, 배포까지 합니다.

## 사실 정보 (이대로 써 주세요, 추측 금지)
- hyperframes: HTML, CSS, GSAP 애니메이션으로 장면을 쓰고 헤드리스 Chrome으로 MP4를 렌더하는 오픈소스 도구(heygen-com/hyperframes).
- 필요 조건: Node.js 22 이상, FFmpeg.
- Claude Code에서 부르는 이름(플러그인 스킬): `/hyperframes:hyperframes`(무엇을 만들지 상담하고 알맞은 작업 흐름으로 안내), `/hyperframes:motion-graphics`(10초 안팎의 짧은 모션그래픽), `/hyperframes:product-launch-video`(사이트 소개, 홍보 영상), `/hyperframes:general-video`(여러 장면, 긴 영상).
- 명령: `npx hyperframes init [이름]`, `npx hyperframes preview`(브라우저 미리보기), `npx hyperframes lint`(검사), `npx hyperframes render -o [파일.mp4]`(렌더, `--quality draft`로 빠른 시험 렌더 가능), `npx hyperframes add data-chart`(카탈로그 블록 추가).
- 사이트에 넣을 때: `<video autoplay muted loop playsinline>`. GitHub는 파일 하나당 100MB를 넘으면 올라가지 않으므로 영상은 몇 MB 이내로 압축(FFmpeg, H.264).

## 쓰는 규칙
1. `###` 줄(프롬프트 이름)은 한 글자도 바꾸지 마세요. 이 이름으로 사이트의 자리를 찾습니다.
2. 고칠 곳은 ```text 와 ``` 사이뿐입니다. 결과도 이 파일과 똑같은 형식으로 돌려주세요.
3. 수강생이 자기 내용으로 바꿔 넣을 곳은 `[대괄호]`로 표시합니다. 예: `[내 사이트 주제]`.
4. 각 프롬프트에 들어가면 좋은 것: 목적 한 줄, 구체적인 조건(길이, 크기, 분위기 등), 진행 순서, 하지 말아야 할 것, 끝나고 확인할 것, "결과를 초보자도 알 수 있게 쉬운 한국어로 요약해줘".
5. 지금의 말투(Claude에게 "~해줘")를 유지해 주세요. 길이는 프롬프트마다 10~25줄 정도.
6. 가운뎃점, em dash, en dash(긴 줄표 두 종류), 이모지는 쓰지 마세요. 실존 인물, 회사 정보, 개인정보도 넣지 마세요.
7. 비밀번호나 토큰을 요구하는 내용, 확인 없이 파일을 지우는 내용은 넣지 마세요.

---
## 05 디자인, 모션 스킬 설치

### 디자인, 모션 스킬 4가지 한 번에 설치
```text
Claude Code와 Codex 둘 다에서 쓸 수 있게 아래 4가지를 내 PC 전체(전역, 사용자 범위)에 설치해줘.
출처는 아래에 적은 곳만 쓰고, 이름이 비슷한 다른 저장소는 설치하지 마.

1) design-taste-frontend 스킬
   - 출처: GitHub Leonxlnx/taste-skill 안의 design-taste-frontend (이 저장소의 다른 스킬은 설치하지 마)
   - npx skills add 로 설치하고, 대상은 claude-code 와 codex 둘 다

2) impeccable 스킬
   - 출처: GitHub pbakaus/impeccable
   - npx skills add 로 설치하고, 대상은 claude-code 와 codex 둘 다
   - 이 방법이 안 되면 저장소 설명서의 설치 방법을 알려줘

3) ui-ux-pro-max 플러그인
   - Claude Code: 플러그인 마켓플레이스 nextlevelbuilder/ui-ux-pro-max-skill 을 등록한 뒤 ui-ux-pro-max 플러그인 설치
   - Codex: 저장소 설명서의 설치 도구 ui-ux-pro-max-cli 를 npx 로 실행해서 내 PC 전체(전역)에 설치 (npx ui-ux-pro-max-cli init --ai universal --global, Codex가 읽는 ~/.agents/skills 폴더에 들어감). 이 방법이 안 되면 저장소 설명서의 방법을 알려줘

4) hyperframes
   - 출처: GitHub heygen-com/hyperframes
   - Claude Code: 플러그인 마켓플레이스 heygen-com/hyperframes 를 등록한 뒤 hyperframes 플러그인 설치
   - Codex: 선택창 없이 핵심 스킬 묶음만 전역 설치 (npx hyperframes skills update). 이 방법이 안 되면 방법만 알려줘

진행 방법:
- 먼저 node 와 npx 가 있는지 확인하고, 없으면 설치하지 말고 나한테 알려줘.
- 명령을 실행하기 전에 무엇을 하는 명령인지 한 줄로 먼저 설명해줘.
- 확인 질문이나 선택창 때문에 멈추는 명령은 확인을 건너뛰는 옵션(-y)을 붙여서 실행해줘.
- 하나 설치할 때마다 성공했는지 확인하고, 실패하면 오류 문구를 그대로 보여줘.
- 마지막에 4가지 각각 "어느 프로그램의 어느 폴더에 설치됐는지"와 "부르는 이름"을 표로 정리해줘.
- 설치가 끝나면 새 세션을 시작해야 하는지도 알려줘.
```

### 설치된 스킬 목록 확인
```text
설치된 스킬 목록 보여줘. design-taste-frontend, impeccable, ui-ux-pro-max, hyperframes 이 4가지가 있는지 하나씩 확인해서 있음/없음으로 알려줘.
```

### 영상 종류 상담 (hyperframes)
```text
/hyperframes:hyperframes
[내 주제]를 소개하는 10초짜리 영상을 만들려고 해. 아직 만들지 말고, 어떤 종류의 영상 스킬로 진행하면 좋을지 알려주고 먼저 필요한 정보를 질문해줘.
```

## 08 hyperframes로 모션 영상 만들기

### 영상 제작 준비물 확인과 설치 부탁
```text
내 PC에서 hyperframes로 영상을 만들 준비가 됐는지 확인해줘.
1) Node.js 22 이상, FFmpeg 가 설치돼 있는지 버전까지 확인
2) 없거나 버전이 낮으면 내 운영체제(Windows 또는 Mac)에 맞는 설치 방법을 알려주고, 내가 허락하면 설치까지 진행
3) 설치 후 새 터미널에서도 두 명령이 잘 잡히는지(PATH) 확인하고, 마지막에 npx hyperframes doctor 결과를 쉬운 말로 설명
설치는 한 단계씩 진행하고, 명령을 실행하기 전에 무엇을 하는 명령인지 먼저 말해줘.
```

### 10초 소개 영상 만들기 (motion-graphics)
```text
/hyperframes:motion-graphics
내 [주제] 사이트를 소개하는 10초 영상을 만들어줘.
- 제목이 부드럽게 등장
- 핵심 장면 3개 (각 2~3초): [장면 1], [장면 2], [장면 3]
- 마지막에 사이트 주소 [내 주소]
- 분위기: [예: 밝고 경쾌하게]
- 화면은 가로 16:9
영상 작업 파일은 내 사이트 폴더 바로 옆에 my-video 폴더를 새로 만들어서 거기서 작업해줘. 사이트 폴더 안에는 만들지 마.
질문은 꼭 필요한 것만 하고, 정해지지 않은 부분은 네가 어울리게 정해서 진행해줘.
```

### 영상 한 군데만 고치기
```text
장면 2의 글자가 너무 빨리 지나가. 장면 2를 3초에서 4초로 늘리고, 글자가 나타나는 속도만 조금 느리게 해줘.
장면 1과 장면 3은 지금 그대로 두고 건드리지 마.
고친 뒤 미리보기에서 처음부터 끝까지 다시 확인할 수 있게 해줘.
```

### 영상을 MP4로 렌더하기
```text
지금 영상을 draft 품질로 렌더해서 renders 폴더에 저장해줘. 렌더 전에 lint 와 check 로 문제가 없는지 먼저 확인해줘. 끝나면 파일 경로, 영상 길이, 파일 크기를 알려줘.
```

### 렌더한 영상을 사이트 첫 화면에 넣기
```text
my-video/renders 폴더의 [파일 이름].mp4 영상을 내 사이트 첫 화면에 넣어줘.
- 영상 파일은 내 사이트 폴더의 assets/video/ 안에 intro.mp4 라는 이름으로 복사
- video 태그에 autoplay muted loop playsinline 을 모두 넣어서, 소리 없이 자동으로 반복 재생되게 해줘
- 영상이 로딩되기 전에 보일 대표 이미지(poster)도 영상 첫 장면으로 한 장 만들어서 같이 넣어줘
- 파일 크기를 가능하면 5MB 이하, 최대 10MB 이하로 줄여줘. FFmpeg로 해상도와 화질을 낮춰도 되는데, 줄이기 전과 후의 크기를 알려줘
- 휴대폰 화면 폭에서도 영상이 잘리지 않게 확인해줘
- 운영체제의 "움직임 줄이기" 설정을 켠 사람에게는 자동 재생을 끄고 재생 버튼을 보여줘
끝나면 내가 확인할 방법을 알려줘.
```

### 영상 포함해서 GitHub에 올리고 배포
```text
영상이 들어간 변경 사항을 GitHub에 올려서 Vercel에 배포해줘.
1) 올리기 전에 git status 로 어떤 파일이 바뀌었는지 보여주고, 영상 파일 크기도 알려줘. 100MB를 넘는 파일이 있으면 올리지 말고 먼저 알려줘.
2) 커밋 메시지는 "첫 화면에 소개 영상 추가"로 하고 push 해줘.
3) Vercel 배포가 끝나면 내 사이트 주소를 알려주고, 그 주소에서 영상이 잘 나오는지 내가 확인할 방법을 알려줘.
```

### 카탈로그 블록으로 숫자 그래프 넣기
```text
hyperframes 카탈로그의 data-chart 블록을 써서 장면 2에 막대 그래프를 넣어줘.
숫자는 연습용 가짜 값으로 월별 [1월 120, 2월 180, 3월 260]을 쓰고, 그래프가 차례로 올라오게 해줘.
블록이 15초짜리라서 내 영상 길이(10초)에 맞게 줄여줘. 장면 1과 3은 건드리지 마.
```

## 09 완성 기준과 발표

### 소개 영상 만들기
```text
/hyperframes:motion-graphics
제 사이트를 소개하는 짧은 영상을 10초 안팎으로 만들어 주세요.
- 소재: [내 소재]
- 분위기: [차분하고 고급스럽게 / 밝고 발랄하게]
- 제목 문구: [영상에 크게 나올 한 줄]
- 가로로 긴 16:9 화면으로 만들고, 소리는 넣지 마세요.
```

## 10 막혔을 때

### 스킬 설치 상태 점검
```text
제가 설치한 스킬이 / 목록에 안 보여요. 아래를 확인해 주세요.
1) 지금 이 세션에서 사용할 수 있는 스킬 목록에 design-taste-frontend, impeccable, ui-ux-pro-max, hyperframes 가 있는지
2) 내 PC의 .claude\skills 와 .agents\skills 폴더에 이 스킬들이 설치되어 있는지 (읽기만 하세요)
3) claude plugin list 의 결과
빠진 것이 있으면 어떤 방법으로 설치하면 되는지 알려 주고, 설치 전에 제 확인을 받아 주세요. 설치가 끝나면 새 세션을 시작해야 하는지도 알려 주세요.
```

### hyperframes 렌더 실패 점검
```text
hyperframes 렌더가 실패했어요. 메시지는 이렇습니다: [에러 메시지 전체]
1) npx hyperframes doctor, node --version, ffmpeg -version 을 실행해서 결과를 쉬운 말로 설명해 주세요. (읽기만 하는 명령입니다)
2) 부족한 것(Node.js 22 이상, FFmpeg, 브라우저)이 있다면 무엇을 어떻게 설치할지 알려 주고, 설치하기 전에 제 확인을 받아 주세요.
3) npx hyperframes lint 로 영상 구성 파일에 문제가 있는지도 확인해 주세요.
4) 모두 해결되면 같은 명령으로 렌더를 다시 시도해 주세요.
```
