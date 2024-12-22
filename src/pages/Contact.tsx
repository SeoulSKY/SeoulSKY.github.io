/* global console */

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { sectionSubText, sectionHeadText } from "../styles";
import Earth from "../components/canvas/Earth";
import SectionWrapper from "../components/SectionWrapper";
import { pressableMotion, slideIn } from "../utils/motion";

function Contact() {
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
    <div
      className={
        "flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row"
      }
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] rounded-2xl bg-sky-500/50 p-8"
      >
        <p className={sectionSubText}>Get in touch</p>
        <h3 className={sectionHeadText}>Contact</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">Your Name</span>
            <motion.input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="rounded-lg border-none bg-blue-950 px-6 py-4 font-medium text-white outline-none
              placeholder:text-secondary"
              {...pressableMotion(0.03)}
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">Your email</span>
            <motion.input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className="rounded-lg border-none bg-blue-950 px-6 py-4 font-medium text-white outline-none
              placeholder:text-secondary"
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
              className="rounded-lg border-none bg-blue-950 px-6 py-4 font-medium text-white outline-none
              placeholder:text-secondary"
              {...pressableMotion(0.03)}
            />
          </label>

          <motion.button
            type="submit"
            className="w-fit rounded-xl bg-blue-950 px-8 py-3 font-bold text-white shadow-primary outline-none"
            disabled={loading}
            {...pressableMotion()}
          >
            {loading ? "Sending..." : "Send"}
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="h-[350px] md:h-[550px] xl:h-auto xl:flex-1"
      >
        <Earth />
      </motion.div>
    </div>
  );
}

export default SectionWrapper(Contact);
