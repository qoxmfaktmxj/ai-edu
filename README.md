# AI 사이트 교실

코딩 경험이 없는 직장인이 Claude에게 말로 부탁해 인터랙티브 사이트를 만들고, 모션을 넣고, Vercel로 배포하는 과정을 단계별로 안내하는 교육자료입니다.

- 정적 HTML/CSS/JS, 빌드 과정 없음, 데이터베이스 없음
- `index.html`: 교육자료 본문 (1~11장, 부록 프롬프트 모음, 용어 사전)
- `examples/`: 완성 예시 사이트 3개 (딸기 소개, 심해 탐험, 도시의 하루)
- `assets/video/intro.mp4`: hyperframes로 만든 소개 영상 (원본 구성: `_motion/intro/`, 배포 제외)
- `assets/shots/`: 스크린샷 자리. 촬영 목록은 `assets/shots/README.md`

## 내 PC에서 보기

```bash
python -m http.server 5173
```

브라우저에서 http://localhost:5173 을 엽니다. 로컬에서는 아직 없는 스크린샷 자리가 점선 상자로 보입니다.

## 배포

Vercel에서 이 저장소를 Import 하고 Framework Preset을 Other로 두면 됩니다. main 브랜치에 푸시할 때마다 자동으로 다시 배포됩니다.
