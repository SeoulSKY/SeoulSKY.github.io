"use server";

import { Resend } from "resend";
import * as v from "valibot";
import ContactMessage from "@/emails/contact-message";
import { env } from "@/env";

/**
 * The contact form's fields. The form checks them too, but anyone can post
 * to an action without it, so they are checked again here.
 */
const ContactFields = v.object({
  // one line, since it goes into the subject
  name: v.pipe(
    v.string(),
    v.transform((name) => name.replace(/\s+/g, " ").trim()),
    v.minLength(1),
    v.maxLength(100),
  ),
  email: v.pipe(v.string(), v.trim(), v.email(), v.maxLength(254)),
  message: v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(5000)),
});

/** Whether a message reached Resend. */
export type SendResult = "sent" | "failed";

/** Emails the contact form's message to me, with the sender as reply-to. */
export async function sendMessage(data: FormData): Promise<SendResult> {
  const fields = v.safeParse(ContactFields, Object.fromEntries(data));
  if (!fields.success) return "failed";
  const { name, email, message } = fields.output;

  const resend = new Resend(env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: `SeoulSKY contact form <noreply@${env.RESEND_EMAIL_DOMAIN}>`,
    to: `contact@${env.RESEND_EMAIL_DOMAIN}`,
    replyTo: email,
    subject: `New message from ${name}`,
    react: ContactMessage({ name, email, message }),
    text: `${message}\n\nFrom ${name} <${email}>`,
  });
  if (error) {
    console.error(error);
    return "failed";
  }
  return "sent";
}
