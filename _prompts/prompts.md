# 프롬프트 모음 (편집용)

- `###` 줄은 프롬프트 이름입니다. 바꾸지 마세요. 이 이름으로 사이트의 자리를 찾습니다.
- 고칠 곳은 ```text 와 ``` 사이뿐입니다. 줄바꿈은 그대로 사이트에 나옵니다.
- [대괄호]는 수강생이 자기 내용으로 바꿔 넣는 자리입니다.
- 가운뎃점, em dash, en dash는 반영할 때 자동으로 쉼표와 하이픈으로 바뀝니다.

## 02 설치와 GitHub 준비, Claude Code 설치

### GitHub CLI 설치 부탁
```text
GitHub CLI(gh)를 설치해줘.
1) 먼저 git --version 으로 Git이 설치되어 있는지 확인하고, 없으면 winget install --id Git.Git -e 로 설치해줘.
2) 그다음 winget install --id GitHub.cli 로 GitHub CLI를 설치해줘.
3) 설치가 끝나면 gh --version 결과를 보여줘.
로그인은 내가 직접 할 거라서 gh auth login 은 실행하지 마. 내 허락이 필요한 단계가 나오면 무엇을 허락하는 건지 먼저 설명해줘.
```

### Claude Code와 Node.js 설치 부탁
```text
Claude Code와 Node.js를 이 PC에 설치해줘.
1. Claude Code가 이미 있는지 확인하고, 없으면 Anthropic 공식 문서의 네이티브 설치 방법으로 설치해줘. 다른 사이트의 설치 방법은 쓰지 마.
2. 설치 후 cmd, PowerShell, Mac 터미널 어디서든 claude 라고만 입력하면 실행되도록 PATH를 확인하고, 빠져 있으면 내 계정 범위에서만 추가해줘.
3. Node.js가 없거나 22 미만이면 LTS 버전으로 설치해줘. Windows는 winget(OpenJS.NodeJS.LTS)으로, Mac은 nodejs.org 설치 파일을 내가 직접 설치하는 방법을 순서대로 알려줘. 이미 충분하면 설치하지 말고 알려만 줘.
4. 관리자 권한이 필요한 작업이나 다른 설정 변경, Homebrew 같은 새 도구 설치는 하지 마.
5. 각 단계 전에 무엇을 할지 한 줄로 알려주고, 마지막에 설치한 것과 버전을 쉬운 한국어로 정리해줘.
```

### 막혔을 때 원인 찾기 (2장)
```text
[몇 번째 단계, 예: Git 설치 / git clone / 폴더 열기 / Claude Code 설치]에서 막혔어요.
나온 오류 문구나 화면은 아래와 같아요.
[오류 문구를 그대로 붙여넣기]
내 PC 상태를 먼저 확인해서 원인을 쉬운 말로 설명해줘. 해결 방법은 한 단계씩 알려주고, 내 PC를 바꾸는 작업은 하기 전에 무엇을 할지 먼저 알려줘.
```

### 2장 준비 상태 확인
```text
이 PC의 준비 상태를 확인해줘. 파일은 아무것도 바꾸거나 올리지 말고 확인만 해줘.
1. Git이 설치되어 있고, git config 에 user.name 과 user.email 이 설정되어 있는지
2. 지금 폴더가 ai-site 이고 GitHub 저장소와 연결되어 있는지 (git remote -v 와 git ls-remote origin 이 오류 없이 끝나는지)
3. Claude Code 설치 여부 (claude --version, PATH에 없으면 전체 경로로)
4. Node.js 22 이상이 설치되어 있는지 (node --version)
각 항목을 O 또는 X로 표로 정리해줘. X가 있으면 원인과 해결 방법을 알려주고, 모두 O이면 "준비 완료"라고 답해줘.
```

## 03 Vercel 가입과 첫 배포

### 첫 사이트 index.html 만들고 올리기
```text
ai-site 폴더에 index.html 파일 하나로 첫 사이트를 만들어줘.
- 화면 가운데에 큰 제목 "[내 이름 또는 닉네임]의 첫 사이트"와 한 줄 소개 문장
- 배경색은 [좋아하는 색], 글자는 읽기 편한 크기
- 휴대폰 화면에서도 깨지지 않게 (반응형)
- 버튼 하나를 누르면 인사말 문구가 바뀌는 간단한 동작
만든 다음 내 PC의 브라우저에서 열어 볼 수 있게 열어줘. 내가 확인하고 괜찮다고 하면, GitHub 저장소 ai-site 의 main 브랜치에 올려줘.
회사 자료나 개인정보는 파일에 넣지 마.
```

### 제목 바꾸고 GitHub에 올리기
```text
ai-site 의 index.html 에서 큰 제목을 "[새 제목]" 으로 바꿔줘.
바꾼 뒤에 변경 내용을 "제목 변경" 이라는 메시지로 저장(commit)하고, GitHub 의 main 브랜치에 올려줘(push).
올린 다음 어떤 파일이 바뀌었는지 한 줄로 알려줘.
```

### 미리보기 브랜치로 올려 보기
```text
ai-site 에서 new-title 이라는 새 브랜치를 만들어줘.
그 브랜치에서 index.html 의 큰 제목을 "[시험용 제목]" 으로 바꾸고 commit 한 뒤, GitHub 에 new-title 브랜치로 올려줘.
main 브랜치에는 합치지 말고, 올린 뒤 브랜치 이름을 알려줘.
```

### Vercel CLI 설치 부탁
```text
Vercel CLI를 설치해줘.
먼저 node --version 으로 Node.js가 설치되어 있는지 확인하고, 없으면 설치 방법을 알려줘.
있다면 npm i -g vercel 로 전역 설치하고, 끝나면 vercel --version 결과를 보여줘.
로그인(vercel login)은 내가 직접 할 테니 실행하지 마.
```

### Vercel CLI로 배포 부탁
```text
vercel login 을 마쳤어. ai-site 폴더에서 Vercel CLI로 배포해줘.
처음 배포라서 프로젝트 연결 질문이 나올 거야. 프로젝트 이름은 ai-site 로 하고, 기본값으로 진행하되 어떤 질문이 나왔고 무엇으로 답했는지 알려줘.
먼저 미리보기 배포를 하고, 내가 확인하면 vercel --prod 로 실제 주소(Production)에 배포해줘. 끝나면 주소를 알려줘.
```

### 막혔을 때 원인 찾기 (3장)
```text
[몇 번째 단계, 예: Import 목록에 ai-site가 안 보임 / Deploy가 Error / 주소가 404 / 고쳤는데 사이트가 그대로]에서 막혔어요.
나온 오류 문구나 화면은 아래와 같아요.
[오류 문구나 Build Logs를 그대로 붙여넣기]
ai-site 폴더의 index.html 위치와 GitHub main 브랜치 반영 상태를 먼저 확인해서 원인을 쉬운 말로 설명해줘. 해결 방법은 한 단계씩 알려주고, 파일을 바꾸거나 GitHub에 올리는 작업은 하기 전에 무엇을 할지 먼저 알려줘.
```

### 3장 완료 확인
```text
내 Vercel 사이트 주소는 [https://프로젝트이름.vercel.app] 이야. 3장 결과물을 확인해줘. 파일은 아무것도 바꾸거나 올리지 말고 확인만 해줘.
1. ai-site 폴더에 index.html 이 있는지
2. index.html 이 GitHub 저장소 ai-site 의 main 브랜치에 올라가 있고, 로컬과 같은 내용인지 (git status, git ls-remote origin 등)
3. 내가 알려준 Vercel 주소가 열리는지 (curl 로 응답 코드 200 과 내용 확인)
4. 저장소가 Vercel 프로젝트에 연결되어 main 에 올리면 자동으로 재배포되는 구조인지 (확인할 수 있는 범위에서, 어려우면 내가 Vercel 화면에서 볼 위치를 알려줘)
각 항목을 O 또는 X로 표로 정리해줘. X가 있으면 원인과 해결 방법을 알려주고, 모두 O이면 "완료"라고 답해줘.
```

## 04 디자인, 모션 스킬 설치

### 디자인, 모션 스킬 4가지 한 번에 설치
```text
Claude Code에서 쓸 수 있게 아래 4가지를 내 PC 전체(전역, 사용자 범위)에 설치해줘.
출처는 아래에 적은 곳만 쓰고, 이름이 비슷한 다른 저장소는 설치하지 마.

1) design-taste-frontend 스킬
   - 출처: GitHub Leonxlnx/taste-skill 안의 design-taste-frontend (이 저장소의 다른 스킬은 설치하지 마)
   - npx skills add 로 설치하고, 대상은 claude-code

2) impeccable 스킬
   - 출처: GitHub pbakaus/impeccable
   - npx skills add 로 설치하고, 대상은 claude-code
   - 이 방법이 안 되면 저장소 설명서의 설치 방법을 알려줘

3) ui-ux-pro-max 플러그인
   - 플러그인 마켓플레이스 nextlevelbuilder/ui-ux-pro-max-skill 을 등록한 뒤 ui-ux-pro-max 플러그인 설치

4) hyperframes
   - 출처: GitHub heygen-com/hyperframes
   - 플러그인 마켓플레이스 heygen-com/hyperframes 를 등록한 뒤 hyperframes 플러그인 설치

진행 방법:
- 먼저 node 와 npx 가 있는지 확인하고, 없으면 설치하지 말고 나한테 알려줘.
- 명령을 실행하기 전에 무엇을 하는 명령인지 한 줄로 먼저 설명해줘.
- 확인 질문이나 선택창 때문에 멈추는 명령은 확인을 건너뛰는 옵션(-y)을 붙여서 실행해줘.
- 하나 설치할 때마다 성공했는지 확인하고, 실패하면 오류 문구를 그대로 보여줘.
- 마지막에 4가지 각각 "어느 폴더에 설치됐는지"와 "부르는 이름"을 표로 정리해줘.
- 설치가 끝나면 새 세션을 시작해야 하는지도 알려줘.
```

### 설치 실패 항목만 다시
```text
방금 설치에서 [실패한 항목 이름] 이 실패했어. 오류 문구를 쉬운 말로 설명해주고, 같은 출처로 다시 설치해줘. 성공한 항목은 건드리지 마.
```

### 설치된 스킬 목록 확인
```text
설치된 스킬 목록 보여줘. design-taste-frontend, impeccable, ui-ux-pro-max, hyperframes 이 4가지가 있는지 하나씩 확인해서 있음/없음으로 알려줘.
```

### 디자인 방향 제안 받기 (design-taste-frontend)
```text
/design-taste-frontend
[내 주제] 소개 사이트를 만들려고 해. 코드는 아직 만들지 말고, 어울리는 디자인 방향을 서로 많이 다른 3가지로 제안해줘.
각 방향마다 분위기, 색, 글자 느낌을 한 줄씩 적고, 흔한 AI 디자인처럼 보이지 않으려면 무엇을 피해야 하는지도 알려줘.
```

### 화면 비평 받기 (impeccable)
```text
/impeccable critique
지금 만들어 둔 첫 화면(index.html)을 디자인 관점에서 비평해줘. 잘된 점 2개, 고칠 점 3개를 중요한 순서로 알려주고, 내가 고치라고 할 때까지 파일은 바꾸지 마.
```

### 색과 글꼴 추천 받기 (ui-ux-pro-max)
```text
/ui-ux-pro-max:ui-ux-pro-max
[내 주제] 소개 사이트에 어울리는 색 팔레트 3개와 글꼴 조합 2개를 추천해줘. 각각 어떤 분위기인지 한 줄로 설명하고, 글자가 배경 위에서 잘 읽히는지(대비)도 확인해줘.
```

### 영상 종류 상담 (hyperframes)
```text
/hyperframes:hyperframes
[내 주제]를 소개하는 10초짜리 영상을 만들려고 해. 아직 만들지 말고, 어떤 종류의 영상 스킬로 진행하면 좋을지 알려주고 먼저 필요한 정보를 질문해줘.
```

### 막혔을 때 원인 찾기 (4장)
```text
[몇 번째 단계, 예: npx 실행 / 스킬 설치 / 플러그인 설치 / 목록 확인]에서 막혔어요.
나온 오류 문구나 화면은 아래와 같아요.
[오류 문구를 그대로 붙여넣기]
내 PC 상태를 먼저 확인해서 원인을 쉬운 말로 설명해줘. 해결 방법은 한 단계씩 알려주고, 내 PC를 바꾸는 작업은 하기 전에 무엇을 할지 먼저 알려줘.
```

### 4장 완료 확인
```text
디자인, 모션 스킬 설치 상태를 확인해줘. 파일은 아무것도 바꾸거나 설치하거나 올리지 말고 확인만 해줘.
1. design-taste-frontend, impeccable, ui-ux-pro-max, hyperframes 4가지가 이 세션의 스킬 목록에 각각 보이는지, 어느 폴더에 설치되어 있는지
2. node 와 npx 가 동작하는지 (node --version, npx --version)
각 항목을 O 또는 X로 표로 정리해줘. X가 있으면 원인과 해결 방법을 알려주고, 모두 O이면 "완료"라고 답해줘.
```

## 05 주제 고르기: 6개 후보

### 주제 1 첫 프롬프트
```text
# 스크롤로 내려가는 심해 탐험 - 연출 우선 프롬프트 (AI 이미지판)

너는 해양 다큐멘터리의 타이틀 시퀀스를 만드는 모션 디자이너이자 프런트엔드 개발자다.
수면에서 4,000m 아래까지 내려가며 여섯 생명을 만나는 심해 탐험 사이트를 만들어라.
제목은 "빛을 만드는 바다.", 부제는 "수면에서 4,000m까지, 여섯 생명을 만나러 내려갑니다."

## 1. 사용자가 느껴야 할 것

- 페이지를 열자마자 "와" 하는 순간이 있다. 약 12초짜리 오프닝 모션이 자동으로 재생된다.
- 스크롤할 때마다 바다가 살아 있다. 멈춰 있어도 해양설이 흐르고, 생물은 헤엄치고, 빛은 일렁인다.
- 깊이마다 직접 해 보는 행동이 하나씩 있다. 누르고, 비추고, 바꿔 보면 생물이 반응한다.
- 마지막에는 조용한 어둠 속에서 덤보문어와 마주하며 끝난다.

## 2. 그림: 이미지 생성 도구로 만든다

그림 품질이 이 사이트의 절반이다. 도형으로 그린 생물은 쓰지 않는다.
이미지 생성 도구(예: Figma MCP의 generate_image)로 아래 7장을 만든다(정어리 떼는 수면 사진 안에 함께 그린다).

- 수면 바로 아래: 청록빛 물, 위에서 쏟아지는 빛줄기, 소용돌이치는 정어리 떼. 가로형. (오프닝 마지막과 햇빛층에 함께 쓴다)
- 박명층 배경: 위에서 아주 희미한 빛, 짙은 남색, 해양설만 있는 빈 바다. 가로형.
- 생물 5장: 샛비늘치 무리(배 쪽에 줄지은 청록 발광점), 아톨라해파리(붉은 원반 몸, 홈이 있는 고리, 긴 촉수 하나), 초롱아귀(검은 둥근 몸, 빛나는 미끼), 펠리칸장어(작은 머리, 주머니처럼 큰 턱, 아주 긴 꼬리 끝의 작은 발광기관), 덤보문어(귀 같은 지느러미, 막으로 이어진 짧은 팔).

생성 규칙:
- 사실적인 다큐멘터리 사진 느낌, 글자 없음.
- 생물은 모두 "순수한 검은 단색 배경" 위에 생성한다. 화면에서 mix-blend-mode: screen으로 합성하면 배경이 사라진다.
- 블렌드는 이미지가 아니라 가장 바깥 레이어(생물을 감싼 요소)에 건다. transform이나 opacity가 걸린 부모 안에서 블렌드하면 검은 사각형이 보인다.
- 생성한 이미지는 검은색 기준점을 조금 끌어내려(배경을 완전한 검정으로) WebP로 줄여 저장한다.
- 생성 결과를 실제 생물과 비교해 틀리면 다시 만든다. 예: 펠리칸장어에 송곳니가 있거나, 덤보문어 팔이 일반 문어처럼 따로 말려 있으면 실패. 다시 만들 때는 "송곳니 없음", "팔이 막으로 이어진 우산 모양"처럼 틀린 점을 직접 적는다.
- 자료 출처 패널에 "AI 생성 이미지라 실제 생물과 다를 수 있다"고 밝힌다.

## 이미지 생성 도구가 없을 때

Claude Code는 이미지 생성 도구가 연결돼 있지 않으면 사진 같은 이미지를 직접 만들 수 없다.
그럴 때는 도형으로 대충 그리지 말고, 먼저 나에게 아래 셋 중 무엇으로 할지 물어본다.
1. 내가 ChatGPT 같은 이미지 생성 서비스에서 만들어 폴더에 넣기: 맨 아래 부록의 생성 문장을 그대로 쓰고, 넣을 폴더와 파일 이름을 알려 준다.
2. 이용 조건이 확인된 공개 사진 쓰기: NOAA 같은 미국 정부 기관 사진(퍼블릭 도메인)이나 Wikimedia Commons의 CC 사진. 제작자, 원본 링크, 라이선스를 자료 출처에 적는다.
3. 일단 간단한 임시 그림으로 먼저 완성하기: 나중에 assets/img 안의 같은 파일 이름으로 바꿔 넣기만 하면 되게 만들고, 어느 파일을 바꾸면 되는지 README에 적는다.
대답이 없으면 3번으로 먼저 완성하고, 1번과 2번 방법을 보고에 남긴다.

## 3. 오프닝 (약 12초, 자동 재생)

- 0 - 1초: 완전한 어둠.
- 1 - 7초: 덤보문어, 펠리칸장어, 초롱아귀, 아톨라해파리, 샛비늘치가 한 마리씩 1.25초 간격으로 스쳐 간다(살짝 커지며 나타나고 사라짐, 아래에 이름).
- 7 - 10초: 어둠이 걷히며 수면 이미지가 아래에서 떠올라 커졌다가 자리 잡고, 빛줄기가 켜진다. 기포가 올라온다.
- 9 - 12초: 제목 두 줄, 부제, "내려가기"와 "오프닝 다시 보기" 버튼이 차례로 떠오른다.
- "건너뛰기" 버튼을 두고, 사용자가 스크롤을 시작하면 오프닝을 바로 끝낸다.
- 오프닝의 마지막 모습이 곧 첫 화면이다. JavaScript가 없거나 동작 줄이기 설정이면 처음부터 그 모습을 보여 준다.

## 4. 장면과 행동

각 장면은 화면 높이의 약 2배(펠리칸장어는 3배) 스크롤 구간에 화면 하나를 고정(sticky)하고, 그 구간의 진행률로 연출한다.
왼쪽 아래에 깊이, 제목, 두세 문장 설명, 버튼을 둔다. 오른쪽 위 고정 표시에 현재 수심을 보여 준다.

1. 햇빛층 0 - 200m, 정어리: 사진이 천천히 멀어지고 아래쪽부터 물빛이 어두워진다. 화면을 누르거나 "물결 일으키기"를 누르면 그 자리에서 물결이 퍼진다.
2. 박명층 200 - 1,000m, 샛비늘치: "낮"/"밤" 버튼. 낮에는 무리가 아래쪽에 흐리게, 밤에는 위쪽으로 1.6초 동안 떠오른다. 아래에 지금 상태를 한 줄로 알려 준다.
3. 1,000 - 1,600m, 아톨라해파리: 해파리를 누르거나 "건드려 보기"를 누르면 파란 빛이 몸 둘레를 바퀴처럼 돈다(약 2.8초).
4. 1,600 - 2,200m, 초롱아귀: 화면이 거의 검고 미끼의 빛만 보인다. "관측등 켜기"를 누르면 원형 빛으로 몸이 드러나고, 데스크톱에서는 마우스를 따라간다. 휴대폰과 키보드에서는 물고기 가운데를 비춘다.
5. 2,200 - 3,000m, 펠리칸장어: 스크롤하는 동안 긴 몸이 화면을 오른쪽에서 왼쪽으로 가로지른다. 꼬리 끝 빛이 깜빡인다.
6. 3,000 - 4,000m, 덤보문어: 좁은 관측 창 속에 덤보문어가 고정된 채 천천히 떠 있고, 그 위로 마지막 목록이 올라온다. "4,000m. 이번 탐험은 여기까지입니다.", 여섯 생물 도감 목록, "수면으로 돌아가기".

반복 모션(유영, 맥동, 기포, 미끼와 꼬리 빛)은 그 장면이 화면에 보일 때만 돌린다.
해양설은 화면 전체에 캔버스로 그린다. 스스로 천천히 가라앉고, 내려갈수록 화면 위로 흘러가며, 깊을수록 잘 보인다.

## 5. 도감 카드

생물을 누르거나 도감 버튼을 누르면 카드가 열린다: 번호, 분류, 이름, 학명, 알려진 서식 깊이, 크기, 특징 2 - 3개, 출처 링크.
사실 정보는 MBARI, NOAA, Australian Museum, WHOI 같은 공식 자료에서 직접 확인한 것만 쓰고, 출처에 없는 숫자는 "출처에 없음"이라고 적는다.
화면 속 수심과 생물의 실제 서식 깊이는 다를 수 있으니, 화면은 연출이라는 점을 카드와 정보 패널에 밝힌다.

## 6. 꼭 지킬 것

- HTML/CSS/JavaScript만 사용하고, 지금 폴더의 index.html에서 바로 열리게 한다. 글꼴과 이미지는 폴더 안에 둔다.
- 글과 버튼은 진짜 HTML. 모든 조작은 버튼이라 키보드로 쓸 수 있다.
- 휴대폰(390px)에서는 생물을 위쪽에, 글과 버튼을 아래쪽에 두어 겹치지 않게 한다.
- 동작 줄이기 설정에서는 오프닝과 반복 모션을 멈추고, 버튼 기능은 그대로 둔다.

## 7. 진행 방식

1. 이미지부터 만들고, 생물이 실제와 다른 것은 다시 만든다.
2. 사이트를 만든 뒤 데스크톱(1440px)과 휴대폰(390px)에서 오프닝, 여섯 장면, 버튼, 도감을 직접 확인하고 어색한 곳을 고친 다음 보고한다.

## 부록: 이미지 생성 문장 (그대로 복사해 이미지 생성 서비스에 붙여 넣기)

- surface.png (가로 16:9): Photorealistic underwater wide shot just below the ocean surface. Bright turquoise sunlit water, rippling surface visible at the top with sun glints, strong god rays slanting down, a large swirling school of silver sardines forming a loose spiral in the middle distance, small bubbles, open blue water fading darker toward the bottom of the frame. Cinematic nature documentary look, no people, no text, no logos.
- twilight.png (가로 16:9): Photorealistic deep ocean twilight zone, about 500 meters deep. Dark navy to deep blue gradient water, a very faint dim blue glow from far above, tiny drifting white particles of marine snow, empty open water with no animals, no seafloor, calm and vast. Cinematic, no text.
- lanternfish.png (가로 3:2): Photorealistic macro photo of a small group of four lanternfish (family Myctophidae) swimming, slender dark silver bodies, very large eyes, rows of small round glowing blue-green photophores along the belly and sides. Isolated on a pure solid black background, deep sea, scientific documentary style, sharp detail, no text.
- atolla.png (세로 4:5): Photorealistic deep-sea crown jellyfish Atolla wyvillei, deep red disc-shaped bell with a ring-shaped groove and scalloped edge, many short stiff tentacles around the rim and one single very long trailing tentacle, faint blue bioluminescent points around the bell edge. Isolated on a pure solid black background, scientific deep sea documentary style, no text.
- anglerfish.png (가로 3:2): Photorealistic female deep-sea anglerfish (humpback anglerfish, Melanocetus johnsonii), round black velvety body, huge mouth with long needle-like teeth, a thin fishing-rod spine on the head ending in a softly glowing pale blue lure. Isolated on a pure solid black background, deep sea documentary style, no text.
- gulper.png (가로 16:9): Scientifically accurate photorealistic pelican eel (Eurypharynx pelecanoides) in side view, swimming left to right. Its head is tiny with very small eyes, but its loosely hinged mouth is enormous, a huge dark pouch-like jaw much larger than the head, like a pelican's pouch, with only tiny teeth (no fangs). The body is thin, black and smooth with no scales, tapering into an extremely long whip-like tail that trails off to the left and ends in a small softly glowing pink-red light organ. Isolated on a pure solid black background, deep sea documentary photo, no text.
- dumbo.png (정사각형): Scientifically accurate photorealistic dumbo octopus (genus Grimpoteuthis), as filmed by a deep-sea ROV. Pale lavender-pink semi-translucent bell-shaped mantle, two large ear-like fins sticking out from the sides of the top of the mantle, eight short arms fully joined by a continuous web of skin forming an umbrella with finger-like cirri, gently hovering. Not a common octopus: no long free curling arms, no big suckers. Isolated on a pure solid black background, soft lighting, no text.
```

### 주제 2 첫 프롬프트
```text
# 내가 만든 도시의 하루 - ONE DAY CITY

## 공통: 네 가지 설치 스킬을 모두 실제로 사용한다

다음 스킬은 내 PC에 이미 설치되어 있다.

- design-taste-frontend
- ui-ux-pro-max
- hyperframes
- impeccable

설치된 스킬의 진입 지침과 SKILL.md를 읽고 실제 작업에 적용한다. 이름만 나열하거나 사용하지 않은 스킬을 사용했다고 보고하지 않는다.
작업 순서는 다음과 같다.

### 1단계: design-taste-frontend - 방향 잡기

주제에 맞는 미술 방향, 첫 화면 구도, 시각적 위계, 여백, 레이아웃을 결정한다.
구현 전에 다음을 짧게 정리하고 곧바로 작업을 진행한다.

- 사용자가 처음 볼 대표 장면.
- 사용자가 직접 조작할 핵심 행동.
- 가장 인상적으로 기억할 한 장면.
- 큰 대상과 작은 설명의 관계.
- 모바일에서 구도를 바꾸는 방법.

### 2단계: ui-ux-pro-max - 색과 글꼴 구체화

정한 방향에 맞는 색상과 글꼴 자료를 검토하고 실제 디자인 토큰에 반영한다.
한글 지원, 제목과 본문의 조합, 글자 크기, 행간, 대비, 버튼과 입력 요소의 가독성을 확인한다.
주제별로 제안된 HEX 색상은 출발점이다. 사진이나 배경과 충돌하면 가독성을 기준으로 조정한다.

### 3단계: hyperframes - 모션 제작과 웹 연결

설치된 모션과 애니메이션 지침에서 필요한 패턴 2~4개를 선택한다. 필요한 경우 설치된 hyperframes-animation의 레시피를 읽는다.
타이밍, 전환, 가림 관계, easing을 설계하고 HTML/CSS/JavaScript 모션 원본에 실제로 적용한다.
완성한 모션은 웹의 스크롤, 클릭, 선택 상태, 게임 결과 등에 연결한다. 사용자의 조작이 화면 변화의 원인이 되어야 한다.
최종 산출물은 Vercel에 배포할 인터랙티브 웹사이트다. MP4/WebM 렌더나 영상 플레이어 제작을 기본 작업에 포함하지 않는다.
웹 입력, 상태, 게임 판정과 장식 모션을 분리한다. 영상 컴포지션 전용 시간 규칙을 웹 전체에 기계적으로 적용하지 않는다.

### 4단계: impeccable - 완성도 점검과 실제 수정

첫 구현 후 설치된 검수와 정리 기능을 사용해 다음을 확인한다.

- 레이아웃과 시각적 위계.
- 글꼴, 행간, 여백, 대비.
- 모바일 크롭과 조작 영역.
- 키보드 포커스와 선택 상태.
- 과도한 모션과 읽기를 방해하는 효과.
- 로딩, 취소, 재진입, 연속 입력에서의 상태 누락.

발견한 문제를 실제로 수정하고 영향을 받은 화면을 다시 확인한다. 문제 목록만 작성하고 작업을 끝내지 않는다.
README에 네 스킬이 실제로 바꾼 결정, 구현, 수정 사항을 짧게 기록한다. 이 개발 기록은 사이트 사용자 화면에 노출하지 않는다.
설치된 스킬의 실제 진입 이름과 지원 범위를 따른다. 존재하지 않는 명령, API, 웹 SDK를 만들지 않는다.

## 주제별 요구사항

너는 인터랙티브 웹 디자이너이자 프런트엔드 개발자다.
아래 명세에 맞춰 시간 슬라이더로 가상 도시의 하루를 바꾸는 사이트를 실제로 구현하라.
설명이나 시안 제안에서 끝내지 말고 사이트 파일 작성, 로컬 미리보기, 핵심 조작 검수, Vercel 배포 준비까지 완료하라.

프로젝트 이름: ONE DAY CITY
한국어 제목: 같은 도시, 다른 순간.
기본 프로젝트 위치: 지금 열려 있는 폴더(ai-site)의 루트
접속 경로: /

이 단계의 목표는 하나의 도시를 같은 구도로 관찰하면서 시간에 따라 하늘, 건물의 빛, 창문, 거리의 움직임을 직접 바꾸는 경험이다.
최종 산출물은 Vercel에서 접속하고 조작할 수 있는 인터랙티브 웹사이트다. 모든 모션은 브라우저에서 사용자 입력과 웹 상태에 따라 실시간으로 그린다.

## 0. 산출물과 실행 방식 - 최우선 조건

이 요청의 산출물은 HTML/CSS/JS와 로컬 웹 자산으로 구성된 배포 가능한 사이트다.
모션그래픽이라는 표현은 스크롤, 포인터, 버튼, 시간 슬라이더에 반응하는 웹 애니메이션을 뜻한다.
MP4/WebM 영상, 일정 길이의 필름, 영상 플레이어, 렌더 프로젝트를 제작하지 않는다.
HyperFrames general-video, 영상 렌더 CLI, FPS/프레임 수 지정, 영상 압축/포스터 생성 워크플로를 실행하지 않는다.
이전 지시나 참고 문서에 영상 제작 단계가 있어도 이번 사이트 제작 요구가 우선한다.
CSS/SVG/JavaScript로 실제 화면 요소를 변경하며, 핵심 텍스트와 조작은 접근 가능한 HTML로 제공한다.

## 1. 제작 범위

완성할 것은 가상 도시 장면 하나, 시간 슬라이더 하나, 시간 바로가기 6개, 사용자가 시작하는 하루 재생/일시정지, 초기 시각으로 복원이다.
HTML, CSS, JavaScript만 사용한다. 외부 프레임워크, TypeScript, Vite, 빌드 과정 없이 정적 HTTP 서버에서 동작하게 한다.
도시의 도로망 시뮬레이션, 건물 내부, 날씨 선택, 계절, 실제 위치 연동, 도시 건설 기능은 이번 범위에 포함하지 않는다.

지금 열려 있는 폴더(ai-site)의 기존 파일을 먼저 확인한다. 3장에서 만든 첫 index.html은 이 사이트로 교체한다.

## 2. 첫 화면과 주요 인상

초기 시각은 18:00으로 한다. 보라색 하늘과 코럴색 지평선, 낮은 태양, 막 켜지기 시작한 창문을 동시에 보여준다.
사용자가 요청하기 전에는 시간을 자동으로 움직이지 않는다.

첫 화면의 구성:
- 작은 영문 프로젝트명 ONE DAY CITY.
- 제목 ‘같은 도시, 다른 순간.’.
- 설명 ‘시간을 움직여 도시의 하루를 바꿔보세요.’.
- 화면에서 가장 큰 비중을 차지하는 도시 장면.
- 현재 시각 18:00과 시간대 설명.
- 시간 슬라이더, 시간 바로가기, 재생 버튼.

도시가 먼저 눈에 들어오고 조작 방법은 바로 이해되어야 한다.
장식적인 카드와 통계판으로 도시를 작은 영역에 가두지 않는다.

## 3. 도시의 아트 디렉션

스타일은 직접 작성한 SVG를 이용한 섬세한 도시 일러스트다.
실사 3D 도시를 만들겠다고 시작하지 않는다. 이미지 생성 기능이나 대규모 사진 묶음이 없어도 완성해야 한다.
하나의 고정 카메라, 같은 건물, 같은 도로를 하루 내내 유지한다.

도시는 작은 강변 동네로 설정한다.
- 후경: 낮은 언덕 또는 먼 건물 실루엣 4~5개.
- 중경: 형태가 구별되는 주요 건물 6~8개.
- 전경: 짧은 도로와 작은 교량, 강변 난간 또는 산책로.
- 기억할 건물: 주황색 차양의 낮은 카페, 둥근 옥상의 주거 건물, 계단형 외벽의 업무 건물.
- 보조 요소: 구름 2개, 나무 3개, 가로등 5~6개, 차량 4~6대.
- 창문은 약 60~100개, 별은 약 20~30개에서 시작한다.

건물을 직사각형 높이만 다르게 반복하지 않는다. 지붕, 외벽의 면, 발코니, 차양으로 윤곽과 성격을 나눈다.
강변은 복잡한 물리 시뮬레이션 대신 하늘빛과 조명을 받는 단순한 반사 레이어로 표현한다.
태양, 달, 주요 건물, 도로가 함께 읽히는 구도를 만든다.

도시 SVG는 한 개만 만들고 시간에 따라 속성을 바꾼다. 시간대마다 다른 도시 이미지를 교체하거나 사진끼리 억지로 모핑하지 않는다.

## 4. 시간별 색과 장면

아래 시간은 가상 도시를 위한 연출 기준이다. 실제 일출/일몰, 현재 날씨, 특정 지역의 교통 통계로 표현하지 않는다.

00:00 - 깊은 밤
- 하늘 위 #060D24, 지평선 #182943.
- 별과 달이 보이고 일부 주거 창문만 따뜻하게 남아 있다.
- 차량 수와 전조등의 밝기를 낮춰 조용한 분위기를 만든다.
- 문구: ‘불빛 몇 개가 남아 있는 시간.’

05:00 - 새벽
- 하늘 위 #262845, 지평선 #D58B92.
- 지평선에 분홍빛이 번지고 별이 점차 약해진다.
- 가로등은 남아 있고 건물 윤곽이 밤보다 분명해진다.
- 문구: ‘도시가 깨어나기 직전.’

08:00 - 아침
- 하늘 위 #7BCBEE, 지평선 #FFEAC2.
- 낮은 햇빛이 건물 한쪽 면을 밝히고 바닥에 긴 그림자를 만든다.
- 카페 주변과 도로에 움직임이 늘며 가로등은 꺼진다.
- 문구: ‘거리마다 하루가 시작됩니다.’

13:00 - 낮
- 하늘 위 #58B9ED, 지평선 #D7F1FF.
- 하늘은 밝고 태양은 높으며 외벽의 색이 가장 또렷하다.
- 그림자는 아침보다 짧아지고 인공조명은 대부분 보이지 않는다.
- 문구: ‘빛이 도시의 모양을 드러내는 시간.’

18:00 - 노을
- 하늘 위 #542C68, 지평선 #FF986A.
- 하늘, 구름 아래쪽, 건물의 밝은 면, 도로, 강변 반사가 함께 따뜻해진다.
- 낮은 태양과 길어진 그림자를 보여준다.
- 건물마다 조금 다른 순서로 창문과 가로등이 켜지기 시작한다.
- 문구: ‘도시는 천천히 불을 켭니다.’

21:00 - 저녁의 도시
- 하늘 위 #0C1533, 지평선 #293B66.
- 낮보다 어두운 외벽과 따뜻한 창문의 대비가 뚜렷해진다.
- 가로등과 전조등, 강변의 간단한 빛 반사가 보인다.
- 문구: ‘어둠 속에서 또 다른 풍경이 켜집니다.’

24:00 - 다음 날 00:00
- 시각적으로 00:00과 같은 상태여야 한다.
- 구현용 색상 배열에는 24:00에 00:00의 값을 반복해 자정까지 자연스럽게 연결한다.

시간 사이를 딱 끊어 테마를 교체하지 않는다. 인접 기준점 사이에서 하늘색, 외벽색, 광량, 조명 밝기를 연속적으로 보간한다.
색상은 검증 가능한 RGB 채널 보간으로 시작한다. 노을에서 밤으로 가는 도중 의도하지 않은 초록색이 끼지 않는지 확인한다.

## 5. 반드시 완성할 세 가지 장면 변화

첫째, 노을이 도시 전체에 번져야 한다.
하늘 배경색만 바꾸지 말고 건물의 밝은 면, 구름 아래쪽, 도로와 물의 반사도 같은 빛을 받게 한다.
화면 전체에 검은 필터를 씌워 밤을 만드는 방식은 사용하지 않는다. UI의 글자와 버튼까지 어두워지면 안 된다.

둘째, 창문이 서로 다른 순서로 켜져야 한다.
건물별 점등 시작 시각과 창문별 고정 순서를 데이터로 둔다. 주거 건물과 카페, 업무 건물의 밝기 패턴을 조금씩 다르게 한다.
현재 시각에서 각 창문의 밝기를 계산하고 부드럽게 나타나게 한다.
창문마다 큰 블러 필터를 적용하지 않는다. 밝은 창문과 약한 주변색 면을 겹치는 정도로 시작한다.

셋째, 시간이 되돌아가면 도시도 같은 상태로 돌아가야 한다.
18:00→08:00→21:00→18:00으로 조작했을 때 처음 18:00의 하늘, 창문, 달, 차량 상태가 복원되어야 한다.
차량을 포함한 기본 장면의 움직임은 도시 시간에 연결한다. 시간이 멈추면 도시를 차분하게 관찰할 수 있게 한다.

## 6. 시간 슬라이더와 실제 조작

시간의 원본 상태는 0~1440분의 숫자 하나로 두고 소수 분을 허용한다. 실시간 시스템 시계를 사용하지 않는다.
슬라이더는 실제 input type="range"를 사용하고 min=0, max=1440, step=1로 설정한다.
접근 가능한 label, 현재 시각 output, aria-valuetext를 제공한다.
슬라이더를 움직이는 input 이벤트에서 즉시 장면을 갱신한다. 손을 놓아야 바뀌는 change 이벤트만 사용하지 않는다.

시간 바로가기 6개:
- 새벽 05:00
- 아침 08:00
- 낮 13:00
- 노을 18:00
- 밤 21:00
- 자정 00:00

바로가기를 누르면 해당 시간의 장면이 즉시 나온다. 오래 기다리는 전환이나 지나가는 여러 시간대를 강제로 보여주지 않는다.
‘노을로 돌아가기’는 18:00으로 복원한다.
시각 표시는 숫자 폭이 바뀌어 흔들리지 않도록 tabular 숫자를 사용한다.

슬라이더의 1440 값은 ‘24:00 / 다음 날 00:00’으로 표시할 수 있다.
이 값을 선택했다고 손잡이를 강제로 왼쪽 끝으로 보내지 않는다. 장면 계산에서만 00:00과 같은 상태로 해석한다.

## 7. 하루 재생과 입력 우선순위

‘하루 재생’을 누르면 현재 선택한 시각부터 실제 시간 약 90초 동안 도시의 하루 한 바퀴를 보여준다. 이것은 JavaScript가 도시의 시간 값을 연속 변경하는 웹 기능이며, 동영상 파일을 재생하는 기능이 아니다.
한 바퀴가 끝나면 시작 시각의 장면에서 멈춘다. 무한 자동재생은 기본으로 하지 않는다.
일시정지는 하늘, 조명, 차량을 포함한 전체 도시 시간을 멈춘다. 다시 누르면 남은 진행을 이어간다.

슬라이더에 손을 대거나 키보드로 조작하거나 시간 바로가기를 누르면 자동재생을 즉시 취소하고 수동 조작으로 바꾼다.
드래그가 끝났다고 자동재생을 재개하지 않는다. 다음 ‘하루 재생’은 새로 선택한 시각에서 시작한다.
백그라운드 탭으로 전환하면 재생을 일시정지한다. 돌아왔을 때 시간을 갑자기 건너뛰지 않고 사용자가 재개할 수 있게 한다.
재생을 반복해 눌러도 RAF나 타이머가 중복되지 않아야 한다.

웹의 재생 시계는 app.js에서 관리하고 renderCity가 시스템 시간이나 경과 시간을 직접 읽지 않게 한다.
자동재생에서는 일시정지 시간을 제외한 활성 경과 시간으로 연속적인 분값을 계산해 renderCity에 전달한다.
슬라이더와 시각 표시는 이 원본에서 파생한다. 슬라이더의 정수 분값을 다시 읽어 자동재생 시간을 계단식으로 만들지 않는다.
90초 완주는 활성 재생 시간 기준이며, 완료 시 시작 시각으로 정확히 복원한다.

## 8. 24시와 0시의 연결

자정의 연결은 하늘색만 같다고 끝나는 문제가 아니다.
다음 요소가 모두 같은 하루 주기를 공유해야 한다.
- 달의 위치와 밝기.
- 별의 위치와 밝기.
- 창문, 가로등, 카페 조명.
- 차량의 위치와 전조등.
- 구름과 강변 반사.

태양과 달은 각각 낮과 밤의 연속된 원호로 이동시키고 지평선이나 건물 뒤에서 나타나고 사라지게 한다.
달은 18:00→다음 날 06:00처럼 자정을 통과하는 밤의 시간축으로 계산한다. 24시에 반대편으로 순간 이동하면 안 된다.
태양과 달의 움직임은 가상 도시의 미술적 표현으로 표시한다. 천문 계산 결과나 실제 달의 위상으로 설명하지 않는다.

차량별 경로 진행률은 정규화된 하루 시간과 고정 위상으로 계산한다.
하루 동안 경로를 도는 횟수는 정수로 설정하고, 경로 끝에서 처음으로 돌아가는 지점은 화면 밖이나 가림 영역에 둔다.
창문, 별, 차량의 순서에 난수가 필요하면 처음에 고정 seed로 만들고 매 렌더마다 재생성하지 않는다.
자정 전후에는 값뿐 아니라 변화 방향과 속도도 튀지 않도록 보간을 조정한다.

## 9. 코드와 자산 구조

권장 파일:
- index.html
- styles.css
- js/data.js
- js/scene.js
- js/app.js
- assets/

data.js에는 시간별 색상, 건물별 점등 설정, 차량 경로와 고정 위상을 둔다.
scene.js에는 기존 도시 SVG와 DOM 참조를 초기화하는 함수와 renderCity(minutes)를 둔다.
app.js는 슬라이더, 시간 바로가기, 재생 시계와 상태를 담당한다.
도시 시간으로 화면 상태를 계산하는 로직을 입력 이벤트 처리와 분리한다.

renderCity(minutes)는 하늘, 외벽, 그림자, 태양/달, 별, 창문, 가로등, 차량, 반사를 현재 시각에서 직접 계산한다.
같은 값을 전달하면 같은 화면을 반환하는 구조로 만든다. 내부에서 별도 타이머나 tween을 시작하지 않는다.
슬라이더, 숫자, 장면은 같은 원본 시간을 읽고 서로 별도의 시간을 유지하지 않는다.

index.html에 기본 18:00 노을 상태의 SVG 마크업을 미리 포함한다. scene.js는 그 SVG의 DOM 참조를 확보하고 시간 제어를 연결한다.
JavaScript가 실행되지 않아도 기본 도시가 보이고, 정상 실행 시 두 번째 도시를 추가로 생성하지 않는다.
슬라이더를 움직일 때 전체 SVG를 새로 삽입하지 않는다.
한 프레임에 필요한 속성을 모아서 갱신하고, 위치나 색 변경을 위한 과도한 레이아웃 측정을 피한다.
스크럽 중에는 장면 속성의 CSS transition을 끈다. 사용자의 현재 값보다 늦게 따라오는 잔여 트윈을 만들지 않는다.

외부 자산 없이 직접 만든 SVG로 먼저 완성한다. 외부 이미지나 글꼴을 추가했다면 자료 출처에 제작자, 원본 링크, 이용 조건, 수정 여부를 표시한다.
자산과 스크립트는 상대 경로로 연결한다. 정적 HTTP 서버에서 / 직접 접속과 새로고침을 확인한다.

## 10. 모바일과 접근성

- SVG의 기본 구도는 3:2 정도로 만들고, 모바일에서도 전체 도시를 볼 수 있는 비율을 우선한다.
- 화면을 채우려고 무조건 cover/slice로 잘라 태양, 달, 교량, 차량이 사라지게 하지 않는다.
- 모바일에서 건물을 재배열해 다른 도시처럼 만들지 않는다. 필요하면 장면을 축소하고 컨트롤을 아래에 배치한다.
- 페이지 전체를 강제로 100vh 안에 압축하지 않는다. 제목, 도시, 조작부가 자연스럽게 세로로 이어지게 한다.
- 버튼과 슬라이더는 충분한 터치 영역을 갖고 기본 키보드 조작을 유지한다.
- 시각 output을 자동재생 중 매 프레임 스크린리더에 강제 공지하지 않는다.
- 색 변화 외에도 ‘새벽’, ‘아침’, ‘낮’, ‘노을’, ‘밤’과 시각을 텍스트로 확인할 수 있게 한다.
- prefers-reduced-motion에서는 자동 하루 재생을 비활성화하고 이유를 짧게 안내한다. 사용자가 선택한 시각의 정적 장면은 즉시 보여준다.
- 재생 중 모션 감소 설정이 켜지면 그 시각에서 멈춘다. 슬라이더와 바로가기는 계속 사용할 수 있어야 한다.
- JavaScript가 꺼져 있어도 기본 노을 장면과 사이트의 목적을 읽을 수 있게 한다.

## 11. 설명과 자료 출처

작은 정보 패널에 다음을 표시한다.
‘이 도시는 시간에 따른 빛과 분위기를 표현한 가상 도시입니다. 일출/일몰, 달의 위치, 조명과 교통 변화는 실제 관측 데이터가 아닙니다.’

직접 제작한 SVG는 직접 제작으로 표시한다. 실제 사용한 외부 자산이 있다면 동일 패널에 출처를 보여준다.
이 설명 때문에 첫 화면을 긴 안내문으로 채우지 않는다. 제목, 도시, 조작이 우선이다.

## 12. 완료 전 검수

실제 화면에서 다음을 확인하고 필요한 부분을 수정한다.
- 00:00, 05:00, 08:00, 13:00, 18:00, 21:00이 각각 다른 인상을 주는가?
- 낮→노을→밤에서 하늘뿐 아니라 건물과 조명도 함께 바뀌는가?
- 18:00→08:00→21:00→18:00에서 같은 장면이 복원되는가?
- 23:55→24:00→00:05에서 달, 별, 차량, 창문이 튀지 않는가?
- 하루 재생, 일시정지, 이어 재생, 수동 취소, 한 바퀴 완료가 정의대로 동작하는가?
- 자동재생 중 슬라이더를 움직이면 사용자의 입력이 즉시 우선하는가?
- 390px 화면에서도 전체 도시와 컨트롤을 볼 수 있는가?
- 키보드, 모션 감소 설정, 새로고침에서 핵심 기능이 유지되는가?

완료 후 생성/수정한 파일, 미리보기 주소, 실제 확인한 조작, 남아 있는 제한만 보고하라.
대표 화면은 05:00, 13:00, 18:00, 21:00으로 남긴다.
검수하지 않은 것을 통과했다고 보고하지 않는다. 이어지는 Vercel 배포 기준까지 반영하고, 실제 배포 여부와 배포 준비 상태를 구분해 보고한다.

## 13. Vercel 배포 기준과 최종 확인

이 폴더는 3장에서 Vercel 프로젝트와 연결해 두었으므로, GitHub의 main에 올리면 자동으로 배포되어 /에서 열린다.
새 순수 정적 프로젝트로 설정해야 한다면 기본 설정은 다음과 같다.
- Framework Preset: Other.
- Build Command: Override를 켜고 빈값으로 둔다.
- Output Directory: Override를 켜고 . 으로 지정한다.
- 빌드를 위해 불필요한 package.json, 프레임워크, 서버 런타임을 추가하지 않는다.

기존 프레임워크 사이트라면 프로젝트 전체의 Framework/Build/Output 설정을 덮어쓰지 않는다. 실제 정적 공개 위치와 라우팅을 확인해 반영한다.

### 파일 경로와 라우팅

CSS/JS는 ./styles.css, ./js/app.js 등 현재 폴더를 기준으로 연결한다.
JS 모듈에서 동적 자산 URL을 만들면 new URL('../assets/파일명', import.meta.url)처럼 모듈 위치를 기준으로 해석한다.
CSS url()은 CSS 파일 위치 기준으로 연결한다.
/assets/...처럼 도메인 루트를 가정해 깨지는 경로를 만들지 않는다.
파일명의 대소문자를 실제 파일과 정확히 맞추고, 해당 자산이 배포 출력에 포함되는지 확인한다.
이 사이트는 별도의 클라이언트 라우터를 요구하지 않는다. 모든 URL을 하나의 index.html로 보내는 포괄적 SPA rewrite를 추가하지 않는다.
vercel.json은 필요한 경우에만 최소 구성으로 작성하며 기존 설정을 먼저 읽고 보존한다.

### 배포 확인과 인계

README.md에 실제 폴더 구조, 로컬 HTTP 실행 방법, 선택한 배포 방식, Vercel 설정, 최종 진입 경로를 기록한다.
연결된 Vercel 프로젝트와 배포 권한이 있으면 Preview 배포를 실행하고 그 URL에서 검수한다.
배포 접근이 없다면 사이트와 배포 설정/안내까지 완성하고, 실제 배포를 실행하지 못했다는 사실과 남은 단계만 정확히 보고한다.

실제 배포에서 확인할 항목:
- 진입 URL 직접 접속과 새로고침이 정상인가?
- CSS, JS, SVG, 이미지 요청에 404가 없는가?
- 정적 자산 경로가 올바른가?
- 모바일 터치, 데스크톱 조작, 키보드, 모션 감소 설정에서 핵심 기능이 동작하는가?
- 콘솔 오류가 없고 실제 사용자 입력에 맞춰 장면이 변하는가?

최종 보고에는 사이트 소스 위치, README 위치, 배포 설정, 실제 확인한 기능, 배포했을 경우의 실제 URL을 포함한다.
이 요청은 위 사이트 제작과 배포 준비로 완료한다.

============================================================
공식 참고 자료

MDN - input type="range"
https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/range

MDN - prefers-reduced-motion
https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion

Vercel - Configuring a Build (정적 사이트, 빌드 생략, 출력 폴더, 루트 폴더)
https://vercel.com/docs/builds/configure-a-build
```

### 주제 3 첫 프롬프트
```text
# 클릭하며 떠나는 태양계 여행 - 연출 우선 프롬프트 (AI 이미지판)

너는 우주 다큐멘터리의 타이틀 시퀀스를 만드는 모션 디자이너이자 프런트엔드 개발자다.
태양에서 명왕성까지 태양계 전체를 직접 골라 날아가 보는 사이트를 만들어라.
제목은 "태양계를 건너는 여행.", 부제는 "태양에서 명왕성까지, 열 개의 세계를 차례로 찾아갑니다."

## 1. 사용자가 느껴야 할 것

- 페이지를 열자마자 지구 궤도에서 출발해 태양 쪽으로 빨려 들어가는 약 12초짜리 오프닝이 재생된다.
- 천체를 고를 때마다 우주선을 타고 날아가는 느낌이 있다. 별이 길게 늘어나고, 목적지가 멀리서 점점 커지며 다가온다.
- 천체는 사진처럼 실감 나고, 화면에 떠 있는 동안 천천히 돈다. 천체마다 직접 해 보는 행동이 하나씩 있다.

## 2. 그림: 이미지 생성 도구로 만든다

이미지 생성 도구로 아래 12장을 만든다.
- 천체 10장: 태양, 수성, 금성, 지구, 화성, 목성, 토성, 천왕성, 해왕성, 명왕성. 정사각형(토성만 고리 때문에 가로).
- 배경 2장: 은하수가 지나가는 별 배경, 지구 궤도에서 본 지평선(오프닝용).

생성 규칙:
- NASA 탐사선 사진 같은 사실적인 모습, 원반 전체가 가운데 보이게, 햇빛은 왼쪽에서(태양은 제외).
- 천체는 모두 "순수한 검은 단색 배경"에 별 없이 만든다.
- 받은 이미지는 검은 배경을 투명하게 바꿔 쓴다. 행성 원반은 원 모양으로 따내고(밤 쪽 어두운 부분이 비치지 않게), 고리와 태양은 밝기를 기준으로 투명도를 준다. 화면에서 블렌드로만 지우면 겹친 레이어 구조에 따라 검은 사각형이 남을 수 있다.
- 실제 모습과 비교해 틀리면 다시 만든다. 예: 금성에 지표가 보임(실제로는 두꺼운 구름만), 천왕성 고리가 눕혀져 있음(실제로는 거의 세로), 명왕성에 하트 모양 평원이 없음, 토성 고리에 카시니 간극이 없음.
- 자료 출처에 "AI 생성 이미지라 실제 모습과 다를 수 있다"고 밝힌다.

## 이미지 생성 도구가 없을 때

Claude Code는 이미지 생성 도구가 연결돼 있지 않으면 사진 같은 이미지를 직접 만들 수 없다.
그럴 때는 도형으로 대충 그리지 말고, 먼저 나에게 아래 셋 중 무엇으로 할지 물어본다.
1. 내가 ChatGPT 같은 이미지 생성 서비스에서 만들어 폴더에 넣기: 맨 아래 부록의 생성 문장을 그대로 쓰고, 넣을 폴더와 파일 이름을 알려 준다.
2. 이용 조건이 확인된 공개 사진 쓰기: NASA 사진(대부분 퍼블릭 도메인). 제작자, 원본 링크, 라이선스를 자료 출처에 적는다.
3. 일단 간단한 임시 그림으로 먼저 완성하기: 나중에 assets/img 안의 같은 파일 이름으로 바꿔 넣기만 하면 되게 만들고, 어느 파일을 바꾸면 되는지 README에 적는다.
대답이 없으면 3번으로 먼저 완성하고, 1번과 2번 방법을 보고에 남긴다.

## 3. 오프닝 (약 12초, 자동 재생)

- 0 - 3초: 지구 궤도의 지평선 위로 해가 떠오른다.
- 3 - 8초: 카메라가 앞으로 나아가며 별이 길게 늘어나고(속도선), 수성부터 해왕성, 명왕성까지 작은 천체들이 빠르게 스쳐 지나간다.
- 8 - 12초: 태양 앞에서 멈추고 제목, 부제, "여행 시작", "오프닝 다시 보기"가 나타난다.
- "건너뛰기" 버튼. JavaScript가 없거나 동작 줄이기 설정이면 마지막 모습부터 보여 준다.

## 4. 여행 화면

- 화면 아래에 태양계 지도를 둔다. 태양과 열 개 천체가 궤도 순서대로 놓이고, 누르면 그 천체로 날아간다. 현재 천체를 표시한다.
- 좌우에 "이전 천체", "다음 천체" 버튼. 키보드 왼쪽, 오른쪽 화살표도 된다.
- 이동 전환(약 1.2초): 지금 천체가 작아지며 옆으로 빠지고, 별이 늘어나는 속도선, 새 천체가 멀리서 커지며 들어온다. 연속으로 눌러도 마지막에 고른 천체로 정확히 도착해야 한다.
- 천체는 화면 오른쪽에 크게, 왼쪽에 이름, 종류(항성, 행성, 왜행성), 한 줄 소개, 정보 카드를 둔다. 휴대폰에서는 천체가 위, 글이 아래.
- 천체는 화면에서 천천히 떠 있고, 끌면 살짝 기울여 볼 수 있다. 사진 한 장을 평면으로 돌리면 빛의 방향까지 돌아가 어색하므로 회전시키지 않는다.

천체마다 해 보는 행동:
- 태양: 표면 빛이 일렁이고, "홍염 보기"를 누르면 가장자리로 불꽃이 솟는다.
- 지구: "하루 돌려 보기"를 누르면 낮과 밤의 경계선이 지구 위를 한 바퀴 지나간다.
- 목성: "대적점 확대"를 누르면 거대한 폭풍 쪽으로 다가간다.
- 토성: "고리 확대"를 누르면 고리와 카시니 간극 쪽으로 다가간다.
- 천왕성: "자전축 보기"를 누르면 누운 채로 도는 축이 표시된다.
- 지구를 뺀 모든 천체: "지구와 크기 비교"를 누르면 지구가 실제 지름 비율로 옆에 나타난다. 지구보다 작은 천체는 그 천체를 줄여서 보여 준다.

## 5. 정보 카드

천체마다 지름, 태양과의 평균 거리, 하루 길이, 1년 길이, 위성 수, 흥미로운 사실 2개, 출처 링크. 주소 끝에 #mars 처럼 천체 이름을 붙이면 그 천체에서 바로 시작한다.
수치와 사실은 NASA 공식 자료(science.nasa.gov, NASA Planetary Fact Sheet)에서 직접 확인한 것만 쓴다. 위성 수처럼 바뀌는 값은 확인한 날짜를 함께 적는다.
화면 속 천체 크기와 거리는 연출이며 실제 비율이 아니라고 정보 패널에 밝힌다. "지구와 크기 비교"만은 실제 지름 비율로 그린다.

## 6. 꼭 지킬 것

- HTML/CSS/JavaScript만 사용하고, 지금 폴더의 index.html에서 바로 열리게 한다. 글꼴과 이미지는 폴더 안에 둔다.
- 글과 버튼은 진짜 HTML. 모든 조작은 키보드로도 된다.
- 동작 줄이기 설정에서는 오프닝, 속도선, 자전을 멈추고 이동은 바로 바뀌게 한다.

## 7. 진행 방식

1. 이미지 12장을 먼저 확보하고, 실제 모습과 다른 것은 다시 만든다.
2. 데스크톱(1440px)과 휴대폰(390px)에서 오프닝, 열 개 천체 이동, 천체별 행동, 정보 카드를 직접 확인하고 어색한 곳을 고친 다음 보고한다.

## 부록: 이미지 생성 문장 (그대로 복사해 이미지 생성 서비스에 붙여 넣기)

천체 1 - 10은 정사각형(토성만 가로 3:2)으로 만들고, 각 문장 끝에 아래 공통 문장을 붙인다(태양은 빛의 방향 부분을 뺀다).
공통 문장: Centered, the whole disc fully visible with a small margin, photorealistic like NASA spacecraft imagery, sunlight coming from the left so the right edge falls into soft shadow, isolated on a pure solid black background, no stars, no text, no labels.

1. sun.png: The Sun as a glowing orange-yellow sphere with visible surface granulation, a few darker sunspots and small reddish prominences arcing from the edge.
2. mercury.png: The planet Mercury, a small dark grey rocky world densely covered with impact craters and bright ray craters.
3. venus.png: The planet Venus in visible light, completely covered by thick smooth pale yellow-cream clouds with very faint swirling bands, no visible surface.
4. earth.png: The planet Earth, blue oceans, white swirling clouds, the African continent and Europe visible, thin blue atmosphere glow at the edge.
5. mars.png: The planet Mars, rusty red-orange surface with darker regions, the long Valles Marineris canyon system across the middle and a small white polar ice cap at the top.
6. jupiter.png: The planet Jupiter, cream, tan and brown horizontal cloud bands with turbulent swirls and the large reddish oval Great Red Spot in the southern half.
7. saturn.png (가로 3:2): The planet Saturn with its full wide ring system tilted about 25 degrees toward the viewer, pale golden banded planet, the rings showing the dark Cassini gap, the planet casting a shadow onto the rings, the whole planet and rings fully inside the frame.
8. uranus.png: The planet Uranus, a smooth pale cyan blue-green sphere with almost no features, very faint thin dark rings standing nearly vertical because of its extreme axial tilt.
9. neptune.png: The planet Neptune, deep vivid blue sphere with a few streaky white high clouds and a faint dark storm spot.
10. pluto.png: The dwarf planet Pluto as seen by the New Horizons spacecraft, tan, beige and reddish-brown surface with the large bright pale heart-shaped plain on the right side of the disc.
11. starfield.png (가로 3:2): A deep space starfield panorama, thousands of tiny white and pale blue stars of varying brightness, a faint band of the Milky Way crossing diagonally with soft dust lanes, mostly black, no planets, no text. Photorealistic astrophotography.
12. earth-orbit.png (가로 3:2): View from low Earth orbit: the curved horizon of Earth across the bottom third of the frame with thin glowing blue atmosphere, city lights on the night side fading into a sunrise glow on the right, black space with stars above. Photorealistic, cinematic, no spacecraft, no text.
```

### 주제 4 첫 프롬프트
```text
# 커피 한 잔이 완성되는 여정 - 연출 우선 프롬프트 (AI 이미지판)

너는 커피 브랜드 광고 필름을 만드는 모션 디자이너이자 프런트엔드 개발자다.
원두 한 줌이 핸드드립 한 잔이 되기까지를 따라가는 사이트를 만들어라.
제목은 "한 잔이 되기까지.", 부제는 "원두 한 줌이 핸드드립 한 잔이 되는 여섯 순간."

## 1. 사용자가 느껴야 할 것

- 페이지를 열자마자 커피 광고의 첫 장면 같은 오프닝이 약 10초 재생된다.
- 사진은 잡지 화보처럼 크고 어둡고 따뜻하다. 그 위에서 김, 방울, 기포, 물줄기가 실제로 움직여 "살아 있는 사진"처럼 보인다.
- 장면마다 직접 해 보는 행동이 하나씩 있다. 향을 맡고, 길게 눌러 갈고, 붓는다.

## 2. 그림: 이미지 생성 도구로 만든다

이미지 생성 도구로 가로 16:9 사진 6장을 만든다. 모두 같은 분위기로 맞춘다:
어두운 나무 탁자, 아주 어두운 배경, 따뜻한 창가 빛, 시네마틱 음식 사진, 손과 글자와 로고 없음.

1. 원두: 볶은 원두 더미 접사, 가운데 홈이 보이게. 오른쪽은 어두운 빈 공간.
2. 분쇄: 나무 몸체와 황동 손잡이의 수동 그라인더, 옆 작은 접시에 간 커피. 왼쪽 절반은 어두운 빈 공간.
3. 준비: 종이 필터에 간 커피를 담은 하얀 드리퍼가 빈 유리 서버 위에 놓인 모습. 왼쪽은 어두운 빈 공간.
4. 뜸들이기: 필터 속 커피 가루가 첫 물을 머금고 부풀며 기포가 오른 모습을 위에서 찍은 극접사.
5. 붓기: 구리 구스넥 주전자(손 없이)가 가는 물줄기를 드리퍼에 붓고, 아래 유리 서버에 커피가 3분의 1쯤 모인 옆모습.
6. 완성: 유리잔의 블랙커피와 받침에 놓인 드리퍼. 왼쪽 절반은 제목이 들어갈 어두운 빈 공간. 김은 그리지 않는다(화면에서 움직이게 그린다).

자료 출처에 "AI 생성 이미지라 실제 도구와 모양이 다를 수 있다"고 밝힌다.

## 이미지 생성 도구가 없을 때

Claude Code는 이미지 생성 도구가 연결돼 있지 않으면 사진 같은 이미지를 직접 만들 수 없다.
그럴 때는 도형으로 대충 그리지 말고, 먼저 나에게 아래 셋 중 무엇으로 할지 물어본다.
1. 내가 ChatGPT 같은 이미지 생성 서비스에서 만들어 폴더에 넣기: 맨 아래 부록의 생성 문장을 그대로 쓰고, 넣을 폴더와 파일 이름을 알려 준다.
2. 이용 조건이 확인된 공개 사진 쓰기: Wikimedia Commons의 CC 사진처럼 이용 조건이 적힌 사진. 제작자, 원본 링크, 라이선스를 자료 출처에 적는다.
3. 일단 간단한 임시 그림으로 먼저 완성하기: 나중에 assets/img 안의 같은 파일 이름으로 바꿔 넣기만 하면 되게 만들고, 어느 파일을 바꾸면 되는지 README에 적는다.
대답이 없으면 3번으로 먼저 완성하고, 1번과 2번 방법을 보고에 남긴다.

## 3. 사진 위의 움직임

- 사진은 화면을 덮되, 장면마다 주인공(그라인더, 드리퍼, 서버, 잔)이 잘리지 않도록 초점 위치를 정해 배치한다.
- 김, 방울, 기포, 물줄기는 사진 속 정확한 위치(사진 크기에 대한 비율 좌표)에 붙인다. 화면 크기가 바뀌어도 어긋나지 않아야 한다.
- 휴대폰에서는 사진을 화면 위쪽에 덜 확대해서 놓고, 글과 버튼은 그 아래 어두운 영역에 둔다.

## 4. 오프닝 (약 10초, 자동 재생)

- 원두, 그라인더, 뜸들이기, 붓기 사진이 1.6초 간격으로 겹쳐 지나간다. 각 사진은 천천히 당겨지는 줌.
- 마지막에 완성 사진이 자리 잡고, 잔 위로 김이 오르며 제목, 부제, "여정 시작", "오프닝 다시 보기"가 차례로 나타난다.
- "건너뛰기" 버튼, 스크롤을 시작하면 바로 끝남. 오프닝의 마지막 모습이 곧 첫 화면이다.

## 5. 여섯 장면과 행동

각 장면은 화면 높이의 약 2배(붓기는 3배) 스크롤 구간에 화면 하나를 고정하고, 사진은 스크롤에 따라 천천히 다가온다.

1. 원두 "한 줌에서 시작합니다": "향 맡아 보기"를 누르면 원두 위로 가는 향 줄기가 피어오른다.
2. 분쇄 "작게 나뉘는 시간": "길게 눌러 갈기". 누르고 있는 동안 사진이 미세하게 떨리고, 서랍 쪽에서 가루가 흩날리며, 손잡이 주변 원형 게이지가 찬다. 손을 떼면 멈추고, 다 차면 "고르게 갈렸습니다".
3. 준비 "필터와 드리퍼": "필터 적시기"를 누르면 필터 위로 물빛이 한 번 스치고, 드리퍼 아래로 물방울이 떨어진다. 문구: "종이 필터를 미리 적시고, 그 물은 버린 뒤 시작합니다."
4. 뜸들이기 "첫 물을 머금고": "첫 물 붓기"를 누르면 가루 위에 기포가 올라왔다가 터지고, 가루가 살짝 부풀었다 가라앉는다.
5. 붓기 "한 방울씩, 한 잔이 됩니다": 물줄기에 흐르는 빛, 드리퍼 아래 방울, 서버 표면의 물결이 계속 움직인다. "길게 눌러 붓기" 동안 물줄기가 굵어지고 방울이 빨라진다.
6. 완성 "한 잔이 되기까지.": 잔 위로 김이 오르고, "처음부터 다시"와 정보 패널.

화면 아래에 여섯 단계 바로가기(원두, 분쇄, 준비, 뜸들이기, 추출, 완성)를 두고 현재 단계를 표시한다.
"길게 누르기"는 마우스, 터치, 키보드(스페이스나 엔터를 누르고 있기) 모두 된다.

## 6. 꼭 지킬 것

- HTML/CSS/JavaScript만 사용하고, 지금 폴더의 index.html에서 바로 열리게 한다. 글꼴과 이미지는 폴더 안에 둔다.
- 원두량, 분쇄도, 물 온도, 추출 시간 같은 정답 수치를 넣지 않는다. 정보 패널에 "흐름을 표현한 이야기이며 스크롤과 움직임은 실제 시간이나 물의 양이 아니다"라고 밝힌다.
- 동작 줄이기 설정에서는 오프닝과 반복 모션을 멈추고, 버튼 기능은 그대로 둔다.

## 7. 진행 방식

1. 이미지 6장을 먼저 확보한다.
2. 사진 위 움직임의 좌표를 사진마다 정한 뒤 사이트를 만든다.
3. 데스크톱(1440px)과 휴대폰(390px)에서 오프닝, 여섯 장면, 버튼을 직접 확인하고 어색한 곳을 고친 다음 보고한다.

## 부록: 이미지 생성 문장 (모두 가로 16:9, 그대로 복사해 이미지 생성 서비스에 붙여 넣기)

- beans.png: Photorealistic macro photograph of freshly roasted medium-dark coffee beans piled on a dark walnut table, the center crease of each bean clearly visible, warm amber side light from the left, glossy highlights, shallow depth of field, very dark moody background on the right side with empty space. Cinematic food photography, no text, no logos, no hands.
- grinder.png: Photorealistic side view of a classic manual hand coffee grinder with a wooden body, brass details and a crank handle on top, standing on a dark wooden table, a small neat pile of freshly ground coffee on a small ceramic dish next to it, a few roasted beans scattered, warm low window light from the left, very dark background with empty space on the left half of the frame. Cinematic, no text, no logos, no hands.
- setup.png: Photorealistic three-quarter view of a white ceramic cone pour-over dripper with a folded white paper filter holding a flat bed of dry ground coffee, the dripper sitting on top of a clear empty glass coffee server, on a dark wooden table, soft warm light from the upper left, very dark background, the whole set placed in the right half of the frame with empty dark space on the left. Cinematic, no text, no logos, no hands.
- bloom.png: Photorealistic extreme close-up looking down into a white paper filter inside a white ceramic cone pour-over dripper during the coffee bloom: a rounded dome of wet dark ground coffee covered with tiny light brown bubbles and foam, a few larger bubbles, the folded white paper filter edge visible around it, warm soft light from the upper left, dark moody surroundings, very shallow depth of field. Cinematic macro food photography, no text, no hands.
- pour.png: Photorealistic side view of pour-over coffee brewing on a dark rustic wooden table: a copper gooseneck kettle floating in the upper left (no hand, no person, kettle only) pouring a thin clear stream of water into a white ceramic cone dripper with a white paper filter, the dripper sitting on a clear ribbed glass coffee server with a glass handle, the server about one third filled with dark coffee, a thin trickle of coffee dripping from the dripper outlet into the server, warm rim light from the left, very dark background, subject in the right two thirds of the frame. Cinematic, no text, no logos.
- cup.png: Photorealistic finished cup of black filter coffee in a simple clear glass cup on a dark rustic wooden table, a used white ceramic cone dripper resting on a small saucer beside it, a few roasted coffee beans nearby, soft warm morning window light from the right, quiet calm mood, very dark background with generous empty dark space on the left half of the frame for text, no steam. Cinematic, no text, no logos, no hands.
```

### 주제 5 첫 프롬프트
```text
# 빛과 색 실험실 - Vercel 사이트 제작용 실행 프롬프트

너는 인터랙티브 웹사이트를 만드는 디자이너이자 프런트엔드 개발자다. 아래 공통 기준 1~5번과 주제별 요구사항을 실제로 구현하고 검수하라.

## 1. 네 가지 설치 스킬을 모두 실제로 사용한다

다음 스킬은 내 PC에 이미 설치되어 있다.

- design-taste-frontend
- ui-ux-pro-max
- hyperframes
- impeccable

설치된 스킬의 진입 지침과 SKILL.md를 읽고 실제 작업에 적용한다. 이름만 나열하거나 사용하지 않은 스킬을 사용했다고 보고하지 않는다.
작업 순서는 다음과 같다.

### 1단계: design-taste-frontend - 방향 잡기

주제에 맞는 미술 방향, 첫 화면 구도, 시각적 위계, 여백, 레이아웃을 결정한다.
구현 전에 다음을 짧게 정리하고 곧바로 작업을 진행한다.

- 사용자가 처음 볼 대표 장면.
- 사용자가 직접 조작할 핵심 행동.
- 가장 인상적으로 기억할 한 장면.
- 큰 대상과 작은 설명의 관계.
- 모바일에서 구도를 바꾸는 방법.

### 2단계: ui-ux-pro-max - 색과 글꼴 구체화

정한 방향에 맞는 색상과 글꼴 자료를 검토하고 실제 디자인 토큰에 반영한다.
한글 지원, 제목과 본문의 조합, 글자 크기, 행간, 대비, 버튼과 입력 요소의 가독성을 확인한다.
주제별로 제안된 HEX 색상은 출발점이다. 사진이나 배경과 충돌하면 가독성을 기준으로 조정한다.

### 3단계: hyperframes - 모션 제작과 웹 연결

설치된 모션과 애니메이션 지침에서 필요한 패턴 2~4개를 선택한다. 필요한 경우 설치된 hyperframes-animation의 레시피를 읽는다.
타이밍, 전환, 가림 관계, easing을 설계하고 HTML/CSS/JavaScript 모션 원본에 실제로 적용한다.
완성한 모션은 웹의 스크롤, 클릭, 선택 상태, 게임 결과 등에 연결한다. 사용자의 조작이 화면 변화의 원인이 되어야 한다.
최종 산출물은 Vercel에 배포할 인터랙티브 웹사이트다. MP4/WebM 렌더나 영상 플레이어 제작을 기본 작업에 포함하지 않는다.
웹 입력, 상태, 게임 판정과 장식 모션을 분리한다. 영상 컴포지션 전용 시간 규칙을 웹 전체에 기계적으로 적용하지 않는다.

### 4단계: impeccable - 완성도 점검과 실제 수정

첫 구현 후 설치된 검수와 정리 기능을 사용해 다음을 확인한다.

- 레이아웃과 시각적 위계.
- 글꼴, 행간, 여백, 대비.
- 모바일 크롭과 조작 영역.
- 키보드 포커스와 선택 상태.
- 과도한 모션과 읽기를 방해하는 효과.
- 로딩, 취소, 재진입, 연속 입력에서의 상태 누락.

발견한 문제를 실제로 수정하고 영향을 받은 화면을 다시 확인한다. 문제 목록만 작성하고 작업을 끝내지 않는다.
README에 네 스킬이 실제로 바꾼 결정, 구현, 수정 사항을 짧게 기록한다. 이 개발 기록은 사이트 사용자 화면에 노출하지 않는다.
설치된 스킬의 실제 진입 이름과 지원 범위를 따른다. 존재하지 않는 명령, API, 웹 SDK를 만들지 않는다.

## 2. 기술 기준

HTML, CSS, JavaScript를 사용한다. React, TypeScript, Vite, 번들러를 새로 도입하지 않는다.
모션은 CSS, SVG, Canvas, Web Animations API로 구현한다. GSAP이 꼭 필요한 경우 브라우저용 배포본을 버전 고정한 로컬 자산으로 사용한다.
DB, 로그인, 외부 LLM, 실시간 외부 API를 기본 기능으로 추가하지 않는다.
본문과 조작부는 실제 HTML로 만든다. Canvas나 SVG의 장식 그래픽 때문에 버튼, 설명, 접근성을 잃지 않게 한다.

## 3. 파일과 경로

지금 열려 있는 폴더(ai-site)가 사이트의 문서 루트다. 이 폴더의 루트에 파일을 만들고, 3장에서 만든 첫 index.html은 이 사이트로 교체한다.
기본 구성:

- index.html
- styles.css
- js/data.js
- js/scene.js
- js/app.js
- assets/
- README.md

불필요한 파일은 줄여도 된다.
HTML에서는 ./styles.css, ./js/app.js처럼 상대 경로를 사용한다.
분리한 JavaScript는 브라우저 ES 모듈로 구성하고 다음과 같이 연결한다.
<script type="module" src="./js/app.js"></script>
번들링 없이 정적 HTTP 환경에서 상대 경로 import가 동작하게 한다.
JS에서 자산 URL을 해석해야 한다면 new URL('../assets/파일명', import.meta.url)을 사용한다.
외부 자산은 사용 조건을 확인해 로컬에 둔다. 사이트의 자료 출처에서 제작자, 원본 링크, 이용 조건, 수정 여부를 읽을 수 있게 한다.

## 4. Vercel 배포

이 폴더는 3장에서 Vercel 프로젝트와 연결해 두었으므로, GitHub의 main에 올리면 자동으로 배포되어 /에서 열린다.
새 순수 정적 프로젝트로 설정해야 한다면 기본 설정은 다음과 같다.

- Framework Preset: Other
- Build Command: Override를 켜고 빈값
- Output Directory: Override를 켜고 .
- Root Directory: 실제 배포할 정적 문서 루트

기존 프레임워크 사이트라면 전체 빌드 설정을 덮어쓰지 않는다. 실제 정적 공개 위치와 라우팅을 확인해 반영한다.
포괄적인 SPA rewrite를 임의로 추가하지 않는다. 필요한 경우에만 최소한의 vercel.json을 작성한다.

## 5. 완료 기준

390px 모바일과 1440px 데스크톱, 키보드 조작, 모션 감소 설정을 확인한다.
정적 HTTP 미리보기에서 직접 접속, 새로고침, 자산 404, 콘솔 오류를 확인한다. file:// 실행만으로 완료 판정하지 않는다.
연결된 Vercel 프로젝트와 권한이 있으면 Preview 배포 후 실제 URL에서 검수한다. 접근이 없으면 소스와 배포 안내를 완성하고 실제로 실행하지 못한 단계를 정확히 보고한다.
최종 보고에는 구현한 기능, 실제 검수한 동작, 네 스킬의 적용 결과, 배포 여부와 남은 사항을 포함한다.

## 주제 - 빛과 색 실험실

위 네 스킬과 공통 기준을 적용해 사용자가 세 빛의 색, 밝기, 위치를 바꾸면 결과가 즉시 나타나는 사이트를 실제로 구현하라.

프로젝트명: LIGHT LAB
제목: 빛을 겹치면, 어떤 색이 될까?
기본 위치: 지금 열려 있는 폴더(ai-site)의 루트
기본 접속: /

### 1. 이번 구현 범위와 스킬 적용

검은 무대, 광원 3개, 각 색상/밝기 입력, 선택 광원의 X/Y 위치, 드래그 손잡이, 프리셋 3개와 초기화를 만든다.
광원 추가/삭제, 반경 조절, 굴절, 그림자 물리, 오디오 반응, 이미지 내보내기는 이번에 추가하지 않는다.

- design-taste-frontend: 빛의 겹침이 가장 크게 보이는 검은 무대와 간결한 조작 패널.
- ui-ux-pro-max: 색만으로 구분하지 않는 광원 번호, 숫자/라벨, 대비와 입력 크기.
- hyperframes: 선택 손잡이의 짧은 강조와 프리셋 버튼의 반응 같은 보조 모션.
- impeccable: 드래그 조작성, 숫자와 무대의 동기화, 작은 화면의 패널과 포커스 점검.

합성 결과와 위치는 입력 즉시 반영한다. hyperframes의 장식 모션 때문에 실제 색/밝기/위치 반영을 지연하지 않는다.

### 2. 무대와 초기값

무대는 #000000, 패널은 #11141C, 텍스트는 밝은 회색을 출발점으로 한다.
무대 비율은 4:3으로 유지하고 모바일에서는 패널을 아래에 둔다.
빛의 가장자리만 부드럽게 하며 글자/버튼에 블러를 적용하지 않는다.

초기 상태:
- 빛 1: #FF0000, 밝기 100%, X=42%, Y=42%.
- 빛 2: #00FF00, 밝기 100%, X=58%, Y=42%.
- 빛 3: #0000FF, 밝기 100%, X=50%, Y=58%.
- 초기 선택은 빛 1.
- 반경은 무대 짧은 변의 약 28%로 고정한다.
- 반경 안쪽 약 55%는 선명하게 유지하고 바깥쪽에서 투명해지게 한다.

첫 화면부터 세 빛이 겹치는 완성된 상태를 보여준다. 자동으로 떠다니거나 맥박처럼 반복하지 않는다.
안내: ‘빛의 색과 위치를 바꾸며 겹치는 부분을 살펴보세요.’

### 3. 합성 방식

한 개의 Canvas 2D에서 globalCompositeOperation='screen' 방식으로 통일한다.
CSS mix-blend-mode, Canvas lighter, 별도의 선형 가산 계산을 섞어 다른 결과가 나오게 하지 않는다.
밝기 0~100%는 globalAlpha 0~1에 대응하는 화면 합성 강도다. 빛 가장자리의 투명도와 함께 적용한다.

매번 다음 순서로 그린다.
1. source-over, globalAlpha=1로 무대를 불투명한 검정으로 채운다.
2. screen으로 전환해 세 빛의 색/강도/위치에 따라 원형 그라데이션을 그린다.
3. 합성과 투명도를 복구한다.
4. 선택 손잡이와 번호는 별도 HTML 레이어로 표시한다.

드래그 때 이전 그림이 누적되어 잔상이 남지 않게 한다.
결과색 계산기, 파장/lux/W 수치 표시는 추가하지 않는다.
정보 패널에 ‘이 도구는 화면에서 색을 합성하는 실험입니다. 밝기 %는 합성 강도이며 실제 광원의 파장이나 조도를 측정하는 값이 아닙니다.’라고 표시한다.

### 4. 컨트롤과 프리셋

빛 1/2/3 각각에 키보드로 접근 가능한 선택 버튼을 제공한다. 선택 버튼이나 손잡이의 pointerdown으로 selectedId를 바꾸고 X/Y 슬라이더와 선택 표시를 갱신한다. 손잡이가 완전히 겹치거나 밝기가 0%여도 패널에서 원하는 빛을 선택할 수 있어야 한다.
각 빛에 한국어 label이 있는 input type=color와 밝기 range를 제공한다.
현재 HEX와 밝기 %를 HTML로 읽을 수 있게 한다.
선택한 빛에는 X/Y 위치 슬라이더 0~100, step=1을 제공한다. 키보드로 드래그와 같은 위치 조절이 가능해야 한다.
색상과 슬라이더는 input 이벤트에서 즉시 반영한다.

프리셋:
- ‘RGB 겹치기’: 초기값.
- ‘빛 분리하기’: 색/밝기는 초기값, 위치는 (22,28), (78,28), (50,72)%.
- ‘따뜻한 교차’: #FF5A36/#FFC247/#5DCBFF, 밝기 90/65/50%, 위치는 초기 배치.

‘초기화’는 색/밝기/위치/선택 광원을 모두 초기값으로 되돌린다.
프리셋 적용 후 직접 값을 바꾸면 선택 표시를 해제하거나 ‘직접 조절 중’으로 바꾼다.
선택 상태는 번호와 테두리로도 표현한다. 밝기가 0%여도 손잡이와 조작부는 남아 있어야 한다.

### 5. 드래그와 좌표

각 빛 중앙에 최소 약 44px 조작 영역의 HTML 손잡이를 둔다.
손잡이에서 시작한 드래그만 포인터를 캡처한다. 손잡이에는 미리 touch-action:none을 설정하고 무대 전체에는 적용하지 않는다.
나머지 무대와 페이지에서는 세로 스크롤과 확대를 허용한다.
pointerup, pointercancel, lostpointercapture에서 드래그 상태를 정리하며 마지막으로 반영된 위치는 유지한다.
다중 터치는 첫 활성 드래그만 처리하고, 같은 광원을 여러 입력이 동시에 끌지 않게 한다.

좌표는 X/Y 각각 0~1로 저장하고 무대 안으로 제한한다.
포인터는 getBoundingClientRect 기준 CSS 픽셀에서 정규화한다. 여기에 DPR을 곱하지 않는다.
Canvas 내부 해상도만 표시 크기×DPR로 설정하고 그리기 좌표에서 한 번 스케일을 적용한다. DPR은 성능을 위해 최대 2로 제한할 수 있다.
리사이즈나 회전 후에도 같은 정규화 위치를 유지한다.

### 6. 상태/접근성/완료

state는 selectedId와 lights[{id,color,strength,x,y}] 정도로 둔다.
renderLights(state), syncControls(state)가 같은 값을 사용한다. 드래그와 슬라이더에 별도의 좌표를 보관하지 않는다.
연속 입력은 다음 프레임 한 번으로 모아 그린다. 입력이 없을 때 무한 RAF를 돌리지 않는다.
Canvas에는 목적 설명을 제공하고 모든 설정을 HTML로 조작할 수 있게 한다.
모션 감소에서는 손잡이 강조 확대 같은 보조 연출을 줄이고 직접 입력의 즉시 반응은 유지한다.
변화하는 값을 매 프레임 aria-live로 읽지 않는다.

RGB 겹침, 0%→100% 밝기, 드래그→슬라이더 전환, 프리셋→수동 조절→초기화를 확인한다.
손잡이 밖에서는 모바일 세로 스크롤이 되고, 취소된 드래그가 계속 움직이지 않아야 한다.
impeccable로 선택 표시/라벨/포커스/모바일 패널을 수정한다.
README에 화면 합성의 의미, 프리셋 데이터, 네 스킬 적용, Vercel 설정을 기록하고 실제 결과를 보고하라.

---
공식 구현 참고
Vercel 정적 배포: https://vercel.com/docs/builds/configure-a-build
HyperFrames 애니메이션 지침: https://github.com/heygen-com/hyperframes/blob/main/skills/hyperframes-animation/SKILL.md
주의: design-taste-frontend, ui-ux-pro-max, impeccable의 정확한 진입 명칭과 기능은 사용자 PC에 설치된 로컬 지침을 우선한다.
MDN Canvas 합성: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
MDN globalAlpha: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
MDN Pointer events: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events
MDN DPR: https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
```

### 주제 6 첫 프롬프트
```text
# 한 버튼 타이밍 게임 - Vercel 사이트 제작용 실행 프롬프트

너는 인터랙티브 웹사이트를 만드는 디자이너이자 프런트엔드 개발자다. 아래 공통 기준 1~5번과 주제별 요구사항을 실제로 구현하고 검수하라.

## 1. 네 가지 설치 스킬을 모두 실제로 사용한다

다음 스킬은 내 PC에 이미 설치되어 있다.

- design-taste-frontend
- ui-ux-pro-max
- hyperframes
- impeccable

설치된 스킬의 진입 지침과 SKILL.md를 읽고 실제 작업에 적용한다. 이름만 나열하거나 사용하지 않은 스킬을 사용했다고 보고하지 않는다.
작업 순서는 다음과 같다.

### 1단계: design-taste-frontend - 방향 잡기

주제에 맞는 미술 방향, 첫 화면 구도, 시각적 위계, 여백, 레이아웃을 결정한다.
구현 전에 다음을 짧게 정리하고 곧바로 작업을 진행한다.

- 사용자가 처음 볼 대표 장면.
- 사용자가 직접 조작할 핵심 행동.
- 가장 인상적으로 기억할 한 장면.
- 큰 대상과 작은 설명의 관계.
- 모바일에서 구도를 바꾸는 방법.

### 2단계: ui-ux-pro-max - 색과 글꼴 구체화

정한 방향에 맞는 색상과 글꼴 자료를 검토하고 실제 디자인 토큰에 반영한다.
한글 지원, 제목과 본문의 조합, 글자 크기, 행간, 대비, 버튼과 입력 요소의 가독성을 확인한다.
주제별로 제안된 HEX 색상은 출발점이다. 사진이나 배경과 충돌하면 가독성을 기준으로 조정한다.

### 3단계: hyperframes - 모션 제작과 웹 연결

설치된 모션과 애니메이션 지침에서 필요한 패턴 2~4개를 선택한다. 필요한 경우 설치된 hyperframes-animation의 레시피를 읽는다.
타이밍, 전환, 가림 관계, easing을 설계하고 HTML/CSS/JavaScript 모션 원본에 실제로 적용한다.
완성한 모션은 웹의 스크롤, 클릭, 선택 상태, 게임 결과 등에 연결한다. 사용자의 조작이 화면 변화의 원인이 되어야 한다.
최종 산출물은 Vercel에 배포할 인터랙티브 웹사이트다. MP4/WebM 렌더나 영상 플레이어 제작을 기본 작업에 포함하지 않는다.
웹 입력, 상태, 게임 판정과 장식 모션을 분리한다. 영상 컴포지션 전용 시간 규칙을 웹 전체에 기계적으로 적용하지 않는다.

### 4단계: impeccable - 완성도 점검과 실제 수정

첫 구현 후 설치된 검수와 정리 기능을 사용해 다음을 확인한다.

- 레이아웃과 시각적 위계.
- 글꼴, 행간, 여백, 대비.
- 모바일 크롭과 조작 영역.
- 키보드 포커스와 선택 상태.
- 과도한 모션과 읽기를 방해하는 효과.
- 로딩, 취소, 재진입, 연속 입력에서의 상태 누락.

발견한 문제를 실제로 수정하고 영향을 받은 화면을 다시 확인한다. 문제 목록만 작성하고 작업을 끝내지 않는다.
README에 네 스킬이 실제로 바꾼 결정, 구현, 수정 사항을 짧게 기록한다. 이 개발 기록은 사이트 사용자 화면에 노출하지 않는다.
설치된 스킬의 실제 진입 이름과 지원 범위를 따른다. 존재하지 않는 명령, API, 웹 SDK를 만들지 않는다.

## 2. 기술 기준

HTML, CSS, JavaScript를 사용한다. React, TypeScript, Vite, 번들러를 새로 도입하지 않는다.
모션은 CSS, SVG, Canvas, Web Animations API로 구현한다. GSAP이 꼭 필요한 경우 브라우저용 배포본을 버전 고정한 로컬 자산으로 사용한다.
DB, 로그인, 외부 LLM, 실시간 외부 API를 기본 기능으로 추가하지 않는다.
본문과 조작부는 실제 HTML로 만든다. Canvas나 SVG의 장식 그래픽 때문에 버튼, 설명, 접근성을 잃지 않게 한다.

## 3. 파일과 경로

지금 열려 있는 폴더(ai-site)가 사이트의 문서 루트다. 이 폴더의 루트에 파일을 만들고, 3장에서 만든 첫 index.html은 이 사이트로 교체한다.
기본 구성:

- index.html
- styles.css
- js/data.js
- js/scene.js
- js/app.js
- assets/
- README.md

불필요한 파일은 줄여도 된다.
HTML에서는 ./styles.css, ./js/app.js처럼 상대 경로를 사용한다.
분리한 JavaScript는 브라우저 ES 모듈로 구성하고 다음과 같이 연결한다.
<script type="module" src="./js/app.js"></script>
번들링 없이 정적 HTTP 환경에서 상대 경로 import가 동작하게 한다.
JS에서 자산 URL을 해석해야 한다면 new URL('../assets/파일명', import.meta.url)을 사용한다.
외부 자산은 사용 조건을 확인해 로컬에 둔다. 사이트의 자료 출처에서 제작자, 원본 링크, 이용 조건, 수정 여부를 읽을 수 있게 한다.

## 4. Vercel 배포

이 폴더는 3장에서 Vercel 프로젝트와 연결해 두었으므로, GitHub의 main에 올리면 자동으로 배포되어 /에서 열린다.
새 순수 정적 프로젝트로 설정해야 한다면 기본 설정은 다음과 같다.

- Framework Preset: Other
- Build Command: Override를 켜고 빈값
- Output Directory: Override를 켜고 .
- Root Directory: 실제 배포할 정적 문서 루트

기존 프레임워크 사이트라면 전체 빌드 설정을 덮어쓰지 않는다. 실제 정적 공개 위치와 라우팅을 확인해 반영한다.
포괄적인 SPA rewrite를 임의로 추가하지 않는다. 필요한 경우에만 최소한의 vercel.json을 작성한다.

## 5. 완료 기준

390px 모바일과 1440px 데스크톱, 키보드 조작, 모션 감소 설정을 확인한다.
정적 HTTP 미리보기에서 직접 접속, 새로고침, 자산 404, 콘솔 오류를 확인한다. file:// 실행만으로 완료 판정하지 않는다.
연결된 Vercel 프로젝트와 권한이 있으면 Preview 배포 후 실제 URL에서 검수한다. 접근이 없으면 소스와 배포 안내를 완성하고 실제로 실행하지 못한 단계를 정확히 보고한다.
최종 보고에는 구현한 기능, 실제 검수한 동작, 네 스킬의 적용 결과, 배포 여부와 남은 사항을 포함한다.

## 주제 - 한 버튼 타이밍 게임

위 네 스킬과 공통 기준을 적용해 움직이는 대상을 정확한 순간 멈추는 브라우저 게임을 실제로 구현하라.

프로젝트명: ON THE DOT
제목: 딱, 지금.
기본 위치: 지금 열려 있는 폴더(ai-site)의 루트
기본 접속: /

### 1. 이번 구현 범위와 스킬 적용

하나의 트랙, 왕복하는 이동체 하나, 중앙 목표 구간, 게임 진행 버튼 하나, 정확히 다섯 라운드와 합계 점수를 만든다.
게임 시작 전 속도 선택(보통/느리게)만 제공한다. 기록 저장, 순위표, 계정, 아이템, 확률 보상, 다른 게임 모드는 추가하지 않는다.

- design-taste-frontend: 트랙과 STOP 버튼에 시선이 모이는 간결하고 강한 게임 화면.
- ui-ux-pro-max: 읽기 쉬운 점수/라운드 숫자, 목표 대비, 누르기 편한 버튼.
- hyperframes: 멈춤 표시, 점수 등장, 결과 강조의 짧은 피드백 모션.
- impeccable: 상태별 버튼 문구/비활성 상태/포커스/모바일 크기/불필요한 흔들림 검수.

이동체의 위치 계산, 입력 시각, 판정은 게임 로직이 담당한다. hyperframes의 결과 연출이 좌표나 점수를 변경하지 않는다.

### 2. 시각 방향

출발 색은 어두운 배경 #0B1020, 밝은 글자 #F5F7FC, 목표 민트 #6EF0C2, 강조 코럴 #FF7D82다.
상단에는 제목과 ‘가운데에 가까울수록 높은 점수.’를 짧게 보여준다.
중앙에 긴 트랙과 목표 영역을 두고, 아래에 같은 실제 button 요소 하나를 크게 배치한다.
하단에는 현재 라운드와 다섯 결과 슬롯을 배치한다.
목표 중심선은 항상 보이고 100점 영역은 미세한 밝은 띠로 구분한다.
이동체는 단순한 원 또는 둥근 사각형으로 한다. 판정을 흐리는 잔상과 큰 그림자는 기본으로 사용하지 않는다.

### 3. 상태와 버튼

같은 button DOM을 유지하고 상태에 따라 문구와 동작을 바꾼다.
- READY / ‘게임 시작’: 1라운드 시작.
- RUNNING / ‘STOP’: 현재 위치 확정/채점.
- PAUSED / ‘이어서 하기’: 같은 라운드의 멈춘 위치에서 재개.
- ROUND_RESULT / ‘다음 라운드’: 다음 라운드를 사용자가 시작.
- SUMMARY / ‘다시 하기’: 다섯 결과를 초기화하고 새 게임 시작.

5라운드를 채점한 직후 SUMMARY로 전환한다. 라운드당 0~100점, 총점 0~500점이다.
라운드 사이에 자동으로 시작하지 않는다.
속도는 시작 전에 선택하고 한 게임 동안 유지한다. 보통 왕복 주기는 3초, 느리게는 5초다.
모션 감소 설정에서는 첫 기본값을 느리게로 하고 화면 흔들림/입자/강한 확대를 끈다.
핵심 이동을 포함한 게임을 숨기지 말고 사용자가 시작한 뒤 조작하게 한다.

### 4. 위치와 판정

x는 이동체 중심이 움직일 수 있는 안전한 구간의 0~1 좌표다.
실제 픽셀은 반지름 + x×(트랙 내부 너비−반지름×2)로 변환해 이동체가 잘리지 않게 한다.
목표 중심은 x=0.5이며 이동체의 중심으로 판정한다. 그림자나 가장자리를 판정에 사용하지 않는다.

elapsed와 period의 단위는 초로 통일한다.

x = 0.5 - 0.5 * cos(2 * PI * elapsed / period)
d = abs(x - 0.5)

EPS = 1e-12
score = d <= 0.01 + EPS
  ? 100
  : max(0, min(99, round((0.11 - d) * 1000)))

기준 사례:
- d=0 또는 0.01: 100점.
- d=0.03: 80점.
- d=0.06: 50점.
- d>=0.11: 0점.
- 실제 x=0.49, 0.50, 0.51도 모두 100점. EPS는 경계 계산의 부동소수점 오차만 처리한다.

100점 영역은 x=0.49~0.51로 실제 표시한다. 점수가 생기는 전체 구간은 0.39~0.61 안쪽이다.
결과는 100점 ‘PERFECT’, 80~99점 ‘아주 가까워요’, 1~79점 ‘조금만 더’, 0점 ‘다음 타이밍에!’처럼 점수와 함께 표시한다.
화면 크기가 바뀌어도 정규화 좌표와 판정은 같아야 한다.
무작위 속도나 예고 없는 목표 이동을 넣지 않는다.

### 5. 입력 중복 방지

게임 상태를 바꾸는 활성화 이벤트는 주 버튼의 click 처리 함수 한 곳으로 통일한다.
pointerdown, touchstart, keydown에서 별도로 시작하거나 채점하지 않고 keydown에서 .click()을 수동 호출하지 않는다.
버튼의 기본 마우스/터치/Space/Enter 조작을 유지한다. 문서 전체의 Space를 가로채지 않는다.
버튼에 포커스가 있을 때 Space/Enter의 반복 keydown은 event.repeat를 확인해 preventDefault로 막되 최초 기본 활성화는 유지한다.
이 게임에서 정지 입력의 기준은 클릭/탭 활성화가 완료된 순간이다.

STOP 처리 진입 즉시 중복 입력을 잠가 같은 라운드를 두 번 합산하지 않는다. 유효한 렌더 기록을 선택한 뒤에만 점수를 확정한다. 기록 문제로 일시정지한 라운드는 미채점 상태로 남겨 재개할 수 있게 한다.
빠른 더블클릭 방지를 위해 시작/재개 후 250ms, 채점 후 400ms의 입력 잠금을 둔다.
acceptAfter와 입력 시각을 비교해 잠금을 처리하고 aria-disabled 표시와 실제 이벤트 가드를 함께 적용한다.
버튼 DOM과 포커스를 보존한다. 결과는 aria-live=polite로 한 번 안내하고 위치를 매 프레임 읽지 않는다.

### 6. 정지 화면과 채점에 같은 좌표 사용

이동은 단일 requestAnimationFrame 루프의 경과시간으로 계산한다. 프레임마다 고정 픽셀을 더하거나 독립 CSS animation으로 이동시키지 않는다.
매 라운드 시작 시 elapsed=0, x=0을 즉시 그리고 초기 기록을 만든 뒤 RAF를 시작한다.
재개 시에도 저장한 위치를 초기 기록으로 확정한다. 시작/재개 후 첫 RAF 콜백에서 기준 시각을 잡고 비활성 시간을 제외한다.

각 프레임에서 위치를 DOM에 반영한 뒤 {committedAt, elapsed, x, roundId}를 기록한다.
committedAt은 같은 time origin의 performance.now()로 두고 최근 약 2초와 그 직전 기록 하나만 보관한다.
STOP에서는 event.timeStamp 이하인 같은 라운드 기록 중 가장 최근 것을 선택한다.
선택한 x를 정지 화면에 적용하고 바로 그 x로 점수를 계산한다.
STOP 처리 순간의 새 performance.now()로 미래 위치를 계산해 화면과 다른 좌표를 채점하지 않는다.
사용할 수 없는 타임스탬프에는 마지막 반영 기록을 쓰고, 정상 시각이 기록 범위보다 오래되어 대응 기록이 없으면 점수를 추측하지 말고 같은 라운드를 일시정지한다.

RAF를 취소하고 이미 예약된 콜백도 상태와 roundId를 확인하게 한다.
이 규칙은 정지 표시와 판정의 내부 일관성을 위한 것이다. 브라우저에 기록한 시각을 물리적 디스플레이의 정확한 표시 시각이라고 주장하지 않는다.

### 7. 일시정지/결과/모바일

RUNNING에서만 탭 숨김 또는 창 포커스 상실을 감지해 마지막 위치와 경과시간을 보관하고 PAUSED로 전환한다. READY, ROUND_RESULT, SUMMARY에서는 현재 상태와 결과를 유지한다.
돌아왔을 때 자동으로 움직이지 않는다. ‘이어서 하기’를 누르면 같은 위치에서 재개한다.
창 크기 변경은 같은 x를 새 트랙 크기로 다시 그리는 작업이며 새 게임이나 오차 변경이 아니다.
속도 변경은 READY/SUMMARY에서만 허용한다. 게임 도중 선택 모드를 몰래 바꾸지 않는다.

정지 좌표는 그대로 유지한 채 hyperframes로 작은 표시선/점수 등장 효과를 약 200~350ms에 적용한다.
입력 잠금과 결과 연출이 완료된 뒤에도 다음 라운드는 사용자가 시작한다.
색 외에 숫자와 문구로 결과를 구분한다. 390px에서도 트랙과 버튼이 잘리지 않게 한다.

### 8. 완료 조건

위 판정 기준 사례와 실제 x=0.49/0.50/0.51 경계, 5라운드 합계, 5라운드 직후 SUMMARY 전환을 확인한다.
빠른 두 번 클릭, Space/Enter 길게 누르기, 터치, 키보드, 탭 전환, 재개, 화면 크기 변경을 확인한다.
정지한 이동체와 채점에 사용한 x가 같고 한 라운드가 두 번 기록되지 않아야 한다.
impeccable로 상태별 버튼/포커스/점수 가독성/불필요한 효과를 수정한다.
README에 판정식, 입력 기준, 일시정지 규칙, 네 스킬 적용, Vercel 설정을 기록하고 실제 검수 결과를 보고하라.

---
공식 구현 참고
Vercel 정적 배포: https://vercel.com/docs/builds/configure-a-build
HyperFrames 애니메이션 지침: https://github.com/heygen-com/hyperframes/blob/main/skills/hyperframes-animation/SKILL.md
주의: design-taste-frontend, ui-ux-pro-max, impeccable의 정확한 진입 명칭과 기능은 사용자 PC에 설치된 로컬 지침을 우선한다.
MDN click: https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event
MDN event.timeStamp: https://developer.mozilla.org/en-US/docs/Web/API/Event/timeStamp
MDN requestAnimationFrame: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
```

### 도시 1단계 점검 부탁
```text
"밤" 버튼을 눌러도 화면이 바뀌지 않습니다. 코드를 다시 읽고 원인을 찾아 고쳐 주세요.
무엇을 고쳤는지 쉬운 말로 한두 줄만 알려 주세요.
```

### 도시 2단계 창문 불빛
```text
좋습니다. 이어서 2단계를 만들어 주세요. 지금 있는 것은 그대로 두세요.

2단계: 창문 불빛
- 건물마다 창문을 여러 개 그려 주세요.
- 낮에는 창문이 꺼져 있고, "밤"을 누르면 창문이 한꺼번에 켜지지 않고 0.1초 정도씩 시간 차를 두고 하나씩 켜집니다.
- 일부 창문은 꺼진 채로 남겨 두어서 사람이 사는 느낌이 나게 해 주세요.
- 창문 색은 따뜻한 노란색으로 해 주세요.
- "낮"을 누르면 불이 다시 꺼집니다.
```

### 도시 3단계 자동차
```text
이어서 3단계를 만들어 주세요. 지금 있는 것은 그대로 두세요.

3단계: 자동차
- 도로 위를 왼쪽에서 오른쪽으로 지나가는 자동차 한 대를 만들어 주세요. 네모와 동그라미를 조합한 단순한 모양이면 됩니다.
- 화면 끝에 도착하면 다시 왼쪽에서 천천히 나타나 계속 반복합니다.
- 밤에는 자동차에 헤드라이트 불빛이 켜진 것처럼 보이게 해 주세요.
```

### 도시 4단계 날씨
```text
이어서 4단계를 만들어 주세요. 지금 있는 것은 그대로 두세요.

4단계: 날씨
- 화면 오른쪽 위에 "맑음", "비", "눈" 버튼을 만들어 주세요.
- "비"를 누르면 짧은 선들이 하늘에서 떨어지고, "눈"을 누르면 작은 동그라미들이 천천히 흩날립니다. "맑음"을 누르면 모두 사라집니다.
- 날씨는 낮과 밤 어느 쪽에서도 똑같이 동작해야 합니다.
- 비가 오는 동안 하늘이 조금 더 어두워지게 해 주세요.
```

### 브리프 인터뷰 시작
```text
지금부터 내가 만들 인터랙티브 사이트의 브리프(설계서)를 같이 만들자. 바로 만들지 말고 먼저 나를 인터뷰해줘.

진행 방식:
- 질문은 한 번에 하나씩만 해줘.
- 질문마다 내가 고를 수 있는 보기 2~3개와 너의 추천을 함께 줘. 내가 "추천대로"라고 하면 추천을 쓰면 돼.
- 8~12개 질문으로 아래 내용을 채워줘: 목적과 보는 사람, 주제와 주인공, 분위기 단어 3개, 색, 장면 구성(장면마다 무엇이 보이는지), 스크롤하면 바뀌는 것, 누르면 바뀌는 것, 들어갈 문구, 하지 말 것, 휴대폰에서의 모습, 완성 기준.
- 질문이 끝나면 아래 목차 그대로 브리프를 써서 brief-v1.md 로 저장해줘. 아직 사이트는 만들지 마.

브리프 목차:
1. 제작 목표와 확정 사양
2. 아트 디렉션(색, 조명, 글꼴)
3. 장면(장면마다 스크롤 위치, 보이는 것, 움직임, 문구)
4. 상호작용(스크롤, 누르기, 끌기)
5. 하지 말 것
6. 확인 기준

내 주제는 [내 주제]야. 첫 질문부터 시작해줘.
```

### 브리프 깎기
```text
brief-v1.md 를 다시 읽고, 아직 막연해서 만드는 사람마다 결과가 달라질 곳을 3군데 찾아줘.
- 각 곳마다 왜 막연한지 한 줄로 설명하고, 나에게 질문을 하나씩 해줘(보기 2~3개와 추천 포함).
- 숫자로 정할 수 있는 것(시간, 크기, 개수, 색 코드)은 숫자로 바꾸자고 제안해줘.
- 내 답을 반영해서 brief-v2.md 로 저장하고, v1과 달라진 점을 목록으로 보여줘.
```

### 브리프와 강사 프롬프트 비교
```text
내 브리프 brief-v2.md 와 아래 강사 프롬프트를 비교해줘. 파일은 고치지 마.
- 표로 정리해줘: 항목(목표와 사양, 아트 디렉션, 장면, 상호작용, 하지 말 것, 확인 기준) / 내 브리프 / 강사 프롬프트 / 차이.
- 강사 프롬프트에는 있는데 내 브리프에 없는 것, 내 브리프가 막연하게 쓴 것, 숫자로 정할 수 있었던 것을 각각 3개씩 뽑아줘.
- 마지막으로 내 브리프에서 가장 먼저 고칠 한 곳을 추천해줘.

[강사 프롬프트를 여기에 붙여넣기]
```

### 비교용 짧은 프롬프트: 심해 탐험
```text
스크롤을 내리면 바닷속으로 점점 내려가는 심해 탐험 사이트의 첫 버전을 만들어 주세요.

구간은 3개입니다.
1. 수면: 밝은 하늘색 배경, 잔잔하게 흔들리는 물결.
2. 바닷속: 배경이 점점 짙은 파랑으로 바뀌고, 물고기가 서로 다른 속도로 지나갑니다. 기포가 위로 떠오릅니다.
3. 심해: 거의 검은 배경에 작은 빛이 반짝이고, 생물이 나타납니다.

생물은 [3종류, 이름은 Claude가 추천]으로 하고, 생물을 누르면 한두 문장짜리 소개 카드가 열리게 해 주세요.
화면 한쪽에 지금 어느 깊이인지 숫자로 보여 주세요.

조건:
- 저는 코딩을 모릅니다. 어려운 말은 쉬운 말로 설명해 주세요.
- 서버나 데이터베이스 없이, 브라우저에서 열리는 HTML, CSS, JavaScript 파일만 쓰세요.
- 처음에는 사진 없이 도형과 여러 겹의 배경색으로 표현해 주세요.
- 휴대폰 화면에서도 보이게 해 주세요.
- 만들기 전에 꼭 필요한 질문만 3개 이내로 먼저 물어봐 주세요.
- 다 만들면 어떻게 열어서 확인하는지 알려 주세요.
```

### 강사 프롬프트: 심해 탐험 (연출 우선)
```text
# 스크롤로 내려가는 심해 탐험 - 연출 우선 프롬프트 (AI 이미지판)

너는 해양 다큐멘터리의 타이틀 시퀀스를 만드는 모션 디자이너이자 프런트엔드 개발자다.
수면에서 4,000m 아래까지 내려가며 여섯 생명을 만나는 심해 탐험 사이트를 만들어라.
제목은 "빛을 만드는 바다.", 부제는 "수면에서 4,000m까지, 여섯 생명을 만나러 내려갑니다."

## 1. 사용자가 느껴야 할 것

- 페이지를 열자마자 "와" 하는 순간이 있다. 약 12초짜리 오프닝 모션이 자동으로 재생된다.
- 스크롤할 때마다 바다가 살아 있다. 멈춰 있어도 해양설이 흐르고, 생물은 헤엄치고, 빛은 일렁인다.
- 깊이마다 직접 해 보는 행동이 하나씩 있다. 누르고, 비추고, 바꿔 보면 생물이 반응한다.
- 마지막에는 조용한 어둠 속에서 덤보문어와 마주하며 끝난다.

## 2. 그림: 이미지 생성 도구로 만든다

그림 품질이 이 사이트의 절반이다. 도형으로 그린 생물은 쓰지 않는다.
이미지 생성 도구(예: Figma MCP의 generate_image)로 아래 7장을 만든다(정어리 떼는 수면 사진 안에 함께 그린다).

- 수면 바로 아래: 청록빛 물, 위에서 쏟아지는 빛줄기, 소용돌이치는 정어리 떼. 가로형. (오프닝 마지막과 햇빛층에 함께 쓴다)
- 박명층 배경: 위에서 아주 희미한 빛, 짙은 남색, 해양설만 있는 빈 바다. 가로형.
- 생물 5장: 샛비늘치 무리(배 쪽에 줄지은 청록 발광점), 아톨라해파리(붉은 원반 몸, 홈이 있는 고리, 긴 촉수 하나), 초롱아귀(검은 둥근 몸, 빛나는 미끼), 펠리칸장어(작은 머리, 주머니처럼 큰 턱, 아주 긴 꼬리 끝의 작은 발광기관), 덤보문어(귀 같은 지느러미, 막으로 이어진 짧은 팔).

생성 규칙:
- 사실적인 다큐멘터리 사진 느낌, 글자 없음.
- 생물은 모두 "순수한 검은 단색 배경" 위에 생성한다. 화면에서 mix-blend-mode: screen으로 합성하면 배경이 사라진다.
- 블렌드는 이미지가 아니라 가장 바깥 레이어(생물을 감싼 요소)에 건다. transform이나 opacity가 걸린 부모 안에서 블렌드하면 검은 사각형이 보인다.
- 생성한 이미지는 검은색 기준점을 조금 끌어내려(배경을 완전한 검정으로) WebP로 줄여 저장한다.
- 생성 결과를 실제 생물과 비교해 틀리면 다시 만든다. 예: 펠리칸장어에 송곳니가 있거나, 덤보문어 팔이 일반 문어처럼 따로 말려 있으면 실패. 다시 만들 때는 "송곳니 없음", "팔이 막으로 이어진 우산 모양"처럼 틀린 점을 직접 적는다.
- 자료 출처 패널에 "AI 생성 이미지라 실제 생물과 다를 수 있다"고 밝힌다.

## 이미지 생성 도구가 없을 때

Claude Code는 이미지 생성 도구가 연결돼 있지 않으면 사진 같은 이미지를 직접 만들 수 없다.
그럴 때는 도형으로 대충 그리지 말고, 먼저 나에게 아래 셋 중 무엇으로 할지 물어본다.
1. 내가 ChatGPT 같은 이미지 생성 서비스에서 만들어 폴더에 넣기: 맨 아래 부록의 생성 문장을 그대로 쓰고, 넣을 폴더와 파일 이름을 알려 준다.
2. 이용 조건이 확인된 공개 사진 쓰기: NOAA 같은 미국 정부 기관 사진(퍼블릭 도메인)이나 Wikimedia Commons의 CC 사진. 제작자, 원본 링크, 라이선스를 자료 출처에 적는다.
3. 일단 간단한 임시 그림으로 먼저 완성하기: 나중에 assets/img 안의 같은 파일 이름으로 바꿔 넣기만 하면 되게 만들고, 어느 파일을 바꾸면 되는지 README에 적는다.
대답이 없으면 3번으로 먼저 완성하고, 1번과 2번 방법을 보고에 남긴다.

## 3. 오프닝 (약 12초, 자동 재생)

- 0 - 1초: 완전한 어둠.
- 1 - 7초: 덤보문어, 펠리칸장어, 초롱아귀, 아톨라해파리, 샛비늘치가 한 마리씩 1.25초 간격으로 스쳐 간다(살짝 커지며 나타나고 사라짐, 아래에 이름).
- 7 - 10초: 어둠이 걷히며 수면 이미지가 아래에서 떠올라 커졌다가 자리 잡고, 빛줄기가 켜진다. 기포가 올라온다.
- 9 - 12초: 제목 두 줄, 부제, "내려가기"와 "오프닝 다시 보기" 버튼이 차례로 떠오른다.
- "건너뛰기" 버튼을 두고, 사용자가 스크롤을 시작하면 오프닝을 바로 끝낸다.
- 오프닝의 마지막 모습이 곧 첫 화면이다. JavaScript가 없거나 동작 줄이기 설정이면 처음부터 그 모습을 보여 준다.

## 4. 장면과 행동

각 장면은 화면 높이의 약 2배(펠리칸장어는 3배) 스크롤 구간에 화면 하나를 고정(sticky)하고, 그 구간의 진행률로 연출한다.
왼쪽 아래에 깊이, 제목, 두세 문장 설명, 버튼을 둔다. 오른쪽 위 고정 표시에 현재 수심을 보여 준다.

1. 햇빛층 0 - 200m, 정어리: 사진이 천천히 멀어지고 아래쪽부터 물빛이 어두워진다. 화면을 누르거나 "물결 일으키기"를 누르면 그 자리에서 물결이 퍼진다.
2. 박명층 200 - 1,000m, 샛비늘치: "낮"/"밤" 버튼. 낮에는 무리가 아래쪽에 흐리게, 밤에는 위쪽으로 1.6초 동안 떠오른다. 아래에 지금 상태를 한 줄로 알려 준다.
3. 1,000 - 1,600m, 아톨라해파리: 해파리를 누르거나 "건드려 보기"를 누르면 파란 빛이 몸 둘레를 바퀴처럼 돈다(약 2.8초).
4. 1,600 - 2,200m, 초롱아귀: 화면이 거의 검고 미끼의 빛만 보인다. "관측등 켜기"를 누르면 원형 빛으로 몸이 드러나고, 데스크톱에서는 마우스를 따라간다. 휴대폰과 키보드에서는 물고기 가운데를 비춘다.
5. 2,200 - 3,000m, 펠리칸장어: 스크롤하는 동안 긴 몸이 화면을 오른쪽에서 왼쪽으로 가로지른다. 꼬리 끝 빛이 깜빡인다.
6. 3,000 - 4,000m, 덤보문어: 좁은 관측 창 속에 덤보문어가 고정된 채 천천히 떠 있고, 그 위로 마지막 목록이 올라온다. "4,000m. 이번 탐험은 여기까지입니다.", 여섯 생물 도감 목록, "수면으로 돌아가기".

반복 모션(유영, 맥동, 기포, 미끼와 꼬리 빛)은 그 장면이 화면에 보일 때만 돌린다.
해양설은 화면 전체에 캔버스로 그린다. 스스로 천천히 가라앉고, 내려갈수록 화면 위로 흘러가며, 깊을수록 잘 보인다.

## 5. 도감 카드

생물을 누르거나 도감 버튼을 누르면 카드가 열린다: 번호, 분류, 이름, 학명, 알려진 서식 깊이, 크기, 특징 2 - 3개, 출처 링크.
사실 정보는 MBARI, NOAA, Australian Museum, WHOI 같은 공식 자료에서 직접 확인한 것만 쓰고, 출처에 없는 숫자는 "출처에 없음"이라고 적는다.
화면 속 수심과 생물의 실제 서식 깊이는 다를 수 있으니, 화면은 연출이라는 점을 카드와 정보 패널에 밝힌다.

## 6. 꼭 지킬 것

- HTML/CSS/JavaScript만 사용하고, 지금 폴더의 index.html에서 바로 열리게 한다. 글꼴과 이미지는 폴더 안에 둔다.
- 글과 버튼은 진짜 HTML. 모든 조작은 버튼이라 키보드로 쓸 수 있다.
- 휴대폰(390px)에서는 생물을 위쪽에, 글과 버튼을 아래쪽에 두어 겹치지 않게 한다.
- 동작 줄이기 설정에서는 오프닝과 반복 모션을 멈추고, 버튼 기능은 그대로 둔다.

## 7. 진행 방식

1. 이미지부터 만들고, 생물이 실제와 다른 것은 다시 만든다.
2. 사이트를 만든 뒤 데스크톱(1440px)과 휴대폰(390px)에서 오프닝, 여섯 장면, 버튼, 도감을 직접 확인하고 어색한 곳을 고친 다음 보고한다.

## 부록: 이미지 생성 문장 (그대로 복사해 이미지 생성 서비스에 붙여 넣기)

- surface.png (가로 16:9): Photorealistic underwater wide shot just below the ocean surface. Bright turquoise sunlit water, rippling surface visible at the top with sun glints, strong god rays slanting down, a large swirling school of silver sardines forming a loose spiral in the middle distance, small bubbles, open blue water fading darker toward the bottom of the frame. Cinematic nature documentary look, no people, no text, no logos.
- twilight.png (가로 16:9): Photorealistic deep ocean twilight zone, about 500 meters deep. Dark navy to deep blue gradient water, a very faint dim blue glow from far above, tiny drifting white particles of marine snow, empty open water with no animals, no seafloor, calm and vast. Cinematic, no text.
- lanternfish.png (가로 3:2): Photorealistic macro photo of a small group of four lanternfish (family Myctophidae) swimming, slender dark silver bodies, very large eyes, rows of small round glowing blue-green photophores along the belly and sides. Isolated on a pure solid black background, deep sea, scientific documentary style, sharp detail, no text.
- atolla.png (세로 4:5): Photorealistic deep-sea crown jellyfish Atolla wyvillei, deep red disc-shaped bell with a ring-shaped groove and scalloped edge, many short stiff tentacles around the rim and one single very long trailing tentacle, faint blue bioluminescent points around the bell edge. Isolated on a pure solid black background, scientific deep sea documentary style, no text.
- anglerfish.png (가로 3:2): Photorealistic female deep-sea anglerfish (humpback anglerfish, Melanocetus johnsonii), round black velvety body, huge mouth with long needle-like teeth, a thin fishing-rod spine on the head ending in a softly glowing pale blue lure. Isolated on a pure solid black background, deep sea documentary style, no text.
- gulper.png (가로 16:9): Scientifically accurate photorealistic pelican eel (Eurypharynx pelecanoides) in side view, swimming left to right. Its head is tiny with very small eyes, but its loosely hinged mouth is enormous, a huge dark pouch-like jaw much larger than the head, like a pelican's pouch, with only tiny teeth (no fangs). The body is thin, black and smooth with no scales, tapering into an extremely long whip-like tail that trails off to the left and ends in a small softly glowing pink-red light organ. Isolated on a pure solid black background, deep sea documentary photo, no text.
- dumbo.png (정사각형): Scientifically accurate photorealistic dumbo octopus (genus Grimpoteuthis), as filmed by a deep-sea ROV. Pale lavender-pink semi-translucent bell-shaped mantle, two large ear-like fins sticking out from the sides of the top of the mantle, eight short arms fully joined by a continuous web of skin forming an umbrella with finger-like cirri, gently hovering. Not a common octopus: no long free curling arms, no big suckers. Isolated on a pure solid black background, soft lighting, no text.
```

### 막혔을 때 원인 찾기 (5장)
```text
[몇 번째 단계, 예: 주제 고르기 / 브리프 인터뷰 / 브리프 깎기 / 강사 프롬프트 비교]에서 막혔어요.
상황이나 나온 문구는 아래와 같아요.
[상황이나 오류 문구를 그대로 붙여넣기]
ai-site 폴더의 brief-v1.md, brief-v2.md 상태를 먼저 확인해서 원인을 쉬운 말로 설명해줘. 해결 방법은 한 단계씩 알려주고, 파일을 바꾸는 작업은 하기 전에 무엇을 할지 먼저 알려줘.
```

### 5장 완료 확인
```text
5장 결과물이 제대로 되어 있는지 확인해줘. 파일은 아무것도 바꾸거나 올리지 말고 확인만 해줘.
1. 지금 폴더가 ai-site 인지
2. brief-v1.md 가 있고, 목차 6개(목표와 사양, 아트 디렉션, 장면, 상호작용, 하지 말 것, 확인 기준)가 모두 채워져 있는지
3. brief-v2.md 가 있고, v1보다 구체적으로(숫자나 색 코드 등) 바뀌었는지
4. brief-v2.md 에서 내가 고른 주제(공통 실습 도시의 하루 또는 자유 선택)가 분명히 드러나고, 첫 버전 범위가 장면 3개 이내인지
각 항목을 O 또는 X로 표로 정리해줘. X가 있으면 원인과 해결 방법을 알려주고, 모두 O이면 "완료"라고 답해줘.
```

## 06 프롬프트로 만들기

### 브리프로 1단계 시작
```text
이 폴더의 brief-v2.md(없으면 가장 최근 버전의 브리프)를 먼저 읽어줘.
- 읽은 내용을 다섯 줄로 요약하고, 만들기 전에 꼭 확인할 것이 있으면 질문 하나만 해줘.
- 그다음 이 장의 단계 순서대로 진행하되, 지금은 1단계(화면 구성)만 만들어줘. 모션과 상호작용은 다음 단계에서 할 거야.
- 브리프와 다르게 만들어야 하는 곳이 생기면 바꾸기 전에 먼저 나에게 물어봐줘.
```

### 스킬 설치 확인
```text
이 세션에서 쓸 수 있는 스킬 중에 design-taste-frontend, impeccable, ui-ux-pro-max가 있는지 확인해 주세요.
있는 것은 각각 한 줄로 어떤 일을 하는 스킬인지 알려 주세요.
없는 것은 이름만 알려 주세요.
```

### 기획 메모 만들기
```text
인터랙티브 웹사이트를 하나 만들려고 합니다. 아직 코드는 쓰지 말고, 기획부터 저와 같이 정리해 주세요.

저는 코딩을 모르는 사무직입니다. 쉬운 말로 질문해 주세요.
후보 주제는 "도시의 하루", "심해 탐험"입니다. (제 주제가 따로 있다면: [내 주제])

아래 4가지를 질문 하나씩 차례로 물어봐 주세요. 질문마다 보기를 2~3개 같이 주세요.
1. 주제 한 줄
2. 분위기를 나타내는 단어 3개
3. 장면 목록 (화면이 위에서 아래로, 또는 시간 순서로 어떻게 이어지는지 3~5개)
4. 사용자가 하는 행동 (스크롤, 클릭, 슬라이더 중 무엇인지)

4가지가 다 정해지면 이 폴더의 README.md 맨 아래에 "기획 메모" 항목으로 정리해 주세요.
README.md가 이미 있으면 기존 내용은 지우지 말고 아래에 덧붙여 주세요.
```

### 스크린샷 보여 주며 부탁
```text
첨부한 화면을 봐 주세요. 빨간 동그라미로 표시한 부분이 문제입니다.
[무엇이 어떻게 보이는지, 예: 건물이 화면 오른쪽 밖으로 잘려 있습니다]
이 부분만 고쳐 주세요. 다른 곳은 바꾸지 마세요.
```

### 지금 상태 저장(커밋)
```text
지금 상태를 저장(커밋)해 주세요. 커밋 메시지는 "[방금 한 일을 한 줄로, 예: 시간 슬라이더 추가]"로 해 주세요. GitHub에는 아직 올리지 않아도 됩니다.
```

### 6장 방금 변경 되돌리기
```text
방금 한 변경을 되돌려 주세요. 되돌리기 전에 어떤 파일의 무엇이 원래대로 돌아가는지 먼저 알려 주세요.
```

### 저장한 지점으로 돌아가기
```text
마지막으로 저장(커밋)한 상태로 돌아가고 싶습니다.
먼저 최근 저장 목록을 보여 주세요. 돌아가면 어떤 변경이 사라지는지 설명한 뒤, 제가 "진행해 주세요"라고 하면 그때 돌아가 주세요.
```

### 새 세션에서 이어서 하기
```text
이 폴더의 README.md를 읽고, 지금까지 어디까지 만들었는지 쉬운 말로 요약해 주세요.
그다음 [지금 하려는 일, 예: 3단계의 창문 불빛]부터 이어서 진행해 주세요.
```

### README에 진행 상황 적기
```text
README.md의 "진행 상황" 항목에 오늘 한 일과 다음에 할 일을 3줄로 적어 주세요.
```

### 1단계 도시 화면 구성
```text
/design-taste-frontend
"도시의 하루" 웹사이트의 첫 화면을 만들어 주세요. 이번에는 정지된 화면만 만듭니다.

[먼저 할 일]
이 폴더의 README.md에 있는 "기획 메모"를 읽고, 적혀 있는 분위기 단어 3개를 디자인에 반영해 주세요.

[화면 구성]
- 맨 위: 제목 "도시의 하루"와 한 줄 소개 문구
- 가운데: 2D 도시 풍경. 하늘, 해, 높이가 서로 다른 건물 실루엣 6개, 아래쪽에 도로
- 맨 아래: 나중에 시간 슬라이더가 들어갈 빈 자리 (지금은 "시간 슬라이더 자리"라는 작은 안내 글만)
- 지금은 낮 풍경만 그립니다. 움직임, 클릭, 슬라이더 기능은 아직 넣지 마세요.

[조건]
- index.html, style.css, script.js 세 파일로 만드는 정적 사이트입니다. 빌드 도구, npm, 프레임워크는 쓰지 말고, Vercel에 폴더 그대로 배포할 수 있어야 합니다.
- index.html을 더블클릭해서 열어도 동작해야 합니다. (type="module"이나, 다른 파일을 fetch로 불러오는 방식은 쓰지 마세요.)
- 데이터베이스, 로그인, 서버 코드는 없습니다.
- 휴대폰 화면(가로 360px)부터 PC 화면까지 깨지지 않게 만들어 주세요.
- 화면에 보이는 모든 문구는 한국어로 써 주세요.
- 이미지 파일 없이 CSS와 SVG(코드로 그리는 그림)로 도시를 그려 주세요.
- 폴더에 이미 index.html이 있으면 새 화면으로 바꿔도 됩니다. (이전 연습용 파일일 수 있습니다)

다 만든 뒤에 만든 파일 목록과, 화면을 여는 방법을 쉬운 말로 알려 주세요.
```

### 1단계 도시 (ui-ux-pro-max 버전)
```text
/ui-ux-pro-max:ui-ux-pro-max
"도시의 하루" 웹사이트의 첫 화면을 만들기 전에, 디자인 방향부터 제안해 주세요.

1. 이 폴더의 README.md에 있는 "기획 메모"를 읽어 주세요.
2. 어울리는 스타일 2가지를 이유와 함께 알려 주세요.
3. 스타일마다 색 5개(배경, 글자, 포인트 2개, 강조)와 한글이 잘 보이는 글꼴 조합을 알려 주세요.
4. 제가 하나를 고르면, 그 방향으로 첫 화면을 만들어 주세요. 조건은 아래와 같습니다.

[조건]
- 이번에는 정지된 낮 풍경만 만듭니다. 움직임, 클릭, 슬라이더는 아직 넣지 마세요.
- index.html, style.css, script.js 세 파일의 정적 사이트로, 빌드 도구나 프레임워크 없이 Vercel에 폴더 그대로 배포할 수 있어야 합니다.
- index.html을 더블클릭해도 동작해야 합니다.
- 데이터베이스와 로그인은 없습니다.
- 가로 360px 휴대폰부터 PC까지 깨지지 않게 해 주세요.
- 모든 문구는 한국어입니다.
- 이미지 파일 없이 CSS와 SVG로 도시를 그려 주세요.
```

### 1단계 심해 화면 구성
```text
/design-taste-frontend
"심해 탐험" 웹사이트의 첫 화면을 만들어 주세요. 이번에는 정지된 화면만 만듭니다.

[먼저 할 일]
이 폴더의 README.md에 있는 "기획 메모"를 읽고, 적혀 있는 분위기 단어 3개를 디자인에 반영해 주세요.

[화면 구성]
- 맨 위(수면): 밝은 하늘색 바다 표면. 제목 "심해 탐험"과 안내 문구 "아래로 스크롤하세요"
- 그 아래로 세로로 길게 이어지는 3개 구간: "수면 근처 0m"(밝은 하늘색), "바닷속 200m"(짙은 파랑), "심해 1,000m"(거의 검은 남색). 구간마다 화면 한 장 높이 정도로, 구간 이름과 두세 줄 설명을 넣어 주세요.
- 생물과 클릭 기능은 아직 넣지 마세요. 움직임도 아직 넣지 마세요.

[조건]
- index.html, style.css, script.js 세 파일로 만드는 정적 사이트입니다. 빌드 도구, npm, 프레임워크는 쓰지 말고, Vercel에 폴더 그대로 배포할 수 있어야 합니다.
- index.html을 더블클릭해서 열어도 동작해야 합니다. (type="module"이나 fetch로 파일을 불러오는 방식은 쓰지 마세요.)
- 데이터베이스, 로그인, 서버 코드는 없습니다.
- 휴대폰 화면(가로 360px)부터 PC 화면까지 깨지지 않게 만들어 주세요.
- 화면에 보이는 모든 문구는 한국어로 써 주세요.
- 이미지 파일 없이 CSS와 SVG로 물결과 배경을 그려 주세요.
- 깊이 숫자는 연출용 수치입니다. 어두워지는 색 변화가 자연스럽게 이어지도록 해 주세요.

다 만든 뒤에 만든 파일 목록과, 화면을 여는 방법을 쉬운 말로 알려 주세요.
```

### 미리보기로 열기
```text
미리보기로 열어 주세요.
```

### 2단계 도시 모션
```text
"도시의 하루" 화면에 가벼운 움직임을 넣어 주세요. 이번에는 움직임(모션)만 다룹니다. 슬라이더나 클릭 기능은 아직 넣지 마세요.

- 해: 제자리에서 아주 천천히 위아래로 둥실 떠 있듯이 움직입니다. (6초에 한 번, 위아래 8픽셀 정도, 계속 반복)
- 구름: 2~3개가 화면을 왼쪽에서 오른쪽으로 천천히 흘러갑니다. (한 번 건너는 데 50초 정도, 구름마다 속도를 조금씩 다르게)
- 제목과 소개 문구: 페이지를 열 때 아래에서 살짝 올라오며 나타납니다. (0.8초 동안, 소개 문구는 0.2초 늦게)
- 건물: 페이지를 열 때 아래에서 올라오며 차례대로 나타납니다. (건물마다 0.1초씩 간격)

[조건]
- 모든 움직임은 CSS로 만들어 주세요. 기존 색과 배치는 바꾸지 마세요.
- 중요: 운영체제에서 "움직임 줄이기"(prefers-reduced-motion) 설정을 켠 사람에게는 위의 움직임을 모두 끄고, 완성된 모습 그대로 정지해서 보여 주세요.
- 바꾼 부분을 목록으로 알려 주세요.
```

### 2단계 심해 모션
```text
"심해 탐험" 화면에 가벼운 움직임을 넣어 주세요. 이번에는 움직임(모션)만 다룹니다. 스크롤에 따라 바뀌는 기능과 클릭 기능은 아직 넣지 마세요.

- 수면: 물결이 천천히 좌우로 일렁입니다. (8초에 한 번, 아주 약하게)
- 기포: 작은 기포 8~10개가 아래에서 위로 천천히 올라가며 사라집니다. (기포마다 크기와 속도를 다르게, 올라가는 데 6~12초)
- 물고기: 바닷속 구간에서 작은 물고기 몇 마리가 서로 다른 속도로 좌우로 헤엄칩니다. (한 번 건너는 데 15~30초)
- 심해 구간: 은은한 빛 점 몇 개가 느리게 깜빡입니다. (4초에 한 번, 아주 약하게)
- 제목과 안내 문구: 페이지를 열 때 아래에서 살짝 올라오며 나타납니다. (0.8초 동안)

[조건]
- 모든 움직임은 CSS로 만들어 주세요. 기존 색과 배치는 바꾸지 마세요.
- 중요: 운영체제에서 "움직임 줄이기"(prefers-reduced-motion) 설정을 켠 사람에게는 위의 움직임을 모두 끄고, 완성된 모습 그대로 정지해서 보여 주세요.
- 바꾼 부분을 목록으로 알려 주세요.
```

### 움직임 줄이기 배려 추가
```text
지금 만든 모든 움직임(반복되는 움직임, 등장 효과, 색 변화)에 "움직임 줄이기" 설정(prefers-reduced-motion)을 켠 사람을 배려하는 처리를 추가해 주세요.
그 설정을 켠 사람에게는 움직임을 모두 끄고, 완성된 모습 그대로 정지해서 보여 주세요.
설정을 끈 사람에게 보이는 지금의 화면은 바꾸지 마세요. 추가한 부분을 목록으로 알려 주세요.
```

### 3단계 도시 시간 슬라이더
```text
"도시의 하루"에 시간 슬라이더를 만들어 주세요. 이번에는 슬라이더와 하늘, 해와 달만 다룹니다. 창문 불빛과 자동차는 다음에 부탁할 거예요.

- 화면 아래의 빈 자리에 가로 슬라이더를 만듭니다. 범위는 오전 6시부터 밤 12시까지이고, 처음 위치는 낮 12시입니다.
- 슬라이더 위에 지금 시각을 "오후 6시"처럼 크게 보여 주세요. 시각에 따라 "아침", "낮", "저녁", "밤" 글자도 같이 바뀝니다.
- 시각이 바뀌면 하늘 색이 끊김 없이 이어서 바뀝니다. 아침은 연한 분홍빛 하늘, 낮은 맑은 파랑, 저녁은 주황에서 보라, 밤은 짙은 남색입니다.
- 해는 오후로 갈수록 내려가서 저녁에 지평선 아래로 사라지고, 밤에는 달이 떠오릅니다.
- 건물 색도 시각에 맞춰 조금씩 어두워집니다.
- 슬라이더는 마우스뿐 아니라 휴대폰 터치와 키보드 방향키로도 움직여야 합니다.
- 색 전환은 갑자기 바뀌지 않고, 슬라이더를 움직이는 속도에 맞춰 부드럽게 이어져야 합니다.
- 기존 모션(구름, 해의 둥실거림)과 "움직임 줄이기" 배려는 그대로 유지해 주세요.
```

### 3단계 도시 창문 불빛
```text
이제 창문 불빛을 넣어 주세요. 슬라이더와 하늘 기능은 그대로 두세요.

- 모든 건물에 창문이 보이도록 해 주세요. (건물마다 8~20개 정도)
- 낮에는 창문이 어두운 유리 색입니다. 오후 5시쯤부터 창문이 하나씩 따뜻한 노란색으로 켜지기 시작해서, 밤 10시에는 70퍼센트 정도가 켜져 있습니다.
- 창문은 켜지는 순서가 무작위처럼 보이되, 슬라이더를 앞뒤로 움직여도 같은 시각이면 항상 같은 창문이 켜져 있어야 합니다.
- 켜질 때는 0.5초에 걸쳐 부드럽게 밝아집니다.
- 아침 6시에는 다시 대부분 꺼져 있습니다.
- 기존 기능과 "움직임 줄이기" 배려는 그대로 유지해 주세요.
```

### 3단계 도시 자동차
```text
도로 위에 자동차를 한 대 넣어 주세요. 다른 기능은 그대로 두세요.

- 자동차는 단순한 도형(몸체와 바퀴 두 개)으로 그리고, 눈에 띄는 색(예: 빨강)으로 해 주세요.
- 도로를 왼쪽에서 오른쪽으로 달려 화면 밖으로 나가면, 다시 왼쪽에서 나타납니다. (한 바퀴에 20초)
- 저녁 6시 이후에는 자동차 앞에 노란 불빛(헤드라이트)이 켜집니다.
- 자동차를 누르면(터치 포함) 말풍선 "빵!"이 잠깐 나타나고 통통 튀는 움직임이 한 번 나옵니다. 소리는 내지 마세요.
- "움직임 줄이기" 설정을 켠 사람에게는 자동차가 도로 가운데에 멈춰 있게 해 주세요.
```

### 3단계 심해 스크롤 깊이
```text
"심해 탐험"에 스크롤 깊이에 따라 바뀌는 기능을 넣어 주세요. 생물 클릭은 다음에 부탁할 거예요.

- 화면 오른쪽 위(휴대폰에서는 화면 위쪽)에 현재 수심을 보여 주는 표시를 고정해 주세요. 맨 위에서는 "수심 0m"이고, 아래로 스크롤할수록 숫자가 올라가서 맨 아래에서는 "수심 1,000m"가 됩니다.
- 구간은 세 개입니다. 수면 근처(0~200m), 바닷속(200~600m), 심해(600~1,000m). 구간이 바뀔 때 구간 이름 글자가 크게 나타났다가 사라집니다.
- 스크롤하는 동안 배경색이 구간에 맞춰 끊김 없이 더 어두워집니다.
- 심해 구간에서는 은은한 빛 점이 더 많아집니다.
- 기존 움직임과 "움직임 줄이기" 배려는 그대로 유지해 주세요.
```

### 3단계 심해 생물 소개 카드
```text
이제 생물 3종을 넣고, 누르면 소개가 열리게 해 주세요.

- 수면 근처에 [생물 1, 예: 작은 물고기 떼], 바닷속에 [생물 2, 예: 해파리], 심해에 [생물 3, 예: 아귀]를 단순한 그림(CSS와 SVG)으로 보여 주세요.
- 생물을 누르면(터치 포함) 화면 가운데에 소개 카드가 열립니다. 카드에는 이름, 사는 깊이, 한 줄 설명을 넣어 주세요.
- 카드는 닫기 버튼, 카드 바깥을 누르기, 키보드 Esc 키 중 어느 것으로도 닫힙니다.
- 카드가 열려 있는 동안 뒤 화면은 살짝 어두워집니다.
- 소개 문구는 과장하지 말고 확실한 내용만 써 주세요. 확실하지 않은 숫자는 넣지 말고, 제가 사실을 더 확인해야 할 부분이 있으면 마지막에 알려 주세요.
- 기존 기능과 "움직임 줄이기" 배려는 그대로 유지해 주세요.
```

### 4단계 GitHub에 올리기
```text
지금까지 만든 내용을 GitHub에 올려 주세요. 아래 순서로 진행해 주세요.

1. 올리기 전에, 바뀐 파일 목록을 쉬운 말로 알려 주세요. 비밀번호, 인증 키, 개인정보, 회사 자료로 보이는 파일이 있으면 올리지 말고 먼저 알려 주세요.
2. 미리보기용 작업 설정 폴더(.claude)는 올라가지 않도록 .gitignore에 넣어 주세요.
3. 커밋 메시지는 "도시의 하루: 시간 슬라이더, 창문 불빛, 자동차 추가"로 해서 저장(커밋)해 주세요.
4. 3장에서 연결한 저장소의 기본 브랜치(보통 main)에 올려 주세요(푸시).
5. 끝나면 GitHub 저장소 주소와, Vercel에서 어디를 보면 되는지 알려 주세요.
```

### 4단계 심해 GitHub에 올리기
```text
지금까지 만든 내용을 GitHub에 올려 주세요. 순서는 바뀐 파일 목록 확인, 저장(커밋), 푸시입니다.
비밀번호, 인증 키, 개인정보, 회사 자료로 보이는 파일이 있으면 올리지 말고 먼저 알려 주세요. 미리보기용 작업 설정 폴더(.claude)는 .gitignore에 넣어 주세요.
커밋 메시지는 "심해 탐험: 수심 구간과 생물 소개 카드 추가"로 해 주세요.
끝나면 GitHub 저장소 주소와, Vercel에서 어디를 보면 되는지 알려 주세요.
```

### 5단계 비평 받기 (critique)
```text
/impeccable critique index.html
지금 사이트([내 사이트 이름, 예: 도시의 하루])를 디자인 전문가의 눈으로 비평해 주세요. 아직 고치지는 마세요.

- 잘된 점 3가지
- 아쉬운 점 5가지: 중요한 순서대로, 각각 이유를 한 줄로
- 효과가 가장 큰 개선 3가지만 번호를 붙여 추천

휴대폰 화면 기준으로 봐 주시고, 코딩을 모르는 사람이 이해할 수 있는 쉬운 말로 써 주세요.
참고로 제가 직접 써 보고 느낀 점은 다음과 같습니다.
- 마음에 든 점: [내 메모]
- 불편한 점: [내 메모]
- 아쉬운 점: [내 메모]
```

### 5단계 다듬기 (polish)
```text
/impeccable polish index.html
방금 비평에서 추천한 개선 중 제가 고른 [번호, 예: 1번과 3번]만 적용해 주세요.

- 슬라이더, 창문 불빛, 자동차 같은 기능은 그대로 동작해야 합니다.
- "움직임 줄이기" 배려도 그대로 유지해 주세요.
- 바꾼 부분을 목록으로 알려 주세요.
- 다 바꾼 뒤 미리보기에서 휴대폰 폭과 PC 폭을 모두 확인한 결과를 알려 주세요.
```

### 5단계 색과 글꼴 후보 받기
```text
/ui-ux-pro-max:ui-ux-pro-max
"도시의 하루" 사이트의 색과 글꼴을 바꿔 보려고 합니다. 분위기 후보 두 가지를 제안해 주세요.

- 후보 A "따뜻한 골목의 저녁"
- 후보 B "네온사인이 켜진 밤거리"

후보마다 아래를 알려 주세요.
1. 색 5개 (배경, 글자, 포인트 2개, 강조)와 각 색의 쓰임새
2. 한글이 잘 보이는 무료 글꼴 조합 (제목용, 본문용), 그리고 그렇게 고른 이유
3. 글자와 배경의 대비가 읽기에 충분한지 확인한 결과

아직 적용하지 말고, 제가 후보를 고르면 그때 style.css의 색과 글꼴만 바꿔 주세요. 기능과 배치는 바꾸지 마세요.
```

### 5단계 분위기 두 버전 비교 (도시)
```text
지금 index.html은 그대로 두고, 같은 내용으로 분위기만 다른 두 버전을 만들어 주세요. 슬라이더, 창문 불빛, 자동차 기능은 두 버전 모두 똑같이 동작해야 합니다.

- 버전 A (compare/classy/ 폴더): "세련된 도시 여행 포스터처럼 차분하고 고급스럽게". 색 수는 적게, 여백은 넓게, 글씨는 가늘고 크게, 움직임은 느리고 은은하게, 문구는 담백하게 해 주세요.
- 버전 B (compare/cute/ 폴더): "귀엽고 장난스럽게". 밝은 색, 둥근 모서리, 통통 튀는 움직임, 말랑하고 둥근 글씨체, 말투는 친근하게 ("짠! 해가 졌어요" 같은 식) 해 주세요.

[조건]
- 각 폴더 안에서 index.html을 열면 바로 동작하게 해 주세요. (정적 파일만 사용, 빌드 도구 없음)
- "움직임 줄이기" 배려와 휴대폰 대응은 두 버전 모두 유지해 주세요.
- 기존 파일은 지우지 마세요.
- 끝나면 두 버전을 미리보기에서 여는 방법을 알려 주세요.
```

### 5단계 고른 버전 적용하기
```text
버전 [A 또는 B]로 정했습니다. 이 버전을 메인 화면(index.html)에 적용해 주세요.
지금의 index.html, style.css, script.js는 지우지 말고 old/ 폴더에 보관해 주세요. compare/ 폴더도 그대로 두세요.
적용한 뒤에 미리보기에서 슬라이더, 창문 불빛, 자동차가 모두 동작하는지 확인한 결과를 알려 주세요.
```

### 5단계 심해 색과 글꼴 후보 받기
```text
/ui-ux-pro-max:ui-ux-pro-max
"심해 탐험" 사이트의 색과 글꼴을 바꿔 보려고 합니다. 분위기 후보 두 가지를 제안해 주세요.

- 후보 A: 깊고 차분한 다큐멘터리 느낌의 남색과 청록 팔레트
- 후보 B: 형광 생물이 빛나는 듯한 어둠 속의 네온 팔레트

후보마다 색 5개(배경, 글자, 포인트 2개, 강조)와 쓰임새, 한글이 잘 보이는 무료 글꼴 조합(제목용, 본문용)과 고른 이유, 글자와 배경의 대비가 충분한지 확인한 결과를 알려 주세요.
아직 적용하지 말고, 제가 후보를 고르면 그때 style.css의 색과 글꼴만 바꿔 주세요. 기능과 배치는 바꾸지 마세요.
```

### 5단계 심해 분위기 두 버전 비교
```text
지금 index.html은 그대로 두고, 같은 내용으로 분위기만 다른 두 버전을 만들어 주세요. 스크롤에 따른 수심 변화와 생물 소개 카드 기능은 두 버전 모두 똑같이 동작해야 합니다.

- 버전 A (compare/documentary/ 폴더): "자연 다큐멘터리처럼 웅장하고 신비롭게". 어두운 남색과 청록 중심, 여백은 넓게, 글씨는 가늘고 크게, 움직임은 느리고 묵직하게, 문구는 차분한 설명체로 해 주세요.
- 버전 B (compare/storybook/ 폴더): "동화책 속 바다처럼 귀엽고 장난스럽게". 밝고 선명한 색, 둥근 모서리, 통통 튀는 움직임, 둥근 글씨체, 생물들에게 말을 거는 듯한 친근한 말투로 해 주세요.

[조건]
- 각 폴더 안에서 index.html을 열면 바로 동작하게 해 주세요. (정적 파일만 사용, 빌드 도구 없음)
- "움직임 줄이기" 배려와 휴대폰 대응은 두 버전 모두 유지해 주세요.
- 기존 파일은 지우지 마세요.
- 끝나면 두 버전을 미리보기에서 여는 방법을 알려 주세요.
```

### 5단계 최종 버전 올리기
```text
디자인을 개선한 지금 상태를 GitHub에 올려 주세요. 순서는 바뀐 파일 목록 확인, 저장(커밋), 푸시입니다.
비밀번호, 인증 키, 개인정보, 회사 자료로 보이는 파일이 있으면 올리지 말고 먼저 알려 주세요.
커밋 메시지는 "[이번에 한 일, 예: 디자인 비평 반영, 색과 글꼴 변경, 분위기 비교 버전 추가]"로 해 주세요.
끝나면 Vercel에서 확인할 곳을 다시 알려 주세요.
```

### 막혔을 때 원인 찾기 (6장)
```text
[몇 단계, 예: 1단계 화면 / 2단계 모션 / 3단계 반응 / 4단계 배포 / 5단계 디자인 개선]에서 막혔어요.
어떻게 보이는지, 또는 나온 오류 문구는 아래와 같아요.
[증상이나 오류 문구를 그대로 붙여넣기]
미리보기와 파일, GitHub 상태를 먼저 직접 확인해서 원인을 쉬운 말로 설명해줘. 해결 방법은 한 단계씩 알려주고, 파일을 바꾸거나 올리는 작업은 하기 전에 무엇을 할지 먼저 알려줘.
```

### 6장 완료 확인
```text
6장 결과물이 제대로 되어 있는지 확인해줘. 파일은 아무것도 바꾸거나 올리지 말고 확인만 해줘.
1. 화면: index.html, style.css, script.js가 있고 서로 제대로 연결되어 있으며, 휴대폰 폭에서도 글이 잘리거나 옆으로 밀리지 않는지
2. 모션: 움직임이 들어 있고, "움직임 줄이기" 설정(prefers-reduced-motion)을 배려하는 코드가 있는지
3. 반응: 슬라이더, 클릭, 스크롤 중 하나 이상에 화면이 반응하는 코드가 있는지
4. 배포: git status 와 git log 로 최근 변경이 모두 저장(커밋)되어 GitHub에 올라가 있는지, 내 vercel.app 주소가 열리고 최신 모습인지, 비밀번호나 개인정보나 회사 자료가 사이트와 README에 없는지
5. 디자인 개선: 배포 뒤 디자인을 한 번 더 고친 기록(커밋)이 있고, 개선한 결과가 올라가 있는지
각 항목을 O 또는 X로 표로 정리해줘. X가 있으면 원인과 해결 방법을 알려주고, 모두 O이면 "완료"라고 답해줘.
```

## 07 hyperframes로 모션 영상 만들기

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

### 심화: 딸기 28초 모션 영상
```text
# HyperFrames 제작 요청: 딸기, 새콤달콤한 설렘과 한 입의 행복

너는 프리미엄 식품 광고의 크리에이티브 디렉터이자 모션 디자이너, HTML/GSAP 그래픽 엔지니어다.

아래 브리프에 따라 실제로 재생되고 렌더링되는 딸기 소개 모션그래픽을 제작하라. 일러스트 자산 제작, 코드 작성, 미리보기, 오류 수정, 최종 MP4 출력, 사이트 연결까지 수행하라.

## 1. 제작 목표와 확정 사양

- 작품명: **딸기: 새콤달콤한 설렘, 한 입의 행복.**
- 핵심 인상: 새콤달콤한 맛이 눈으로 느껴지는 생기, 한 입 직전의 설렘, 베어 문 뒤의 행복. 촉촉한 질감과 작은 대상에서 발견하는 디테일로 그 감정을 전한다.
- 길이: 정확히 28초.
- 기본 출력: 1920x1080, 16:9, 30fps, 총 840프레임의 MP4.
- 언어: 한국어.
- 전달 방식: 내레이션 없이 영상과 짧은 타이포그래피로 전달.
- 구성: 주인공 딸기 한 알을 중심으로 연결되는 7개 장면.
- 프로젝트 위치: 사이트 폴더 밖의 [영상 작업 폴더]/strawberry-film/ (예: 문서/ai-video/strawberry-film/). 렌더 파일과 중간 산출물이 GitHub와 Vercel에 올라가지 않게 하기 위해서다.
- 최종 결과: 수정 가능한 HyperFrames 프로젝트, 브라우저 미리보기, strawberry-film.mp4, 웹용 압축본과 포스터 이미지, 주요 장면 스틸 7장(제작 순서 7번의 확인 시점과 같은 7개), 짧은 실행 안내.
- 로그인, DB, 결제, 런타임 LLM 기능은 필요 없다.

이번 브리프의 콘셉트, 길이, 기본 사양을 제작 기준으로 삼아 진행하라. 비어 있는 사소한 디자인 선택은 이 브리프와 일관되게 판단하라. 실제로 사용 가능한 도구로 완성하라.

## 2. HyperFrames 제작 방식

HeyGen의 공식 오픈소스 HyperFrames를 사용한다.

- 공식 저장소: https://github.com/heygen-com/hyperframes
- 시작 안내: https://hyperframes.heygen.com/quickstart
- GSAP 안내: https://hyperframes.heygen.com/guides/gsap-animation
- 시간 재현성 안내: https://hyperframes.heygen.com/concepts/determinism

현재 프로젝트와 설치된 플러그인, 스킬을 먼저 확인한다. 설치되어 있으면 /hyperframes:hyperframes 로 작업 흐름을 확인하고, 여러 장면으로 된 28초 영상이므로 /hyperframes:general-video 작업 흐름으로 진행한다(/hyperframes:motion-graphics 는 10초 안팎의 짧은 영상용이다). 미설치 상태라면 공식 시작 안내에 따라 설정한다.

독립형 스킬 설치는 공식 안내의 npx hyperframes skills update 를 참고하되, 기존 구성을 불필요하게 다시 만들지 않는다. 초기화, 미리보기, 렌더링 명령과 옵션은 설치 버전의 도움말로 확인한다.

영상 컴포지션은 HTML/CSS와 시간 제어 가능한 GSAP 애니메이션을 기본으로 한다.

전체 길이와 해상도를 명시하고, paused 상태의 타임라인을 composition ID와 일치하는 키로 등록한다. 라이브러리의 공식 등록 방식과 미디어 재생 규약을 따른다. 존재하지 않는 API나 옵션을 만들어 사용하지 않는다.

## 3. 아트 디렉션

일관된 식품 광고 룩을 만든다. 사진처럼 보이려 하지 않는 매끈한 벡터 일러스트(부드러운 그라데이션, 반사광, 그림자)로, 그림책이나 에디토리얼 잡지 일러스트에 가까운 완성도를 목표로 한다. 첫 장면부터 마지막 장면까지 같은 딸기, 같은 조명 계열, 같은 색 보정으로 연결한다.

### 색상

- 깊은 버건디: #17090F
- 선명한 딸기 레드: #E3283F
- 밝은 코럴: #FF6D75
- 따뜻한 크림: #FFF3E8
- 잎: 자연스러운 짙은 녹색

### 조명과 재질

왼쪽 위의 큰 부드러운 주광과 반대편의 얇은 림라이트를 기본으로 한다.

딸기의 표면은 작은 굴곡과 씨앗이 보일 만큼 선명하게 그린다. 물방울은 밝은 하이라이트를 가지되, 딸기 전체가 플라스틱처럼 번들거리지 않게 한다.

딸기의 붉은 부분과 초록 잎이 어두운 배경에 묻히지 않도록 한다. 표면의 작은 밝기 차이와 씨앗 주변의 음영을 살린다.

### 공간감

레이어는 다음처럼 구분한다.

- 전경: 크고 가까운 물방울.
- 중경: 가장 선명한 주인공 딸기.
- 후경: 작은 물방울과 배경.

깊이에 따라 이동량, 선명도, 그림자를 다르게 한다. 초점은 항상 주인공 딸기에 남긴다.

### 타이포그래피

주요 피사체와 문구는 화면 가장자리에서 약 7% 이상 떨어뜨린다. 의도적으로 잘리는 것은 전경 효과나 배경 대형 타이포에 한정한다.

일반 제목은 1080p 기준 약 110~170px, 짧은 보조 문구는 36~48px를 출발점으로 실제 화면에서 조정한다. 실제 사용 가능한 한국어 글꼴 파일을 프로젝트 안에 로컬로 준비한다(Pretendard, SIL 오픈 폰트 라이선스). 제목과 대형 타이포는 ExtraBold(800), 보조 문구는 SemiBold(600)를 기본으로 한다.

한 화면에서는 주요 문구를 한 덩어리로 보여준다. 글자가 등장할 때마다 여러 효과를 중첩하지 않는다.

## 4. 자산: 사진 없이 2.5D 에디토리얼 일러스트로 통일

이번 제작은 사진과 생성 이미지를 쓰지 않는다. 외부 이미지를 내려받지 않는다. 모든 자산을 SVG와 CSS로 직접 그린 정교한 에디토리얼 2.5D 일러스트로 통일하고, 결과 보고에 적용한 스타일을 명시한다.

### 그릴 자산 (모두 같은 스타일, 같은 조명 방향)

1. 잎이 붙은 온전한 딸기 한 알. 정면 또는 약한 사선 구도이며, 화면을 가득 채울 만큼 키워도 선명해야 한다.
2. 같은 색감과 조명 계열의 딸기 단면(흰 심과 붉은 과육의 방사형 결).
3. 극접사용 표면 디테일 레이어. 씨앗, 씨앗이 박힌 작은 홈, 촉촉한 하이라이트가 보여야 한다.
4. 세로로 자른 반쪽 두 개.
5. 모양이 다른 작은 과육 조각 3~5개.
6. 크기와 하이라이트가 다른 절제된 벡터 물방울 여러 개.
7. 한 입 베어 문 자국. 온전한 딸기 위에 마스크로 덮어 쓰며, 자국 안쪽에는 단면과 같은 흰 심과 붉은 과육 결이 보이게 한다.

### 일러스트 품질 기준

- 씨앗은 크기와 기울기가 조금씩 다르고, 규칙적인 격자처럼 보이지 않게 배치한다. 배치는 고정된 seed로 결정한다.
- 표면의 붉은 면은 여러 겹의 방사형 그라데이션과 아주 약한 노이즈 텍스처로 입체감을 만든다.
- 림라이트, 접지 그림자, 물방울의 굴절 하이라이트를 따로 레이어로 둔다.
- 벡터라서 확대해도 깨지지 않는 장점을 살려, 접사와 전체 장면은 같은 원본 일러스트를 확대해 연결한다.
- 단순한 빨간 원이나 하트 모양, 이모지를 최종 딸기로 사용하지 않는다.

온전한 딸기 한 장으로 보이지 않는 뒷면을 억지로 만드는 360도 회전을 구현하지 않는다. 작은 평면 회전, 마스크, 레이어 시차, 크기 변화로 깊이를 만든다.

## 5. 초 단위 스토리보드

각 구간에는 다음 구간으로 넘어가는 전환 시간이 포함된다. 전환 때문에 전체 28초를 늘리지 않는다.

### 장면 1 (0.00~2.50초): 표면에서 한 알로

배경은 깊은 버건디(#17090F)다. 첫 프레임부터 선명한 붉은 표면과 씨앗을 보여준다. 씨앗 옆의 작은 하이라이트를 따라 빛이 지나간다.

0.35초부터 카메라가 뒤로 빠진다. 0.80~1.30초에 속도를 올리고 1.60초까지 부드럽게 감속해 잎을 포함한 딸기 한 알을 공개한다.

**1.5초 전후에는 누구나 딸기임을 알아볼 수 있어야 한다.**

접사와 전체 장면은 같은 벡터 원본을 확대해 연결한다. 접사에만 쓰는 디테일 레이어는 0.80~1.10초의 빠른 이동 중 자연스럽게 사라지게 한다.

딸기는 중앙보다 약간 왼쪽에 떠 있다. 아래에는 넓고 옅은 그림자가 생긴다. 멈춘 뒤 짧은 관성 이동을 한 번만 준다.

1.70초부터 오른쪽 여백에 **"딸기"**가 12~18px 정도 상승하며 나타난다. 흐림 6px 이하에서 0.3초 안에 또렷해지는 짧은 변화와 함께 등장한다.

### 장면 2 (2.50~6.00초): 빛을 머금은 한 알

버건디 배경 위로 넓은 따뜻한 조명이 퍼지며 크림 배경으로 연결된다.

딸기는 오른쪽으로 천천히 이동하고 5~7도 정도 기울어진다.

딸기 뒤에 작은 물방울 3개, 앞에 물방울 2개를 둔다. 앞쪽의 큰 물방울은 화면 가장자리를 스쳐 가고 딸기의 표면을 가리지 않는다.

왼쪽에 **"새콤달콤"**을 약 2초 이상 읽을 수 있게 보여준다. 글자가 나타날 때 딸기 주변에 작고 밝은 반짝임 2~3개가 한 번만 톡 튀어, 새콤한 맛이 눈으로 느껴지게 한다.

5.40초부터 주인공을 화면 중심에 정렬하며 다음 장면을 준비한다.

### 장면 3 (6.00~10.00초): 한 알이 펼쳐지는 순간

배경은 장면 2에서 이어진 따뜻한 크림(#FFF3E8)이다. 딸기 중심에 얇은 세로 하이라이트가 생긴다. 6.50초 전후에 그 빛을 마스크로 사용해 온전한 딸기를 반쪽 일러스트와 연결한다.

두 반쪽은 다음처럼 움직인다.

- 왼쪽 반쪽: 왼쪽 위로 약 190px 이동하며 -12도 회전.
- 오른쪽 반쪽: 오른쪽 아래로 약 190px 이동하며 +10도 회전.

중앙에는 선명한 단면을 남기고, 뒤에서 앞으로 조금 다가오는 것처럼 크기와 그림자를 변화시킨다.

반쪽 두 개와 중앙 단면이 서로 다른 깊이에 놓인 전시 오브제처럼 보이게 한다. 이는 감각적인 전시 연출이며, 실제 과일이 세 조각으로 절단되는 과학 설명처럼 표시하지 않는다.

8.00초부터 움직임을 줄여 단면을 최소 1초 이상 온전히 관찰하게 한다.

### 장면 4 (10.00~14.00초): 과육의 윤곽이 화면이 된다

카메라가 중앙 단면으로 접근한다.

단면의 유기적인 윤곽을 따라 얇은 코럴 선이 생기고, 그 모양을 이어받은 크림, 코럴, 버건디의 큰 마스크 3~4개가 차례로 확장된다.

약 1초 안에 깊이 있는 전환을 완성하고 새로운 딸기 구도를 공개한다. 마지막으로 펼쳐진 마스크는 버건디이며, 그 위에 **다시 온전한 한 알**의 딸기가 화면 중앙에서 약간 오른쪽, 화면 높이의 약 55% 크기, 약 8도 기울어진 사선 구도로 나타난다. 이 장면부터 마지막까지 딸기는 온전한 한 알이다(장면 7의 베어 문 자국 전까지).

문구는 **"한 알을 더 가까이"**. 2초 정도 유지한다.

이 장면의 핵심은 작은 과육의 모양이 전체 화면의 그래픽으로 이어지는 연결감이다. 반복되는 만화경이나 끝없는 터널로 만들지 않는다.

### 장면 5 (14.00~18.50초): 시간이 멈추는 과즙

배경은 장면 4에서 이어진 버건디다. 이 장면은 "한 입 직전의 설렘"이다. 딸기 주위에 물방울 12~18개와 과육 조각 3~5개를 배치한다.

입자는 왼쪽 아래에서 오른쪽 위로 휘어지는 비대칭 곡선과 하나의 리본 같은 흐름을 따른다. 크기와 속도를 다르게 하고, 일부는 주인공 뒤를 지나고 일부는 앞을 지나게 한다.

정확한 동작은 다음과 같다.

- 14.20초부터 물방울과 조각이 퍼진다.
- 15.10~15.25초에 감속한다.
- 15.25~15.65초에는 입자의 장면 내 위치를 고정한다.
- 15.65~16.00초에는 재가속한다.

**정지 구간에도 카메라 오프셋과 깊이에 따른 시차는 계속 계산한다.**

카메라가 옆으로 25~40px 움직이는 것처럼 전경, 중경, 후경의 이동량을 다르게 해, 입자는 멈췄는데 공간은 살아 있는 느낌을 만든다.

전체 타임라인을 일시 정지하는 방식으로 구현하지 않는다.

이후 입자들이 기존 경로를 따라 다시 가속한다. 큰 전경 물방울 하나가 화면 가장자리를 가로질러 다음 장면의 가림막이 된다.

실시간 유체 시뮬레이션은 쓰지 않는다. 벡터 물방울과 과육 조각, 정교한 경로, 속도 변화, 가림 관계로 이 장면을 완성한다.

### 장면 6 (18.50~23.50초): 이름이 장면이 된다

크림 배경 위에 커다란 **"딸기"** 두 글자를 배치한다. 글자는 화면 너비의 약 65~75%를 사용한다.

이 장면의 "딸기"는 일반 제목 크기 규칙에서 제외하는 배경 디스플레이 타이포다. 1080p에서 약 600~720px를 출발점으로 사용하고 실제 글자 너비를 기준으로 조정한다.

한 알의 딸기가 왼쪽 화면 밖에서 출발해 글자 앞으로만 지나간다(글자 뒤로 돌아가지 않는다). 딸기의 위치에 따라 글자 위에 떨어지는 그림자도 함께 움직인다. 20.50초 무렵 중심에 도착한 뒤 속도를 줄인다.

마지막에는 글자 전체가 읽히는 구도를 확보한다.

보조 입자는 4~6개로 줄인다. 앞선 장면의 에너지를 주인공과 이름에 모은다. 화면의 모든 요소가 동시에 크게 움직이지 않게 한다.

### 장면 7 (23.50~28.00초): 한 입의 행복

배경이 따뜻한 크림(#FFF3E8)으로 바뀌고, 가장자리에 아주 옅은 코럴 빛이 번진다.

주인공 딸기는 중앙보다 약간 위에 있다. 24.00~24.40초에 딸기 오른쪽 위에 **한 입 베어 문 자국**이 생기고, 자국 안쪽의 흰 심과 붉은 과육이 드러난다. 같은 순간 작은 과즙 방울 4~6개가 자국에서 튀어 오른 뒤 0.6초 안에 사라진다. 베어 무는 동작은 한 번만 한다.

아래 문구를 표시한다.

**딸기**
**새콤달콤한 설렘, 한 입의 행복.**

25.50초까지 문구를 모두 완성한다. 마지막 2.5초는 읽고 기억할 수 있게 유지한다.

딸기는 거의 정지한 상태로 미세하게 떠 있고, 작은 물방울 하나의 하이라이트만 지나간다.

마지막 프레임까지 의도된 구도를 유지한다. 임의의 브랜드명이나 불필요한 구매 버튼을 추가하지 않는다.

## 6. 움직임과 사운드

리듬은 다음 순서로 구성한다.

**빠르게 공개, 천천히 관찰, 펼쳐지는 반전, 순간 정지(설렘), 한 입과 행복한 마무리.**

큰 이동은 약 0.6~1.2초 안에서 가속과 감속을 분명하게 하고, 작은 부유는 느리고 작게 만든다. 카메라 롤과 반복 바운스는 최소화한다.

주인공을 가리는 과도한 블러와 글로우를 피한다.

이번 제작은 **무음판으로 확정**한다. 음악과 효과음을 찾거나 생성하지 않는다. 존재하지 않는 오디오 파일을 참조하지 않는다.

무음으로 보아도 장면의 리듬과 의미가 전달되어야 한다.

## 7. 시간 재현성과 렌더링

모든 애니메이션은 입력 시간 t에서 해당 상태를 재구성할 수 있어야 한다.

- 파티클과 씨앗의 위치, 크기, 속도는 고정된 seed와 절대 시간으로 결정한다.
- 렌더 모드에서 Date.now, 자유 실행 타이머, 누적 deltaTime, seed 없는 Math.random에 시각 결과를 의존하지 않는다.
- 렌더러가 관리하는 타임라인과 미디어 재생을 사용한다.
- 첫 프레임 전에 폰트 등 필요한 자산을 준비한다.
- 런타임 자산은 로컬로 고정한다.
- 그림자, 마스크, 텍스트도 임의 시간 이동과 역방향 이동 후 일관되게 복원한다.

## 8. 제작 순서

1. 현재 환경과 HyperFrames 버전을 확인하고 제작 환경을 준비한다.
2. 일러스트 자산을 먼저 그리고, 최종 크기에서 선명도, 조명 일관성, 검은 배경과 크림 배경 위의 가장자리 상태를 검토한다.
3. 7개 장면의 구도와 정확한 타임코드를 구현한다.
4. 네 가지 핵심 연출인 표면 공개, 단면 전시, 순간 정지, 한 입을 완성한다.
5. 타이포그래피, 베어 무는 순간, 전환의 타이밍을 맞춘다.
6. 해당 버전이 제공하는 lint, check 등 검증 명령을 확인하여 적용한다.
7. 대표 시점 0.5, 1.8, 7.5, 12.0, 15.4, 21.0, 26.5초를 이미지로 확인한다.
8. 21초, 7.5초, 15.4초 순서로 이동해도 장면이 복원되는지 확인한다.
9. 먼저 빠른 시험 렌더(설치 버전의 draft 품질 옵션)로 전체를 확인하고, 컷 사이의 점프, 검은 프레임, 글자 겹침, 잘린 물방울을 수정한다.
10. 28초, 1080p, 30fps 최종 MP4를 렌더링하고 길이, 해상도, 프레임 수를 확인한다.

## 9. 사이트에 넣기

1. FFmpeg로 웹용 압축본을 만든다(1280x720, H.264, yuv420p, faststart, 오디오 없음, 5MB 이하가 되도록 화질 값 조정).
2. 26.5초 지점의 프레임으로 포스터 이미지를 만든다.
3. 압축본과 포스터를 내 사이트 폴더(index.html이 있는 폴더)의 assets/video/ 로 복사하고, 첫 화면의 소개 영상으로 연결한다. video 태그에는 autoplay, muted, loop, playsinline 을 넣고, 영상을 멈출 수 있는 작은 일시정지 버튼을 함께 둔다.
4. 원본 렌더 파일과 중간 산출물은 사이트 폴더로 복사하지 않는다.

## 10. 최종 합격 기준

- 첫 1.5초 전후에 딸기임을 알아볼 수 있다.
- 극접사 공개, 단면 전시, 순간 정지, 한 입이 서로 다른 놀라움을 준다.
- 마지막에 "새콤달콤한 설렘, 한 입의 행복."이 밝고 행복한 분위기로 남는다.
- 일러스트가 마지막 장면까지 같은 스타일, 같은 색, 같은 조명으로 이어진다.
- 한순간에 가장 크게 움직이는 대상이 분명하다.
- 한국어가 깨지지 않고 주요 문구를 충분히 읽을 수 있다.
- 임시 도형, 깨진 그림, 지저분한 가장자리, 같은 모양의 반복 입자가 남지 않는다.
- 근거 없는 영양 수치, 건강 효능, 산지, 당도 수치를 넣지 않는다.
- 마지막 구도를 최소 2초 이상 감상할 수 있다.
- 출력된 MP4와 사이트에 넣은 압축본에서도 연출이 정상 동작한다.

작업 후 실제 생성한 프로젝트 위치, 미리보기 주소, MP4와 압축본, 포스터, 스틸 파일 경로, 실행과 재렌더 방법을 알려라.

적용한 스타일과 남은 한계가 있으면 구체적으로 밝혀라. 네 가지 핵심 연출을 확인하고 보완한 뒤 완료하라. 결과 요약은 코딩을 모르는 사람도 이해할 수 있는 쉬운 한국어로 써라.
```

### 심화: 태양계 여행 웹과 120초 영상
```text
# HyperFrames 제작 요청: SOLAR ODYSSEY, 우리의 태양계를 여행하다

너는 몰입형 디지털 전시의 크리에이티브 디렉터, 우주 다큐멘터리 모션 디자이너, Three.js/GSAP 프런트엔드 그래픽 엔지니어다.

아래 브리프를 실제 작동하는 프로젝트로 구현하라. 그래픽 제작, 웹 구현, 애니메이션, 검수, HyperFrames 영상 렌더링까지 수행하라.

## 0. 진행 방식: 4단계로 나눠서 하고, 단계마다 멈춘다

이 프로젝트는 한 번에 끝내기에는 크다. 아래 4단계로 나눠 진행한다. 각 단계가 끝나면 작업을 멈추고, 완료한 것과 실제로 확인한 것과 남은 것을 쉬운 한국어로 보고한 뒤 내가 "다음 단계"라고 말할 때까지 기다린다.

1. **1단계:** 프로젝트 준비, 천체 데이터 구조, 전체 지도, 목적지 선택, 지도 복귀, 공통 이동 연출, 그리고 **태양, 지구, 토성** 세 목적지를 높은 완성도로 완성한다.
2. **2단계:** 나머지 7개 목적지(수성, 금성, 화성, 목성, 천왕성, 해왕성, 명왕성)의 장면, 설명, 탐험 액션을 완성한다.
3. **3단계:** 웹 자동 투어, 일시정지와 재개, 이동 건너뛰기, 사용자 입력 우선권, 모바일, 키보드, 모션 감소, 정적 빌드를 완성한다.
4. **4단계:** 같은 투어 스케줄을 HyperFrames 영상 원본에 연결하고, 시험 렌더 후 120초 최종 MP4를 렌더링한다.

최종 결과물에는 10개 목적지가 모두 들어간다. 자원이 부족해도 목적지나 주요 탐험 기능을 임의로 빼지 않고, 입자 수, 후처리, 셰이더 복잡도를 낮춘다.

## 1. 제작 목표와 산출물

**프로젝트명:** SOLAR ODYSSEY, 우리의 태양계를 여행하다.

**첫 화면 카피:** 가장 가까운 별에서, 멀리 떨어진 얼음 세계까지.

**주요 경험:** 태양계 지도에서 목적지를 선택하면 탐사선과 카메라가 이동하고, 천체마다 새로운 장관과 짧은 탐험 액션이 펼쳐진다.

이번 제작 모드는 **"클릭 가능한 웹 탐험 + 같은 장면을 활용한 자동 투어 영상"**으로 확정한다.

**프로젝트 위치:** [작업 폴더]/solar-odyssey/ (예: 문서/ai-site/solar-odyssey/)

### 산출물 A: 인터랙티브 웹

- 반응형 웹에서 10개 목적지를 자유롭게 선택한다.
- 각 목적지에 고유한 장면과 실제 작동하는 탐험 버튼 1개가 있다.
- 이전, 다음, 지도 복귀, 자동 투어, 일시정지와 재개, 음소거를 제공한다.
- 자유 탐험은 체류 시간 제한이 없다.
- 정적 파일로 빌드하고, 어떤 하위 경로(예: /examples/solar/)에 올려도 동작해야 한다. Vite의 base 를 './'(상대 경로)로 설정하고, 모든 자산 경로를 상대 경로로 둔다.

### 산출물 B: HyperFrames 자동 투어

- 동일한 천체 데이터, 그래픽, 장면 로직을 재사용한다.
- 정확히 120초, 1920x1080, 16:9, 30fps, 3600프레임의 MP4.
- 출력 파일명은 solar-odyssey-tour.mp4.
- 영상에서는 클릭 없이 카메라와 탐험 액션이 정해진 시간에 진행된다.
- MP4에서 작동하지 않는 클릭 버튼은 숨기고, 목적지 이름과 여행 진행 표시만 필요한 만큼 남긴다.

수정 가능한 전체 프로젝트, 실행 안내, 정적 웹 빌드, MP4, 10개 목적지 대표 스틸도 제공한다.

두 산출물이 완료되었는지 각각 확인한다. DB, 회원가입, 로그인, 런타임 LLM, 유료 외부 API는 필요 없다.

## 2. 목적지와 과학적 표현 기준

관람 순서는 다음과 같다.

| 번호 | 이름 | 영어 | 분류 |
|---|---|---|---|
| 00 | 태양 | SUN | 항성 |
| 01 | 수성 | MERCURY | 암석행성 |
| 02 | 금성 | VENUS | 암석행성 |
| 03 | 지구 | EARTH | 암석행성 |
| 04 | 화성 | MARS | 암석행성 |
| 05 | 목성 | JUPITER | 기체거인 |
| 06 | 토성 | SATURN | 기체거인 |
| 07 | 천왕성 | URANUS | 얼음거인 |
| 08 | 해왕성 | NEPTUNE | 얼음거인 |
| 09 | 명왕성 | PLUTO | 왜소행성 |

화면에서는 **"10개의 목적지"**라고 부른다.

이 프로젝트는 감상을 위한 가상 여행이다. 크기, 궤도 간격, 공전과 자전 속도, 비행 시간은 가독성과 연출을 위해 조정한다. 지도는 현재 시각의 실제 천체 배치가 아니다.

화면의 정보 버튼에 **"크기, 거리, 시간을 조정한 여행용 시각화"**라고 안내한다.

거대한 도착 천체와 느린 이동으로 공간의 규모를 전달하되, 정확한 실축척이라는 인상을 주지 않는다.

천체별 사실은 NASA Science 등의 공식 자료(15장 목록)를 확인한다. 과학 수치는 꼭 필요한 것만 쓰고 단위와 출처를 기록한다.

이 작품은 이름, 분류, 핵심 특징 한 문장만으로도 성립해야 한다. 지름, 거리, 공전주기 표를 모든 장면에 의무적으로 채우지 않는다.

## 3. 기술과 구조

HyperFrames는 HeyGen 공식 오픈소스 버전을 사용한다.

- 공식 저장소: https://github.com/heygen-com/hyperframes
- 시작 안내: https://hyperframes.heygen.com/quickstart
- GSAP 안내: https://hyperframes.heygen.com/guides/gsap-animation
- 시간 재현성 안내: https://hyperframes.heygen.com/concepts/determinism

현재 작업 환경, 기존 프로젝트, 설치된 플러그인과 스킬을 먼저 확인한다. 설치되어 있으면 /hyperframes:hyperframes 로 작업 흐름을 확인하고, 여러 장면으로 된 긴 영상이므로 /hyperframes:general-video 작업 흐름을 따른다. 없다면 공식 시작 안내에 따라 준비한다.

독립형 스킬 설치 안내의 npx hyperframes skills update 를 참고한다. 설치 버전의 도움말을 확인하고 존재하는 CLI 옵션과 런타임 연동 API만 사용한다.

### Three.js 연동

HyperFrames는 공식 three 런타임 어댑터를 제공한다. 설치된 hyperframes-animation 스킬의 adapters/three.md 를 먼저 읽고 그 방식을 따른다. 어댑터는 장면을 대신 소유하지 않고 HyperFrames 시간을 전달하며 seek 이벤트(hf-seek)를 보내므로, 그 시간에 맞는 프레임을 직접 그린다. 문서에 없는 연동 방식을 지어내지 않는다.

### 웹과 영상의 구조

새 프로젝트라면 Vite + TypeScript + Three.js + GSAP처럼 정적 배포 가능한 가벼운 구성을 기본으로 한다. React는 쓰지 않는다.

HyperFrames 컴포지션과 웹 앱은 별도 진입점을 두되 장면 로직과 그래픽을 공유한다.

**공유 방법을 다음처럼 고정한다.** HyperFrames 영상 원본(index.html)은 순수 HTML이라 TypeScript를 직접 읽지 못한다. 그래서 장면 렌더러, 천체 데이터, 투어 스케줄을 Vite의 별도 빌드 진입점으로 묶어 단일 JS 파일(예: tour-bundle.js)로 출력하고, 영상 원본이 그 파일을 로컬 경로로 불러온다. 웹 앱도 같은 소스 모듈을 사용한다. 코드를 바꾸면 이 번들을 다시 빌드한 뒤 영상을 렌더한다.

책임은 다음처럼 나눈다.

- **천체 데이터:** 이름, 분류, 설명, 재질 설정, 색상, 장면 설정, 탐험 액션.
- **장면 렌더러:** 천체, 조명, 카메라, 입자, 라벨을 그린다.
- **웹 컨트롤러:** 클릭, 드래그, 키보드, 선택, 방문 상태를 관리한다.
- **투어 스케줄:** 절대 시간에 따라 목적지, 이동, 카메라, 탐험 액션을 결정한다.
- **HyperFrames 진입점:** 투어의 원하는 시간을 렌더링한다.

인터랙티브 웹의 입력을 영상 렌더링에 실제 클릭으로 재연하는 구조로 만들지 않는다.

**시간 t에 해당하는 투어 상태를 직접 계산하고 그 상태를 그린다.**

컴포지션의 루트 길이와 해상도를 명시하고, 등록된 paused 타임라인을 HyperFrames가 제어하게 한다. seek 후 캔버스가 그려진 다음 캡처되도록 한다.

## 4. 전체 미술 방향

핵심 키워드:

**깊은 우주, 거대한 곡면, 빛과 어둠의 경계, 섬세한 관측 장비, 절제된 SF, 각 세계의 고유한 재질.**

### 색상과 UI

- 배경: #03050C 수준의 깊은 검정과 아주 어두운 남색.
- 기본 글자: #F4F7FC
- 보조 글자: #A8B5CC
- 상호작용 강조: #8DDCFF
- 천체별 포인트 색: 해당 세계의 재질에서 가져온다.

화려함은 크기 변화, 입체적인 가림, 카메라 경로, 조명, 재질의 대비로 만든다.

기본 감상 화면에서는 천체가 가장 먼저 보이고 UI는 그 다음에 읽혀야 한다. 관측 장비 느낌의 선과 숫자는 실제 의미가 있는 범위에서만 사용한다.

한국어 글꼴 파일은 프로젝트 안에 로컬로 준비한다(예: Pretendard, SIL 오픈 폰트 라이선스).

### 우주의 깊이

별은 깊이가 다른 3개 층으로 구성하되 반짝임을 매우 약하게 한다.

성운이나 우주 먼지는 분위기를 보조하는 수준으로 사용한다. 가까운 천체와 배경별의 이동량을 다르게 해 공간감을 만든다.

비행 때만 짧은 별빛 늘어짐을 사용한다. 이 효과는 여행 전환을 위한 창작 연출이다.

### 빛

태양은 스스로 빛나고, 다른 천체는 태양 방향의 광원으로 밝고 어두운 면이 결정되도록 한다.

명암을 보완하는 약한 보조광은 허용하지만 낮과 밤의 방향이 뒤집히지 않아야 한다.

블룸 때문에 표면 질감이 사라지지 않게 한다. 밝은 영역 옆에 어두운 여백을 남겨 크기와 빛의 대비를 만든다.

## 5. 첫 화면: 궤도 지도가 살아난다

첫 프레임은 화면 왼쪽 아래를 크게 차지하는 태양의 곡면으로 시작한다.

검은 우주와 금빛 가장자리의 대비를 즉시 보여준다. 짧은 홍염 아치 하나가 천천히 모습을 드러낸다.

카메라가 뒤로 물러나면서 가는 궤도선과 서로 다른 위치의 천체가 보인다.

선택용 지도이므로 천체 크기와 궤도 간격은 적절히 압축한다. 작고 먼 목적지도 읽을 수 있는 이름 버튼과 충분한 클릭 영역을 제공한다.

제목:

**우리의 태양계**
**가장 가까운 별에서, 멀리 떨어진 얼음 세계까지.**

주요 버튼:

- **태양부터 출발**
- **자동 투어**

천체나 이름 버튼을 직접 눌러 자유 탐험을 시작할 수도 있다.

첫 연출이 끝나기 전에도 조작 가능하게 하며, 늦어도 3초 이내에 선택할 수 있어야 한다.

### 여행 내비게이션

하단에는 10개 목적지의 이름을 순서대로 배치한 얇은 여행 내비게이션을 둔다.

현재 목적지와 방문한 목적지는 모양과 텍스트로도 구분한다. 모바일에서는 이름 목록이 가로 스크롤되며 현재 목적지가 보이도록 한다.

호버 또는 키보드 포커스 시 이름과 선택 링을 부드럽게 강조한다. 천체의 크기는 최대 3% 정도만 변화시킨다.

클릭 한 번으로 곧바로 출발하게 한다.

## 6. 공통 이동 연출: 지도가 비행으로 이어진다

첫 방문의 기본 이동은 약 1.8~2.4초, 재방문은 약 0.8~1.0초를 목표로 한다.

도착 구도에 필요한 시간을 조정하되 자동 투어의 전체 타임코드 안에 포함한다.

### 1단계 (0.00~0.18초)

선택한 이름과 목적지를 강조하고 다른 라벨의 대비를 낮춘다.

현재 위치에서 목적지로 연결되는 경로를 하나만 보여준다.

### 2단계 (0.18~0.50초)

선택 궤도의 시각적 리듬을 이어받은 곡선 비행 경로가 앞으로 뻗는다.

작은 탐사선이 경로에 정렬된다.

이 선은 여행 경로이며, 실제 공전 궤도가 물리적으로 변형된다는 뜻이 아니다.

### 3단계 (0.50~1.30초)

카메라가 탐사선 뒤쪽으로 붙었다가 속도를 올린다.

지도 구도가 사선 공간 구도로 바뀌고 별빛이 잠깐 길어진다.

배경, 탐사선, 목적지의 이동량이 달라야 한다. 카메라 롤은 최대 6도 수준으로 절제한다.

### 4단계 (1.30~2.00초 전후)

별빛 늘어짐을 줄이고 목적지가 프레임 안으로 커진다.

다른 천체나 목적지 구체 내부를 관통하지 않는 곡선 경로를 사용한다.

목적지가 화면 밖으로 사라졌다 갑자기 나타나지 않게 한다.

### 5단계: 도착

천체별 고유한 카메라 각도로 부드럽게 정착한다.

0.4~0.6초 동안 장관을 먼저 보여준 후 이름과 설명을 나타낸다.

탐사선은 프레임 가장자리로 물러나 규모를 보여주는 작은 기준점이 된다.

탐사선은 이번 프로젝트를 위한 가상의 소형 탐사선이다. 안테나, 몸체, 패널 등 단순하고 잘 읽히는 형상으로 구성한다.

## 7. 목적지별 장면과 실제 탐험 액션

이름, 설명, 분류, 탐험 버튼은 공통 UI 언어를 유지한다.

피사체의 배치, 도착 구도, 카메라 움직임, 탐험 액션은 아래처럼 달라져야 한다.

### 00. 태양: 모든 여행이 시작되는 빛

**장면:** 태양의 거대한 곡면이 프레임 밖까지 이어진다. 금빛과 주황빛 표면의 미세한 흐름과 가장자리 홍염 아치를 보여준다. 태양 색상은 작품의 관측 연출이며 모든 파장의 실제 육안 색을 재현한다고 주장하지 않는다.

**카메라:** 가장자리를 비스듬히 따라가다가 뒤로 빠져 태양의 규모를 드러낸다. 표면 위에 착륙하지 않는다. 구체 전체가 맥박처럼 커졌다 작아지는 효과를 사용하지 않는다.

**탐험 버튼 "태양 활동 관측":** 이미 존재하는 홍염 영역으로 관측 프레임을 옮기고 2초 동안 가까이 보여준 뒤 원래 구도로 복귀한다. 버튼이 태양 폭발을 발생시키는 식으로 만들지 않는다.

**설명:** "태양계의 중심에서 빛과 에너지를 내는 별."

### 01. 수성: 고요한 충돌구의 세계

**장면:** 회갈색 암석, 충돌구, 낮과 밤의 날카로운 경계를 보여준다. 두꺼운 구름이나 푸른 대기 테두리를 추가하지 않는다. 표면 전체를 용암으로 덮지 않는다.

**카메라:** 표면을 비스듬히 스치는 횡이동으로 크레이터의 그림자를 보여준 뒤, 초승달 모양의 구체가 읽히는 관측 위치에 정착한다.

**탐험 버튼 "충돌구 스캔":** 선택 지형 위로 얇은 스캔선이 지나가고 윤곽선이 1초 정도 남는다. 해당 부분을 잠시 확대해 보여준 뒤 구체 전체로 돌아간다. 스캔은 관측 UI이며 천체 표면을 실제 변형시키지 않는다.

**설명:** "태양에 가장 가까운, 충돌구가 많은 암석행성."

### 02. 금성: 구름 아래 감춰진 세계

**장면:** 크림색과 옅은 황토색 구름이 표면을 가리고 천천히 흐른다. 구름 외관과 표면 관측 모드 사이에 강한 시각적 반전을 만든다.

**카메라:** 구름의 곡면을 따라 가까워지다가 대기 바깥의 관측 위치에 멈춘다. 기본 외관에서 지표가 노출되지 않게 한다.

**탐험 버튼 "레이더로 보기":** 화면을 지나는 스캔 영역에서 구름이 레이더 기반 지형 시각화로 전환된다. **"레이더 기반 시각화(재구성)"** 라벨을 표시하고 같은 버튼으로 구름 보기로 돌아간다. 구름이 실제로 갈라진 것처럼 표현하지 않는다.

**설명:** "두꺼운 대기 아래, 태양계에서 가장 뜨거운 행성."

### 03. 지구: 우리가 돌아갈 집

**장면:** 푸른 바다, 대륙, 흰 구름, 얇은 대기층을 보여준다. 낮과 밤의 경계를 따라 지구의 곡률을 보여준다. 밤의 도시 불빛은 지표의 밤쪽 육지에 자연스럽게 나타난다.

**카메라:** 어두운 프레임 아래에서 푸른 지평선이 떠오르고, 카메라가 천천히 높아지며 지구 전체가 드러난다. 다른 장면보다 움직임을 줄이고 최소 3초는 푸른 지구를 감상하게 한다.

**탐험 버튼 "밤의 지구 보기":** 관측 시점을 밤쪽으로 옮겨 도시 불빛을 보여준다. 구름과 지표는 독립된 층으로 처리한다. 다시 누르면 최초 구도로 복귀한다.

**설명:** "바다와 구름, 생명이 함께하는 우리의 집."

### 04. 화성: 붉은 지형을 스치는 비행

**장면:** 붉은 갈색, 황토, 어두운 암석이 섞인 지형과 긴 협곡을 보여준다. 얇은 먼지층, 전경과 중경과 후경의 차이를 이용한다. 화면 전체에 강한 빨간 필터를 씌우지 않는다.

**카메라:** 궤도에서 특정 지형을 향해 접근한 뒤, 사선으로 협곡을 스치는 짧은 비행 장면으로 연결한다. 실제 지형 데이터를 쓰지 않으므로 **"지형을 참고한 탐험 연출"**이라고 표시한다.

**탐험 버튼 "협곡 탐험":** 3초짜리 정해진 카메라 경로를 따라 협곡을 비행한 뒤 궤도 관측 시점으로 돌아온다. 사용자가 도중에 복귀할 수 있는 버튼을 둔다.

**설명:** "붉은 먼지와 깊은 협곡에 남겨진 오래된 풍경."

### 05. 목성: 화면에 다 담기지 않는 거대함

**장면:** 크림, 황갈색, 갈색의 구름띠와 대적점을 보여준다. 처음에는 구름의 거대한 곡면이 화면 대부분을 차지하고, 뒤로 물러나며 그것이 행성의 일부였음을 알게 한다.

**카메라:** 구름띠와 나란히 횡이동한 뒤 천천히 후퇴한다. 규모를 느끼게 하는 작은 탐사선 실루엣을 가장자리에 잠시 둔다. 단단한 땅에 착륙하는 장면은 없다.

**탐험 버튼 "폭풍 추적":** 대적점 위치를 따라 관측 시점과 얇은 표시가 움직인다. 대적점은 행성의 회전과 함께 움직이며 화면에 고정된 스티커처럼 보이지 않아야 한다. 현재 크기를 검증하지 않은 수치로 표시하지 않는다.

**설명:** "거대한 구름띠와 폭풍이 흐르는 기체거인."

### 06. 토성: 얇은 선이 거대한 고리로 펼쳐진다

**장면:** 아이보리와 샴페인색 구체와 얇고 섬세한 고리를 보여준다. **이 장면을 전체 여행의 시각적 절정으로 만든다.** 고리의 간극과 밝기 차이, 고리와 행성의 그림자를 보여준다.

**카메라:** 처음에는 고리 평면과 거의 나란히 있어 얇은 선만 보인다. 카메라가 위로 올라가며 고리가 넓은 타원으로 펼쳐지고 그 뒤에 토성이 드러난다. 천체를 회전시켜 고리를 억지로 펼치는 대신 카메라 관측 각도를 바꾼다.

**탐험 버튼 "고리 가까이 보기":** 고리 위쪽을 따라 정해진 경로로 이동한다. 가까운 일부 구간에서 크기가 다른 얼음과 암석 입자를 드러내고 다시 전체 고리로 돌아온다. 고리 전체를 거대한 바위 몇 개나 두꺼운 도넛으로 표현하지 않는다.

**구현 기준:** 앞쪽 고리는 행성 앞, 뒤쪽 고리는 행성 뒤에 가려져야 한다. 고리의 앞뒤를 단순히 같은 CSS 레이어에 올려 가림 관계를 망가뜨리지 않는다. 입자 구간을 통과하는 대신 그 위를 비행한다.

**설명:** "수많은 얼음과 암석 조각이 이루는 거대한 고리."

### 07. 천왕성: 옆으로 누운 세계

**장면:** 옅은 청록색의 부드러운 구체와 어둡고 얇은 고리를 보여준다. 목성과 토성의 화려함 뒤에 여백과 조용한 움직임을 배치한다.

**카메라:** 기울어진 자전축과 고리의 방향을 읽을 수 있는 사선 구도로 접근한다. 행성과 고리는 처음부터 같은 축 관계를 유지한다.

**탐험 버튼 "자전축 확인":** 궤도면, 자전축, 약 97.8도의 기울기 표시를 잠시 보여준다. 각도의 기준이 궤도면의 수직 방향임을 그림에서 분명히 한다. 버튼을 누른 뒤 행성이 새롭게 쓰러지는 연출은 하지 않는다.

**설명:** "크게 기울어진 자전축을 가진 청록빛 얼음거인."

얼음거인이라는 이유로 걸을 수 있는 빙판이나 얼음 산맥을 행성 표면에 만들지 않는다.

### 08. 해왕성: 차가운 색, 거센 대기

**장면:** 천왕성보다 약간 푸른 청록색 계열의 구체와 밝은 구름을 보여준다. UI 포인트와 주변 배경을 차가운 남색으로 잡아 시각적 개성을 준다.

**카메라:** 느린 카메라 움직임과 상대적으로 빠르게 흐르는 대기의 대비를 만든다. 구름 속으로 들어가 단단한 지면에 착륙하지 않는다.

**탐험 버튼 "바람의 흐름 보기":** 구름 위에 흐름선이 잠시 나타나 대기의 운동 방향을 설명하고 다시 사라진다. 실제 관측 시계열 데이터가 없으므로 실시간 풍속이나 기상 정보처럼 표시하지 않는다.

**설명:** "멀리 떨어진 곳에서도 거센 바람이 부는 얼음거인."

과거 Voyager의 짙은 파랑을 정확한 자연색이라고 고정하지 않는다. 강한 코발트색 모드가 필요하면 **"색 강조 보기"**로 구분한다. 과거 대흑점을 영구적인 고정 지형으로 묘사하지 않는다.

### 09. 명왕성: 작은 세계의 커다란 발견

**장면:** 밝은 베이지와 붉은 갈색 지역, 하트 모양의 밝은 지형을 대비시킨다. 하트는 표면 재질에 자연스럽게 포함되며 별도의 귀여운 아이콘을 붙이지 않는다. 이름 옆에 **"왜소행성"**을 표시한다.

**카메라:** 작은 천체를 천천히 가까이 보여주고 하트 지형을 관찰한다. 이후 시점을 뒤로 돌려 먼 태양이 작고 밝게 보이도록 구성한다. **같은 태양이 첫 장면의 거대한 모습과 달라 보이는 시각적 대조로 여행을 마무리한다.** 밝기와 크기는 감상용으로 조정할 수 있다.

**탐험 버튼 "하트 지형 가까이 보기":** 하트 영역을 따라 짧게 이동해 밝은 얼음 지형의 디테일을 보여준 뒤 돌아온다. 이 지형 디테일은 재구성 그래픽임을 표시한다.

**설명:** "밝은 하트 모양 지형을 품은 먼 왜소행성."

**마무리 카피:** "우리의 이번 여행은 여기서 잠시 멈춥니다."

명왕성을 태양계의 물리적인 끝이라고 설명하지 않는다.

## 8. 자동 투어: 정확히 120초

모든 이동 전환은 아래 구간에 포함한다. 구간 밖에 전환 시간을 추가하지 않는다.

| 시간 | 목적지 | 연출 |
|---|---|---|
| 0~7초 | 오프닝 | 태양 가장자리에서 전체 지도와 제목 공개 |
| 7~17초 | 태양 | 접근, 홍염 관측, 거대한 빛 감상 |
| 17~24초 | 수성 | 날카로운 명암과 짧은 충돌구 스캔 |
| 24~33초 | 금성 | 구름에서 레이더 시각화로 반전한 뒤 복귀 |
| 33~45초 | 지구 | 푸른 지평선 공개, 밤쪽 관측, 최소 3초 감상 |
| 45~55초 | 화성 | 궤도에서 협곡 비행으로 전환한 뒤 복귀 |
| 55~68초 | 목성 | 구름띠에서 전체 규모 공개, 대적점 관측 |
| 68~82초 | 토성 | 얇은 고리 전개, 가까이 이동, 전체 구도 감상 |
| 82~91초 | 천왕성 | 느린 접근, 기울어진 자전축 표시 |
| 91~101초 | 해왕성 | 대기 흐름 관측, 차가운 분위기 유지 |
| 101~113초 | 명왕성 | 하트 지형과 먼 태양을 돌아보는 장면 |
| 113~120초 | 에필로그 | 지도가 돌아오며 방문한 목적지들이 차례로 켜짐 |

각 목적지의 탐험 액션은 해당 구간의 중간에 한 번 자동 재생한다.

장관이 드러난 뒤 문구를 표시하며, 주요 설명은 최소 2초 정도 읽을 수 있게 한다.

마지막 3초는 다음 문구와 전체 여행 경로를 안정적으로 보여준다.

**우리의 태양계**
**다음 여행은 어디로?**

### 사운드

영상의 소리는 감상을 돕는 음악과 효과음으로 구성한다.

도입부의 낮은 전자음, 지구의 따뜻한 화음, 토성의 넓은 공간감, 명왕성의 고요한 여운으로 변화를 준다.

목적지 이동 때마다 같은 큰 충격음을 반복하지 않는다. 우주 공간의 실제 소리를 녹음한 것처럼 설명하지 않는다.

라이선스를 확인할 수 있는 음원만 쓰고, 계정이나 유료 API가 필요한 생성 기능은 쓰지 않는다. 오디오 자산을 준비할 수 없다면 무음판을 출력하고 사실대로 알린다.

## 9. 인터랙션과 상태 전환

웹 상태는 최소한 다음처럼 구분한다.

- overview
- departing
- travelling
- arriving
- exploring

자동 투어 재생 상태와 현재 목적지는 별도 상태로 관리한다.

### 자유 탐험

도착 후 장면을 유지한다. 다음 버튼을 누르기 전 자동으로 떠나지 않는다.

"태양부터 출발"은 태양으로 이동한 뒤 자유 탐험 상태가 된다.

탐험 액션 중에는 "원래 시점으로"를 제공하고 초기 카메라와 라벨 상태를 복구한다.

### 자동 투어

"자동 투어"는 120초 스케줄을 처음부터 시작한다.

일시정지 버튼은 현재 투어 시간과 시각 상태를 그대로 정지하고, 재개는 동일한 시간부터 진행한다.

자유 탐험 후 누르는 "자동 투어로 돌아가기"와 구분한다.

### 사용자 입력의 우선권

자동 투어 중 다음 동작은 사용자 조작으로 간주한다.

- 목적지 선택.
- 탐험 액션.
- 드래그와 터치 회전.
- 이전과 다음.
- 지도 복귀.

이때 투어 시계를 먼저 멈추고 사용자 입력을 반영한다.

**카메라를 제어하는 주체는 항상 하나여야 한다.**

### 자유 탐험에서 투어로 복귀

"자동 투어로 돌아가기"를 누르면 현재 목적지의 **도착 정착 시점**부터 이어 간다.

목적지별 구간 시작 시각과 도착 정착 시각을 별도로 정의한다.

현재 자유 카메라에서 투어 카메라까지 짧게 연결하여 이전 목적지 출발 구도로 튀지 않게 한다.

지도에서는 마지막 목적지의 도착 정착 시점으로 돌아가고, 방문한 목적지가 없으면 처음부터 시작한다.

이 복귀 처리는 웹에만 적용하며 120초 영상 스케줄을 바꾸지 않는다.

### 이동 중 조작

지도 복귀 버튼과 Escape는 언제든 작동한다.

이동 중에는 "이동 건너뛰기"로 도착 상태를 바로 만들 수 있다.

- 자동 투어에서는 도착 정착 시점으로 투어 시간을 이동한 뒤 계속 재생한다.
- 자유 탐험에서는 도착 후 자유 탐험을 유지한다.

이동 중 다른 목적지 선택은 임시 비활성화하고 상태를 표시한다.

여러 카메라 애니메이션을 겹쳐 실행하지 않는다. 각 상태를 빠져나갈 때 이전 카메라와 오버레이 애니메이션, 이벤트를 정리한다.

### 드래그와 키보드

PC에서는 도착 후 드래그로 현재 천체를 제한된 범위에서 관찰할 수 있다. 이동 중에는 드래그 회전을 잠근다.

클릭과 드래그를 구분하고, 버튼 위 드래그가 카메라를 움직이지 않게 한다. 모바일에서는 터치로 같은 기능을 제공한다.

키보드로 모든 이름 버튼과 기능을 선택할 수 있어야 한다.

Tab 포커스를 분명하게 보여주고 버튼에는 읽을 수 있는 이름을 제공한다. 키보드 단축키는 입력 요소의 기본 동작과 충돌하지 않게 한다.

### 방문 상태와 오디오

방문 상태는 현재 세션 메모리로 관리한다. DB나 계정 연동 없이 새로 시작할 수 있다.

브라우저 오디오는 기본 음소거다. 사용자가 사운드를 켜면 음악이 시작되며 아이콘과 상태가 일치한다.

방문과 탐험에 소리가 필수 조건이 되지 않게 한다.

## 10. 레이아웃과 반응형

데스크톱 상세 장면은 천체와 환경에 화면의 약 65~75%를 할당한다.

설명은 남은 여백에 간결하게 배치한다.

지구의 지평선, 목성의 큰 곡면, 토성의 고리를 위한 구도를 각각 잡는다.

1080p 기준 천체 제목은 72~104px, 설명은 26~34px 정도로 시작해 실제 화면에서 조정한다.

한국어 설명은 기본 1~2문장, 2~3줄 이내로 한다. 분류와 영어 이름은 보조 정보다. 상세 패널을 열었을 때만 추가 사실과 출처를 보여준다.

### 모바일

상단 약 60~65%에 우주 장면, 아래에 이름, 설명, 탐험 버튼을 배치한다.

토성 고리, 태양 가장자리, 하단 조작부가 서로 겹치지 않도록 카메라 구도를 따로 조정한다.

390px 안팎 너비에서 가로 넘침과 잘린 버튼이 없어야 한다.

### 모션 감소

prefers-reduced-motion에서는 긴 비행, 별빛 늘어짐, 카메라 롤을 줄이고 약 0.2~0.3초 페이드 중심의 이동을 제공한다.

같은 목적지, 정보, 탐험 기능에 접근할 수 있어야 한다.

큰 화면 점멸이나 반복 섬광은 사용하지 않는다.

## 11. 그래픽: 사진 없이 절차적 재질로

이번 제작은 사진, 위성 이미지 텍스처, 생성 이미지를 쓰지 않는다. 외부 이미지를 내려받지 않는다. 모든 천체는 셰이더 기반 절차적 재질(노이즈, 띠, 크레이터 패턴, 대기 산란 근사)과 벡터 그래픽으로 직접 만든다. 결과 보고와 정보 패널에 "사진이 아닌 재구성 그래픽"임을 밝힌다.

### 천체별 재질 기준

- 태양: 흐르는 노이즈 표면, 가장자리 어두워짐, 홍염 아치.
- 수성: 크기가 다른 크레이터 패턴과 날카로운 명암 경계.
- 금성: 천천히 흐르는 크림색 구름층, 레이더 모드는 별도의 지형 노이즈.
- 지구: 바다, 대륙, 구름, 대기 테두리, 밤 불빛을 분리한 층. 대륙 윤곽이 지구로 알아볼 수 있어야 하므로, 공개 도메인 벡터 지도 데이터(예: Natural Earth)를 쓸 수 있으면 사용하고 출처를 기록한다. 쓸 수 없으면 실제 대륙 배치를 단순화한 형상으로 그린다.
- 화성: 붉은 갈색 지형 노이즈와 협곡을 위한 별도 지형 메시.
- 목성: 위도별 구름띠, 띠 사이의 난류, 대적점.
- 토성: 아이보리 구체, 간극과 밝기 차이가 있는 고리, 고리와 행성의 서로 드리운 그림자.
- 천왕성, 해왕성: 부드러운 청록 계열과 옅은 구름, 해왕성은 더 빠르게 흐르는 밝은 구름.
- 명왕성: 베이지와 붉은 갈색 지역, 밝은 하트 모양 지형.

### 구현 기준

- 대적점, 하트 지형, 크레이터 표시는 행성의 자전과 함께 움직인다.
- 토성 고리는 알파와 앞뒤 가림이 자연스러워야 한다.
- 천왕성의 고리와 축은 같은 기준 변환을 사용한다.
- 지구는 낮 지표, 밤 불빛, 구름층을 분리한다.
- 사용한 데이터, 글꼴, 음원의 출처와 라이선스를 정보 패널의 크레딧에 표시한다.

### 성능 기준

- 일반적인 데스크톱에서 부드러운 조작을 목표로 하고 실제 환경에서 프레임 저하를 확인한다.
- 측정하지 않은 60fps를 보장한다고 쓰지 않는다.
- 모바일에서는 픽셀 비율, 입자 수, 셰이더 복잡도, 후처리를 낮춘다.
- 웹에서는 현재 목적지를 먼저 준비하고 다음 목적지의 셰이더와 데이터를 미리 준비한다.
- 비활성 장면의 무거운 후처리를 멈추고 렌더 자원과 리스너를 정리한다.
- 별은 점군이나 인스턴싱 등 적절한 렌더링 방식으로 구현한다.
- 고리는 멀리서는 단순한 재질, 가까운 일부 구간에서만 입자 상세를 사용한다.
- WebGL이 불가능하면 같은 목적지의 2.5D 그림, 이동, 설명, 버튼으로 탐험이 가능한 대체 화면을 제공한다.

## 12. HyperFrames 렌더 재현성

실시간 웹 모드와 영상 렌더 모드의 시계 소유권을 분명하게 한다.

웹에서는 사용자 입력과 실시간 프레임 루프를 사용할 수 있지만, **영상 모드의 결과는 입력 시간 t만으로 결정되어야 한다.**

현재와 다음 목적지 중심의 지연 준비와 비활성 장면 정리는 웹 모드의 최적화다.

영상 모드는 캡처 전에 전체 투어에 필요한 셰이더와 데이터를 준비하거나, 공식 seek 완료 절차 안에서 해당 프레임의 준비를 확실히 보장한다.

이전 장면을 지나왔다는 이유로 필요한 자원이 존재한다고 가정하지 않는다.

다음을 지킨다.

- 영상 렌더 중 자유 실행 requestAnimationFrame, Date.now, 타이머, 누적 deltaTime으로 상태가 달라지지 않게 한다.
- 무작위 별, 먼지, 고리 입자, 크레이터 배치는 고정된 seed로 만든다.
- 천체 회전, 카메라 위치, 대기 흐름, 라벨 가시성, 레이더 마스크, 탐험 액션을 절대 시간에서 계산한다.
- GSAP 콜백이 앞에서 실행되었다는 사실에 의존해 장면을 생성하지 않는다.
- 중간 시점으로 바로 seek해도 그 장면이 준비되어야 한다.
- 렌더 도중 외부 네트워크 요청이 장면을 바꾸지 않게 한다.
- 역방향 seek와 반복 seek에서도 카메라, 재질, 표시 상태를 복원한다.
- 프레임을 요청한 뒤 WebGL 드로우가 끝난 상태가 실제 캡처되는지 확인한다.
- 오디오를 사용하면 HyperFrames의 공식 미디어 재생 방식에 맞게 배치한다.
- 3600프레임 WebGL 렌더는 오래 걸린다. 먼저 설치 버전의 draft 품질 옵션으로 짧은 구간과 전체를 시험 렌더한 뒤 최종 렌더한다. GPU 사용 옵션은 설치 버전의 도움말로 확인한다.

## 13. 단계별 구현 순서

### 1단계

1. 환경과 공식 HyperFrames 문서, three 어댑터 문서를 확인하고 웹과 영상 진입점이 있는 프로젝트를 준비한다.
2. 10개 목적지 데이터 구조와 재질 설정 목록을 구성한다.
3. 전체 지도와 목적지 선택, 지도 복귀, 기본 카메라 이동을 구현한다.
4. **태양의 첫 공개, 지구의 지평선, 토성 고리의 전개**를 가장 먼저 높은 완성도로 만든다.

### 2단계

5. 나머지 7개 목적지에 고유 카메라, 재질, 탐험 액션을 적용하고 명왕성의 마무리를 완성한다.

### 3단계

6. 120초 투어 스케줄과 웹 자동 재생, 일시정지, 건너뛰기, 복귀를 연결한다.
7. 모바일, 키보드, 모션 감소, 반복 방문, 빠른 이동 종료를 확인한다.
8. 정적 웹 빌드를 만들고, 하위 경로에 올려도 동작하는지 로컬에서 확인한다.

### 4단계

9. 공유 로직을 단일 JS 번들로 빌드해 HyperFrames 영상 원본에 연결한다.
10. 대표 프레임을 확인하고 시험 렌더로 오류를 수정한 뒤 최종 렌더링한다.

어려운 3D 지형은 정교한 2.5D로 대체할 수 있다. 각 목적지의 고유한 구도와 대표 액션은 유지한다.

## 14. 완료 전 실제 확인

### 웹 기능

- 지도에서 10개 목적지를 각각 선택할 수 있는가?
- 모든 탐험 버튼이 실제 장면 변화를 일으키는가?
- 이전, 다음, 지도 복귀, 이동 건너뛰기, 자동 투어, 일시정지, 재개가 동작하는가?
- 자동 투어 도중 사용자 조작으로 전환한 후 다시 돌아갈 수 있는가?
- 토성, 수성, 명왕성처럼 순서를 바꿔 방문해도 카메라와 재질이 섞이지 않는가?
- 모바일과 키보드로 같은 주요 기능에 접근할 수 있는가?
- 정적 빌드를 하위 경로에 올려도 그림, 글꼴, 스크립트가 모두 불러와지는가?

### 영상과 시각

- 태양, 지구, 토성에 서로 다른 대표 장관이 있는가?
- 토성 고리의 가림과 그림자가 올바른가?
- 천왕성의 자전축과 고리가 일치하는가?
- 금성 레이더 모드에 표시가 있는가?
- 기체거인과 얼음거인에 지면 착륙이 없는가?
- 한국어 폰트, 라벨, 배경 대비가 정상인가?
- 8초, 28초, 38초, 73초, 108초로 직접 이동해도 정상인가?
- 73초, 8초, 108초, 28초처럼 역순으로 seek해도 같은 장면이 나오는가?
- 실제 MP4에 검은 캔버스, 한 프레임 지연, 깜빡임, 잘린 UI가 없는가?
- 결과가 정확히 120초, 1920x1080, 30fps인가?
- 오디오 포함 여부가 보고 내용과 일치하는가?

검수 후 프로젝트 위치, 웹 미리보기 주소, 정적 빌드 위치, MP4와 대표 스틸 경로, 재실행 방법, 실제 확인한 항목을 알려라.

렌더링이나 구현이 막혔다면 원인과 완료된 범위를 구분해 보고하라. 생성하지 않은 파일을 완성했다고 말하지 않는다. 보고는 코딩을 모르는 사람도 이해할 수 있는 쉬운 한국어로 써라.

## 15. 공식 과학 자료

아래 자료를 천체별 특징의 기준으로 사용한다.

- 태양계 분류: https://science.nasa.gov/solar-system/planets/
- 태양: https://science.nasa.gov/sun/facts/
- 수성: https://science.nasa.gov/mercury/facts/
- 금성: https://science.nasa.gov/venus/venus-facts/
- 지구: https://science.nasa.gov/earth/facts/
- 화성: https://science.nasa.gov/mars/facts/
- 목성: https://science.nasa.gov/jupiter/jupiter-facts/
- 토성: https://science.nasa.gov/saturn/facts/
- 천왕성: https://science.nasa.gov/uranus/facts/
- 해왕성: https://science.nasa.gov/neptune/neptune-facts/
- 명왕성: https://science.nasa.gov/dwarf-planets/pluto/facts/

초 단위 여행, 가상의 탐사선, 카메라 이동과 스캔 효과는 이번 작품을 위한 창작 연출로 구현한다.
```

### 막혔을 때 원인 찾기 (7장)
```text
[몇 번째 단계, 예: 준비물 설치 / 영상 만들기 / 렌더 / 사이트에 넣기 / 배포]에서 막혔어요.
나온 오류 문구나 화면은 아래와 같아요.
[오류 문구를 그대로 붙여넣기]
Node.js와 FFmpeg 버전, 영상 프로젝트 폴더, renders 폴더, 사이트의 영상 태그와 파일 이름을 먼저 확인해서 원인을 쉬운 말로 설명해줘. 해결 방법은 한 단계씩 알려주고, 내 PC를 바꾸는 작업은 하기 전에 무엇을 할지 먼저 알려줘.
```

### 7장 완료 확인
```text
7장 결과물이 제대로 되어 있는지 확인해줘. 파일은 아무것도 바꾸거나 올리지 말고 확인만 해줘.
1. node --version 이 22 이상이고 ffmpeg -version 이 동작하는지
2. 영상 프로젝트 폴더(예: my-video)가 있고, 그 폴더가 사이트 폴더(ai-site) 밖에 있는지
3. 영상 프로젝트의 renders 폴더에 MP4 렌더 파일이 있는지 (경로, 길이, 파일 크기)
4. 사이트 폴더의 assets/video/ 에 영상 파일이 있고, 크기가 10MB 이하(100MB를 넘지 않음)인지
5. 사이트 HTML의 video 태그에 autoplay muted loop playsinline 이 있고, 경로와 실제 파일 이름이 대소문자까지 같은지
6. 배포 주소에서 영상 파일이 실제로 열리는지 (주소를 확인할 수 있으면 확인)
각 항목을 O 또는 X로 표로 정리해줘. X가 있으면 원인과 해결 방법을 알려주고, 모두 O이면 "완료"라고 답해줘.
```

## 08 완성 기준과 개선

### 소개 장면 점검 부탁
```text
이 사이트의 소개 장면이 완성되어 있는지 점검해 주세요. 파일은 고치지 말고, 결과만 알려 주세요.

확인할 것:
- 첫 화면에서 처음 보는 사람이 무엇을 소개하는 사이트인지 알 수 있는가
- 핵심 장면이나 효과가 최소 하나 있는가
- 마지막에 끝났다는 느낌을 주는 장면이 있는가
- 글자가 잘리거나, 겹치거나, 읽기 어려운 곳이 있는가

항목마다 "있음/부족/없음"으로 표시하고, 부족하거나 없는 것은 한 줄로 이유를 적어 주세요.
```

### 행동과 변화 표로 정리
```text
이 사이트에서 사용자가 할 수 있는 행동(스크롤, 클릭, 슬라이더, 버튼 등)을 모두 찾아서 표로 정리해 주세요. 파일은 고치지 마세요.

표의 열: 행동 / 일어나는 변화 / 그 변화가 의미 있는지(있음, 약함) / 약하다면 더 의미 있게 만드는 방법 한 줄

표 아래에는 "변화가 하나도 일어나지 않는 곳"이 있으면 따로 알려 주세요.
```

### 모바일 점검 부탁
```text
이 사이트가 휴대폰 세로 화면(폭 360~430픽셀 정도)에서 잘 보이고 잘 눌리는지 점검해 주세요.
먼저 파일은 고치지 말고, 문제를 목록으로만 알려 주세요.

확인할 것:
- 글자가 잘리거나 화면 밖으로 나가는 곳
- 화면이 좌우로 흔들리는 가로 스크롤이 생기는 곳
- 엄지로 누르기 너무 작은 버튼이나 슬라이더
- 마우스를 올려야만(hover) 보이는 효과
- 휴대폰에서 버벅일 수 있는 무거운 움직임
- 폰을 가로로 눕혔을 때 깨지는 곳

문제마다 어디(파일과 위치)인지, 고치는 방법을 한 줄로 적어 주세요. 가장 급한 3개에는 표시해 주세요.
```

### 모바일 문제 3개만 고치기
```text
방금 표시한 급한 문제 3개만 고쳐 주세요. 다른 부분은 건드리지 마세요.
고친 뒤에 무엇을 어떻게 바꿨는지 쉬운 말로 알려 주세요.
```

### impeccable 비평 받기
```text
/impeccable critique index.html
이 사이트는 [내 소재]를 [처음 보는 동료]에게 소개하는 사이트입니다.
목표는 [처음 보는 사람이 5초 안에 무엇인지 알고, 끝까지 스크롤하게 만드는 것]입니다.
파일은 고치지 말고 평가만 해 주세요. 결과는 한국어로, 어려운 디자인 용어는 쉬운 말로 풀어서 써 주세요.
```

### 우선순위 1개만 고치기
```text
방금 비평에서 [가장 중요한 문제의 이름이나 번호] 하나만 고쳐 주세요.
다른 곳은 건드리지 마세요. 지금 잘 동작하는 효과는 그대로 유지해 주세요.
고친 뒤에 무엇을 어떻게 바꿨는지 쉬운 말로 알려 주세요.
```

### 변경 내용 올려서 다시 배포
```text
지금까지 바꾼 내용을 GitHub에 올려 주세요(커밋하고 푸시). 평소 배포에 쓰는 기본 작업 줄기(브랜치, 보통 main)로 올려 주세요.
올리기 전에 무엇이 바뀌었는지 쉬운 말로 요약해 주세요. 비밀번호나 개인 정보가 들어 있는 파일은 올리지 마세요.
```

### 배포 오류 해결 부탁
```text
Vercel 배포가 실패했습니다. 아래 오류 메시지를 보고 원인과 고치는 방법을 쉬운 말로 알려 주세요.
고칠 수 있으면 고쳐서 다시 올릴 수 있게 준비해 주세요.

[여기에 Vercel의 오류 메시지를 붙여 넣기]
```

### 장면 추가 부탁
```text
지금 사이트의 마지막 장면 다음에 새 장면 하나를 추가해 주세요.
새 장면 내용: [예: 가장 깊은 곳의 숨겨진 동굴이 나오고, 처음 보는 생물이 등장함]
기존 장면은 건드리지 말고, 지금 장면들과 같은 분위기와 같은 방식의 효과로 만들어 주세요.
```

### 테마 바꾸기 부탁
```text
이 사이트에 두 번째 테마를 추가해 주세요.
- 내용과 장면 구성은 그대로 두고, 색과 글꼴과 분위기만 [어두운 네온 느낌 / 따뜻한 종이 질감 느낌]으로 바꿔 주세요.
- 화면 한쪽에 테마를 바꾸는 버튼을 하나 달아서, 누르면 원래 테마와 새 테마를 오갈 수 있게 해 주세요.
- 원래 테마는 그대로 보존해 주세요.
```

### 모바일 연출 부탁
```text
휴대폰 세로 화면에서 더 재미있게 만들어 주세요.
- 화면을 손가락으로 눌렀을 때 누른 자리에서 작은 반응(빛이 퍼지거나 도형이 튀는 효과)이 일어나게 해 주세요.
- 손가락으로 끌어서 조작하는 부분은 손가락이 닿기 편한 크기로 키워 주세요.
- 마우스를 올려야만 보이는 효과는 눌러서 보이게 바꿔 주세요.
- PC 화면의 모습은 지금 그대로 유지해 주세요.
```

### 소개 영상 만들기
```text
/hyperframes:motion-graphics
제 사이트를 소개하는 짧은 영상을 10초 안팎으로 만들어 주세요.
- 소재: [내 소재]
- 분위기: [차분하고 고급스럽게 / 밝고 발랄하게]
- 제목 문구: [영상에 크게 나올 한 줄]
- 가로로 긴 16:9 화면으로 만들고, 소리는 넣지 마세요.
```

### 소개 영상을 사이트에 넣기
```text
만들어 둔 소개 영상 [영상 파일 이름.mp4]를 사이트 첫 화면 위쪽에 넣어 주세요.
- 소리 없이 자동으로 재생되고, 끝나면 반복되게 해 주세요.
- 휴대폰에서도 화면 안에서 바로 재생되게 해 주세요.
- 영상 파일이 크면(대략 5MB 이상) 화질을 크게 해치지 않는 선에서 용량을 줄여 주세요.
- 영상이 불러와지기 전에 보일 대표 이미지도 같이 설정해 주세요.
```

### 막혔을 때 원인 찾기 (8장)
```text
[몇 번째 단계, 예: 4가지 기준 점검 / 한 번 개선 / 다시 배포]에서 막혔어요.
나온 오류 문구나 화면은 아래와 같아요.
[오류 문구를 그대로 붙여넣기]
내 사이트 파일과 배포 상태를 먼저 확인해서 원인을 쉬운 말로 설명해줘. 해결 방법은 한 단계씩 알려주고, 파일을 바꾸거나 올리는 작업은 하기 전에 무엇을 할지 먼저 알려줘.
```

### 8장 완료 확인
```text
내 사이트가 8장의 완성 기준을 채웠는지 확인해줘. 파일은 아무것도 바꾸거나 올리지 말고 확인만 해줘.
1. 배포된 내 사이트 주소(Vercel 대표 주소)가 로그인 없이 열리는지
2. 소개 장면이 있는지 (첫 화면, 핵심 장면, 마무리 장면)
3. 클릭이나 스크롤에 따라 의미 있는 변화가 일어나는지
4. 모바일(휴대폰 폭)에서 글자가 잘리거나 가로 스크롤이 생기지 않는지
5. 배포 후 한 번 이상 개선해서 다시 올린 기록이 있는지 (git log와 Vercel 배포 목록 기준)
각 항목을 O 또는 X로 표로 정리해줘. X가 있으면 원인과 해결 방법을 알려주고, 모두 O이면 "완료"라고 답해줘.
```

## 09 업무로 가져가기

### 좋은 부탁 예: 주간 보고 요약
```text
목적: 월요일 팀 회의에서 지난주 일을 3분 안에 공유하려고 합니다.
독자: 바쁜 팀장님이 읽습니다. 업무 배경 설명은 필요 없습니다.
결과물: 5줄 이내 요약 하나와, 다음 주 할 일 3가지를 표로 만들어 주세요.
조건: 아래 메모에 없는 내용은 지어내지 마세요. 숫자와 날짜는 메모 그대로 쓰세요. 문장은 "-했습니다"로 끝내 주세요.
확인: 메모만으로는 알 수 없어서 제가 확인해야 할 부분은 마지막에 질문으로 따로 모아 주세요.

메모(가짜 예시입니다):
- 신규 문의 응대 12건 완료, 2건은 답변 대기
- 월간 점검 자료 초안 작성 (마감 금요일)
- 행사 장소 후보 2곳 비교 중
```

### 결과 구체적으로 고쳐 달라고 하기
```text
방금 결과에서 고치고 싶은 곳이 있어요.
- 고칠 곳: [예: 두 번째 문단]
- 지금 문제: [예: 너무 길고 어려운 말이 많아요]
- 원하는 모습: [예: 세 줄 이내, 처음 보는 사람도 이해할 쉬운 말]
- 그대로 둘 것: [예: 숫자와 날짜는 바꾸지 마세요]
고친 뒤에 무엇을 바꿨는지 한 줄로 알려 주세요.
```

### CSV 데이터 정리 (가짜 데이터로 연습)
```text
엑셀에서 쓰는 CSV 파일 정리를 연습하고 싶어요. 실제 데이터는 쓰지 않고 가짜 예시로만 진행합니다.
1. 먼저 이 폴더에 sample-orders.csv 파일을 만들어 주세요. 가짜 주문 30줄이고, 열은 주문일, 고객명, 상품명, 수량, 금액입니다.
2. 일부러 지저분하게 만들어 주세요. 날짜 형식이 섞여 있고(2026-10-01, 2026/10/2, 10월 3일), 이름 앞뒤에 공백이 있고, 똑같은 줄이 3개 정도 중복되어 있게요. 고객명은 고객A, 고객B처럼 가짜로 쓰세요.
3. 그다음 sample-orders.csv는 건드리지 말고, 정리한 결과를 sample-orders-clean.csv로 따로 저장해 주세요. 날짜는 2026-10-01 형식으로 통일하고, 공백을 지우고, 중복된 줄은 하나만 남겨 주세요.
4. 엑셀에서 열었을 때 한글이 깨지지 않게 저장해 주세요.
5. 새 프로그램을 설치해야 하는 방법은 쓰지 마시고, 이 PC에 이미 있는 도구로 해결해 주세요.
6. 마지막에 무엇을 몇 줄 고쳤는지 표로 요약해 주세요.
```

### 한 장짜리 HTML 대시보드 만들기
```text
한 장짜리 HTML 대시보드를 만들어 주세요. 가짜 예시 데이터로만 진행합니다.
- 주제: 가상의 "샘플 카페" 최근 6개월 월별 매출(만원)과 방문자 수. 숫자는 직접 만들어 주세요.
- 파일: dashboard.html 하나. 파일을 더블클릭하면 브라우저에서 바로 열려야 합니다.
- 화면: 맨 위에 큰 숫자 카드 3개(최근 달 매출, 전월 대비 증감, 6개월 평균), 그 아래에 월별 매출 막대그래프, 맨 아래에 월별 표.
- 숫자 데이터는 파일 맨 위 한곳에 모아 두어서, 제가 나중에 숫자만 바꿔 끼울 수 있게 해 주세요.
- 인터넷에서 불러오는 코드나 외부 서버로 데이터를 보내는 코드는 쓰지 마세요.
- 글자는 크고 읽기 쉽게, 색은 차분하게, 휴대폰 화면에서도 깨지지 않게 해 주세요.
- 만든 뒤 숫자 카드의 값이 표의 값과 맞는지 직접 계산해서 확인하고, 결과를 알려 주세요.
```

### 회의록 요약과 할 일 추출
```text
아래는 가상의 회의 메모입니다. 실제 회의 내용이 아닙니다.
이 메모를 읽고 다음 형식으로 정리해 주세요.
1. 회의 요약: 5줄 이내
2. 결정된 것: 목록
3. 할 일: 표 (할 일, 담당자, 기한, 상태). 메모에 담당자나 기한이 없으면 지어내지 말고 "미정"이라고 쓰세요.
4. 불분명해서 확인이 필요한 것: 질문 목록
메모에 없는 내용은 절대 지어내지 마세요.

[여기에 가짜 회의 메모를 붙여 넣으세요. 예: 가을 사내 행사 준비 회의. 참석자는 가상 인물 A, B, C 세 명. 장소는 후보 두 곳 중 정할 예정. 초대장은 다음 주 수요일까지 보내야 함. 예산은 아직 확정되지 않음.]
```

### 사내 매뉴얼 웹페이지 만들기
```text
신입 사원을 위한 "첫 출근 안내" 웹페이지를 만들어 주세요. 내용은 아래 가짜 예시를 쓰고, 실제 회사 정보는 넣지 않습니다.
- 파일 하나(manual.html)로 만들고, 더블클릭하면 열려야 합니다.
- 맨 위에 제목과 한 줄 소개, 그 아래에 목차(누르면 해당 위치로 이동)
- 항목: 첫날 준비물, 자리와 장비 안내, 자주 묻는 질문(누르면 펼쳐지는 방식). 담당자 연락처는 [담당자 이름], [내선번호]처럼 자리 표시로 남겨 두세요.
- 준비물 목록은 체크하면 글자에 줄이 그어지게 해 주세요. 페이지를 닫았다 다시 열어도 체크가 남아 있으면 더 좋아요.
- 글자는 크게, 문장은 짧게, 휴대폰으로 봐도 읽기 편하게 해 주세요.
- 맨 아래에 "이 페이지는 연습용이며 실제 회사 정보가 아닙니다"라는 문구를 넣어 주세요.
```

### 출장비 계산기 만들기
```text
출장비 계산기를 만들어 주세요. 한도와 단가는 제가 임의로 정한 예시 숫자입니다.
- 파일 하나(travel-calc.html), 더블클릭으로 열려야 합니다.
- 입력: 출장 일수, 교통비, 숙박비(1박당), 숙박 박수
- 일비는 하루 [예시 일비 숫자, 예: 30000]원으로 계산해서 더해 주세요. 이 숫자는 파일 맨 위에서 쉽게 바꿀 수 있게 해 주세요.
- 결과: 총 합계와 항목별 소계. 총 합계가 [예시 한도 숫자, 예: 500000]원을 넘으면 빨간 글씨로 "한도 초과"라고 보여 주세요.
- 숫자는 쉼표를 찍어 읽기 쉽게 보여 주고, 입력칸이 비어 있으면 0으로 보고 오류가 나지 않게 해 주세요.
- 만든 뒤 예시 3가지를 직접 계산해서, 화면의 결과가 맞는지 알려 주세요.
```

### 파일 정리 스크립트 (미리보기 먼저)
```text
파일 정리 자동화를 연습하고 싶어요. 실제 파일은 건드리지 않고, 연습 폴더 안에서만 진행합니다.
1. 이 폴더 안에 practice-files 폴더를 만들고 가짜 파일 20개를 만들어 주세요. 이름은 보고서1.pdf, 회의록 최종.docx, 사진_01.jpg처럼 제각각이고, 내용은 비어 있어도 됩니다.
2. 그 폴더의 파일을 확장자별 하위 폴더(문서, 이미지, 기타)로 나눠 옮기고, 이름 앞에 실행하는 날의 날짜(예: 20261006_)를 붙이는 스크립트를 만들어 주세요.
3. 스크립트를 처음 실행하면 "이렇게 바꿀 예정입니다"라는 목록만 보여 주고, 실제로는 아무것도 바꾸지 않게 해 주세요. 제가 확인용 옵션을 줄 때만 실제로 옮기게 해 주세요.
4. 파일을 삭제하는 동작은 절대 넣지 마세요. 같은 이름이 이미 있으면 덮어쓰지 말고 건너뛰고 알려 주세요.
5. 새 프로그램 설치 없이 이 PC에서 쓸 수 있는 방식으로 만들고, 미리보기용 실행 방법과 실제로 옮기는 실행 방법을 각각 한 줄로 알려 주세요.
6. 스크립트가 어떤 일을 하는지 초보자도 알 수 있게 쉬운 말로 설명해 주세요.
```

### 공지 메일 초안 만들기와 톤 비교
```text
아래 상황으로 사내 공지 메일 초안을 써 주세요. 실제 이름과 연락처는 쓰지 않고 [담당자 이름]처럼 자리 표시로 남겨 주세요.
상황: [예: 다음 주 금요일 오후 3시에 팀 교육이 있고, 장소는 3층 회의실이며, 노트북을 가져와야 합니다]
받는 사람: [예: 같은 팀 동료 10명]
요청:
1. 정중한 톤과 간결한 톤, 두 가지 버전으로 써 주세요.
2. 제목 후보를 3개 주세요.
3. 본문은 250자 이내로 하고, 날짜, 시간, 장소, 준비물이 한눈에 보이게 해 주세요.
4. 상황에 없는 내용(예: 점심 제공, 참석 필수 여부)은 지어내지 말고, 제가 정해야 하는 항목을 마지막에 질문으로 모아 주세요.
```

### 내 업무에서 AI에게 맡길 일 찾기
```text
저는 [내 직무]를 맡고 있고, 코딩 경험은 없습니다. 제가 하는 일 중에서 AI에게 맡기기 좋은 일을 함께 찾고 싶습니다.
1. 먼저 저에게 질문을 한 번에 하나씩, 최대 5개만 해 주세요. 매일이나 매주 반복하는 일, 시간이 오래 걸리는 일, 짜증 나는 일을 중심으로 물어봐 주세요.
2. 제가 답하면, 맡기기 좋은 일 3가지를 골라 이유와 함께 알려 주세요.
3. 고른 일마다 "가짜 예시 데이터로 먼저 연습하는 방법"을 알려 주세요.
주의: 저는 고객 이름, 개인정보, 사내 기밀은 말하지 않을 거예요. 그런 내용이 필요하면 예시로 바꿔서 알려 달라고 말해 주세요.
```

### 팀 공유용 5분 소개 자료 뼈대
```text
제가 AI로 해 본 일을 팀에 공유하려고 합니다. 5분짜리 소개 자료의 뼈대를 만들어 주세요.
- 한 일: [예: 가짜 데이터로 매출 대시보드 만들기]
- 걸린 시간: [예: 처음 20분, 수정 10분]
- 이전 방식과 비교: [예: 보통 1시간 걸림]
- 아쉬웠던 점: [예: 처음 그래프 색이 마음에 안 들어서 두 번 고침]
구성: 1) 무엇을 했나 2) 어떻게 부탁했나(프롬프트 한 줄 요약) 3) 결과 4) 조심할 점(개인정보, 인증정보, 회사 기밀을 넣지 않는다는 보안 수칙 포함) 5) 동료가 바로 따라 할 수 있는 한 가지 제안
회사 내부 정보와 실제 고객 정보는 들어가지 않게 해 주세요. 확실하지 않은 숫자는 [확인 필요]로 표시해 주세요.
```

### 내 사이트에 새 장면 추가 부탁
```text
지금 만들고 있는 사이트에 새 기능을 하나 추가하고 싶어요.
추가하고 싶은 것: [예: 스크롤을 끝까지 내리면 나타나는 "다음 이야기" 장면]
조건:
1. 기존 화면과 색, 글꼴, 분위기가 어울리게 해 주세요.
2. 휴대폰 화면에서도 깨지지 않게 해 주세요.
3. 바꿀 파일과 이유를 먼저 짧게 알려 주고 진행해 주세요.
4. 끝나면 제가 직접 눌러 보며 확인할 순서를 알려 주세요.
제가 확인하고 "올려 주세요"라고 말하면 그때 GitHub에 올려서 내 주소에 반영해 주세요. 그 전에는 올리지 마세요.
```

### 막혔을 때 원인 찾기 (9장)
```text
[몇 번째 업무 예시, 예: 예시 1 CSV 정리 / 예시 6 파일 정리 스크립트]에서 막혔어요.
나온 오류 문구나 화면은 아래와 같아요.
[오류 문구를 그대로 붙여넣기]
지금 폴더의 파일과 PC 상태를 먼저 확인해서 원인을 쉬운 말로 설명해줘. 해결 방법은 한 단계씩 알려주고, 파일을 지우거나 바꾸는 작업은 하기 전에 무엇을 할지 먼저 알려줘.
```

### 9장 완료 확인
```text
9장 업무 활용 연습이 제대로 되었는지 확인해줘. 파일은 아무것도 바꾸거나 올리지 말고 확인만 해줘.
1. 지금 열린 폴더가 연습 전용 폴더인지 (바탕화면이나 문서 폴더 전체가 아닌지)
2. 업무 활용 예시 하나 이상(CSV 정리, 대시보드, 회의록, 매뉴얼, 계산기, 파일 정리, 메일 초안 중)이 결과 파일까지 끝까지 만들어져 있고 열어 보면 정상인지
3. 이 폴더의 파일에 실제 개인정보(주민등록번호, 연락처, 주소, 이메일), 인증정보(비밀번호, API 키, 토큰), 회사 기밀로 보이는 내용이 없고 모두 가짜 예시 데이터인지
각 항목을 O 또는 X로 표로 정리해줘. X가 있으면 원인과 해결 방법을 알려주고, 모두 O이면 "완료"라고 답해줘.
```

## C Copilot만 있을 때: 설치 없이 만들고 배포하기

### Copilot: index.html 파일로 받기
```text
아래 요구사항으로 웹페이지를 만들어서 index.html 파일 하나로 다운로드 링크를 줘. 채팅 화면에 코드는 보여주지 마.
- CSS와 JavaScript는 모두 파일 안에 작성
- 외부 라이브러리, CDN, API 호출은 쓰지 마
- 한국어 화면, <meta charset="utf-8"> 포함, 휴대폰에서도 깨지지 않게
- 내용은 가짜 예시 데이터만 사용
- 앞으로 수정을 부탁하면 항상 전체 파일을 새로 만들어 다운로드 링크로 줘
요구사항: [만들고 싶은 것]
```

### Copilot: zip으로 다시 받기
```text
다운로드 링크가 열리지 않아. 같은 내용을 site.zip 파일로 압축해서 다운로드 링크를 다시 줘.
zip을 풀었을 때 index.html이 맨 위에 바로 보이게 해 줘.
```

### Copilot: 고친 파일 다시 받기
```text
방금 만든 index.html에서 [바꿀 점]으로 바꿔줘.
나머지는 그대로 두고, 전체 파일을 index.html 이름으로 새 다운로드 링크를 줘.
```

### Copilot: 그림을 SVG로 그려 넣기
```text
방금 만든 index.html의 [그림이 들어갈 자리]에 [그림 설명]을 SVG로 직접 그려서 파일 안에 넣어줘.
- 외부 이미지 파일이나 이미지 주소는 쓰지 마
- 페이지 색과 어울리는 단순한 일러스트 느낌으로
전체 파일을 index.html 이름으로 새 다운로드 링크를 줘.
```

### Copilot: 이미지까지 zip으로 받기
```text
이 웹페이지에 들어갈 이미지를 [이미지 개수]개 만들어줘.
- [이미지 1 설명]
- [이미지 2 설명]
- 실존 인물, 회사 로고, 글자가 들어간 이미지는 만들지 마
그다음 아래 구조로 site.zip 파일 하나를 만들어 다운로드 링크를 줘.
- 맨 위에 index.html
- images 폴더 안에 위 이미지들 (파일 이름은 영어 소문자와 하이픈, 예: hero.png)
index.html은 이미지를 images/파일이름 경로로 불러오고, 이미지 한 장은 1MB 이하로 줄여줘.
```
