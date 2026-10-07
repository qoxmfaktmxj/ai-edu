# BLUE DESCENT - 빛이 닿지 않는 곳까지.

스크롤해 수면에서 가상 수심 4,000m까지 내려가고, 관측등으로 어둠 속 형상을 살펴보는 예제입니다.
순수 HTML/CSS/JS(ES 모듈)이며 빌드 과정이 없습니다.

## 폴더 구조

```
deep-sea/
  index.html          본문, 다섯 장면 텍스트, 장식 레이어(SVG), 관측등 버튼
  styles.css          레이어, 반응형, 모션 감소 설정
  js/data.js          장면 ID, 수심 범위, 제목/설명, 물 색 단계, 참고 출처, 도감 카드(SPECIES)
  js/scene.js         initDeepSea(stage), renderDeepSea(state): 수심에서 화면을 직접 계산
  js/app.js           스크롤, 버튼, 포인터를 state로 바꾸고 한 프레임에 한 번 렌더
  assets/fonts/       Pretendard 서브셋(이 페이지 글자만, SIL OFL 1.1)
```

- state: `depth`, `lampOn`, `lampX`, `lampY`(장면 기준 0..1 비율), `compact`, `reduced`.
- 수심은 각 장면 섹션의 실제 스크롤 구간을 그 장면의 수심 범위에 보간합니다. 마지막 장면은 섹션의 60% 지점에서 4,000m에 도달해 멈춥니다.
- 관측등은 장면 레이어(`.stage`)에만 마스크를 적용합니다. 텍스트와 버튼은 그 위 레이어라 어두워지지 않습니다.
- 입자 배치는 고정 seed(4000)로 만듭니다.

## 생물과 도감

| 장면 | 생물 | 그림 클래스 |
| --- | --- | --- |
| 0 - 200m | 정어리 (Sardinops sagax) | `.sardine` |
| 200 - 1,000m | 샛비늘치류 (Myctophidae) | `.lantern` |
| 1,000 - 2,200m | 아톨라해파리 (Atolla), 심해 초롱아귀류 (Ceratioidei) | `.jelly`, `.angler` |
| 2,200 - 3,500m | 펠리칸장어 (Eurypharynx pelecanoides) | `.serpent` |
| 3,500 - 4,000m | 덤보문어 (Grimpoteuthis) | `.dumbo` |

- 생물이 화면에 충분히 보이면 그 옆에 이름표(도감 표식)가 나타나고, 누르면 도감 카드가 열립니다. 휴대폰에서는 이름표가 본문을 가리므로 숨기고, 각 장면 글 아래의 "이 구간의 생물" 버튼으로 엽니다. 마지막 장면에는 여섯 생물 전체 목록이 있습니다.
- 도감 카드: 분류, 학명, 알려진 서식 깊이, 크기, 특징 2 - 3개, 출처 링크. 내용은 `js/data.js` 의 `SPECIES` 하나에서 읽습니다.
- 카드의 깊이, 크기, 특징은 MBARI, NOAA, Australian Museum, WHOI 페이지를 기준으로 했고, 출처에 수치가 없으면 지어내지 않고 없다고 적었습니다(정어리 깊이, 덤보문어 크기).
- 화면 속 생물의 수심, 위치, 크기는 연출입니다. 카드와 "이 탐험에 대하여" 패널에 그렇게 적었습니다.
- 관측등: 아톨라해파리는 불을 비추면 붉은색이 드러나고(깊은 바다에서 붉은색이 검게 보이는 점), 초롱아귀류와 덤보문어도 윤곽이 드러납니다. 스스로 내는 빛(해파리 둘레의 파란 점, 아귀의 미끼, 장어 꼬리 끝)은 관측등과 별도 레이어입니다.
- 국명 메모: Atolla, Grimpoteuthis는 표준 국명을 찾지 못해 통용 표기(아톨라해파리, 덤보문어)를 썼습니다. 심해 아귀는 식용 아귀와 다른 무리라 초롱아귀류로 적었습니다.

## 로컬 실행

정적 HTTP 서버라면 무엇이든 됩니다. file:// 로 열지 마세요(ES 모듈이 막힙니다).

```bash
python -m http.server 8000
```

위 명령을 `deep-sea` 폴더에서 실행하고 http://localhost:8000/ 을 엽니다.
교육 사이트 전체로 보려면 `ai-site-class` 에서 `npm run dev` 후 http://localhost:3000/examples/deep-sea/ 를 엽니다.

## 배포

선택한 방식: **교육 사이트(Next.js)에 통합 배포**. 프로젝트의 Framework/Build/Output 설정은 바꾸지 않았습니다.

- 공개 위치: `ai-site-class/public/examples/deep-sea/` (Next.js의 public 폴더가 그대로 배포됨)
- 진입 경로: `/examples/deep-sea/`
- Next.js는 주소 끝 슬래시를 지우므로(`/examples/deep-sea/` -> `/examples/deep-sea`), `next.config.ts` 에 examples 경로에만 적용되는 리다이렉트를 두었습니다: `/examples/:name` -> `/examples/:name/index.html`. 덕분에 `./styles.css` 같은 상대 경로가 예제 폴더 안에서 풀립니다.

독립 배포를 할 때는 Vercel에서 Root Directory를 이 폴더로, Framework Preset `Other`, Build Command 빈값(Override), Output Directory `.`(Override)로 설정하고 `/` 로 접속합니다. 필요한 파일은 모두 이 폴더 안에 있습니다.

## 글꼴 서브셋 다시 만들기

본문 글자를 바꾸면 새 글자가 시스템 글꼴로 보일 수 있습니다. fontTools와 brotli가 있으면 다시 만듭니다.

```bash
pyftsubset PretendardVariable.woff2 --text-file=chars.txt --flavor=woff2 --layout-features=* --output-file=assets/fonts/pretendard-subset.woff2
```

`chars.txt` 에는 index.html과 js 파일에 쓰인 글자를 넣습니다. 원본 글꼴은 `ai-site-class/_motion/strawberry-film/assets/PretendardVariable.woff2` 에 있습니다.

## 확인한 것 (로컬, Chromium 헤드리스와 앱 내 브라우저)

- 1440x900, 390x844(터치), 모션 감소 설정에서 0 -> 120 -> 600 -> 1,500 -> 2,800 -> 4,000 -> 3,500 -> 100 -> 1,600m 이동 시 수심 숫자, 장면 이름, 물 색, 광선, 생물 표시가 같은 값으로 복원됨
- 1,600m 지점에서 새로고침해도 1,600m와 같은 장면으로 복원
- 관측등: 1,000m부터 버튼 표시, 키보드 Enter로 켜짐(aria-pressed, 문구 변경), 데스크톱은 마우스를 따라감, 모션 감소에서는 대상 중앙에 고정, 켠 채로 스크롤 가능
- 수면으로 돌아가기: 맨 위로 이동하고 제목 영역으로 포커스 이동
- 도감: 각 구간에서 해당 생물 이름표만 나타남, 이름표와 목록 버튼으로 카드 열림, Esc로 닫으면 누른 버튼으로 포커스 복귀
- JavaScript 없이도 다섯 장면 제목과 설명이 읽힘(도감 버튼과 이름표는 숨김)
- 콘솔 오류 없음, CSS/JS/글꼴 404 없음

실제 Vercel Preview 배포에서의 확인은 이 README 작성 시점에 하지 않았습니다.
