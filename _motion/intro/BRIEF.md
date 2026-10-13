# 교육 소개 영상

- 확정 주제: 별이 된 문장, 심해 탐험, 태양계 여행
- 14초, 1920x1080, 30fps, 무음 반복 재생
- 0~2.5초: AI와 함께, 직접 만지는 내 사이트
- 2.5~5.5초: 별이 된 문장
- 5.5~8.5초: 심해 탐험
- 8.5~11.5초: 태양계 여행
- 11.5~14초: 말로 부탁하고, 눈으로 확인하고, 직접 고칩니다.

## 원본

세 MP4는 이 저장소의 실제 예제 화면을 1280x720, 30fps, 90프레임으로 캡처해 고정한 영상이다. HyperFrames가 이 영상과 글자 애니메이션을 합쳐 최종 영상을 렌더링한다.

- assets/stardust.mp4: public/examples/stardust, 오프닝 후 별 입자가 만든 제목. 조작 UI를 숨겼다.
- assets/deep-sea.mp4: public/examples/deep-sea-dive, 사용자가 확정한 덤보문어. scene.js의 renderScene을 T=10+i/30, 수심=4400+i*0.8로 렌더링했다. 관측등은 생물 오른쪽에서 가운데로 움직인다. 조작 UI를 숨겼다.
- assets/solar.mp4: public/examples/space, 지구를 고르고 조작 UI를 숨긴 뒤 장면을 가운데 배치했다. 천체 그림은 기존 예제의 AI 생성 이미지다.
- assets/PretendardVariable.woff2: 기존 프로젝트 글꼴, SIL OFL.
- assets/gsap.min.js: 기존 프로젝트 GSAP.

최종 배포 파일은 public/assets/video/intro.mp4와 intro-poster.jpg이다. 딸기 28초 영상과 이전 딸기, 도시 예시 장면은 사용하지 않는다.
