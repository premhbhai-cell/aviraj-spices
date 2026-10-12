import { createFileRoute, Link } from "@tanstack/react-router";
import { Store, Truck, Building2, ShoppingCart } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { products, waLink } from "@/lib/site";
import { btn, FeatureCard, PackagingGrid, PageHero, ProductCard, Reveal, SectionHead, TradeCTA } from "@/components/site/ui";

const title = "Business & Distribution — Aviraj Foods and Spices";
const desc = "Distributors, retailers, wholesalers and supermarkets: enquire about stocking Aviraj spices and masalas.";

export const Route = createFileRoute("/business")({
  head: () => ({ meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }] }),
  component: Business,
});

function Business() {
  return (
    <>
      <PageHero crumb="Business & Distribution" title="Partner with Aviraj." sub="We welcome enquiries from distributors, retailers, wholesalers and supermarkets." image={hero} />

      <section className="section-y">
        <div className="container-site">
          <Reveal><SectionHead eyebrow="Opportunities" title="Distribution Opportunities" sub="Bring a focused range of everyday Indian spices to your market." /></Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={<Truck />} title="Distributors" text="Enquire about distributing Aviraj products in your area." />
            <FeatureCard icon={<Building2 />} title="Wholesalers" text="Talk to us about bulk requirements across our range." />
            <FeatureCard icon={<Store />} title="Retailers" text="Stock essential spices your customers buy every week." />
            <FeatureCard icon={<ShoppingCart />} title="Supermarkets" text="Add a clean, well-presented spice range to your shelves." />
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHead center={false} eyebrow="Trade Enquiries" title="Retailer and Wholesaler Enquiries" />
            <p className="text-muted-foreground leading-relaxed">Share your business name, location and the products you are interested in. Our team will respond with the details you need. Terms are discussed directly for each enquiry.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={waLink("Hello Aviraj Foods and Spices, I am a retailer/wholesaler and would like to discuss stocking your products.")} target="_blank" rel="noreferrer" className={btn.spice}>Enquire on WhatsApp</a>
              <Link to="/contact" className={btn.outline}>Send an Enquiry</Link>
            </div>
          </Reveal>
          <Reveal className="rounded-2xl bg-primary p-8 text-primary-foreground shadow-card">
            <h3 className="text-2xl text-gold">What to include</h3>
            <ul className="mt-4 space-y-3 opacity-90">
              <li>• Business name and type</li><li>• City / district</li><li>• Products and pack sizes of interest</li><li>• Your contact number</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <Reveal><SectionHead eyebrow="Range" title="Product Range Overview" /></Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{products.map((p) => <ProductCard key={p.name} p={p} />)}</div>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-site">
          <Reveal><SectionHead eyebrow="Pack Sizes" title="Packaging Options" /></Reveal>
          <PackagingGrid />
        </div>
      </section>

      <TradeCTA />
    </>
  );
}
