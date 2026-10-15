---
workflow: general-video
flow: automation
storyboard: no
message: "빈칸이 있으면 AI가 추측으로 채워 결과가 들쭉날쭉하고, 4칸을 채우면 몇 번을 시켜도 같은 모양이 나온다"
destination: web-embed
aspect: "16:9"
language: ko
audience: "1회차 수강생(비개발 직원)"
length: 12s
---

# 빈 칸이 있는 부탁, 채운 부탁

12초, 1920x1080, 30fps, 무음 반복 재생. 1회차 3장(design.html) "빈 칸이 있는 부탁, 채운 부탁" 비교 상자 위에 넣는 설명 영상.

## Intent

사용자가 좌우 동시 비교 구성을 골랐다. 왼쪽은 결과, 꼭 지킬 것이 빈칸인 부탁, 오른쪽은 4칸을 채운 부탁. 같은 한 주 업무 메모로 세 번 시키면 왼쪽은 문단, 목록, 표로 매번 모양이 바뀌고 세 번째에는 메모에 '검토 중'인 일이 '완료'로 바뀐다. 오른쪽은 완료, 진행, 다음 주 세 칸 표와 요지 두 문장이 세 번 다 같은 모양으로 나온다. (2026-10-15 예시 주제를 회의 메모에서 주간 업무 보고로 변경) 마지막에 "빈칸은 AI가 추측으로 채웁니다."로 정리하고 처음 화면으로 돌아가 반복한다.

## Notes

- 메인 소개 영상(_motion/intro)과 같은 남색 배경, Pretendard Variable, 로컬 GSAP를 쓴다.
- 결과 화면은 실제 문장이 아닌 막대 모양 뼈대로 보여준다. 실제 회사 자료, 사람 이름은 넣지 않는다.
- 검토 방식은 사용자가 "완성본 바로"를 골랐다.
- 공개 파일: public/assets/video/design-compare.mp4, design-compare-poster.jpg
