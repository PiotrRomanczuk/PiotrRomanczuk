# GitHub profile — content v2 (draft)

**Date**: 2026-10-19
**Scope**: treść nowego README profilu + ustawienia konta. Wygląd → Claude Design (następny krok).
**Źródła**: vault `PROJECTS.md` + notatki `projects/*`, README repo `strummy` i `home-ops`, GitHub API (2026-10-19).

## Założenia

- **Pozycjonowanie** (zgodnie z wizytówką `romanczuk.online`): *Software engineer · process automation & AI*. Od 2026-10-16 nie pod rekrutację, tylko wizytówka osobista, Vector Digital i portfolio.
- **Historia jednym zdaniem**: buduję oprogramowanie dla problemów, które mam sam (szkoła gitary, korepetycje, homelab, JDG), i utrzymuję je na produkcji.
- **Tylko sprawdzalne liczby**, z datą. Bez „20–30 DAU” (vault: ok. 15 kont).
- **Linki tylko do publicznych repo.** Prywatne projekty jako jednolinijkowce bez linku. Bez LinkedIna i bez telefonu.
- Język README: **EN** (GitHub). Wizytówka PL/EN jest pod linkiem.

---

## Treść README (EN)

### Hero

> **Piotr Romańczuk**
> Software engineer · process automation & AI · Warsaw
>
> I build software for problems I actually have — a guitar studio, an English-tutoring practice, a homelab, a small automation business — and then I run it in production.
>
> [romanczuk.online](https://romanczuk.online) · p.romanczuk@gmail.com

### Vector Digital (ciemny kafel nad Strummy — decyzja Piotra 2026-10-19)

> **For businesses · my company** — **Vector Digital**
> I take repetitive office work off people in small businesses (3–50 people): quotes, reports, invoices, copying data between email and Excel. Process automation and AI on the tools you already use — a free audit first, then a pilot.
> [vectordigital.pl ↗](https://vectordigital.pl) · free audit · pilot · rollout (cały kafel linkuje do strony; zmiana 2026-10-19 — strona działa od 2026-10-17)

### What I'm building

**[Strummy](https://github.com/PiotrRomanczuk/strummy)** — CRM for guitar teachers · [strummy.online](https://strummy.online)
Students, lessons, repertoire, assignments and practice logs for a real teaching studio (mine). Next.js 16, Supabase with RLS as the security boundary, AI-assisted lesson notes from transcripts. The production database runs self-hosted on my homelab behind a Cloudflare tunnel.
`2,000+ commits` `650+ merged PRs` `62 tables · 199 RLS policies` `3,700+ test cases`

**[home-ops](https://github.com/PiotrRomanczuk/home-ops)** — self-hosted ops stack for a 3-machine home network
Python agents on Linux, Windows and a Raspberry Pi ship logs and metrics to a Hono ingest API on PostgreSQL 17. On the same database: a GPU job queue for local LLMs, nightly backups and a web console with a daily brief. Reachable only over Tailscale.
`PostgreSQL 17` `systemd` `Docker` `Tailscale` `50k–500k log rows/day`

**[romanczuk.online](https://github.com/PiotrRomanczuk/landing-portfolio)** — personal card + portfolio
A bilingual PL/EN business card with a vCard and QR code, a portfolio with live GitHub activity (ISR), GA4 and an OG image generator. Next.js 16, Tailwind, Vercel.

**[instagram-stories-webhook](https://github.com/PiotrRomanczuk/instagram-stories-webhook)** — scheduled Instagram Stories publishing
Meta Graph API, a queue with retries, an FFmpeg media pipeline. It now continues as a private multi-brand content planner.
`Next.js 16` `Supabase` `Vitest` `Playwright`

### Also shipped

- **[INBORR](https://github.com/PiotrRomanczuk/INBORR---LandingPage)** — client landing page for apartment rentals, PL/EN, live at [inborr.pl](https://inborr.pl)
- **[giarddesign](https://github.com/PiotrRomanczuk/giarddesign)** — Vue 3 + TS + Tailwind landing page (recruitment task, CI + GitHub Pages)
- **[pizza-store](https://github.com/PiotrRomanczuk/pizza-store)** — pizza ordering UX built around XState state machines

### Behind the scenes (private repos)

- **gitarawarszawa.pl** — site for my guitar lessons; Cal.com bookings land in Strummy through a webhook
- **angielski.romanczuk.online** — lesson notes + games for my English students, generated from lesson transcripts
- **job-radar** — daily job/lead collector feeding home-ops Postgres
- **daily-brief** — morning/evening briefs written by scheduled Claude routines from calendar + planner
- **monitor-manager** — Windows tray app + HTTP API for switching monitor layouts (C# / .NET 10, CCD API)
- **Tender registry** — Outlook → Excel automation for a pharma distributor (PowerShell), first client of my JDG **Vector Digital**

### How I work

- Every project has a blueprint (domains, gap IDs, ADRs) and a planner vault as the single source of truth.
- AI agents (Claude Code) are part of the team. Quality gates (lint, typecheck, tests, E2E) decide what gets merged, not the agent.
- I self-host what I can: Supabase, Postgres, GitHub runners, a local LLM on a Radeon GPU.

### Toolbox

| | |
|---|---|
| Product | TypeScript · React · Next.js · Tailwind · Vue |
| Data | PostgreSQL · Supabase · Drizzle |
| Infra | Linux · Docker · systemd · Tailscale · Cloudflare · Vercel |
| Quality | Playwright · Vitest · Jest · GitHub Actions |
| Also | Python · C# / .NET · PowerShell · Ollama |

---

## Usunięte z obecnej wersji (i dlaczego)

| Element | Powód |
|---|---|
| Contribution Graph (`github-readme-activity-graph`) | serwis zwraca `402 DEPLOYMENT_DISABLED`, obrazek jest pusty |
| Top Languages | pokazuje HTML 79.81% przez makiety w strummy; wraca dopiero po `.gitattributes` |
| Stats card z rangą B+, streak, licznik wyświetleń | mało treści, trzy zewnętrzne serwisy, które mogą paść |
| Tabela „Key metrics” z DAU i Stripe w pizza-store | dane niezgodne z repo i z vaultem |
| `assets/` (GIF 2.8 MB + 5 SVG) i `.DS_Store` | nieużywane od 2023 |

## Ustawienia konta (do zmiany)

| Pole | Teraz | Propozycja |
|---|---|---|
| name | `PiotrRomanczuk` | `Piotr Romańczuk` |
| bio | Front-End Dev ‖ IU Software Development Student | Software engineer · process automation & AI |
| blog | — | `https://romanczuk.online` |
| hireable | true | false (praca znaleziona 2026-10-16) |
| pinned (ręcznie) | strummy, instagram-stories-webhook, INBORR, pizza-store | strummy, home-ops, landing-portfolio, instagram-stories-webhook, INBORR, giarddesign |

Poza profilem: `.gitattributes` w strummy (`docs/**` jako `linguist-documentation`, makiety jako `linguist-vendored`), poprawa liczb w README strummy (1,600+ → 2,000+ commitów, 330+ → 650+ PR), opis landing-portfolio (`romanczuk.vercel.app` → `romanczuk.online`).

## Wskazówki dla Claude Design

- README na GitHubie nie obsługuje CSS ani JS. Wygląd = **własne obrazy SVG/PNG** zapisane w `assets/` (hero, karty projektów, separatory) plus Markdown.
- Jasny i ciemny motyw przez `<picture>` z `<source media="(prefers-color-scheme: dark)">`, czyli każdy obraz w dwóch wersjach.
- Szerokość treści na GitHubie to ok. 830 px. Na telefonie obraz się skaluje, więc tekst w SVG musi mieć co najmniej ok. 14 px przy 830 px.
- Spójność z wizytówką `romanczuk.online` (bento, akcent, typografia) — jedna marka.

## Projekt Claude Design

https://claude.ai/design/p/93a0268c-1d66-47b4-a7bb-c1061117ad9f?file=GitHub+README.dc.html — makieta README (jasny + ciemny), etykiety IMG/MARKDOWN pokazują, co będzie obrazem SVG w `assets/`, a co Markdownem.
