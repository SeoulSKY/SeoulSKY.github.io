import { createEnv } from "@t3-oss/env-nextjs";
// Valibot rather than zod: this runs in the browser too, and Valibot's
// functions tree-shake to the few in use, where zod adds 15 KB or more
import * as v from "valibot";

/** A variable that must be set to something. */
const required = v.pipe(v.string(), v.minLength(1));

/**
 * The site's environment variables, validated and typed. Read them from
 * here, never from `process.env`. The page is prerendered at build time,
 * which evaluates this module, so a missing variable fails `next build`
 * rather than a visitor's first send.
 */
export const env = createEnv({
  client: {
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: required,
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: required,
  },
  // Next inlines a NEXT_PUBLIC_ variable only where it is read by its full
  // name, so each one is spelled out here
  experimental__runtimeEnv: {
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  },
  // .env.example leaves the values blank: count blank as missing
  emptyStringAsUndefined: true,
});
