declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: string;
    readonly NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: string;
  }
}
