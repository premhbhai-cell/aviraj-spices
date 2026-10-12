import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, MapPin, MessageCircle, Phone, User } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { company, waLink } from "@/lib/site";
import { btn, PageHero, Reveal, SectionHead, TradeCTA } from "@/components/site/ui";

const title = "Contact Us — Aviraj Foods and Spices";
const desc = "Call, email or WhatsApp Aviraj Foods and Spices, Ward No. 14, Dandai, Garhwa, Jharkhand. +91 89876 91732.";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }] }),
  component: Contact,
});

const field = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none";

function Contact() {
  const [errors, setErrors] = useState<{ name?: string; phone?: string; message?: string }>({});
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Partial<Record<"name" | "phone" | "business" | "type" | "message", string>>;
    const err: { name?: string; phone?: string; message?: string } = {};
    if (!d.name?.trim()) err.name = "Please enter your name";
    if (!/^[+\d\s-]{8,15}$/.test(d.phone ?? "")) err.phone = "Please enter a valid phone number";
    if (!d.message?.trim()) err.message = "Please enter your message";
    setErrors(err);
    if (Object.keys(err).length) return;
    const text = `Hello Aviraj Foods and Spices,\nName: ${d.name}\nPhone: ${d.phone}${d.business ? `\nBusiness: ${d.business}` : ""}${d.type ? `\nEnquiry type: ${d.type}` : ""}\nMessage: ${d.message}`;
    window.open(waLink(text), "_blank", "noopener");
  };
  const info = [
    { icon: <User />, k: "Proprietor", v: company.proprietor },
    { icon: <Phone />, k: "Phone", v: company.phone, href: company.phoneHref },
    { icon: <Mail />, k: "Email", v: company.email, href: `mailto:${company.email}` },
    { icon: <MapPin />, k: "Address", v: company.address },
  ];
  return (
    <>
      <PageHero crumb="Contact Us" title="Let's Talk Spices." sub="Reach our team for product, trade or distribution enquiries." image={hero} />

      <section className="section-y">
        <div className="container-site">
          <Reveal><SectionHead eyebrow="Get in Touch" title="Company Contact Information" /></Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {info.map((i) => (
              <Reveal key={i.k} className="rounded-xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-gold hover:shadow-gold">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-secondary text-primary ring-2 ring-gold">{i.icon}</div>
                <p className="text-xs font-bold uppercase tracking-widest text-spice">{i.k}</p>
                {i.href ? <a href={i.href} className="mt-1 block break-all font-semibold text-primary hover:text-spice">{i.v}</a> : <p className="mt-1 font-semibold text-primary">{i.v}</p>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-site grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2 flex flex-col justify-center rounded-2xl bg-primary p-8 text-primary-foreground shadow-card">
            <MessageCircle className="h-10 w-10 text-gold" />
            <h2 className="mt-4 text-3xl">Chat on WhatsApp</h2>
            <p className="mt-3 opacity-85">The quickest way to reach us. Message {company.phone} for any enquiry.</p>
            <a href={waLink()} target="_blank" rel="noreferrer" className={`${btn.gold} mt-6 self-start`}>Open WhatsApp</a>
          </Reveal>
          <Reveal className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card">
            <h2 className="text-2xl font-semibold text-primary">Business Enquiry Form</h2>
            <p className="mt-1 text-sm text-muted-foreground">Submitting opens WhatsApp with your message ready to send.</p>
            <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-4 sm:grid-cols-2">
              <div><label className="mb-1 block text-sm font-semibold" htmlFor="name">Name *</label><input id="name" name="name" className={field} maxLength={80} />{errors.name && <p className="mt-1 text-xs text-spice">{errors.name}</p>}</div>
              <div><label className="mb-1 block text-sm font-semibold" htmlFor="phone">Phone *</label><input id="phone" name="phone" type="tel" className={field} maxLength={15} />{errors.phone && <p className="mt-1 text-xs text-spice">{errors.phone}</p>}</div>
              <div><label className="mb-1 block text-sm font-semibold" htmlFor="business">Business name</label><input id="business" name="business" className={field} maxLength={100} /></div>
              <div><label className="mb-1 block text-sm font-semibold" htmlFor="type">Enquiry type</label>
                <select id="type" name="type" className={field}><option value="">Select</option><option>Product enquiry</option><option>Retailer</option><option>Wholesaler</option><option>Distributor</option><option>Supermarket</option></select></div>
              <div className="sm:col-span-2"><label className="mb-1 block text-sm font-semibold" htmlFor="message">Message *</label><textarea id="message" name="message" rows={4} className={field} maxLength={1000} />{errors.message && <p className="mt-1 text-xs text-spice">{errors.message}</p>}</div>
              <button type="submit" className={`${btn.spice} sm:col-span-2`}><MessageCircle className="h-4 w-4" /> Send via WhatsApp</button>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <Reveal><SectionHead eyebrow="Visit" title="Our Location" sub={company.address} /></Reveal>
          <Reveal className="overflow-hidden rounded-2xl border-2 border-gold shadow-card">
            <iframe title="Map of Dandai, Garhwa, Jharkhand" src="https://www.google.com/maps?q=Dandai,+Garhwa,+Jharkhand&output=embed" className="h-[380px] w-full" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <TradeCTA />
    </>
  );
}
