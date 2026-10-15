# Design

Direction: education platform standard (2026-10-15, user choice over caption / metro / title-sequence mocks). Bar: Inflearn / Talling course sites at full craft. Mocks kept in `.impeccable/mocks/direction/`.

## Principles

- Familiar course-site grammar: centered home message, course cards, curriculum list, left TOC + reading sheet.
- One accent (blue). Color marks action and current position only.
- The intro motion graphic (`public/assets/video/intro.mp4`) is the home hero visual. No prompt-typing demo.
- Light by default (classroom projector, office laptops); dark mode via toggle or system.

## Tokens (`app/globals.css`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | #ffffff | #0f1115 | page |
| `--bg-soft` | #f6f7f9 | #0b0d10 | bands, chapter page ground |
| `--surface` | #ffffff | #171a21 | cards, reading sheet |
| `--surface-2` | #f1f3f6 | #1f232c | hover, inline code |
| `--text` / `-2` / `-3` | #111827 / #4b5563 / #6b7280 | #eef0f4 / #b4bac6 / #8b92a0 | text levels |
| `--line` | #e5e7eb | #2a2f3a | borders |
| `--accent` | #2563eb | #7aa2ff | links, primary button, current item |
| `--accent-soft` | #eaf1ff | #1a2440 | chips, current TOC item, prompt card header |

Status colors (`--ok`, `--warn`, `--danger` + `-soft`) only in callouts.

## Type

Pretendard Variable (self-hosted). Display 800 weight, tracking -0.035em. Body 17px / 1.75. Numbers use `font-variant-numeric: tabular-nums`; mono (D2Coding stack) only for code and commands.

## Shape and depth

- Radius: cards and sheets 16-20px, buttons 12px, controls 10px, chips full pill.
- Elevation: border at rest; `--shadow-lift` only on hover of cards.

## Components

- Home: `.home-hero` (centered text, video below), `.band` + `.section` course list (`.course-card` with typographic `.course-thumb`), `.works` gallery from `course.json` `works`.
- Course page: `.hero` split (badge, title, CTAs / video), `.roadmap` step cards, `.chapter-list` curriculum rows.
- Chapter page: `body:has(.layout)` soft ground, `.toc` with pill current item, `.content` white sheet.

## Data hooks

`course.json` optional fields: `icon` (Phosphor class for course thumb), `works[]` ({title, href, img, text}), `worksChapter` (chapter id for the "프롬프트 보기" link).
