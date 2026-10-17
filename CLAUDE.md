# CLAUDE.md

Guidance for Claude (and humans) working in this repository: the source of
[www.seoulsky.dev](https://www.seoulsky.dev), the tech portfolio of SeoulSKY
(Sahngwoo Kim). Theme: **Seoul at dusk, travelled by subway.**

## Commands

```bash
npm install
npm run dev        # Next dev server (the intro scrubber is on in dev)
npm run build      # type-check, then production build → .next/
npm start          # serve the production build on :3000
npm run lint       # biome check --write (format + lint + sorted classes)
```

Before calling a change done: `npx biome check --write src` and
`npm run build` must both pass, and look at the result in a browser at a
desktop width (1440×900) **and** a phone width (390×844).

Env vars (see `.env.example`): `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`,
`NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` for the contact form. Both are required:
`src/env.ts` declares and validates them with `@t3-oss/env-nextjs` and
Valibot (not zod, which would add 15 KB+ to the client bundle), and the
build fails if one is missing. Read env vars through `env`
from `@/env`, never `process.env`; a new variable gets a schema there first.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript 5.9, path alias `@/` →
  `src/`. Hosted on Vercel, which deploys every push; the EmailJS env vars
  are set in the Vercel project.
- Next.js 16 changed APIs you may remember from older versions (`priority` on
  `next/image` is now `preload`, for one). Before writing Next.js code, read
  the matching guide in `node_modules/next/dist/docs/`, which ships with the
  installed version, and heed its deprecation notices.
- Tailwind CSS v4 via `@tailwindcss/postcss`. No `tailwind.config`; all tokens
  live in `src/globals.css` (`:root` + `@theme inline`).
- shadcn/ui (new-york) components in `src/components/ui`, themed by the tokens.
  Add new ones by hand in the same style if the CLI is unavailable.
- GSAP 3.15 with every plugin registered once in `src/lib/gsap.ts`
  (ScrollTrigger, ScrollSmoother, SplitText, DrawSVG, ScrambleText, Text,
  ScrollTo, CustomEase). Always import `gsap`, `useGSAP`, etc. from
  `@/lib/gsap`, never from `gsap` directly.
- Biome 2 (`biome.json`): double quotes, space indent, `useSortedClasses` is an
  error, CSS files are ignored.
- Fonts are self-hosted from npm (`@fontsource-variable/*`, `pretendard`),
  except Instrument Serif, which loads from Google Fonts in
  `src/app/layout.tsx`.

## Structure

```
src/
  app/layout.tsx          <html>, metadata, font + CSS imports
  app/page.tsx            page shell: SmoothScroll, Preloader, Navbar, sections
  globals.css             design tokens, hero CSS, utilities (.glass, .grain…)
  env.ts                  typed, validated env vars (@t3-oss/env-nextjs)
  data/content.ts         ALL copy: nav, Korean tags, about, experience,
                          skills, projects, awards
  lib/gsap.ts             plugins, custom eases, scrollToSection()
  lib/intro.ts            intro pub/sub + timeline registry (+ INTRO_DEBUG)
  lib/metro.ts            METRO_LINES: Seoul Metro line colour + ink
  lib/random.ts           mulberry32 seeded RNG (deterministic SVG detail)
  components/
    preloader.tsx         "Last train to SeoulSKY" subway intro
    seoul/carriage.tsx    SVG interior of a Seoul Metro carriage (the doors)
    seoul/skyline.tsx     SVG city: Bukhansan, Namsan + N Seoul Tower,
                          Lotte World Tower, 63 Building, Gyeongbokgung, Han
    seoul/starfield.tsx   canvas starfield
    section-heading.tsx   metro-line badge · rule · Korean tag, split title
    section-link.tsx      in-page #section link that scrolls smoothly
    metro-line.tsx        vertical Seoul-Metro timeline (Experience)
    intro-scrubber.tsx    TEMPORARY review transport bar for the intro
    ui/                   shadcn: button, input, textarea, label, badge,
                          sheet, sonner
  sections/               Hero, About, Experience, Skills, Projects,
                          Awards, Contact
```

Copy changes go in `src/data/content.ts`, not in section components.
Static files (logo, project media, skill logos) live in `public/` and are
referenced by URL (`/projects/ytnoti.jpg`).

## Code style

- Write named functions as `function` declarations, never as an arrow
  assigned to a `const`: `function seek(t: number) { … }`, not
  `const seek = (t: number) => { … }`. This holds for exports, module
  helpers and functions nested in components or effects alike. Biome has
  no rule for it, so keep to it by hand.
- Arrows stay for anonymous callbacks (`.map`, `useEffect`, `useGSAP`,
  `useCallback`, GSAP options, JSX event props) and for a `let` that holds
  a swappable function, such as a cleanup that starts as a no-op.
- A null check does not carry into a nested function declaration, because
  declarations are hoisted. Re-bind the checked value to a new `const`
  after the check, as `starfield.tsx` does with `canvas` and `ctx`.

---

# SeoulSKY design system

Seoul at dusk: the deep night above the Han river, a peach horizon behind
Namsan, amber tower lights, the dancheong reds of Gyeongbokgung, and the
Seoul Metro as the way you travel through the page. **Dark only, by design:**
every surface is a piece of night sky, and colour arrives the way light does
in a city at dusk, from the horizon, from lit windows and from line colours.

## Content

- **Voice.** First person, plain, confident. State what was built and why it
  mattered with real numbers ("16,000+ downloads", "100+ servers"). No hype.
- **Bilingual marks, not bilingual copy.** Korean appears as small labels next
  to English, never as paragraph translations: `서울하늘` (brand), section tags
  `소개` About · `경력` Experience · `기술` Skills · `작품` Projects ·
  `수상` Awards · `연락` Contact (`KOREAN` in `content.ts`), line names `N호선`.
- **Real Seoul details carry meaning:** coordinates `37.5665°N 126.9780°E`,
  landmark call-outs (`N SEOUL TOWER · 236M`, `GYEONGBOKGUNG · EST. 1395`),
  real Line 2 station names and codes, official metro colours.
- **Headlines pair a grotesque with a serif tail:** "Work *experience*",
  "Selected *projects*", "Let's build *something together.*" The italic serif
  part is always `peach`.

## Colour

Use the Tailwind names (`bg-night-950`, `text-peach`, `bg-line-2`…). Raw hex
only inside SVG illustrations.

| Token | Hex | Use |
| --- | --- | --- |
| `night-950` | `#06071a` | Page background. Everything sits on night. |
| `night-900` | `#0b0d26` | Popovers, sheets, base of the hero water. |
| `night-800` | `#13163a` | Muted surfaces, card fill behind glass. |
| `night-700` | `#1e2152` | Secondary buttons, raised chips. |
| `twilight` | `#3b2f72` | Accent surface; band of sky above the horizon. |
| `lavender` | `#a89bdb` | Far ridges, gradient starts, quiet highlights. |
| `dusk` | `#f4a7b9` | Horizon pink: gradients, `::selection`, glows. |
| `peach` | `#ffc3a1` | **Brand / primary.** Buttons (with `night-950` text), links, serif accents, focus ring. |
| `amber` | `#ffb357` | Light sources only: beacons, lit windows, lanterns, the arrival glow. Never a large fill. |
| `dancheong` | `#d9503f` | Palace red. Tiny details only (antenna stripes). |
| `jade` | `#3fae8f` | Palace green, beside dancheong only. |
| `mist` | `#f4f0ff` | Primary text. Use `/85 /65 /55 /45` opacity steps for hierarchy. |
| `muted-foreground` | `#a7a3c7` | Secondary text and captions. |
| `border` | `mist / 10%` | Hairlines, card borders, dividers. |
| `input` | `mist / 14%` | Input borders. |

The sky gradient always runs top→bottom
`#05061a → #0c0e2e → #221d58 → #4a3483 → #9b5f9c → #e894ad → peach`
(never reversed). Gradient text (hero name, `.hero-char`) runs
white → `#ffe2cf` → `dusk`, like letters lit from the horizon.
`.text-gradient-dusk` is the inline version.

### Seoul Metro lines (wayfinding)

Official line colours. They are **wayfinding, not decoration**: each section
"rides" one line, and everything that belongs to that section's line (badge,
rule, timeline track, rings, ticket stubs, code chips) uses that one colour.

| Line | Token | Hex | Ink on badge | Section |
| --- | --- | --- | --- | --- |
| 1 | `line-1` | `#0052a4` | white | About |
| 2 | `line-2` | `#00a84d` | white | Experience (MetroLine timeline) + the intro train |
| 3 | `line-3` | `#ef7c1c` | white | Skills |
| 4 | `line-4` | `#00a4e3` | white | Projects |
| 5 | `line-5` | `#996cac` | white | Awards (ticket stubs, `NO. 50x`) |
| 6 | `line-6` | `#cd7c2f` | white | Contact |
| 7 | `line-7` | `#747f00` | white | next new section |
| 8 | `line-8` | `#e6186c` | white | next new section |
| 9 | `line-9` | `#bdb092` | `#06071a` | next new section |

The `index` prop of `SectionHeading` is the line number; `METRO_LINES` in
`lib/metro.ts` holds colour + ink for TypeScript (SVG included), and the
`--line-N` tokens in `globals.css` hold the same colours for CSS. A new section takes the next free
line, and any line-coloured details inside it must use the same line.
Show the line's name once per section (in the heading); inner elements use
the colour, not a second badge.

## Typography

| Role | Family | Token | Rules |
| --- | --- | --- | --- |
| Display | Bricolage Grotesque Variable | `font-display` | Bold, tight tracking −0.03 to −0.045em. Section titles `clamp(2.6rem,7vw,6.5rem)`, leading 0.95. Hero name up to 19rem. |
| Accent | Instrument Serif *italic* | `font-serif` | Only the last word/phrase of a heading, in `peach`. |
| Text | Geist Variable | `font-sans` | Body and UI. Body copy `text-lg` / `15px`, `leading-relaxed`, `text-mist/65–75`. |
| Utility | Geist Mono Variable | `font-mono` | UPPERCASE, 11px, tracking 0.2–0.35em: eyebrows, codes, coordinates, counters. Tabular figures. |
| Korean | Pretendard Variable | `font-kr` | Semibold/bold for `서울하늘`, `N호선`, section tags. Tracking ≤ 0.2em. |

Sizes and tracking that Tailwind's scale lacks are theme tokens, so reach
for these before an arbitrary value: `text-3xs` 10px, `text-2xs` 11px,
`text-board` 13px, `text-body` 15px; `tracking-sign` 0.12em,
`tracking-label` 0.2em, `tracking-caption` 0.25em, `tracking-eyebrow` 0.3em.
The text sizes set no line height, unlike `text-xs` and up.

## Space, shape, depth

- Section padding: `px-5 py-28` → `sm:px-10 sm:py-40`; content in
  `mx-auto max-w-7xl`.
- Radii: `rounded-full` for every button, badge, pill and the nav;
  `rounded-3xl` (24px) for cards and tickets; base `--radius` 1rem.
- **Glass** (`.glass`) is the default card: `night-700 → night-900` gradient at
  ~50%, 16px backdrop blur, `border` hairline.
- Depth comes from **light, not shadows**: peach glow under primary buttons,
  radial glows behind objects, blur. `.grain` adds film noise.

## Motion

GSAP everywhere; every animation tells the dusk/subway story.

- **Eases:** `seoul` = cubic-bezier(.76,0,.24,1) for curtains, wipes, rules;
  `rise` = cubic-bezier(.16,1,.3,1) for things entering. Use these by name.
- **Intro** ("Last train to SeoulSKY", `preloader.tsx`): the metro map draws
  itself in light; a Line 2 train runs 211 Seongsu → 212 Konkuk Univ. →
  213 Guui → 214 Gangbyeon → 215 Jamsillaru → **216 SeoulSKY 서울하늘**
  (the terminus is always just "SeoulSKY", no real station or landmark name);
  the LED board announces and arrives (amber glow, no flashing); the camera
  dives into the carriage (`carriage.tsx`), the doors slide open, and the
  carriage scales past the camera into the hero. When the map gets new
  sections, extend it with **real** Line 2 stations in order.
- **Hero entrance** (`hero.tsx`, starts on `onIntro`): mountains rise, the
  name lifts letter by letter in 3D, buildings grow from the waterline, Lotte
  World Tower traces from the crown, windows switch on at random. Loops run
  once.
- **Scroll:** headings reveal word by word through SplitText line masks, the
  line rule wipes in with `seoul`; paragraphs light up as you read; metro
  timelines fill and stations ping; Projects is a pinned horizontal train
  of carriages passing by.
- **Ambient:** beacons blink, water ripples, lanterns flicker, straps sway.
- **Reduced motion:** `prefersReducedMotion()` skips the preloader and
  ScrollSmoother and shows the finished, fully lit scene. Wrap a section's
  scroll animations in `withMotion()` (from `@/lib/gsap`), which runs them
  only while motion is allowed and reverts them if that changes.

## Illustration (SVG)

- The skyline and carriage are hand-built SVG, layered so GSAP can animate
  them. Class prefixes are animation hooks: `sk-*` (skyline), `pl-*`
  (preloader/carriage), `sh-*` (section heading). Don't rename them casually.
- Detail that looks random (windows, stars) uses `mulberry32(seed)` so it is
  identical on every render.
- Prefix SVG ids with `useId()` (or an `id` prop), since the same component
  renders more than once.
- The carriage is modelled on a modern Seoul EMU: white jambs, dimpled
  stainless door leaves with rounded windows, equal-width bench seats with the
  pink priority seat by the partition, triangle straps hanging from a
  supported rail, LCD above the door, ad panels. Keep parts physically
  attached (no floating rails, no gaps), keep it uncluttered (no stickers,
  door text, intercoms or door LEDs), and keep the outside view natural
  (door windows sit higher than side windows; one continuous skyline behind).
- Landmarks: Bukhansan, Namsan + N Seoul Tower, Gyeongbokgung
  (Geunjeongjeon), Lotte World Tower, 63 Building, the Han river.

## Iconography

- UI icons: `lucide-react`, 1.6–2px stroke, `peach` in a 48px glass tile or
  inline at 16px.
- Skill logos: original full-colour SVGs in `public/skills` on glass pills.
- Logo: the swallow over a dusk mountain, always in a circle.

## Components

- `Button` is a pill. `default` = peach with glow, `outline` = glass, plus
  `secondary`, `ghost`, `link`, `destructive`; sizes `sm`, `default`, `lg`,
  `icon`.
- `Input` / `Textarea`: `input` border, peach focus ring. `Label`, `Badge`
  (outline = mono tag), `Sheet` (mobile nav on `night-950`), `Sonner` toasts.
- `SectionHeading` takes `index` (metro line), `id` (Korean tag), `title`,
  an optional `accent` (serif tail) and children (intro paragraph).
- `MetroLine` takes `color`, `stops` (`{ key, when, code, content }`), `next`.
  It never repeats the line badge (the section heading owns it). The top is
  `next`: a hollow dashed station on a dashed segment, drawn like an
  extension under construction on a Seoul Metro map ("다음 역 · Next stop /
  공사 중 · Under construction"). The solid rail runs exactly from the first
  station's centre to the last (measured in JS, re-measured on resize); the
  oldest stop is the terminus. Fill and train ride the 60% viewport line, and
  stations light at `center 60%`, so the train is on a station exactly as it
  lights. Station column is 28px so the rail shares its centre (14px) with
  the section heading's line badge.
- Project *carriages* (`projects.tsx`): each project is one car, a glass
  card holding its own media + text and a `CAR 0N / 06` plate in `line-4`.
  Cars are joined by ribbed `Gangway` bellows (horizontal on desktop,
  vertical on phones) instead of empty gaps, so media and description can't
  be mistaken for a neighbour's. On desktop each car rides on two `Bogie`s
  (side frame, spring pocket, two spoked wheels) over one shared rail; the
  wheels turn with the horizontal scroll (rotation = distance / `WHEEL_R`).
  All cars stretch to one height so the running gear lines up. No coloured
  stripes or glowing underlines on cards. That reads as generic AI styling,
  so use something physically specific to the metaphor instead.
- Award *tickets* have a `line-5` stub with the line name, year, month and
  `NO. 50x`, perforated edge, glass body.

---

## Implementation gotchas

- **SVG transforms:** use `svgOrigin` (from a `data-origin` attribute) when
  scaling/rotating SVG elements with GSAP. `transformOrigin` on SVG shifts
  elements off position.
- **Scrolling:** ScrollSmoother wraps the page (`#smooth-wrapper` /
  `#smooth-content`) and is created first in `SmoothScroll`. Scroll in code
  with `scrollToSection(id)`, and link to a section with `<SectionLink>`
  (a real `#id` link) rather than a button; fixed UI (nav, preloader, scrubber) lives
  outside the wrapper.
- **Intro handshake:** the preloader calls `startIntro()`; anything that
  should animate after the doors open subscribes with `onIntro()`.
  Timelines register with `registerTimeline()` so the scrubber can find them.
- **Temporary scrubber:** `IntroScrubber` renders when `INTRO_DEBUG` is true
  (dev server, or `#debug` / `?debug` in the URL). Remove it from `app/page.tsx`
  once the intro is signed off; with it on, the preloader overlay stays
  mounted for scrubbing.
- **Clip what overlaps:** anything inside a rounded window or doorway gets a
  `clipPath`; overlays (vignette, floor shine) must not show through the
  open doorway.
- Keep `useGSAP` scoped (`{ scope: root }`) and revert SplitText in cleanup.
- **Prerendering:** the page is static, so `next build` renders it to HTML
  ahead of time, where render code cannot read `window`, the viewport or the
  URL. Effects and GSAP callbacks can. Anything whose markup depends on the browser waits for
  `useMounted()`, as `Preloader` and the intro scrubber do; the prerendered
  page shows the preloader's night backdrop until then.
