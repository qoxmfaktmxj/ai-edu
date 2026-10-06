# AI 사이트 교실

코딩 경험이 없는 직장인이 Claude에게 말로 부탁해 만들고, 고치고, 배포하며 AI를 배우는 실습형 교육 사이트입니다. 교육은 편 단위로 늘어납니다.

- Next.js (App Router), 정적 생성. 로그인, 진도 저장 같은 서버 기능은 이후 편에서 추가합니다.
- `content/courses/<편>/`: 한 편의 내용. `course.json`(제목, 장 순서) + 장마다 HTML 파일 하나.
- `app/`: 화면. `/` 교육 목록, `/courses/<편>` 편 소개, `/courses/<편>/<장>` 각 장. 부록 프롬프트 모음(`prompts`)은 장 파일의 프롬프트 카드에서 자동으로 만들어집니다.
- `public/examples/`: 1편 완성 예시 사이트 3개 (HTML, CSS, JS만 사용)
- `public/assets/`: 소개 영상, 썸네일, 스크린샷. 촬영 목록은 `public/assets/shots/README.md`
- `_motion/intro/`: 소개 영상의 hyperframes 원본
- `_prompts/`: 프롬프트 카드를 Markdown 파일 하나로 내보내고 반영하는 도구

## 내 PC에서 보기

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다. 로컬에서는 아직 없는 스크린샷 자리가 점선 상자로 보입니다.

## 프롬프트 고치기

```bash
python _prompts/prompts.py export
python _prompts/prompts.py apply
```

`export`가 `_prompts/prompts.md`를 만들고, 그 파일에서 ```text 블록만 고친 뒤 `apply` 하면 각 장에 반영됩니다. `###` 줄(프롬프트 이름)은 바꾸지 않습니다.

## 스크린샷 목록 갱신

```bash
python _prompts/shots.py
```

## 배포

Vercel에서 이 저장소를 Import 하면 Next.js로 자동 인식됩니다(`vercel.json`). main 브랜치에 푸시할 때마다 다시 배포됩니다.
