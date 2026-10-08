"use client";

import { FormEvent, useState } from "react";
import SectionHeading from "../shared/section-heading";
import { AdminProfile } from "@/lib/admin/types";
import { Service } from "@/constant/services";
import { createClient } from "@/lib/supabase/browser";
import { FaEnvelope, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";

const Contact = ({ profile, services }: { profile: AdminProfile; services: Service[] }) => {
  const infos = { email: profile.email, whatsapp: profile.whatsapp, linkedin: profile.linkedin };
  const [submitted, setSubmitted] = useState(false);
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(infos.email)}`;
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const service = String(data.get("service") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(`Portfolio Inquiry${service ? ` — ${service}` : ""}`);
    const body = encodeURIComponent([
      `Name: ${name || "Not provided"}`,
      `Email: ${email || "Not provided"}`,
      `Service: ${service || "Not specified"}`,
      "",
      message || "No message provided.",
    ].join("\n"));

    try {
      const { error } = await createClient().from("contact_messages").insert({ name, email, service, message });
      if (error) throw error;
      form.reset();
      setSubmitted(true);
      return;
    } catch {
      // Fall back to the native mail flow if the database is not configured yet.
    }

    // Keep the native mail app flow on phones; use Gmail compose on desktop browsers.
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    const mailto = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    if (isMobile) {
      window.location.href = mailto;
      return;
    }
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(infos.email)}&su=${subject}&body=${body}`, "_blank", "noopener,noreferrer");
  };

  return <section id="contact" className="section-divider py-20"><div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]"><div><SectionHeading eyebrow="Get In Touch" title={<>Let's Work <span className="gradient-text">Together</span></>} description="Have a project in mind or want to discuss your digital marketing goals? Tell me what you are trying to achieve."/><div className="mt-8 grid gap-3"><a href={gmailHref} target="_blank" rel="noreferrer" className="soft-card"><FaEnvelope className="text-accent"/><span><small className="label">Email</small><b>{profile.email}</b></span></a><a href={`https://wa.me/${profile.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="soft-card"><FaWhatsapp className="text-emerald-400"/><span><small className="label">WhatsApp</small><b>{profile.whatsapp}</b></span></a><a href={profile.linkedin} target="_blank" rel="noreferrer" className="soft-card"><FaLinkedinIn className="text-accent"/><span><small className="label">LinkedIn</small><b>linkedin.com/in/ridoysolutions</b></span></a></div></div><form onSubmit={handleSubmit} className="rounded-2xl border border-accent/30 bg-[#061224]/65 p-5 shadow-[0_0_60px_rgba(0,132,255,.06)]"><div className="grid gap-3 sm:grid-cols-2"><label><span className="field-label">Your Name</span><input required className="field" name="name" placeholder="John Doe"/></label><label><span className="field-label">Email Address</span><input required className="field" type="email" name="email" placeholder="you@example.com"/></label></div><label className="mt-3 block"><span className="field-label">Service</span><select required className="field" name="service" defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.title}>{service.title}</option>)}<option>Other</option></select></label><label className="mt-3 block"><span className="field-label">Message</span><textarea required className="field min-h-28 resize-none" name="message" placeholder="Tell me about your project..."/></label><button type="submit" className="mt-4 w-full rounded-xl bg-gradient-to-r from-accent to-[#7b4dff] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,132,255,.18)] transition hover:-translate-y-0.5">Send Message →</button>{submitted ? <p className="mt-2 text-center text-xs text-emerald-300">Thanks! Your message was sent successfully.</p> : <p className="mt-2 text-center text-[8px] text-slate-600">Your inquiry is saved to the portfolio inbox.</p>}</form></div></section>;
};
export default Contact;
