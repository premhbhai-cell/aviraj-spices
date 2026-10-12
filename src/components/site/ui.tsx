import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUp, ChevronRight, Menu, MessageCircle, X, Mail, Phone, MapPin, Search, ShoppingBag, Plus, Trash2 } from "lucide-react";
import { company, nav, packSizes, waLink, type Product, categoryLabel, productSlug } from "@/lib/site";
import logoImage from "@/assets/aviraj-logo.png";

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap";
export const btn = {
  primary: `${btnBase} bg-primary text-primary-foreground hover:bg-forest-deep hover:shadow-card`,
  spice: `${btnBase} bg-spice text-spice-foreground hover:brightness-110 hover:shadow-card`,
  gold: `${btnBase} bg-gold text-accent-foreground hover:brightness-105 hover:shadow-gold`,
  outline: `${btnBase} border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground`,
  outlineLight: `${btnBase} border-2 border-gold text-primary-foreground hover:bg-gold hover:text-accent-foreground`,
};

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Aviraj Foods and Spices home">
      <img src={logoImage} alt="Aviraj Foods and Spices logo" className="h-12 w-12 rounded-full border border-gold object-cover shadow-sm" />
      <span className="leading-tight">
        <span className={`block font-display text-base sm:text-lg font-bold tracking-wide ${light ? "text-primary-foreground" : "text-primary"}`}>AVIRAJ</span>
        <span className={`block text-[0.58rem] font-bold tracking-[0.13em] ${light ? "text-gold" : "text-spice"}`}>FOODS AND SPICES</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{name:string; size:string; qty:number}[]>([]);
  const readCart = () => {
    try {
      const items = JSON.parse(localStorage.getItem("aviraj-cart") || "[]") as {name:string; size:string; qty:number}[];
      setCartItems(items); setCartCount(items.reduce((n, item) => n + item.qty, 0));
    } catch { setCartItems([]); setCartCount(0); }
  };
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10);
    f(); readCart();
    window.addEventListener("scroll", f);
    window.addEventListener("aviraj-cart-updated", readCart);
    window.addEventListener("storage", readCart);
    return () => { window.removeEventListener("scroll", f); window.removeEventListener("aviraj-cart-updated", readCart); window.removeEventListener("storage", readCart); };
  }, []);
  const removeCartItem = (name:string, size:string) => {
    const next = cartItems.filter(i => !(i.name === name && i.size === size));
    localStorage.setItem("aviraj-cart", JSON.stringify(next)); setCartItems(next); setCartCount(next.reduce((n,i)=>n+i.qty,0)); window.dispatchEvent(new Event("aviraj-cart-updated"));
  };
  const submitSearch = (e: FormEvent) => { e.preventDefault(); const q = query.trim(); window.location.href = q ? `/products?search=${encodeURIComponent(q)}` : "/products"; };
  return (
    <>
      <div className="promo-bar"><div className="container-site flex items-center justify-center gap-2 py-2 text-center text-xs sm:text-sm"><span className="promo-dot" /> Pure spices. Honest flavour. Made for everyday Indian cooking.</div></div>
      <header className={`site-header sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur transition-shadow ${scrolled ? "shadow-card" : ""}`}>
        <div className="container-site header-main flex min-h-[76px] items-center gap-3 py-3">
          <Logo />
          <form onSubmit={submitSearch} className="search-box header-desktop-search hidden md:flex flex-1 items-center gap-2 rounded-xl px-4 py-3">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search turmeric, chilli, masala..." aria-label="Search products" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            <button type="submit" className="text-sm font-bold text-primary hover:text-spice">Search</button>
          </form>
          <div className="header-actions ml-auto flex items-center gap-2">
            <button onClick={()=>setCartOpen(true)} className="cart-button relative inline-flex items-center gap-2 rounded-xl px-3 py-2.5 font-bold" aria-label={`Shopping cart with ${cartCount} items`}>
              <ShoppingBag className="h-5 w-5" /><span className="hidden sm:inline text-sm">Cart</span><span className="cart-count">{cartCount}</span>
            </button>
            <a href={waLink()} target="_blank" rel="noreferrer" className={`${btn.primary} hidden lg:inline-flex !rounded-xl !px-4 !py-2.5`}><MessageCircle className="h-4 w-4" /> Enquire</a>
            <button className="menu-toggle xl:hidden grid h-10 w-10 place-items-center rounded-xl border border-border text-primary" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
          </div>
        </div>
        <div className="container-site mobile-search-wrap pb-3 md:hidden">
          <form onSubmit={submitSearch} className="search-box flex items-center gap-2 rounded-xl px-3 py-2.5"><Search className="h-4 w-4 shrink-0 text-muted-foreground" /><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search spices and masalas" aria-label="Search products" className="w-full min-w-0 bg-transparent text-sm outline-none" /><button type="submit" className="search-submit text-xs font-bold text-primary">Search</button></form>
        </div>
        <nav className="desktop-nav hidden xl:block border-t border-border/70" aria-label="Main"><div className="container-site flex items-center justify-center gap-8 py-3">{nav.map(n=><Link key={n.to} to={n.to} className="nav-link text-sm font-semibold text-foreground hover:text-primary" activeOptions={{exact:true}}>{n.label}</Link>)}</div></nav>
        {open && <nav className="xl:hidden border-t border-border bg-background animate-fade-up" aria-label="Mobile"><div className="container-site flex flex-col py-3">{nav.map(n=><Link key={n.to} to={n.to} onClick={()=>setOpen(false)} className="border-b border-border py-3 font-semibold text-foreground hover:text-primary" activeProps={{className:"text-primary"}} activeOptions={{exact:true}}>{n.label}</Link>)}<a href={waLink()} target="_blank" rel="noreferrer" className={`${btn.primary} mt-4`}><MessageCircle className="h-4 w-4"/> Enquire on WhatsApp</a></div></nav>}
      </header>
      {cartOpen && <div className="fixed inset-0 z-[80] flex justify-end bg-black/40" onClick={()=>setCartOpen(false)}><aside className="cart-drawer h-full w-full max-w-md overflow-y-auto bg-card p-5 shadow-2xl" onClick={e=>e.stopPropagation()}><div className="flex items-center justify-between border-b border-border pb-4"><div><p className="eyebrow">Your selection</p><h2 className="text-2xl font-bold text-primary">Shopping Cart ({cartCount})</h2></div><button onClick={()=>setCartOpen(false)} aria-label="Close cart" className="rounded-full p-2 hover:bg-secondary"><X/></button></div>{cartItems.length ? <><div className="divide-y divide-border">{cartItems.map(item=><div key={`${item.name}-${item.size}`} className="flex items-center justify-between gap-3 py-4"><div><p className="font-semibold">{item.name}</p><p className="text-sm text-muted-foreground">{item.size} · Qty {item.qty}</p></div><button onClick={()=>removeCartItem(item.name,item.size)} className="rounded-lg p-2 text-red-600 hover:bg-red-50" aria-label={`Remove ${item.name}`}><Trash2 size={18}/></button></div>)}</div><Link to="/cart" onClick={() => setCartOpen(false)} className={`${btn.primary} mt-5 w-full !rounded-xl`}>View cart & checkout <ChevronRight size={16}/></Link><a className={`${btn.outline} mt-3 w-full !rounded-xl`} href={waLink(`Hello Aviraj Foods and Spices, I would like to enquire about these items: ${cartItems.map(i=>`${i.name} (${i.size}) x ${i.qty}`).join(", ")}. Please share pricing and availability.`)} target="_blank" rel="noreferrer">Enquire about cart on WhatsApp</a><p className="mt-3 text-xs text-muted-foreground">Prices and availability will be confirmed by our team.</p></> : <div className="py-16 text-center"><ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground"/><h3 className="mt-4 text-xl font-bold">Your cart is empty</h3><p className="mt-2 text-sm text-muted-foreground">Explore our spices and add products to your selection.</p><Link to="/products" onClick={()=>setCartOpen(false)} className={`${btn.primary} mt-5`}>Browse Products</Link></div>}</aside></div>}
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest-deep text-primary-foreground">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="text-sm opacity-80">Pure spices. Natural taste. Authentic flavour — for everyday Indian cooking.</p>
        </div>
        <div>
          <h3 className="mb-4 text-lg text-gold">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.to}><Link to={n.to} className="opacity-80 hover:opacity-100 hover:text-gold">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg text-gold">Contact</h3>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-gold mt-0.5" />{company.address}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-gold" /><a href={company.phoneHref} className="hover:text-gold">{company.phone}</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-gold" /><a href={`mailto:${company.email}`} className="break-all hover:text-gold">{company.email}</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg text-gold">Registrations</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>GSTIN: {company.gstin}</li>
            <li>FSSAI: {company.fssai}</li>
            <li className="break-all">Udyam: {company.udyam}</li>
            <li>Proprietor: {company.proprietor}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-site py-5 text-center text-xs opacity-70">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppSticky() {
  return (
    <a
      href={waLink("Hello Aviraj Foods and Spices, I would like to enquire about your products.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Aviraj Foods and Spices on WhatsApp"
      className="whatsapp-sticky fixed bottom-5 left-5 z-[60] inline-flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#1fb956] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]"
    >
      <svg className="h-6 w-6" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.02 3.2A12.68 12.68 0 0 0 5.15 22.42L3.45 28.6l6.34-1.66A12.7 12.7 0 1 0 16.02 3.2Zm0 23.1c-1.9 0-3.77-.51-5.4-1.48l-.39-.23-3.76.99 1.01-3.66-.25-.4a10.4 10.4 0 1 1 8.79 4.78Zm5.71-7.79c-.31-.16-1.83-.9-2.11-1-.28-.1-.49-.16-.7.16-.21.31-.8 1-.98 1.2-.18.21-.36.24-.67.08-.31-.16-1.3-.48-2.48-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.68-.96-2.3-.25-.6-.51-.52-.7-.53h-.6c-.21 0-.55.08-.83.39-.28.31-1.09 1.06-1.09 2.58s1.12 2.99 1.28 3.2c.16.21 2.2 3.36 5.33 4.71.74.32 1.32.51 1.77.65.74.24 1.41.21 1.94.13.59-.09 1.83-.75 2.09-1.47.26-.73.26-1.35.18-1.47-.08-.13-.28-.21-.59-.37Z" />
      </svg>
    </a>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-primary text-gold shadow-card transition hover:-translate-y-1">
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

export function Reveal({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e) return;
      if (e.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${className}`}>{children}</Tag>;
}

export function SectionHead({ eyebrow, title, sub, center = true, light = false }: { eyebrow?: string; title: string; sub?: string; center?: boolean; light?: boolean }) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow mb-3 ${light ? "!text-gold" : ""}`}>{eyebrow}</p>}
      <h2 className={`h-section ${light ? "text-primary-foreground" : "text-primary"}`}>{title}</h2>
      <div className={`mt-4 h-1 w-16 rounded bg-gold ${center ? "mx-auto" : ""}`} />
      {sub && <p className={`mt-4 text-base ${light ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{sub}</p>}
    </div>
  );
}

export function PageHero({ title, sub, crumb, image }: { title: string; sub: string; crumb: string; image: string }) {
  return (
    <section className="relative overflow-hidden bg-forest-deep text-primary-foreground">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" width={1280} height={1024} />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/85 to-transparent" />
      <div className="container-site relative py-20 md:py-28 animate-fade-up">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1 text-sm text-gold">
          <Link to="/" className="hover:underline">Home</Link><ChevronRight className="h-4 w-4" /><span className="opacity-90">{crumb}</span>
        </nav>
        <h1 className="h-display max-w-3xl">{title}</h1>
        <p className="mt-5 max-w-xl text-lg opacity-85">{sub}</p>
      </div>
    </section>
  );
}

export function ProductCard({ p, compact = false }: { p: Product; compact?: boolean }) {
  const slug = productSlug(p.name);
  const navigate = useNavigate();
  const openProduct = () => { void navigate({ to: "/products/$slug", params: { slug } }); };
  const cardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if ((event.key === "Enter" || event.key === " ") && event.target === event.currentTarget) {
      event.preventDefault(); openProduct();
    }
  };
  const addQuick = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("aviraj-cart") || "[]") as {name:string;size:string;qty:number}[];
      const found = cart.find(i=>i.name===p.name && i.size==="100 g");
      if (found) found.qty += 1; else cart.push({name:p.name,size:"100 g",qty:1});
      localStorage.setItem("aviraj-cart", JSON.stringify(cart)); window.dispatchEvent(new Event("aviraj-cart-updated"));
    } catch { localStorage.setItem("aviraj-cart", JSON.stringify([{name:p.name,size:"100 g",qty:1}])); window.dispatchEvent(new Event("aviraj-cart-updated")); }
  };
  return (
    <article onClick={(event) => { if (!(event.target as HTMLElement).closest("a, button, input, select")) openProduct(); }} onKeyDown={cardKeyDown} tabIndex={0} aria-label={`Open details for ${p.name}`} className="product-card group flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
      <Link to="/products/$slug" params={{slug}} className="product-image-wrap relative block aspect-square overflow-hidden" aria-label={`View ${p.name}`}>
        <span className="product-tag">AVIRAJ</span>
        <img src={p.image} alt={`${p.name} by Aviraj Foods and Spices`} loading="lazy" width={816} height={816} className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105" />
      </Link>
      <div className={`flex flex-1 flex-col ${compact ? "p-3 sm:p-4" : "p-4"}`}>
        <span className="mb-1 text-[0.65rem] font-bold uppercase tracking-wider text-spice">{categoryLabel[p.category]}</span>
        <Link to="/products/$slug" params={{slug}} className={`font-sans font-bold leading-snug text-foreground hover:text-primary ${compact ? "text-sm sm:text-base" : "text-base sm:text-lg"}`}>{p.name}</Link>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{p.description}</p>
        <div className="mt-auto flex items-center gap-2 pt-4">
          <Link to="/products/$slug" params={{slug}} className="product-view-btn min-w-0 flex-1 rounded-lg px-2 py-2.5 text-center text-xs font-bold sm:text-sm">View Product</Link>
          <button onClick={addQuick} aria-label={`Add ${p.name} to cart`} className="add-cart-btn grid h-10 w-10 shrink-0 place-items-center rounded-lg transition hover:scale-105"><Plus className="h-5 w-5"/></button>
        </div>
      </div>
    </article>
  );
}

export function PackagingGrid() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {packSizes.map((s, i) => (
          <Reveal key={s} className="group rounded-xl border border-border bg-card p-6 text-center transition hover:-translate-y-1 hover:border-gold hover:shadow-gold">
            <div className="mx-auto mb-4 flex items-end justify-center" style={{ height: 96 }}>
              <div className="rounded-t-lg rounded-b-md border-2 border-gold bg-primary transition group-hover:bg-spice"
                style={{ width: 34 + i * 12, height: 46 + i * 16 }}>
                <div className="mx-auto mt-2 h-1.5 w-2/3 rounded bg-gold" />
              </div>
            </div>
            <p className="font-display text-3xl font-semibold text-primary">{s}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Pack</p>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">Availability of pack sizes may vary by product and order requirements.</p>
    </>
  );
}

export function TradeCTA({ title = "Grow Your Business with Aviraj Foods and Spices.", sub = "We welcome enquiries from retailers, wholesalers, supermarkets and distributors." }: { title?: string; sub?: string }) {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-pattern opacity-40" />
      <div className="container-site relative section-y text-center">
        <Reveal>
          <p className="eyebrow !text-gold mb-4">Business Enquiries</p>
          <h2 className="h-section mx-auto max-w-3xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl opacity-85">{sub}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={waLink("Hello Aviraj Foods and Spices, I am interested in a business / distribution enquiry.")} target="_blank" rel="noreferrer" className={btn.gold}>
              <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
            </a>
            <Link to="/contact" className={btn.outlineLight}>Contact Our Team</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FeatureCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <Reveal className="rounded-xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-gold hover:shadow-gold">
      <div className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-secondary text-primary ring-2 ring-gold">{icon}</div>
      <h3 className="text-xl font-semibold text-primary">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </Reveal>
  );
}
