---
name: AI 사이트 교실
description: 기존 교육 구조에 듀오링고의 화면 스타일을 적용한 학습 사이트
colors:
  page: "#ffffff"
  surface-muted: "#f7f7f7"
  text: "#4b4b4b"
  text-secondary: "#777777"
  text-muted: "#777777"
  line: "#e5e5e5"
  accent: "#58cc02"
  accent-soft: "#d7ffb8"
  action: "#58cc02"
  action-edge: "#58a700"
  action-ink: "#ffffff"
  selected: "#1cb0f6"
  selected-soft: "#ddf4ff"
  selected-line: "#84d8ff"
typography:
  body:
    fontFamily: "Pretendard Variable"
    fontSize: "17px"
    lineHeight: 1.75
  display:
    fontFamily: "Pretendard Variable"
    fontWeight: 700
rounded:
  surface: "8px"
  control: "6px"
  button: "8px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.button}"
---

# AI 사이트 교실 디자인

## 방향

2026-10-15 사용자가 듀오링고와 최대한 유사한 화면 스타일을 선택했다. 기존 목차, 본문 구조, 내용, URL, 홈 소개 영상, 완성작 갤러리를 유지한다. 단계별 학습 경로, 점수, 하트, 보상 기능은 추가하지 않는다.

흰색 바탕, 선명한 초록색 주요 영역, 하늘색 선택 상태, 굵은 둥근 테두리와 눌리는 버튼으로 구성한다. 사용자 피드백에 따라 초록색 배경 위 글자를 원본의 흰색으로 맞춘다. 공식 한국어 홈페이지의 실제 CSS 계산값과 UIBowl의 듀오링고 PC 화면 11개를 참고했다. 원본의 맞춤 폰트와 캐릭터 대신 기존 교육 콘텐츠, 로컬 Pretendard와 아이콘을 사용한다.

## 색상

실제 값의 기준은 `app/globals.css`다. 밝은 테마의 토큰은 위에 기록했다.

| 토큰 | 밝은 테마 | 어두운 테마 | 역할 |
|---|---|---|---|
| `--bg`, `--bg-soft`, `--surface` | #ffffff | #131f24 | 페이지와 본문 |
| `--surface-2` | #f7f7f7 | #202f36 | 보조 표면 |
| `--text` | #4b4b4b | #f1f7fb | 본문 |
| `--text-2` | #777777 | #dce6ec | 보조 문구 |
| `--text-3` | #777777 | #9bafb9 | 부가 설명 |
| `--line` | #e5e5e5 | #37464f | 테두리 |
| `--accent` | #58cc02 | #93d333 | 강조 글자 |
| `--accent-soft` | #d7ffb8 | #243b20 | 보조 강조 영역 |
| `--action` | #58cc02 | #58cc02 | 제목 배너와 주요 버튼 |
| `--action-edge` | #58a700 | #58a700 | 버튼 아래쪽 두께 |
| `--action-ink` | #ffffff | #ffffff | 초록색 배경 위 글자 |
| `--selected` | #1cb0f6 | #49c0f8 | 현재 목차 글자 |
| `--selected-soft` | #ddf4ff | #153f50 | 현재 목차 배경 |
| `--selected-line` | #84d8ff | #2b94ba | 현재 목차 테두리 |

성공, 주의, 위험 색은 기존 안내 상자에서 유지한다. 밝은 테마와 어두운 테마는 시스템 설정 또는 사용자의 선택을 따른다.

## 글꼴과 배치

기존 로컬 Pretendard Variable을 유지한다. 본문 17px/1.75, 주요 제목 700, 본문 소제목 800, 숫자는 tabular-nums다. 코드와 명령어만 기존 D2Coding 계열을 사용한다.

홈은 공식 페이지처럼 왼쪽 시각 자료와 오른쪽 설명/세로 버튼으로 구성하며 기존 영상을 사용한다. 모바일에서는 영상, 설명 순으로 쌓는다. 영상이 없는 회차 소개는 가운데 정렬하고, 영상이 있는 소개는 기존 나란한 구성을 유지한다. 교육 본문의 왼쪽 목차와 오른쪽 내용 구조는 유지한다. 1100px 이하에서 목차는 기존 버튼으로 열고 닫으며, 640px 이하에서 본문 여백을 축소한다.

## 모양과 입체감

- 사용자 선택에 따라 일반 표면과 제목/표 모서리는 8px, 선택 메뉴는 6px, 버튼은 8px로 줄인다. 큰 교육 카드와 완성작 카드의 기존 20px는 유지한다.
- 일반 외곽선 2px, 표 외곽선과 행 구분선 1px, 제목 배너 하단 4px.
- `--shadow`: `0 2px 0 var(--line)`.
- `--shadow-lift`: `0 2px 0 var(--selected-line)`.
- 주요 버튼은 원본과 동일한 4px #58a700 그림자, 흰색 글자, 15px/700 글자와 0.8px 자간을 사용한다. 모서리는 사용자 선택으로 원본의 12px에서 8px로 줄인다. 호버 시 밝기가 1.1배가 되고 누르면 4px 내려가며 그림자가 사라진다. 보조 버튼과 작은 복사 버튼은 2px 이동한다.
- 하단 그림자와 굵은 테두리는 사용자가 선택한 듀오링고 스타일의 일부다.

## 구성 요소

- 상단바: 불투명 배경, 2px 아래 경계, 초록색 이름과 아이콘.
- 현재 목차: 하늘색 배경과 테두리, 굵은 글자. 하위 목차는 작은 일반 굵기 글자.
- 장 제목: 초록색 배너에 기존 번호, 제목, 설명을 그대로 배치.
- 표: 흰색 헤더, #4b4b4b 헤더 글자, 넓은 셀 여백. 헤더 아래 선만 #84d8ff 1px, 표 외곽과 나머지 행 구분선은 연한 회색 1px로 표시한다. 다크 모드에서는 헤더도 본문 표면색을 사용하고 아래 선은 --selected-line의 다크 값을 따른다.
- 프롬프트: 8px 모서리와 회색 테두리, 본문과 같은 흰색 제목 줄, 하늘색 복사 버튼 글자와 아이콘. 바깥 그림자는 사용하지 않는다.
- 교육 카드와 완성작: 기존 이미지와 배치를 유지하고 둥근 외곽선과 하단 두께를 적용.
- 읽기 진도: 기존 브라우저 저장 기능을 유지하고 초록색 12px 막대로 표시.
- 홈 영상: 기존 `public/assets/video/intro.mp4` 유지. 프롬프트 입력 시연은 추가하지 않는다.

## 데이터 연결

기존 `course.json`의 `icon`, `works[]`, `worksChapter`, `worksMeta`를 유지한다. `works[]`에는 제목, 링크, 이미지, 설명과 선택적 미리보기 영상이 들어간다. 이번 스타일 변경은 교육 데이터와 문구를 바꾸지 않는다.

## 참고

- [UIBowl 듀오링고 학습 중 화면](https://uibowl.io/website/%EB%93%80%EC%98%A4%EB%A7%81%EA%B3%A0?patterns=%EB%A9%94%EC%9D%B8&patternName=%ED%95%99%EC%8A%B5%20%EC%A4%91)
- [UIBowl 듀오링고 학습 완료 화면](https://uibowl.io/website/%EB%93%80%EC%98%A4%EB%A7%81%EA%B3%A0?patterns=%EB%A9%94%EC%9D%B8&patternName=%ED%95%99%EC%8A%B5%20%EC%99%84%EB%A3%8C)

## 공식 페이지 분석 근거

- 공식 URL: https://ko.duolingo.com/
- REA 6.5.0의 `capture-browser-scenario`로 새 임시 프로필에서 공식 홈을 열고 DOM과 스크린샷을 수집했다. 요청한 항목은 complete, 자체 브라우저 종료도 확인했다.
- REA Evidence ID: `ev_a56fef262153dd9eb782136f96bbd8069db33a6a1d7717bc4c082489ac9e37fe`.
- 프로젝트 상위 `outputs/duolingo-rea-evidence-complete.json`이 원본 근거이며, `duolingo-computed-styles.json`은 별도 브라우저에서 읽은 CSS 계산값이다.
- REA는 DOM과 화면 근거 수집에 사용했고, CSS 계산값 측정과 사이트 재구현은 별도로 수행했다. 전체 원본 소스 복원이나 로그인 뒤 기능 복제를 의미하지 않는다.
- 흰색/초록색 조합과 밝은 파란색 링크는 원본 충실도를 우선한 사용자 선택이다. 모든 텍스트가 WCAG AA 대비를 충족한다고 주장하지 않는다.
