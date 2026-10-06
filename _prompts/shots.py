"""List every screenshot slot in the course chapters into _prompts/shots.md."""
import html
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
COURSE = ROOT / "content" / "courses" / "interactive-site"
SHOTS = ROOT / "public" / "assets" / "shots"

rows = []
for cid in json.loads((COURSE / "course.json").read_text(encoding="utf-8"))["chapters"]:
    f = COURSE / f"{cid}.html"
    if not f.exists():
        continue
    for m in re.finditer(r'<figure class="shot" data-shot="([^"]+)">(.*?)</figure>', f.read_text(encoding="utf-8"), re.S):
        name, body = m.group(1), m.group(2)
        cap = re.search(r"<figcaption>(.*?)</figcaption>", body, re.S) or re.search(r'alt="([^"]*)"', body)
        desc = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", cap.group(1) if cap else "")).strip()
        done = "완료" if (SHOTS / f"{name}.png").exists() else "필요"
        rows.append(f"| {done} | `{name}.png` | {html.unescape(desc)} |")

(ROOT / "_prompts" / "shots.md").write_text(
    "# 스크린샷 촬영 목록\n\n"
    "`public/assets/shots/` 폴더에 아래 파일 이름 그대로 PNG를 넣으면 사이트에 자동으로 나타납니다.\n"
    "파일이 없으면 배포 사이트에서는 그 자리가 숨겨지고, 내 PC(localhost)나 주소 끝에 `?slots`를 붙이면 자리 표시가 보입니다.\n\n"
    "- 권장 크기: 가로 1280~1600px, PNG\n"
    "- 개인정보(이메일, 이름, 토큰, 결제 정보)가 보이면 가리고 찍으세요. 이 저장소는 공개입니다.\n\n"
    "| 상태 | 파일 | 무엇을 찍나 |\n|---|---|---|\n" + "\n".join(rows) + "\n",
    encoding="utf-8",
)
print(len(rows), "slots;", sum("완료" in r for r in rows), "done")
