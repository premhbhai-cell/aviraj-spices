import { createFileRoute, Link } from "@tanstack/react-router";
import quality from "@/assets/quality.jpg";
import hero from "@/assets/hero.jpg";
import { company, products } from "@/lib/site";
import { btn, PackagingGrid, PageHero, Reveal, SectionHead, TradeCTA } from "@/components/site/ui";

const title = "Quality — Aviraj Foods and Spices";
const desc = "Our focus on purity, natural ingredients, flavour and aroma. FSSAI, GSTIN and Udyam registration details.";

export const Route = createFileRoute("/quality")({
  head: () => ({ meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }] }),
  component: Quality,
});

function Split({ img, alt, eyebrow, t, children, flip = false }: { img: string; alt: string; eyebrow: string; t: string; children: React.ReactNode; flip?: boolean }) {
  return (
    <div className="container-site grid items-center gap-12 lg:grid-cols-2">
      <Reveal className={flip ? "lg:order-2" : ""}><img src={img} alt={alt} loading="lazy" width={1024} height={1024} className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card" /></Reveal>
      <Reveal><SectionHead center={false} eyebrow={eyebrow} title={t} /><div className="space-y-4 text-muted-foreground leading-relaxed">{children}</div></Reveal>
    </div>
  );
}

function Quality() {
  return (
    <>
      <PageHero crumb="Quality" title="Quality in Every Pinch." sub="Purity, natural ingredients and consistent flavour guide everything we pack." image={quality} />

      <section className="section-y">
        <div className="container-site max-w-3xl text-center">
          <Reveal>
            <SectionHead eyebrow="Our Promise" title="Our Quality Commitment" />
            <p className="text-lg text-muted-foreground">We believe good food starts with honest spices. Our commitment is to offer spices that are pure, aromatic and consistent, so every meal tastes the way it should.</p>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <Split img={quality} alt="Turmeric powder being sifted" eyebrow="Purity" t="Purity and Natural Ingredients">
          <p>Our range is built from natural spices, ground and blended for everyday use.</p>
          <p>We focus on clean, pure powders and traditional blends without unnecessary additions.</p>
        </Split>
      </section>

      <section className="section-y">
        <Split flip img={hero} alt="Assorted Indian spices in brass bowls" eyebrow="Taste" t="Flavour and Aroma">
          <p>The colour of turmeric, the heat of red chilli and the warmth of garam masala — aroma and flavour are why spices matter.</p>
          <p>We aim to bring that same rich, consistent character to every pack.</p>
        </Split>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-site">
          <Reveal><SectionHead eyebrow="Range" title="Packaging and Product Range" sub={`${products.length} spices and masalas, packed in convenient sizes.`} /></Reveal>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {products.map((p) => <span key={p.name} className="rounded-full border border-gold bg-card px-4 py-1.5 text-sm font-medium text-primary">{p.name}</span>)}
          </div>
          <PackagingGrid />
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <Reveal><SectionHead eyebrow="Registrations" title="Company Information" /></Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {[["GSTIN", company.gstin], ["FSSAI License Number", company.fssai], ["Udyam Registration Number", company.udyam]].map(([k, v]) => (
              <Reveal key={k} className="rounded-xl border-2 border-gold bg-card p-6 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-spice">{k}</p>
                <p className="mt-2 break-all font-display text-xl font-semibold text-primary">{v}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center"><Link to="/contact" className={btn.primary}>Make a Business Enquiry</Link></div>
        </div>
      </section>

      <TradeCTA />
    </>
  );
}
