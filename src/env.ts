import { createEnv } from "@t3-oss/env-nextjs";
// Valibot rather than zod: a NEXT_PUBLIC_ variable would bring this module
// into the browser, where Valibot's functions tree-shake to the few in use
// and zod adds 15 KB or more
import * as v from "valibot";

/** A variable that must be set to something. */
const required = v.pipe(v.string(), v.minLength(1));

/**
 * The site's environment variables, validated and typed. Read them from
 * here, never from `process.env`. `next.config.ts` imports this module, so
 * a missing variable fails `next build` rather than a visitor's first send.
 */
export const env = createEnv({
  server: {
    RESEND_API_KEY: required,
    // the domain verified in Resend; the contact form sends from it, and
    // to the contact address on it
    RESEND_EMAIL_DOMAIN: required,
  },
  client: {},
  // Next inlines a NEXT_PUBLIC_ variable only where it is read by its full
  // name, so each one would be spelled out here
  experimental__runtimeEnv: {},
  // .env.example leaves the values blank: count blank as missing
  emptyStringAsUndefined: true,
});
