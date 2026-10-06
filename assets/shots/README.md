# 스크린샷 촬영 목록

이 폴더에 아래 파일 이름 그대로 PNG를 넣으면 사이트에 자동으로 나타납니다.
파일이 없으면 배포 사이트에서는 그 자리가 숨겨지고, 내 PC(localhost, file://)나 주소 끝에 `?slots`를 붙이면 자리 표시가 보입니다.

- 권장 크기: 가로 1280~1600px, PNG
- 개인정보(이메일, 이름, 토큰, 결제 정보)가 보이면 가리고 찍으세요. 이 저장소는 공개입니다.

| 상태 | 파일 | 무엇을 찍나 |
|---|---|---|
| 필요 | `01-final-site-address.png` | 그림 설명: 맨 위 주소창에 .vercel.app으로 끝나는 내 주소가 보이고, 아래에 완성된 사이트가 열려 있습니다. 교육이 끝났을 때 이 모습이 목표입니다. |
| 필요 | `01-copy-button.png` | 그림 설명: 프롬프트 카드 오른쪽 위에 있는 "복사" 버튼입니다. 누르면 "복사됨"으로 바뀌고 약 1~2초 뒤 원래대로 돌아옵니다. |
| 완료 | `02-claude-download.png` | 그림 설명: claude.com/download 페이지(한국어 화면)입니다. 큰 제목 "Claude 다운로드" 아래에 내 컴퓨터용 다운로드 버튼이 있습니다. Windows에서 열면 "Windows용 다운로드" 버튼이 보이고, Windows ARM 컴퓨터용 "Windows(arm64)" 링크와 Microsoft Store 배지도 함께 보입니다. Mac에서 열면 Mac용 버튼이 먼저 보입니다. 화면 구성과 문구는 업데이트로 조금 다를 수 있습니다. |
| 필요 | `02-claude-login.png` | 그림 설명: 앱을 처음 실행하면 보이는 로그인 화면입니다. 평소 쓰는 로그인 방법을 고르고, 브라우저가 열리면 거기서 로그인을 마친 뒤 앱으로 돌아옵니다. 로그인이 끝나면 앱 위쪽에 Chat, Cowork, Code 탭이 보입니다. |
| 필요 | `02-code-tab.png` | 그림 설명: 앱 위쪽 가운데 Chat, Cowork, Code 세 탭이 나란히 있고, 그중 Code 탭이 선택된 모습입니다. 아래쪽에 입력창이 보이고, 입력창 근처에 Local 선택과 Select folder 버튼이 있습니다. |
| 필요 | `02-folder-select.png` | 그림 설명: Select folder를 눌러 나온 폴더 선택 창에서 문서 아래의 ai-site 폴더를 고른 모습입니다. 확인을 누르면 Code 탭 입력창 근처에 ai-site 폴더 이름이 표시됩니다. 그 폴더가 Claude의 작업 장소입니다. |
| 필요 | `02-permission-dialog.png` | 그림 설명: Manual 모드에서 Claude가 실행하려는 명령(예: claude.ai의 공식 설치 명령)이나 바꾸려는 파일 내용을 보여 주며 허용을 묻는 화면입니다. 내용을 읽은 뒤 Accept(허용) 또는 Reject(거절) 버튼을 누릅니다. 입력창 옆에는 현재 권한 모드(Manual)를 보여 주는 선택기가 보입니다. 버튼 이름은 업데이트로 조금 다를 수 있습니다. |
| 필요 | `02-claude-version.png` | 그림 설명: 새로 연 PowerShell 창입니다. 첫 줄 맨 앞에 PS가 보이고, claude --version 입력 아래에 "2.1.xxx (Claude Code)" 형태의 버전 줄이 나온 모습입니다. 이 줄이 보이면 설치와 PATH 등록이 모두 성공한 것입니다. |
| 필요 | `02-first-file.png` | 그림 설명: 왼쪽에는 Claude 앱의 대화 창에서 "hello.txt를 만들었습니다"와 추가된 줄 수 표시가 보이고, 오른쪽에는 파일 탐색기에서 연 ai-site 폴더 안에 hello.txt가 실제로 생긴 모습입니다. 내 PC에 진짜 파일이 생겼다는 것을 눈으로 확인하는 장면입니다. |
| 필요 | `03-github-signup.png` | 그림 설명: github.com/signup 첫 화면. 이메일 입력 칸과 Continue 버튼이 보입니다. 한 칸을 채우고 Continue를 누르면 다음 칸(비밀번호, 사용자 이름)이 차례로 나타납니다. |
| 필요 | `03-github-verify.png` | 그림 설명: 이메일로 받은 인증 코드를 입력하는 화면. 입력 칸에 코드를 넣으면 자동으로 다음 화면으로 넘어갑니다. (개인 이메일 주소는 가려서 캡처하세요.) |
| 필요 | `03-gh-auth-login.png` | 그림 설명: PowerShell에 질문이 한 줄씩 나오고 선택지 옆에 화살표 표시가 있습니다. 선택한 항목은 색이 바뀝니다. 질문마다 아래 단계의 답을 고르고 Enter를 누릅니다. |
| 필요 | `03-gh-device-code.png` | 그림 설명: 왼쪽 PowerShell에 "First copy your one-time code"와 코드가 보이고, 오른쪽 브라우저의 Device Activation 화면에는 코드를 넣는 칸과 Continue 버튼이 있습니다. 코드는 가려서 캡처하세요. |
| 필요 | `03-gh-authorize.png` | 그림 설명: GitHub CLI가 요청하는 권한 목록이 보이는 승인 화면. 아래쪽의 초록색 Authorize 버튼을 누르는 위치를 표시하세요. |
| 필요 | `03-repo-created.png` | 그림 설명: github.com/[내 사용자 이름]/my-first-site 화면. 저장소 이름과 Private 표시, main 브랜치 선택 칸, 파일 목록의 README.md, 마지막 커밋 메시지가 보입니다. 사용자 이름은 가려서 캡처하세요. |
| 완료 | `04-vercel-signup.png` | 그림 설명: vercel.com/signup 화면. "Continue with GitHub" 버튼 위치를 표시하세요. 이 버튼이 이 교재에서 누를 버튼입니다. |
| 필요 | `04-vercel-plan.png` | 그림 설명: Hobby(개인, 무료)와 Pro가 나란히 보이는 화면. Hobby 쪽을 고르는 위치를 표시하세요. 이런 화면이 나오지 않는 계정도 있습니다. |
| 필요 | `04-vercel-github-app.png` | 그림 설명: GitHub의 Vercel 앱 설치 화면. Repository access에서 Only select repositories를 선택하고, my-first-site를 고른 뒤 Install 버튼을 누르는 위치를 표시하세요. |
| 필요 | `04-vercel-import.png` | 그림 설명: "Import Git Repository" 목록에서 my-first-site 줄 오른쪽의 Import 버튼을 누르는 위치를 표시하세요. |
| 필요 | `04-vercel-configure.png` | 그림 설명: Configure Project 화면. Project Name 칸, Framework Preset(Other), Root Directory(./)가 보이고 맨 아래에 Deploy 버튼이 있습니다. |
| 필요 | `04-vercel-deploy-done.png` | 그림 설명: 축하 문구와 사이트 미리보기 그림이 보이는 배포 완료 화면. Continue to Dashboard 버튼의 위치를 표시하세요. |
| 필요 | `04-vercel-domains.png` | 그림 설명: 프로젝트 화면의 Domains 항목. https://[프로젝트이름].vercel.app 링크와 Production Deployment의 Ready 표시를 가리키세요. 이 주소가 내 사이트 주소입니다. |
| 필요 | `04-site-live.png` | 그림 설명: 주소창에 https://[프로젝트이름].vercel.app이 보이고, 본문에 내가 만든 첫 페이지가 나온 화면. 주소창 부분을 강조해 캡처하세요. |
| 필요 | `04-auto-redeploy.png` | 그림 설명: Deployments 목록의 맨 위 줄에 "제목 변경" 메시지와 main 브랜치, 상태(Building 또는 Ready)가 보이는 화면. 새 줄과 상태 표시를 강조하세요. |
| 필요 | `05-skills-install.png` | 그림 설명: Claude 앱 Code 탭에서 설치 프롬프트를 보낸 직후의 화면입니다. 가운데 대화창에 Claude가 "먼저 node와 npx를 확인하겠습니다" 같은 설명과 함께 확인 명령을 실행하는 모습, 아래쪽 입력창 옆에 권한 모드 선택기(Manual)가 보입니다. |
| 필요 | `05-permission.png` | 그림 설명: 실행할 명령(예: npx skills add 로 시작하는 줄)과 출처 이름(owner/repo)이 보이고, 그 아래에 "Do you want to proceed?"와 함께 Yes, No 선택지가 있는 화면입니다. 명령 속 출처가 프롬프트에 적은 것과 같은지 먼저 봅니다. |
| 필요 | `05-new-session.png` | 그림 설명: 왼쪽 사이드바 위쪽의 "+ New session" 버튼(누를 곳)과, 눌러서 새로 열린 빈 대화 화면입니다. 이전 세션이 사이드바 목록에 남아 있는 것도 확인하세요. |
| 필요 | `05-slash-menu.png` | 그림 설명: 입력창에 / 를 입력하자 입력창 위로 목록이 펼쳐진 화면입니다. design-taste-frontend, impeccable, ui-ux-pro-max:ui-ux-pro-max, hyperframes:hyperframes 가 각각 한 줄씩 보이고 오른쪽에 짧은 설명이 붙어 있습니다. |
| 필요 | `06-city-time-slider.png` | 도시의 하루 예시의 모습입니다. 화면 아래 시간 슬라이더를 오른쪽 밤 방향으로 끌면 하늘이 어두워지고, 건물 창문에 노란 불빛이 하나씩 켜집니다. |
| 필요 | `06-city-step2-windows.png` | 2단계를 마친 화면의 예입니다. 어두운 남색 하늘 아래 건물 창문 대부분에 노란 불이 켜져 있고 일부는 꺼져 있습니다. 아래의 "낮", "밤" 버튼으로 돌아갈 수 있습니다. 내 화면은 모양이 달라도 괜찮습니다. |
| 필요 | `07-slash-skill-list.png` | 그림 설명: 입력창에 /를 입력하면 입력창 바로 위로 명령과 스킬 목록이 나타납니다. 그 안에서 design-taste-frontend, impeccable, ui-ux-pro-max 이름이 보이면 준비된 것입니다. |
| 필요 | `07-select-folder.png` | 그림 설명: Code 탭 입력창 근처에서 Local이 선택되어 있고, Select folder를 눌러 고른 작업 폴더의 이름이 표시된 모습입니다. |
| 필요 | `07-plan-interview.png` | 그림 설명: Claude가 "분위기를 나타내는 단어 3개"를 묻고 보기 두세 가지를 보여 주면, 사용자가 번호나 단어로 답하는 대화입니다. |
| 필요 | `07-attach-image.png` | 그림 설명: 입력창 안에 첨부한 캡처 이미지가 작은 그림으로 보이고, 그 옆에 "여기가 너무 어둡습니다" 같은 부탁 글이 적혀 있는 모습입니다. 이미지와 글을 함께 보냅니다. |
| 필요 | `07-preview-pane.png` | 그림 설명: 왼쪽은 Claude와의 대화, 오른쪽은 Browser 창입니다. Browser 창 안에 방금 만든 사이트가 그대로 나타나고, 대화에서 부탁을 보낼 때마다 이 화면이 바뀝니다. |
| 필요 | `07-mobile-width.png` | 그림 설명: 미리보기 폭을 휴대폰처럼 좁게 줄인 모습입니다. 제목과 소개 문구가 잘리지 않고, 건물과 도로가 화면 안에 맞게 보이며, 옆으로 스크롤바가 생기지 않으면 잘 된 것입니다. |
| 필요 | `07-step1-city-result.png` | 그림 설명: 1단계 직후의 도시 화면입니다. 위에 제목과 소개 문구, 가운데에 파란 하늘과 해와 건물 실루엣, 아래에 도로와 "시간 슬라이더 자리" 안내가 있고 아무것도 움직이지 않습니다. |
| 필요 | `07-reduced-motion-setting.png` | 그림 설명: Windows 설정의 접근성, 시각 효과 화면에서 애니메이션 효과 스위치를 끈 모습입니다. 이 상태에서 사이트를 새로고침하면 움직임이 모두 멈춰 있어야 합니다. 확인이 끝나면 다시 켜 두세요. |
| 필요 | `07-step3-slider-night.png` | 그림 설명: 슬라이더를 오른쪽 끝(밤)으로 움직인 모습입니다. 하늘이 짙은 남색이 되고 달이 떠 있으며, 건물 창문 여러 개가 노란 불빛으로 켜져 있습니다. 아래의 슬라이더와 "밤" 글자도 함께 보입니다. |
| 필요 | `07-permission-prompt.png` | 그림 설명: Claude가 git push 같은 명령을 실행해도 되는지 묻는 화면입니다. 명령 내용이 보이고 허용 또는 거절을 고르는 버튼이 있습니다. 방금 부탁한 일과 맞으면 허용을 누릅니다. |
| 필요 | `07-vercel-deployments.png` | 그림 설명: Deployments 화면의 목록 맨 위에 방금 올린 커밋 메시지가 있고, 상태가 Building에서 Ready로 바뀐 모습입니다. 줄 오른쪽에 Production 표시도 보입니다. |
| 필요 | `07-vercel-domain.png` | 그림 설명: 프로젝트 첫 화면 위쪽의 미리보기 그림 옆에 Domains 칸이 있고, 프로젝트이름.vercel.app 주소와 Visit 버튼이 보입니다. 이 주소를 눌러 열고, 주소창의 주소를 복사해 둡니다. |
| 필요 | `07-phone-check.png` | 그림 설명: 휴대폰 브라우저에 내 vercel.app 주소로 사이트가 열려 있는 모습입니다. 슬라이더를 손가락으로 움직이는 중이고, 글이 화면 안에 잘 들어가 있습니다. |
| 필요 | `07-impeccable-critique.png` | 그림 설명: 비평 결과가 대화창에 목록으로 나타난 모습입니다. "잘된 점", "아쉬운 점", "추천 개선 3가지"가 번호와 함께 정리되어 있고, 사이트 파일은 아직 바뀌지 않았습니다. |
| 필요 | `07-compare-two-versions.png` | 그림 설명: 왼쪽은 색 수가 적고 여백이 넓은 차분한 버전, 오른쪽은 밝은 색과 둥근 모서리의 귀여운 버전입니다. 같은 도시 화면이 분위기 설명만으로 전혀 다른 인상이 된 것을 비교합니다. |
| 필요 | `08-hf-preview.png` | 그림 설명: 브라우저에 열린 hyperframes 스튜디오입니다. 가운데에 영상 미리보기, 그 아래에 타임라인, 왼쪽에 프로젝트 탭, 오른쪽에 설정 패널이 보입니다. 재생 버튼을 눌러 장면 3개가 순서대로 나오는지 확인하는 단계입니다. |
| 필요 | `08-hf-render.png` | 그림 설명: 렌더가 끝난 화면입니다. Claude 대화창(또는 터미널)에 완료 메시지와 renders 폴더 안 MP4 파일 경로가 보이고, 파일 탐색기에서 같은 renders 폴더를 열어 영상 파일이 들어 있는 모습입니다. 이 파일을 더블클릭하면 재생됩니다. |
| 필요 | `08-video-in-site.png` | 그림 설명: 내 사이트의 첫 화면(브라우저 미리보기)에서 소개 영상이 소리 없이 재생되고 있는 화면입니다. 영상 위나 옆에 제목과 소개 글이 함께 보이고, 영상이 화면 폭에 맞게 잘리지 않고 들어가 있는지 확인합니다. |
| 필요 | `09-phone-open-site.png` | 휴대폰 브라우저 주소창에 vercel.app 주소를 입력해 연 모습입니다. 글자가 잘리지 않고 한 화면 안에 제목과 그림이 들어오면 잘 된 것입니다. |
| 필요 | `09-devtools-device-toolbar.png` | F12를 눌러 연 개발자 도구에서 왼쪽 위의 휴대폰 모양 기기 아이콘과, 사이트 화면 위쪽의 Dimensions 목록 위치를 표시한 그림입니다. 이 목록에서 기기를 고르면 휴대폰 폭으로 바뀝니다. |
| 필요 | `09-impeccable-critique.png` | /impeccable critique를 실행한 뒤의 대화창입니다. "잘 된 점" 아래에 P0부터 P3 등급이 붙은 문제 목록이 나오고, 마지막에 어느 부분을 먼저 고칠지 묻는 질문이 보입니다. 이 목록에서 하나만 고르면 됩니다. |
| 필요 | `09-vercel-deployments-ready.png` | Vercel의 Deployments 목록입니다. 가장 위에 방금 올린 변경으로 만든 새 배포가 있고, 상태가 Ready로 바뀌었으면 배포가 끝난 것입니다. 옆에 Production 표시가 있는지 확인하세요. |
| 필요 | `09-qr-code-made.png` | Claude가 만들어 준 qr.png를 열어 본 모습입니다. 흰 배경에 검은 무늬가 크게 보이면 됩니다. 발표 화면에 띄우거나 인쇄해서 쓰세요. |
| 필요 | `10-powershell-claude-version.png` | 그림 설명: 새로 연 PowerShell 창입니다. 줄 맨 앞이 PS C:\Users\...>로 시작하고, claude --version을 입력하면 아래 줄에 버전 번호와 "(Claude Code)"가 나오면 성공입니다. |
| 필요 | `10-gh-auth-status.png` | 그림 설명: gh auth status를 입력한 터미널입니다. Logged in to github.com account 뒤에 내 사용자 이름이 보이고, Active account 표시가 있으면 로그인이 된 것입니다. |
| 필요 | `10-vercel-build-settings.png` | 그림 설명: Settings 왼쪽 메뉴의 Build and Deployment 화면입니다. Framework Preset에 Other가 보이고, Build Command의 Override 스위치가 켜져 있으며 입력 칸이 비어 있어야 합니다. 맨 아래 Save 버튼을 눌러야 저장됩니다. |
| 필요 | `10-vercel-deployments-status.png` | 그림 설명: 프로젝트의 Deployments 목록입니다. 맨 위 줄이 가장 최근 배포이고, 상태(Ready 또는 Error 또는 Building)와 환경(Production 또는 Preview), 방금 한 커밋 메시지가 함께 보입니다. 오른쪽 점 세 개 메뉴에 Redeploy가 있습니다. |
| 필요 | `10-browser-console-404.png` | 그림 설명: 배포된 사이트에서 F12를 눌렀을 때 아래쪽에 열리는 개발자 도구입니다. Console 탭에 빨간 줄로 404 오류가 나오고, 그 줄에 안 보이는 이미지의 파일 이름이 적혀 있습니다. |
| 필요 | `10-vercel-deployment-protection.png` | 그림 설명: Settings 왼쪽 메뉴의 Deployment Protection 화면입니다. Vercel Authentication 스위치가 있고, 보호할 범위(Standard Protection 또는 All Deployments)를 고른 뒤 Save를 누릅니다. |
| 필요 | `10-claude-rewind-menu.png` | 그림 설명: Esc를 두 번 눌렀을 때 나오는 되돌리기 메뉴입니다. 내가 보낸 메시지 목록에서 돌아갈 지점을 고르면 "Restore code and conversation", "Restore code" 같은 선택지가 나옵니다. |
| 필요 | `10-claude-skills-list.png` | 그림 설명: 대화 입력창에 /만 입력하면 사용 가능한 명령과 스킬이 목록으로 나타납니다. 새로 설치한 스킬 이름(예: hyperframes:hyperframes)이 보이면 성공입니다. |
| 필요 | `11-code-tab-folder.png` | 그림 설명: Code 탭의 시작 화면입니다. 환경은 Local로 두고, Select folder 버튼으로 새로 만든 빈 연습 폴더를 고릅니다. 폴더 이름이 화면에 표시되면 준비가 끝난 것입니다. 입력창 옆에 권한 모드를 고르는 메뉴도 보입니다. |
| 필요 | `11-dashboard-result.png` | 그림 설명: 가짜 데이터로 만든 대시보드의 완성 모습입니다. 맨 위에 큰 숫자 카드 3개, 가운데에 월별 막대그래프, 맨 아래에 표가 보이면 성공입니다. |
| 필요 | `11-dry-run-list.png` | 그림 설명: 스크립트를 처음 실행한 화면입니다. "이렇게 바꿀 예정입니다"라는 목록만 줄줄이 나오고, 폴더의 실제 파일은 그대로입니다. 이 목록을 눈으로 확인한 뒤에만 확인용 옵션을 붙여 다시 실행합니다. |
