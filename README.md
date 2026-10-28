<div align="center">
  <h1>SeoulSKY</h1>
  <p>Personal portfolio: Seoul at dusk, travelled by subway.</p>
</div>

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) with [shadcn/ui](https://ui.shadcn.com) components (`src/components/ui`)
- [GSAP](https://gsap.com) for animation (ScrollTrigger, ScrollSmoother, SplitText, DrawSVG, ScrambleText, Text)
- [Resend](https://resend.com) with [React Email](https://react.email) for the contact form, sent from a server action

## Structure

```
src/
  app/layout.tsx         # <html>, metadata, fonts, global CSS
  app/page.tsx           # the page: preloader, nav, sections, footer
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
public/                  # logo, project media, skill logos
```

All copy lives in `src/data/content.ts`.

Each section rides a Seoul Metro line in its official colour (About 1호선,
Experience 2호선, Skills 3호선, Projects 4호선, Awards 5호선, Contact 6호선),
and new sections take Lines 7–9. The full design system (colours, type,
motion, illustration rules) is in [`CLAUDE.md`](CLAUDE.md).

## Development

```bash
npm install
cp .env.example .env   # fill in the Resend values
npm run dev
```

| Name                  | Description                                                                   |
| --------------------- | ----------------------------------------------------------------------------- |
| `RESEND_API_KEY`      | API key for [Resend](https://resend.com)                                      |
| `RESEND_EMAIL_DOMAIN` | Domain verified in Resend; messages go from `noreply@` to `contact@` on it    |

Both are required. They are declared and validated in `src/env.ts` with
[`@t3-oss/env-nextjs`](https://env.t3.gg), so `npm run build` stops with
the name of any variable that is missing or blank. `npm run email` opens
a preview of the email the contact form sends.

## Deploy

The site is hosted on [Vercel](https://vercel.com), which builds and deploys
every push with its Next.js defaults; no `vercel.json` is needed. Set the two
Resend variables above in the Vercel project's environment variables, and
add `www.seoulsky.dev` under its domains.

To check a production build locally:

```bash
npm run build
npm start
```

The site respects `prefers-reduced-motion`: the subway intro is skipped and the
city is shown fully lit without the entrance timeline.
