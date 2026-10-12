import { createFileRoute } from "@tanstack/react-router";
import { Eye, Target, HeartHandshake, Scale, Users, Sparkles, Leaf, Package, ShieldCheck } from "lucide-react";
import hero from "@/assets/hero.jpg";
import quality from "@/assets/quality.jpg";
import { company } from "@/lib/site";
import { FeatureCard, PageHero, Reveal, SectionHead, TradeCTA } from "@/components/site/ui";

const title = "About Us — Aviraj Foods and Spices";
const desc = "Established in 2025 in Garhwa, Jharkhand by Mrs. Arti Kumari, Aviraj Foods and Spices brings authentic Indian spices to everyday kitchens.";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }] }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero crumb="About Us" title="Rooted in Flavour, Built on Trust." sub="The story behind Aviraj Foods and Spices." image={hero} />

      <section className="section-y">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHead center={false} eyebrow="Who We Are" title="About Our Company" />
            <p className="text-muted-foreground leading-relaxed">{company.name} was established in {company.established} in Dandai, District Garhwa, Jharkhand, under the leadership of proprietor {company.proprietor}.</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">We offer essential Indian ground spices and traditional masala blends for everyday cooking, with a focus on purity, aroma and authentic taste.</p>
            <dl className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5"><dt className="text-xs uppercase tracking-widest text-muted-foreground">Established</dt><dd className="font-display text-3xl text-primary">{company.established}</dd></div>
              <div className="rounded-xl border border-border bg-card p-5"><dt className="text-xs uppercase tracking-widest text-muted-foreground">Proprietor</dt><dd className="font-display text-xl text-primary">{company.proprietor}</dd></div>
            </dl>
          </Reveal>
          <Reveal><img src={quality} alt="Freshly sifted turmeric powder" loading="lazy" width={1024} height={1024} className="aspect-square w-full rounded-2xl object-cover shadow-card" /></Reveal>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-site">
          <Reveal><SectionHead eyebrow="Purpose" title="Our Vision and Mission" /></Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            <FeatureCard icon={<Eye />} title="Our Vision" text="To become a trusted name in Indian kitchens for pure, flavourful spices." />
            <FeatureCard icon={<Target />} title="Our Mission" text="To provide authentic spices and masalas in convenient packs, and to build lasting relationships with customers and trade partners." />
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <Reveal><SectionHead eyebrow="What We Stand For" title="Our Business Values" /></Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={<HeartHandshake />} title="Honesty" text="Clear, truthful communication with every customer and partner." />
            <FeatureCard icon={<Scale />} title="Consistency" text="Working to deliver the same flavour and aroma in every pack." />
            <FeatureCard icon={<Users />} title="Partnership" text="Growing together with retailers, wholesalers and distributors." />
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-site">
          <Reveal><SectionHead eyebrow="Our Strengths" title="Why Choose Aviraj Foods and Spices" /></Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={<Sparkles />} title="Authentic Flavours" text="Traditional Indian taste in every spice." />
            <FeatureCard icon={<Leaf />} title="Everyday Essentials" text="A focused range of spices kitchens use daily." />
            <FeatureCard icon={<Package />} title="Convenient Packs" text="Sizes from 50 g to 500 g." />
            <FeatureCard icon={<ShieldCheck />} title="Registered Business" text="GST, FSSAI and Udyam registered." />
          </div>
        </div>
      </section>

      <TradeCTA title="Partner with Aviraj Foods and Spices." />
    </>
  );
}
