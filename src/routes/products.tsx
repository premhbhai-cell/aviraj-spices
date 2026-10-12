import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { categoryLabel, products, waLink, type Category } from "@/lib/site";
import { btn, PackagingGrid, PageHero, ProductCard, Reveal, SectionHead, TradeCTA } from "@/components/site/ui";

const title = "Products — Spices & Masalas | Aviraj Foods and Spices";
const desc = "Browse turmeric, coriander, red chilli, cumin and black pepper powders plus chicken, mutton and garam masala from Aviraj.";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }] }),
  component: Products,
});

function Grid({ cat }: { cat: Category }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {products.filter((p) => p.category === cat).map((p) => <ProductCard key={p.name} p={p} />)}
    </div>
  );
}

function Products() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [search, setSearch] = useState("");
  useEffect(() => { setSearch(new URLSearchParams(window.location.search).get("search") || ""); }, []);
  const shown = products.filter((p) => (filter === "all" || p.category === filter) && p.name.toLowerCase().includes(search.trim().toLowerCase()));
  const opts: ("all" | Category)[] = ["all", "ground", "blended"];
  return (
    <>
      <PageHero crumb="Products" title="Our Spices & Masalas" sub="Essential ground spices and traditional blends for everyday Indian cooking." image={hero} />

      <section className="section-y" id="catalogue">
        <div className="container-site">
          <Reveal><SectionHead eyebrow="Browse" title="Product Catalogue" sub="Choose a category or search for a spice to find the product you need." /></Reveal>
          <div className="mx-auto mb-6 max-w-xl"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." aria-label="Search products" className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" /></div>
          <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist">
            {opts.map((o) => (
              <button key={o} role="tab" aria-selected={filter === o} onClick={() => setFilter(o)}
                className={`rounded-full border-2 px-5 py-2 text-sm font-semibold transition ${filter === o ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-gold"}`}>
                {o === "all" ? "All Products" : categoryLabel[o]}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {shown.map((p) => <ProductCard key={p.name} p={p} />)}
          </div>
          {shown.length === 0 && <p className="py-12 text-center text-muted-foreground">No products match “{search}”. Try another search.</p>}
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-site">
          <Reveal><SectionHead eyebrow="Collection" title="Ground Spices" sub="Single-spice powders for daily cooking." /></Reveal>
          <Grid cat="ground" />
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <Reveal><SectionHead eyebrow="Collection" title="Blended Masalas" sub="Traditional blends for rich curries and gravies." /></Reveal>
          <Grid cat="blended" />
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-site">
          <Reveal><SectionHead eyebrow="Pack Sizes" title="Packaging Sizes" /></Reveal>
          <PackagingGrid />
        </div>
      </section>

      <section className="section-y">
        <div className="container-site grid gap-8 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <h2 className="text-2xl font-semibold text-primary">Product Enquiries</h2>
            <p className="mt-3 text-muted-foreground">For product details, pack availability and pricing, message us on WhatsApp or reach our team directly.</p>
            <Link to="/contact" className={`${btn.primary} mt-6`}>Contact Our Team</Link>
          </Reveal>
          <Reveal className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <h2 className="text-2xl font-semibold text-primary">Distribution</h2>
            <p className="mt-3 text-muted-foreground">Retailers, wholesalers, supermarkets and distributors are welcome to enquire about stocking Aviraj.</p>
            <Link to="/business" className={`${btn.outline} mt-6`}>Business & Distribution</Link>
          </Reveal>
        </div>
      </section>

      <TradeCTA title="Order Aviraj Spices on WhatsApp." sub="Tell us the products and pack sizes you need — we'll get back to you." />
      <a href={waLink()} className="sr-only"><MessageCircle />WhatsApp</a>
    </>
  );
}
