import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Minus, Plus, MessageCircle, PackageCheck, ShieldCheck, Truck, RotateCcw, Leaf, CookingPot, Info, ShoppingBag, ChevronRight } from "lucide-react";
import { products, categoryLabel, packSizes, productSlug, waLink } from "@/lib/site";
import { addToCart } from "@/lib/cart";
import { btn, ProductCard, SectionHead } from "@/components/site/ui";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    const product = products.find(p => productSlug(p.name) === params.slug);
    return { meta: [{ title: product ? `${product.name} | Aviraj Foods and Spices` : "Product | Aviraj Foods and Spices" }, { name: "description", content: product?.description ?? "Explore Aviraj Foods and Spices products." }] };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const product = products.find(p => productSlug(p.name) === slug);
  const [pack, setPack] = useState("100 g");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [pin, setPin] = useState("");
  const [pinMessage, setPinMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"details" | "usage" | "storage">("details");

  if (!product) return <section className="container-site section-y text-center"><h1 className="h-section text-primary">Product not found</h1><Link to="/products" className={`${btn.primary} mt-6`}>Browse all products</Link></section>;

  const handleAddToCart = () => {
    addToCart({ name: product.name, size: pack, qty });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };
  const buyNow = () => {
    addToCart({ name: product.name, size: pack, qty });
    void navigate({ to: "/checkout" });
  };
  const related = products.filter(p => p.name !== product.name && p.category === product.category);
  const otherProducts = products.filter(p => p.name !== product.name);
  const askAboutPin = () => {
    if (!/^\d{6}$/.test(pin)) { setPinMessage("Enter a valid 6-digit PIN code, then contact us to confirm delivery availability."); return; }
    setPinMessage(`PIN ${pin}: delivery availability is not checked automatically yet. Please confirm with our team on WhatsApp.`);
  };

  return <>
    <div className="container-site pt-5 sm:pt-7">
      <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link to="/" className="transition hover:text-primary">Home</Link><ChevronRight size={13}/><Link to="/products" className="transition hover:text-primary">All Products</Link><ChevronRight size={13}/><Link to="/products" className="transition hover:text-primary">{categoryLabel[product.category]}</Link><ChevronRight size={13}/><span className="font-semibold text-foreground">{product.name}</span>
      </nav>
    </div>

    {/* Main product detail area: gallery + purchase panel */}
    <section className="container-site product-page-grid grid gap-7 py-6 sm:py-9 lg:grid-cols-[1.03fr_.97fr] lg:gap-10 xl:gap-14">
      <div className="min-w-0">
        <div className="product-gallery-main group relative">
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.16em] text-primary shadow-sm">Aviraj Foods & Spices</span>
          <img src={product.image} alt={`${product.name} product packaging`} width={900} height={900} fetchPriority="high" />
          <div className="absolute bottom-4 right-4 rounded-lg bg-white/90 px-3 py-2 text-[11px] font-semibold text-foreground shadow-sm">Product image</div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="product-gallery-thumb product-gallery-thumb-active"><img src={product.image} alt={`${product.name} thumbnail`} loading="lazy" /></div>
          <p className="text-xs leading-5 text-muted-foreground">Official product image. Additional pack photographs can be added when available.</p>
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-card p-4 sm:p-5">
          <h2 className="text-base font-extrabold text-foreground">Product highlights</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="product-highlight"><ShieldCheck/><span>Quality-focused approach</span></div>
            <div className="product-highlight"><CookingPot/><span>Made for everyday recipes</span></div>
            <div className="product-highlight"><PackageCheck/><span>Multiple pack sizes</span></div>
          </div>
        </div>
      </div>

      <div className="product-buy-panel min-w-0">
        <Link to="/products" className="mb-4 inline-flex items-center gap-2 text-xs font-bold text-primary transition hover:-translate-x-1"><ArrowLeft size={15}/> Back to all products</Link>
        <p className="eyebrow">{categoryLabel[product.category]}</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl xl:text-[2.7rem]">{product.name}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">{product.description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-primary"><Leaf size={14}/> Spice essential</span>
          <span className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground">{product.category === "ground" ? "Ground spice" : "Blended masala"}</span>
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-card p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-extrabold text-foreground">Select pack size</p><p className="mt-1 text-xs text-muted-foreground">Choose your preferred pack before adding to cart.</p></div><span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary">{pack} selected</span></div>
          <div className="mt-4 grid grid-cols-4 gap-2">{packSizes.map(size=><button key={size} type="button" onClick={()=>setPack(size)} aria-pressed={pack===size} className={`pack-choice !px-1.5 sm:!px-3 ${pack===size ? "pack-choice-active" : ""}`}>{size}</button>)}</div>
          <p className="mt-3 text-[11px] leading-5 text-muted-foreground">Pack availability and price may vary by product. Our team will confirm the final price before order dispatch.</p>
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4"><div><p className="text-sm font-bold text-foreground">Quantity</p><p className="mt-0.5 text-xs text-muted-foreground">Choose how many packs</p></div><div className="quantity-control"><button type="button" aria-label="Decrease quantity" onClick={()=>setQty(q=>Math.max(1,q-1))}><Minus size={16}/></button><span>{qty}</span><button type="button" aria-label="Increase quantity" onClick={()=>setQty(q=>Math.min(99,q+1))}><Plus size={16}/></button></div></div>
          <button type="button" onClick={handleAddToCart} className={`${btn.primary} mt-5 w-full !rounded-xl !py-3.5`}>{added ? <><Check size={18}/> Added to cart</> : <><ShoppingBag size={18}/> Add to cart</>}</button>
          <button type="button" onClick={buyNow} className={`${btn.spice} mt-3 w-full !rounded-xl !py-3.5`}>Buy Now <ArrowRight size={17}/></button>
          <a href={waLink(`Hello Aviraj Foods and Spices, I would like to order ${product.name}, pack size ${pack}, quantity ${qty}. Please confirm price and availability.`)} target="_blank" rel="noreferrer" className={`${btn.outline} mt-3 w-full !rounded-xl !py-3.5`}><MessageCircle size={17}/> Ask price on WhatsApp</a>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-card p-4">
          <h2 className="font-extrabold text-foreground">Delivery availability</h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">Enter your PIN code to prepare a delivery enquiry. Actual serviceability must be confirmed by our team.</p>
          <form onSubmit={e=>{e.preventDefault();askAboutPin();}} className="mt-3 flex gap-2"><input inputMode="numeric" maxLength={6} value={pin} onChange={e=>{setPin(e.target.value.replace(/\D/g, "").slice(0,6));setPinMessage("");}} placeholder="6-digit PIN code" aria-label="Delivery PIN code" className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"/><button className="rounded-lg bg-secondary px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-white" type="submit">Check</button></form>
          {pinMessage && <p role="status" className="mt-2 text-xs leading-5 text-muted-foreground">{pinMessage} {/^\d{6}$/.test(pin) && <a className="font-bold text-primary underline" href={waLink(`Please confirm delivery availability for PIN ${pin} for ${product.name}.`)} target="_blank" rel="noreferrer">Ask on WhatsApp</a>}</p>}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"><div className="delivery-note"><Truck/><div><strong>Delivery details</strong><span>Confirmed by the team before dispatch.</span></div></div><div className="delivery-note"><RotateCcw/><div><strong>Order support</strong><span>Contact us if you need help with your order.</span></div></div></div>
      </div>
    </section>

    {/* Detailed content area inspired by large online-store product pages */}
    <section className="section-y section-tint">
      <div className="container-site">
        <div className="max-w-3xl"><p className="eyebrow">Product information</p><h2 className="h-section mt-2 text-primary">About {product.name}</h2><p className="mt-4 leading-7 text-muted-foreground">{product.description} Aviraj Foods and Spices offers everyday spice powders and traditional masalas for home cooking. Please check the pack label for product-specific ingredients, net weight, batch details, dates and applicable declarations.</p></div>
        <div className="mt-7 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6"><h3 className="text-lg font-extrabold text-foreground">At a glance</h3><dl className="mt-4 divide-y divide-border text-sm"><div className="flex justify-between gap-4 py-3"><dt className="text-muted-foreground">Brand</dt><dd className="text-right font-bold">Aviraj Foods and Spices</dd></div><div className="flex justify-between gap-4 py-3"><dt className="text-muted-foreground">Product</dt><dd className="text-right font-bold">{product.name}</dd></div><div className="flex justify-between gap-4 py-3"><dt className="text-muted-foreground">Type</dt><dd className="text-right font-bold">{categoryLabel[product.category]}</dd></div><div className="flex justify-between gap-4 py-3"><dt className="text-muted-foreground">Available pack options</dt><dd className="text-right font-bold">50 g, 100 g, 200 g, 500 g*</dd></div></dl><p className="mt-2 text-[11px] leading-5 text-muted-foreground">*Pack availability may vary by product and order requirements.</p></div>
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6"><div className="flex flex-wrap gap-2 border-b border-border pb-3">{([{id:"details",label:"Product details"},{id:"usage",label:"How to use"},{id:"storage",label:"Storage"}] as const).map(t=><button type="button" key={t.id} onClick={()=>setActiveTab(t.id)} className={`rounded-full px-4 py-2 text-xs font-bold transition ${activeTab===t.id ? "bg-primary text-white" : "bg-secondary text-foreground hover:bg-secondary/70"}`}>{t.label}</button>)}</div>
            {activeTab === "details" && <div className="pt-4"><h3 className="font-extrabold text-foreground">Product details</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{product.description} For exact ingredients, allergen information, net quantity, manufacturing details and best-before information, refer to the product packaging.</p></div>}
            {activeTab === "usage" && <div className="pt-4"><h3 className="font-extrabold text-foreground">Cooking uses</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{product.cookingUses} Adjust the quantity to suit your recipe and taste.</p></div>}
            {activeTab === "storage" && <div className="pt-4"><h3 className="font-extrabold text-foreground">Storage instructions</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Store according to the instructions on the product pack. As a general precaution, keep spices sealed and away from moisture, direct sunlight and strong odours.</p></div>}
          </div>
        </div>
      </div>
    </section>

    <section className="section-y"><div className="container-site"><SectionHead eyebrow="Cook with confidence" title={`Ways to use ${product.name}`} sub="Everyday inspiration for familiar home-cooked meals."/><div className="grid gap-4 sm:grid-cols-3"><div className="usage-card"><span>01</span><CookingPot/><h3>Everyday meals</h3><p>{product.cookingUses}</p></div><div className="usage-card"><span>02</span><Leaf/><h3>Build your flavour</h3><p>Use the spice as part of your own recipe and adjust the amount to match your family's taste.</p></div><div className="usage-card"><span>03</span><Info/><h3>Check the label</h3><p>Always refer to the package for exact ingredients, product declarations and storage guidance.</p></div></div></div></section>

    {related.length > 0 && <section className="section-y section-tint"><div className="container-site"><div className="flex items-end justify-between gap-4"><SectionHead eyebrow="Similar products" title="More in this category" sub="Explore other Aviraj products in the same collection."/><Link to="/products" className="hidden shrink-0 items-center gap-1 text-sm font-bold text-primary sm:inline-flex">View all <ArrowRight size={15}/></Link></div><div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">{related.slice(0,4).map(p=><ProductCard key={p.name} p={p} compact/>)}</div></div></section>}

    <section className="section-y"><div className="container-site"><SectionHead eyebrow="You may also like" title="Explore more spices" sub="Browse the full Aviraj range and choose products for your kitchen."/><div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">{otherProducts.slice(0,4).map(p=><ProductCard key={p.name} p={p} compact/>)}</div><div className="mt-7 text-center"><Link to="/products" className={btn.primary}>Shop all products <ArrowRight size={17}/></Link></div></div></section>

    <section className="section-y section-tint"><div className="container-site grid gap-6 lg:grid-cols-2"><div className="rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8"><p className="eyebrow !text-gold">Need product help?</p><h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">Questions about {product.name}?</h2><p className="mt-3 text-sm leading-6 opacity-85">Ask our team about current pack availability, pricing and ordering options before placing your order.</p><a href={waLink(`Hello, please share current price and availability for ${product.name} in ${pack}.`)} target="_blank" rel="noreferrer" className={`${btn.gold} mt-5`}><MessageCircle size={17}/> Ask on WhatsApp</a></div><div className="rounded-2xl border border-border bg-card p-6 sm:p-8"><h2 className="text-xl font-extrabold text-foreground">Frequently asked questions</h2><div className="mt-4 divide-y divide-border">{[{q:"What pack sizes can I enquire about?",a:"The listed options are 50 g, 100 g, 200 g and 500 g. Availability may vary by product."},{q:"Where can I find ingredients and dates?",a:"Check the product packaging for ingredients, batch details, dates and applicable declarations."},{q:"How do I place an order?",a:"Select a pack size and quantity, then choose Add to Cart or Buy Now. Final pricing and delivery are confirmed by the team."}].map(item=><details key={item.q} className="group py-3"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-foreground">{item.q}<ChevronDown size={16} className="shrink-0 transition group-open:rotate-180"/></summary><p className="mt-2 pr-5 text-sm leading-6 text-muted-foreground">{item.a}</p></details>)}</div></div></div></section>
  </>;
}
