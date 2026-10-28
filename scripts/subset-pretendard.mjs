// Cuts Pretendard down to the Korean the site actually shows.
//
// The Korean marks are a few dozen syllables (서울하늘, the section tags,
// N호선), but the full variable font is 2 MB, and Pretendard's own dynamic
// subset still fetched seven files (~185 KB) on every visit. This writes
// one small woff2 with just the Hangul found in src/, plus the digits and
// punctuation that sit beside it (2호선, 서울하늘 · 포트폴리오), and keeps
// the weight axis. Latin in a Korean label falls back to the next font.
//
// Runs before `dev` and `build`, so a new Korean label is never missing.
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import subsetFont from "subset-font";

const SRC = "src";
const FONT =
  "node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2";
const OUT = "src/fonts/pretendard-subset.woff2";
// Hangul jamo, compatibility jamo and syllables
const HANGUL = /[ᄀ-ᇿ㄰-㆏가-힣]/g;

async function sourceFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => {
      const path = join(dir, e.name);
      if (e.isDirectory()) return sourceFiles(path);
      return /\.(tsx?|css)$/.test(e.name) ? [path] : [];
    }),
  );
  return files.flat();
}

const hangul = new Set();
for (const file of await sourceFiles(SRC)) {
  for (const ch of (await readFile(file, "utf8")).match(HANGUL) ?? []) {
    hangul.add(ch);
  }
}

const text = `${[...hangul].sort().join("")}0123456789 .,·()`;

const font = await subsetFont(await readFile(FONT), text, {
  targetFormat: "woff2",
});
await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, font);
console.log(
  `${OUT}: ${hangul.size} Hangul syllables, ${(font.length / 1024).toFixed(1)} KB`,
);
