import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from "react-email";
import { emailTheme } from "@/emails/theme";

/** A small mono caption over a value, as on the site. */
const EYEBROW =
  "m-0 font-mono text-2xs text-muted-foreground uppercase leading-4 tracking-eyebrow";

export interface ContactMessageProps {
  name: string;
  email: string;
  message: string;
}

/** The contact form's message, as it arrives in my inbox. */
export default function ContactMessage({
  name,
  email,
  message,
}: ContactMessageProps) {
  return (
    // px rather than rem: some mail clients size rem unpredictably
    <Tailwind config={pixelBasedPreset} theme={emailTheme}>
      <Html lang="en">
        <Head>
          {/* the page is night by design; ask clients not to invert it */}
          <meta name="color-scheme" content="dark" />
          <meta name="supported-color-schemes" content="dark" />
        </Head>
        <Preview>{message.slice(0, 140)}</Preview>
        <Body className="m-0 bg-night-950 px-4 py-10 font-sans text-mist">
          <Container className="max-w-[560px]">
            <Section className="pb-6">
              {/* Contact rides Line 6 */}
              <span className="inline-block rounded-full bg-line-6 px-3 py-1 font-bold font-kr text-white text-xs tracking-[0.05em]">
                6호선
              </span>
              <span className={`${EYEBROW} pl-3`}>Contact · 연락</span>
            </Section>

            <Heading
              as="h1"
              className="m-0 mb-2 font-bold font-display text-[40px] text-mist leading-none tracking-[-0.03em]"
            >
              New{" "}
              <span className="font-normal font-serif text-peach italic tracking-normal">
                message
              </span>
            </Heading>
            <Text className="m-0 mb-7 text-body text-muted-foreground">
              Someone wrote to you through www.seoulsky.dev.
            </Text>

            {/* the site's .glass card */}
            <Section className="rounded-3xl border border-border border-solid bg-[linear-gradient(180deg,var(--color-night-700),var(--color-night-800))] bg-night-800 p-6">
              <Text className={EYEBROW}>From</Text>
              <Text className="m-0 mt-1.5 font-semibold text-lg text-mist">
                {name}
              </Text>
              <Link
                href={`mailto:${email}`}
                className="text-body text-peach leading-[22px]"
              >
                {email}
              </Link>

              {/* the colour goes on the top border, which Hr draws */}
              <Hr className="my-5 border-t-border" />

              <Text className={EYEBROW}>Message</Text>
              {/* pre-wrap keeps the line breaks the sender typed */}
              <Text className="m-0 mt-2 whitespace-pre-wrap text-body text-mist/85 leading-[26px]">
                {message}
              </Text>
            </Section>

            <Text className="m-0 mt-6 text-board text-muted-foreground leading-5">
              Reply to this email to answer {name} directly.
            </Text>
            <Hr className="mt-6 mb-4 border-t-twilight" />
            <Text className={`${EYEBROW} text-3xs tracking-caption`}>
              <span className="font-kr tracking-[0.1em]">서울하늘</span> ·
              SeoulSKY · 37.5665°N 126.9780°E
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

ContactMessage.PreviewProps = {
  name: "Jiwoo Park",
  email: "jiwoo@example.com",
  message:
    "Hi! I came across your portfolio and loved the website.\n\nWe are hiring a software engineer. Would you be open to a chat next week?",
} satisfies ContactMessageProps;
