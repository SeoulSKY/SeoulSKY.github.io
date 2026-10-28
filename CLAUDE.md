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
npm run email      # React Email preview of the templates in src/emails
```

Before calling a change done: `npx biome check --write src` and
`npm run build` must both pass, and look at the result in a browser at a
desktop width (1440×900) **and** a phone width (390×844).

Env vars (see `.env.example`): `RESEND_API_KEY` and
`RESEND_EMAIL_DOMAIN` (the domain verified in Resend) for the contact
form, both server only. Both are required: `src/env.ts` declares and
validates them with `@t3-oss/env-nextjs` and Valibot (not zod, which would
add 15 KB+ to the client bundle once a `NEXT_PUBLIC_` variable joins), and
`next.config.ts` imports it, so the build fails if one is missing. Read env
vars through `env` from `@/env`, never `process.env`; a new variable gets
a schema there first.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript 5.9, path alias `@/` →
  `src/`. Hosted on Vercel, which deploys every push; the Resend env vars
  are set in the Vercel project.
- The contact form posts to a server action (`sendMessage` in
  `app/actions.ts`), which checks the fields again with Valibot and sends
  them through Resend to `contact@` the domain, with the sender as
  reply-to. The email body is a React Email template in `src/emails`
  (components from the `react-email` package; `@react-email/components`
  is deprecated). Templates are styled with Tailwind classes inside
  `<Tailwind>`, which inlines them, since mail clients have no
  stylesheet. Its theme (`src/emails/theme.ts`) repeats the site's tokens
  under the same names as literal values, because the email cannot read
  globals.css's `:root` variables; keep the two in step. An `Hr`'s colour
  goes on its top border (`border-t-border`), which it draws.
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
- Fonts are self-hosted from npm and imported in `src/app/layout.tsx`
  (`@fontsource-variable/*`, and `@fontsource/instrument-serif`, italic
  only), never from Google Fonts: a stylesheet on another origin blocks
  the first paint. Pretendard is cut down to the Hangul in `src/` by
  `scripts/subset-pretendard.mjs` (one ~24 KB file instead of seven
  subsets), which runs before `dev` and `build` and writes the gitignored
  `src/fonts/pretendard-subset.woff2`; `globals.css` declares it.
- SEO copy (title, description, URL) is `site` in `content.ts`; the
  metadata, sitemap, manifest and JSON-LD all read it.

## Structure

```
src/
  app/layout.tsx          <html>, metadata, JSON-LD, font + CSS imports
  app/page.tsx            page shell: SmoothScroll, Preloader, Navbar, sections
  app/actions.ts          server actions: sendMessage (contact form → Resend)
  app/opengraph-image.jpg share image: a 2x screenshot of the settled hero
  app/apple-icon.tsx      home-screen icon; favicon.ico + icon.svg beside it
  app/sitemap.ts          the page, with project images and clips
  app/robots.ts, manifest.ts
  globals.css             design tokens, hero CSS, utilities (.glass, .grain…)
  env.ts                  typed, validated env vars (@t3-oss/env-nextjs)
  emails/                 React Email templates (contact-message.tsx) and
                          the Tailwind theme they share (theme.ts)
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
    seoul/night-city.tsx  Seoul at night behind the Projects train
    seoul/starfield.tsx   canvas starfield
    brand-logo.tsx        BrandLogo: the swallow, filled with currentColor
    section-heading.tsx   metro-line badge · rule · Korean tag, split title
    section-link.tsx      in-page #section link that scrolls smoothly
    structured-data.tsx   schema.org JSON-LD built from content.ts
    metro-line.tsx        vertical Seoul-Metro timeline (Experience)
    intro-scrubber.tsx    TEMPORARY review transport bar for the intro
    ui/                   shadcn: button, input, textarea, label, field,
                          badge, sheet
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
  mattered with real numbers ("31,000+ downloads", "100+ servers"). No hype.
- **Bilingual marks, not bilingual copy.** Korean appears as small labels next
  to English, never as paragraph translations: `서울하늘` (brand), section tags
  `소개` About · `경력` Experience · `기술` Skills · `작품` Projects ·
  `수상` Awards · `연락` Contact (`KOREAN` in `content.ts`), line names `N호선`.
  The marks are visual only, so keep them out of metadata, the manifest and
  the JSON-LD.
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
  ~60–75%, `border` hairline. No backdrop blur: the twinkling starfield sits
  behind every card, so a blur would be redone per card on every frame.
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
  timelines fill and stations ping; Projects is a horizontal train of
  carriages passing by as you scroll, on every screen size.
- **Ambient:** beacons blink, glints shimmer on the water, lanterns flicker,
  windows go dark for a moment, straps sway. The hero's loops pause while
  it is off screen.
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
- Logo: the swallow, in `peach`. Every curve is an arc of a circle whose
  radius comes from one golden-ratio series, r = 3.5·φⁿ (256-unit
  artboard), and neighbouring arcs meet tangent; the long edges are
  straight. `brand/logo-construction.svg` shows the circles. The
  favicon (`src/app/icon.svg`, with `favicon.ico` at 16/32/48px for older
  browsers) and the navbar (`BrandLogo`, `components/brand-logo.tsx`,
  `text-peach`) use the solid swallow with no background;
  `public/logo-outline.svg` is the outline alone. Change the shape only
  through the construction, never by hand-nudging points.

## Components

- `Button` is a pill. `default` = peach with glow, `outline` = glass, plus
  `secondary`, `ghost`, `link`, `destructive`; sizes `sm`, `default`, `lg`,
  `icon`.
- `Input` / `Textarea`: `input` border, peach focus ring. `Label`, `Badge`
  (outline = mono tag), `Sheet` (mobile nav on `night-950`).
- Forms are built from shadcn's `Field` parts (`FieldGroup`, `Field`,
  `FieldLabel`, `FieldError`). A form reports its result inside itself
  and keeps it until the next submit: success in an `<output>` that is
  always in the page (so screen readers announce it), failure as a
  `FieldError`. No toasts. `field.tsx` imports `cn` from `@/lib/utils`
  and leaves out `FieldSeparator`, which needs the `radix-ui` package.
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
- Project *carriages* (`projects.tsx`): each project is one car of a Line 4
  train, drawn after the Korail EMUs that run it, and every screen size
  shares one layout. The body is grooved stainless (`STAINLESS`) under a
  roof line with one long AC unit. Along its length: a `Window` bay, a pair
  of sliding doors (`Door`) in Line 4 livery, then a second bay. Each bay is
  a `PANE` of black glass set straight into the silver body, in the same
  light gasket as the door windows, over a `.glass` panel mounted below it
  for the copy (the glass and the body must not both be dark, or the window
  disappears). The first bay's pane shows the picture, with the title and a
  `CAR 0N / 06` plate in `line-4` on its panel; the second's is clear glass
  into the lit car (`CarView`, below) over the details, mirroring it across
  the doors. Every window on the
  car's side shares `--pane`'s height and top edge (the two panes, the door
  leaves' windows, the driver's door's window), as on the real car, and
  riding, `--pane` is half the door's height: the fit in Projects
  (`fitTrain`) sets it to the rest of the car, less the door's cap. The
  picture shows through its pane at 16:10, as large as fits. The livery
  follows photos of the Korail 341000s (3rd generation) that run Line 4.
  The doors are two leaves in a recessed frame, painted `line-4` sky blue
  from the top down to just under their windows, then a narrow
  `line-4-door` deep-blue band (a livery token, not wayfinding), then bare
  stainless to the sill. Each leaf's tall window sits by the seam in a dark
  gasket. The body runs on above the doorway to the roof line
  (`.pj-cap`, unpainted). The first and last cars end in a `Nose`: a smooth
  cap, drawn in a stretched SVG, that sweeps down from the roof and leans
  forward to its foot. As on the real cab, a broad `line-4` frame wraps
  the corner round the black front mask (a sliver of windscreen shows at
  the tip), over a black lower front holding the headlight or tail light,
  and the skirt and coupler below. Behind it, the body's `Cab` section holds a driver's door about one
  leaf wide. The motor cars (2 and 5) and the cab cars, close to the cab
  (mirrored at the rear), raise a single-arm `Pantograph` against the
  overhead line (contact wire, messenger wire, droppers), whose droppers
  move with the ground (see the world, below). Both are placed by
  `--lift`, so the pan head meets the wire at every size and in the swipe
  row too (`--above`). Both windows of a car
  are one `--side` wide, so the doors sit centred between them; the cab
  (`--cab`) adds its length at the end of the first and last cars. Cars are
  joined by full-height rubber `Gangway` bellows and ride on two `Bogie`s
  each, with equipment boxes slung between them, over one shared rail that
  is drawn over the wheels' flanges. The bogies are to scale: disc wheels `--wheel` across (about a seventh of the
  body's height) riding just under the floor, a side frame with axle boxes,
  brake units, bolster and air spring. The wheels turn with the travel
  (rotation = distance over the ground / radius, the radius measured from
  the bogie on refresh). Keep the bolt holes' positions rounded: Math.cos
  can differ in the last digit between Node and the browser, and the mismatch breaks
  hydration. The page scroll drives the train sideways at every width (the
  `ride` variant / `RIDE`: tall enough for a car, motion allowed). Fine
  pointers pin the stage with GSAP; touch screens stick it with CSS
  `sticky`, since ScrollSmoother is off there, and make the wrapper as tall
  as the ride. The whole train, overhead line included, has to fit between
  the navbar and the screen's foot, so if it is taller than the stage below
  the navbar, `fitTrain` scales the whole train down (`.pj-scale`, widened
  by 1/scale so the line and rail still span the stage), keeping every
  proportion. Distances are in the track's own px, and the scroll covers
  them times the scale. Below `MIN_SCALE` the copy would get too small, so
  the panes give up height instead. The swipe row (and the page before the
  fit runs) uses the CSS fallback for `--pane`, about half the door,
  budgeted against the screen height; on short desktops the pantographs and
  wheels scale with the height too. Windows stay one screen wide on phones.
  Short screens and reduced motion get a row you swipe, snapping to each
  window; keep the car `overflow-clip`, not `overflow-hidden`, which would
  make it a scroll container and steal those snap points. The door blue is
  livery, the one place the line colour fills an area (with the cab's frame
  and the seats inside). Otherwise no coloured
  stripes or glowing underlines on cards. That reads as generic AI styling,
  so use something physically specific to the metaphor instead. Keep the
  ride cheap: a frame turns only the wheels of bogies on screen (worked out
  from spans measured on refresh, through `gsap.quickSetter`); video posters
  are fetched at a fixed width (a `fill` image's src is its 3840px fallback)
  and only once the section is about a screen away; and glows are radial
  gradients, never `blur` filters. Measure performance on the production
  build: the dev server adds a one-off spike when the stage first appears
  that production does not have.
- The *ride's world* (`projects.tsx`, riding only). The camera follows the
  train part way, like a tracking shot, so the world slides the other way:
  for every px the cars move left, the ground moves `WORLD` px right
  (catenary masts behind the cars, `.pj-masts`; the wire's droppers) and the
  far city `CITY` px right (`NightCity`, `.pj-city`: Bukhansan, two rows of
  towers with lit windows, Namsan and N Seoul Tower, the 63 Building, Lotte
  World Tower, a bridge strung with lamps, the Han and its reflections).
  The second window (`CarView`), the door leaves' windows, the far window
  seen through open doors and the driver's door are clear glass: each is a
  `SeeThrough` canvas that copies its slice of the city's bitmap and draws
  the masts going by, so it lines up with the real world around the train.
  `CarView` is a lit Line 4 car seen from outside, painted on the same
  canvas (`paintCarRoom`, cached once per size, then `paintStraps` live):
  cool white walls and ceiling, an LED strip and `line-4` trim, grey hand
  straps on a stainless bar, a seat-end pole, and across the aisle sky-blue
  bucket seats with a pink priority seat at the car's end, under the far
  side's window onto the city. Nothing is laid over a window's canvas:
  DOM over a canvas is pushed onto compositor layers of its own. The
  straps are a damped pendulum kicked by the train's acceleration (back as
  it pulls away, forward as it brakes). At
  speed the pantographs arc against the wire (`.pj-spark`). Keep the
  stainless plain: light bands sliding across the body (tried as city
  reflections) showed through the copy panels and read as a see-through
  body. The front car's headlight throws a beam down onto the rail ahead;
  the rear's tail lamp glows red. **Station stops:** when the ride comes to
  rest, the car whose doors are nearest the middle of the screen slides
  them open (`.pj-leaf-l/-r` into the body's pockets) on the lit car.
  Doors face each other across the aisle, so the doorway looks onto the
  closed doors opposite (their windows onto the city), with the route
  display above, seat-end poles either side and the yellow edge on the
  floor. Its cool LED light spills onto the track (`.pj-spill`); moving
  again shuts them.
  Straps, sparks and doors run on one ticker (`sway`), only while
  the section is on screen and only for the cars on screen, and it idles
  once the train has stopped and the straps have settled. The trigger that
  runs it refreshes after the stage's pin (`refreshPriority: -1`), or it
  measures the section without the ride's length and switches off a screen
  in.
  **Keep the ride cheap; it has to run on low-end phones.** The city svg is
  rasterised once into an opaque canvas (`paintCity`, with the night sky
  and static stars from `paintNightSky` painted under it) that replaces the
  svg behind the train and feeds the windows; drawing the svg in every
  window every frame made the ride four times slower. Being opaque, it
  lets the browser skip what it covers, and while the stage fills the
  screen `coverSky()` (`lib/sky.ts`) pauses the page's starfield. The city,
  masts and wire only move (`will-change-transform`). A window canvas is
  redrawn only when the train moves (or a strap swings at rest), and taken
  out of the page (`display: none`) when its car is more than half a screen
  away, since each canvas is a compositor layer; the far windows behind
  the doors are out of the page (`.pj-inside` hidden) until they open.
  Weaker devices (≤ 4 cores or ≤ 4 GB) draw windows at 1x, skip sparks and
  leave the door leaves' windows plain. **Lite:** a device with ≤ 2 GB
  starts lite, and any other drops to it if the first 30 moving frames
  come slower than about 36 a second (`watchFrames`): no city or masts
  (the starfield shows), windows painted once and left still, no sparks.
  The livery, lit interiors, doors and wheels stay. Reduced motion and the
  swipe row paint the windows once the same way (`paintWindowsStill`): no
  city, the night behind the glass, the lit car inside. Measure on the
  production build, with a phone's CPU throttled 4x, against the previous
  build.
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
- **Performance:** the site has to run on low-end PCs and phones, so keep
  continuous motion cheap. `CityLayer` stacks three svgs: the reflection
  (drawn once, then swapped for an image of itself), the city (still once
  lit) and `CityLights`, the only part that keeps moving. New ambient motion
  in the skyline goes in `CityLights`, never in the big city svg, and
  parallax moves the layer wrappers (`.scene-box > *`), not the svgs. Avoid
  `backdrop-filter` on anything that scrolls or sits over the starfield,
  SVG filters on anything that changes, `mix-blend-mode` on moving
  elements, and animating layout properties (`top`, `height`) on scroll.
  Pause loops while their section is off screen. ScrollSmoother is created
  only for fine pointers; touch screens scroll natively. The carriage is
  layered the same way (still cabin, straps, doors + LCD text, mood tint),
  and the brake jolt and the map's dive move HTML elements, not SVG
  groups: moving a group relays out and repaints its whole svg. Every
  stacked svg carries its own defs: Safari draws nothing for a reference
  into another svg until something repaints it, which once left the doors
  missing as the carriage came in. Give a
  single shape `fillOpacity` / `strokeOpacity` rather than `opacity`,
  which makes every such shape a paint chunk of its own. In a per-frame
  callback, work positions out from data rather than asking the DOM
  (`getPointAtLength`, `getBBox`, `getBoundingClientRect`): after a write,
  each read forces a style and layout pass. The page stays hidden under
  the intro until the dive, so it is not painted beneath the opaque map.
- **First load:** everything below the fold waits until the page has
  hydrated, so the first load is not one long task. Sections and their
  parts set up with `useGSAPLater` (same callback and `{ scope }` as
  `useGSAP`, from `@/lib/gsap`), which queues the setup and runs one per
  task in effect order, then refreshes ScrollTrigger once. Use plain
  `useGSAP` only above the fold (hero, navbar, intro). A big, still
  drawing below the fold renders on `useRenderLater()` instead of in the
  prerendered page (the Projects city, the footer skyline); declare it
  before the `useGSAPLater` that needs it, which then finds it in the
  page. Libraries only needed on an action load on it, or run on the
  server (Resend sends from a server action). The CSS is inlined
  into the HTML (`experimental.inlineCss`). Check a change against
  Lighthouse's mobile run on the production build.
- **Prerendering:** the page is static, so `next build` renders it to HTML
  ahead of time, where render code cannot read `window`, the viewport or the
  URL. Effects and GSAP callbacks can. Anything whose markup depends on the browser waits for
  `useMounted()`, as `Preloader` and the intro scrubber do; the prerendered
  page shows the preloader's night backdrop until then.
