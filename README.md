<div align="center">
  <h1>SeoulSKY · 서울하늘</h1>
  <p>Personal portfolio — Seoul at dusk, travelled by subway.</p>
</div>

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) with [shadcn/ui](https://ui.shadcn.com) components (`src/components/ui`)
- [GSAP](https://gsap.com) — ScrollTrigger, ScrollSmoother, SplitText, DrawSVG, ScrambleText, Text
- [EmailJS](https://www.emailjs.com) for the contact form

## Structure

```
src/
  components/
    seoul/skyline.tsx    # the SVG city: Bukhansan, Namsan + N Seoul Tower,
                         # Lotte World Tower, 63 Building, Gyeongbokgung, Han river
    seoul/carriage.tsx   # SVG interior of a Seoul Metro carriage (the doors)
    seoul/starfield.tsx  # twinkling canvas sky
    preloader.tsx        # "Last train to SeoulSKY": Line 2 map → carriage
                         # doors open → triggers the hero entrance
    metro-line.tsx       # Seoul-Metro-style timeline (Experience)
    section-heading.tsx  # metro-line badge (1호선…) + split-text section titles
    intro-scrubber.tsx   # temporary review bar for the intro (dev / #debug)
    ui/                  # shadcn components
  sections/              # Hero, About, Experience, Skills, Projects, Awards, Contact
  data/content.ts        # all copy, projects, experience, awards, skills
  lib/gsap.ts            # plugin registration + custom eases
```

All copy lives in `src/data/content.ts`.

Each section rides a Seoul Metro line in its official colour — About 1호선,
Experience 2호선, Skills 3호선, Projects 4호선, Awards 5호선, Contact 6호선 —
and new sections take Lines 7–9. The full design system (colours, type,
motion, illustration rules) is in [`CLAUDE.md`](CLAUDE.md).

## Development

```bash
npm install
cp .env.example .env   # fill in the EmailJS values
npm run dev
```

| Name                       | Description                                        |
| -------------------------- | -------------------------------------------------- |
| `VITE_EMAILJS_PUBLIC_KEY`  | Public Key for [EmailJS](https://www.emailjs.com)  |
| `VITE_EMAILJS_TEMPLATE_ID` | Template ID for [EmailJS](https://www.emailjs.com) |

## Deploy to GitHub Pages

```bash
npm run build
npm run deploy
```

The site respects `prefers-reduced-motion`: the subway intro is skipped and the
city is shown fully lit without the entrance timeline.
