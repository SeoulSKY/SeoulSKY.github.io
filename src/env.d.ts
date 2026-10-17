declare namespace NodeJS {
  interface ProcessEnv {
    // optional: unset in a fresh checkout until .env is filled in
    readonly NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?: string;
    readonly NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?: string;
  }
}
