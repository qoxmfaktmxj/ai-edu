"""Edit the site's prompt cards through one Markdown file.

  python _prompts/prompts.py export   # index.html -> _prompts/prompts.md
  python _prompts/prompts.py apply    # _prompts/prompts.md -> index.html (cards + appendix A)
  python _prompts/prompts.py apply _prompts/hyperframes.md   # apply only the prompts in another file

The `### title` line is the key: it must match a card's data-title in index.html.
"""
import html
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGE = ROOT / "index.html"
MD = ROOT / "_prompts" / "prompts.md"
CARD = re.compile(r'(<figure class="prompt" data-title="([^"]+)">.*?<pre>)(.*?)(</pre>)', re.S)
BANNED = {"\u00b7": ", ", "\u2014": "-", "\u2013": "-"}  # middle dot, em dash, en dash


def chapters(page):
    """(id, title, body) for every chapter except the generated appendix and glossary."""
    for m in re.finditer(r'<section class="chapter" id="([^"]+)">(.*?)</section>', page, re.S):
        cid, body = m.group(1), m.group(2)
        if cid in ("prompts", "glossary"):
            continue
        title = re.sub(r"<[^>]+>", "", re.search(r"<h2>(.*?)</h2>", body, re.S).group(1)).strip()
        num = re.search(r'<span class="chapter-num">([^<]+)</span>', body).group(1)
        yield cid, f"{num} {title}", body


def export():
    page = PAGE.read_text(encoding="utf-8")
    out = [
        "# 프롬프트 모음 (편집용)",
        "",
        "- `###` 줄은 프롬프트 이름입니다. 바꾸지 마세요. 이 이름으로 사이트의 자리를 찾습니다.",
        "- 고칠 곳은 ```text 와 ``` 사이뿐입니다. 줄바꿈은 그대로 사이트에 나옵니다.",
        "- [대괄호]는 수강생이 자기 내용으로 바꿔 넣는 자리입니다.",
        "- 가운뎃점, em dash, en dash는 반영할 때 자동으로 쉼표와 하이픈으로 바뀝니다.",
        "",
    ]
    n = 0
    for _, title, body in chapters(page):
        cards = CARD.findall(body)
        if not cards:
            continue
        out += [f"## {title}", ""]
        for _, name, pre, _ in cards:
            out += [f"### {name}", "```text", html.unescape(pre).strip("\n"), "```", ""]
            n += 1
    MD.write_text("\n".join(out), encoding="utf-8")
    print(f"exported {n} prompts -> {MD}")


def apply(src=MD):
    page = PAGE.read_text(encoding="utf-8")
    edits = dict(re.findall(r"^### (.+?)\n```text\n(.*?)\n```", pathlib.Path(src).read_text(encoding="utf-8"), re.S | re.M))
    fixed = 0
    for k, v in edits.items():
        for bad, good in BANNED.items():
            fixed += v.count(bad)
            v = v.replace(bad, good)
        edits[k] = v
    seen, changed = set(), 0

    def swap(m):
        nonlocal changed
        name = m.group(2)
        if name not in edits:
            return m.group(0)
        seen.add(name)
        new = html.escape(edits[name], quote=False)
        if new == m.group(3):
            return m.group(0)
        changed += 1
        return m.group(1) + new + m.group(4)

    a = page.index('<section class="chapter" id="prompts">')
    b = page.index("</section>", a) + len("</section>")
    body = CARD.sub(swap, page[:a]) + "@@APPENDIX@@" + CARD.sub(swap, page[b:])

    # Appendix A is rebuilt from the cards so it always matches the chapters.
    blocks = []
    for cid, title, chap in chapters(body.replace("@@APPENDIX@@", "")):
        cards = CARD.findall(chap)
        if not cards:
            continue
        blocks.append(f'      <h4><a href="#{cid}">{title.split(" ", 1)[1]}</a></h4>')
        for _, name, pre, _ in cards:
            blocks.append(
                f'      <figure class="prompt">\n        <figcaption><i class="ph ph-chat-circle-text"></i>{name}</figcaption>\n'
                f"        <pre>{pre}</pre>\n      </figure>"
            )
    count = sum(x.lstrip().startswith("<figure") for x in blocks)
    appendix = (
        '<section class="chapter" id="prompts">\n  <header class="chapter-head">\n    <span class="chapter-num">A</span>\n'
        "    <h2>프롬프트 모음</h2>\n"
        f'    <p class="chapter-lead">이 자료에 나온 프롬프트 {count}개를 장 순서대로 모았습니다. 복사한 뒤 [대괄호] 부분만 내 내용으로 바꿔 쓰세요.</p>\n'
        '  </header>\n  <div class="prompt-index">\n' + "\n".join(blocks) + "\n  </div>\n</section>"
    )
    PAGE.write_text(body.replace("@@APPENDIX@@", appendix), encoding="utf-8")
    unknown = sorted(set(edits) - seen)
    print(f"changed {changed} cards, banned chars fixed {fixed}, appendix {count} prompts")
    if unknown:
        print("titles not found in index.html (ignored):", *unknown, sep="\n  ")


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "export"
    if cmd == "apply":
        apply(*sys.argv[2:3])
    else:
        export()
