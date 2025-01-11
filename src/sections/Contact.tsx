/* global console */

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

import Earth from "../components/canvas/Earth";
import Section from "../components/Section";
import { pressableMotion, slideIn, staggerContainer } from "../utils/motion";

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange<T extends HTMLInputElement | HTMLTextAreaElement>(
    e: ChangeEvent<T>,
  ) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (form.name.trim() === "") {
      toast.error("Please enter your name.");
      return;
    } else if (form.email.trim() === "") {
      toast.error("Please enter your email.");
      return;
    } else if (form.message.trim() === "") {
      toast.error("Please enter your message.");
      return;
    }

    setLoading(true);

    try {
      await toast.promise(
        emailjs.send(
          "default_service",
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            fromName: form.name,
            fromEmail: form.email,
            message: form.message,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        ),
        {
          pending: "Sending...",
          success: "Thank you. I will get back to you as soon as possible.",
          error: "Ahh, something went wrong. Please try again later.",
        },
      );

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id={"contact"} title={"Contact"} subTitle={"Get in touch"}>
      <motion.div
        {...staggerContainer()}
        className={
          "flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row"
        }
      >
        <motion.div
          {...slideIn("left", "tween", 1, undefined, true)}
          className="flex-[0.75] rounded-2xl bg-sky-500/50 p-8"
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col gap-8"
          >
            <label className="flex flex-col">
              <span className="mb-4 font-medium text-white">Your Name</span>
              <motion.input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                className="rounded-lg border-none bg-blue-950 px-6 py-4 font-medium text-white outline-none placeholder:text-secondary"
                {...pressableMotion(0.03)}
              />
            </label>
            <label className="flex flex-col">
              <span className="mb-4 font-medium text-white">Your Email</span>
              <motion.input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email address?"
                className="rounded-lg border-none bg-blue-950 px-6 py-4 font-medium text-white outline-none placeholder:text-secondary"
                {...pressableMotion(0.03)}
              />
            </label>
            <label className="flex flex-col">
              <span className="mb-4 font-medium text-white">Your Message</span>
              <motion.textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What do you want to say?"
                className="rounded-lg border-none bg-blue-950 px-6 py-4 font-medium text-white outline-none placeholder:text-secondary"
                {...pressableMotion(0.03)}
              />
            </label>

            <motion.button
              type="submit"
              className="w-fit rounded-xl bg-blue-950 px-8 py-3 font-bold text-white shadow-primary outline-none disabled:opacity-30"
              disabled={loading}
              {...pressableMotion(loading ? 0 : undefined)}
            >
              {loading ? "Sending..." : "Send"}
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          {...slideIn("right", "tween", 1, undefined, true)}
          className="h-[350px] md:h-[550px] xl:h-auto xl:flex-1"
        >
          <Earth />
        </motion.div>
      </motion.div>
    </Section>
  );
}
