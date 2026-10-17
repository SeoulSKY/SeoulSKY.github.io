import emailjs from "@emailjs/browser";
import { ArrowUpRight, LoaderCircle, Send } from "lucide-react";
import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { GithubIcon } from "@/components/icons";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GITHUB_URL } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";

/** N Seoul Tower as line art; it draws itself as the section enters. */
function TowerLineArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 520"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="#ffc3a1"
        strokeWidth="1.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* Namsan */}
        <path
          className="tw-line"
          d="M0,515 C40,470 70,440 100,436 C130,440 160,470 200,515"
        />
        {/* base */}
        <path className="tw-line" d="M76,436 L76,420 L124,420 L124,436" />
        <path className="tw-line" d="M84,420 L84,404 L116,404 L116,420" />
        {/* shaft */}
        <path className="tw-line" d="M92,404 L95,214 M108,404 L105,214" />
        <path className="tw-line" d="M94,330 L106,330 M93.5,270 L106.5,270" />
        {/* collar + pod */}
        <path className="tw-line" d="M86,214 L114,214 L114,204 L86,204 Z" />
        <path
          className="tw-line"
          d="M72,204 C72,176 78,168 100,168 C122,168 128,176 128,204 Z"
        />
        <path className="tw-line" d="M74,186 L126,186 M75,194 L125,194" />
        <path className="tw-line" d="M80,168 L80,158 L120,158 L120,168" />
        {/* antenna */}
        <path className="tw-line" d="M95,158 L96,52 L104,52 L105,158" />
        <path
          className="tw-line"
          d="M95.5,128 L104.5,128 M95.8,104 L104.2,104 M96,80 L104,80"
        />
        <path className="tw-line" d="M100,52 L100,18" />
      </g>
      <circle className="tw-beacon" cx="100" cy="16" r="3.5" fill="#ff8a6b" />
      <circle
        className="tw-halo"
        cx="100"
        cy="16"
        r="14"
        fill="#ff8a6b"
        opacity="0.25"
      />
      <rect
        className="tw-band"
        x="76"
        y="188"
        width="48"
        height="4"
        rx="1"
        fill="#ffd39a"
        opacity="0"
      />
    </svg>
  );
}

const EMPTY = { name: "", email: "", message: "" };

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({
        scrollTrigger: { trigger: q(".ct-art")[0], start: "top 80%" },
      });
      tl.from(q(".tw-line"), {
        drawSVG: "0%",
        duration: 1.6,
        stagger: 0.08,
        ease: "power2.inOut",
      })
        .to(q(".tw-band"), { opacity: 1, duration: 0.6 }, "-=0.4")
        .from(
          q(".tw-beacon, .tw-halo"),
          {
            scale: 0,
            transformOrigin: "50% 50%",
            duration: 0.6,
            ease: "back.out(3)",
          },
          "<",
        );
      gsap.to(q(".tw-halo"), {
        scale: 2.2,
        opacity: 0,
        transformOrigin: "50% 50%",
        duration: 1.8,
        repeat: -1,
        ease: "power1.out",
      });
      gsap.from(q(".ct-form"), {
        y: 80,
        autoAlpha: 0,
        duration: 1.3,
        ease: "rise",
        scrollTrigger: { trigger: q(".ct-form")[0], start: "top 85%" },
      });
    },
    { scope: root },
  );

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (form.name.trim() === "") {
      toast.error("Please enter your name.");
      return;
    }
    if (form.email.trim() === "") {
      toast.error("Please enter your email.");
      return;
    }
    if (form.message.trim() === "") {
      toast.error("Please enter your message.");
      return;
    }

    setLoading(true);

    const promise = emailjs.send(
      "default_service",
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        fromName: form.name,
        fromEmail: form.email,
        message: form.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    );

    toast.promise(promise, {
      loading: "Sending...",
      success: "Thank you. I will get back to you as soon as possible.",
      error: "Ahh, something went wrong. Please try again later.",
    });

    try {
      await promise;
      setForm(EMPTY);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const incomplete =
    form.name.trim() === "" ||
    form.email.trim() === "" ||
    form.message.trim() === "";

  return (
    <section
      ref={root}
      id="contact"
      className="relative overflow-hidden px-5 py-28 sm:px-10 sm:py-40"
    >
      {/* warm glow behind the tower */}
      <div className="-bottom-40 -left-40 pointer-events-none absolute size-[42rem] rounded-full bg-dusk/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-6">
          {/* N Seoul Tower stands in the free space beside the headline,
              its hill level with the bottom of the form; it adds no height */}
          <TowerLineArt className="ct-art -right-2 pointer-events-none absolute bottom-0 hidden h-[460px] w-auto opacity-80 [mask-image:linear-gradient(90deg,transparent,#000_30%,#000_70%,transparent)] xl:block" />
          <SectionHeading
            id="contact"
            index={6}
            title="Let’s build"
            accent="something together."
          >
            <p className="max-w-md text-lg text-mist/65 leading-relaxed">
              Have an idea, a role or a question? Send a message and I’ll get
              back to you as soon as possible.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild variant="outline" size="lg">
                <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                  <GithubIcon />
                  github.com/SeoulSKY
                  <ArrowUpRight />
                </a>
              </Button>
            </div>
          </SectionHeading>
        </div>

        <div className="lg:col-span-6 lg:pt-10">
          <form
            onSubmit={handleSubmit}
            className="ct-form glass relative flex flex-col gap-6 overflow-hidden rounded-[2rem] p-6 sm:p-10"
          >
            <div className="-top-24 -right-24 pointer-events-none absolute size-56 rounded-full bg-peach/10 blur-3xl" />
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2.5">
                <Label htmlFor="ct-name">Your name</Label>
                <Input
                  id="ct-name"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What’s your name?"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <Label htmlFor="ct-email">Your email</Label>
                <Input
                  id="ct-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What’s your email address?"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <Label htmlFor="ct-message">Your message</Label>
              <Textarea
                id="ct-message"
                name="message"
                rows={7}
                value={form.message}
                onChange={handleChange}
                placeholder="What do you want to say?"
                className="min-h-44"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={incomplete || loading}
              className="mt-2 w-full sm:w-auto sm:self-end"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  Send message
                  <Send />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
