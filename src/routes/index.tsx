import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Leaf, PackageCheck, ShieldCheck, ChefHat, MessageCircle, Sparkles, ChevronLeft, ChevronRight, ShoppingBag, MapPin, BadgeCheck } from "lucide-react";
import hero from "@/assets/hero.jpg";
import quality from "@/assets/quality.jpg";
import { products, waLink } from "@/lib/site";
import { btn, FeatureCard, PackagingGrid, ProductCard, Reveal, SectionHead, TradeCTA } from "@/components/site/ui";

const title = "Aviraj Foods and Spices | Shop Authentic Indian Spices & Masalas";
const desc = "Explore Aviraj turmeric, coriander, chilli, cumin, pepper and traditional masalas. Enquire about product availability and pack sizes.";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }] }),
  component: Home,
});

function Home() {
  const categories = products.slice(0, 7);
  const bestSellers = [products[0], products[2], products[5], products[7]];
  return (
    <>
      <section className="hero-shop relative overflow-hidden">
        <div className="hero-orb hero-orb-one"/><div className="hero-orb hero-orb-two"/>
        <div className="container-site relative grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-12 lg:py-16">
          <div className="animate-fade-up">
            <div className="hero-kicker"><Leaf size={15}/> THE TASTE OF INDIAN COOKING</div>
            <h1 className="hero-title mt-5">Spice up every <span>meal.</span></h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">Bring home the aroma, colour and familiar flavour of Indian spices — from everyday essentials to traditional masalas.</p>
            <div className="mt-7 flex flex-wrap gap-3"><Link to="/products" className={btn.primary}>Shop All Spices <ArrowRight size={17}/></Link><Link to="/about" className={btn.outline}>Our Story</Link></div>
            <div className="hero-points mt-8"><span><ShieldCheck size={17}/> Quality-focused</span><span><Leaf size={17}/> Everyday essentials</span><span><PackageCheck size={17}/> Multiple pack sizes</span></div>
          </div>
          <div className="hero-photo-wrap animate-fade-up" style={{animationDelay:".12s"}}><div className="hero-photo-frame"><img src={hero} alt="A colourful assortment of Indian spices" width={1280} height={1024} fetchPriority="high"/></div><div className="hero-sticker"><span>AVIRAJ</span><small>FOODS & SPICES</small></div></div>
        </div>
      </section>

      <section className="trust-strip"><div className="container-site grid grid-cols-2 gap-4 py-5 sm:grid-cols-4"><div><Leaf/><span>Everyday Spice Essentials</span></div><div><ChefHat/><span>Made for Indian Recipes</span></div><div><PackageCheck/><span>Convenient Pack Sizes</span></div><div><MessageCircle/><span>Easy Product Enquiries</span></div></div></section>

      <section className="section-y bg-background">
        <div className="container-site"><Reveal><SectionHead eyebrow="Shop by category" title="Find your everyday favourites" sub="Seven essentials to bring flavour to the dishes you love."/></Reveal>
          <div className="product-row category-row">{categories.map(p=><ProductCard key={p.name} p={p} compact/>)}</div>
          <div className="mt-8 text-center"><Link to="/products" className="inline-flex items-center gap-2 font-bold text-primary hover:text-spice">Explore all products <ArrowRight size={17}/></Link></div>
        </div>
      </section>

      <section className="section-y section-tint">
        <div className="container-site"><Reveal><SectionHead eyebrow="Customer favourites" title="Spice up your pantry" sub="Explore popular picks for everyday meals and special recipes."/></Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{bestSellers.map(p=><ProductCard key={p.name} p={p}/>)}</div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site"><Reveal><SectionHead eyebrow="The Aviraj difference" title="Good food starts with good spices" sub="A thoughtful range of familiar flavours for the everyday Indian kitchen."/></Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><FeatureCard icon={<Sparkles/>} title="Authentic Flavour" text="Classic spice profiles that complement the taste of everyday Indian cooking."/><FeatureCard icon={<Leaf/>} title="Everyday Essentials" text="From turmeric and coriander to pepper and cumin, cover your kitchen basics."/><FeatureCard icon={<ShieldCheck/>} title="Quality Focus" text="A quality-focused approach with attention to flavour, aroma and product consistency."/><FeatureCard icon={<PackageCheck/>} title="Flexible Pack Sizes" text="Pack-size options for household use and enquiries from retail or trade buyers."/></div>
        </div>
      </section>

      <section className="section-y section-tint">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <Reveal><div className="quality-photo"><img src={quality} alt="Spices prepared for Indian cooking" loading="lazy" width={1024} height={1024}/><div className="quality-photo-label"><span>AVIRAJ</span><small>Pure spices. Authentic taste.</small></div></div></Reveal>
          <Reveal><p className="eyebrow mb-3">Our promise</p><h2 className="h-section text-primary">Flavour you know. Quality you can focus on.</h2><p className="mt-5 leading-7 text-muted-foreground">Aviraj Foods and Spices brings together ground spices and traditional blended masalas for home kitchens and food businesses. We believe the little details — aroma, colour, careful packaging and customer trust — matter every day.</p><ul className="mt-6 space-y-3 text-sm font-semibold"><li className="flex gap-3"><span className="check-dot">✓</span> A range of essential ground spices</li><li className="flex gap-3"><span className="check-dot">✓</span> Traditional blended masalas</li><li className="flex gap-3"><span className="check-dot">✓</span> Product enquiries for customers and trade partners</li></ul><Link to="/quality" className={`${btn.primary} mt-7`}>Explore our quality approach <ArrowRight size={16}/></Link></Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site"><Reveal><SectionHead eyebrow="Choose your pack" title="Pack sizes for different needs" sub="Ask us about pack availability for your chosen product."/></Reveal><PackagingGrid/></div>
      </section>

      <section className="section-y section-tint">
        <div className="container-site"><Reveal><SectionHead eyebrow="From everyday to special meals" title="A spice for every kind of cooking" sub="Build your flavour base with ground spices, then finish with a traditional masala blend."/></Reveal>
          <div className="grid gap-5 md:grid-cols-3"><Link to="/products" className="recipe-tile recipe-tile-green"><span>01 / THE ESSENTIALS</span><h3>Start with the basics</h3><p>Turmeric, coriander, chilli, cumin and black pepper.</p><b>Shop ground spices <ArrowRight size={16}/></b></Link><Link to="/products" className="recipe-tile recipe-tile-gold"><span>02 / THE BLENDS</span><h3>Bring recipes together</h3><p>Explore chicken, mutton and traditional masala blends.</p><b>Explore masalas <ArrowRight size={16}/></b></Link><Link to="/business" className="recipe-tile recipe-tile-cream"><span>03 / FOR YOUR BUSINESS</span><h3>Stock your shelves</h3><p>Connect with us for product and distribution enquiries.</p><b>Trade enquiries <ArrowRight size={16}/></b></Link></div>
        </div>
      </section>

      <section className="section-y"><div className="container-site"><Reveal><SectionHead eyebrow="Meet the brand" title="Rooted in Indian kitchens" sub="Aviraj Foods and Spices is an Indian spice manufacturing and packaging business established in 2025, based in Garhwa, Jharkhand."/></Reveal><div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:p-9"><p className="font-display text-2xl font-semibold text-primary sm:text-3xl">“Pure spices. Natural taste. Authentic flavour.”</p><p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Whether you are exploring everyday spices for home or enquiring about retail and wholesale opportunities, we would be glad to hear from you.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><Link to="/about" className={btn.outline}>About Aviraj</Link><a href={waLink("Hello Aviraj Foods and Spices, I would like to enquire about your products.")} target="_blank" rel="noreferrer" className={btn.primary}><MessageCircle size={16}/> Talk to our team</a></div></div></div></section>

      <section className="section-y review-section">
        <div className="container-site"><Reveal><SectionHead eyebrow="Customer feedback" title="Your kitchen. Your experience." sub="We are building our customer review collection. Tried an Aviraj product? Share your honest feedback with our team." /></Reveal>
          <ReviewSlider />
        </div>
      </section>

      <section className="section-y section-tint">
        <div className="container-site"><Reveal><SectionHead eyebrow="Simple shopping" title="From browsing to your doorstep" sub="A clear, easy ordering journey for your favourite spice essentials." /></Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[{n:"01",icon:<ShoppingBag/>,title:"Choose your spices",text:"Open any product page, select a pack size and add it to your cart."},{n:"02",icon:<MapPin/>,title:"Enter delivery details",text:"Provide your contact number and complete delivery address at checkout."},{n:"03",icon:<BadgeCheck/>,title:"Confirm the order",text:"Our team confirms product pricing, delivery charges and COD availability."},{n:"04",icon:<PackageCheck/>,title:"Pay on delivery",text:"If COD is confirmed, pay the agreed amount when the order arrives."}].map(step=><Reveal key={step.n} className="order-step rounded-2xl border border-border bg-card p-6"><div className="flex items-center justify-between"><span className="order-step-number">{step.n}</span><span className="order-step-icon">{step.icon}</span></div><h3 className="mt-5 text-lg font-extrabold text-primary">{step.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site grid items-center gap-8 rounded-3xl bg-primary p-6 text-primary-foreground sm:p-10 lg:grid-cols-[1fr_auto] lg:p-14"><div><p className="eyebrow !text-gold">Need help choosing?</p><h2 className="h-section mt-3 text-primary-foreground">Let’s find the right spice for your recipe.</h2><p className="mt-4 max-w-2xl leading-7 text-primary-foreground/80">Ask our team about product availability, pack sizes and trade enquiries before placing your order.</p></div><div className="flex flex-wrap gap-3"><a href={waLink("Hello Aviraj Foods and Spices, please help me choose products and confirm prices and availability.")} target="_blank" rel="noreferrer" className={btn.gold}><MessageCircle size={16}/> Ask on WhatsApp</a><Link to="/products" className={btn.outlineLight}>Browse products <ArrowRight size={16}/></Link></div></div>
      </section>

      <section className="section-y section-tint"><div className="container-site"><Reveal><SectionHead eyebrow="Frequently asked questions" title="Before you order" sub="A few helpful notes about products, pack sizes and payment." /></Reveal><div className="mx-auto grid max-w-4xl gap-3 md:grid-cols-2">{[{q:"Which pack sizes are available?",a:"The listed options are 50 g, 100 g, 200 g and 500 g. Availability can vary by product and order requirements."},{q:"Are prices shown online?",a:"Product prices have not been configured on this website yet. Contact our team to confirm the final price and delivery charges."},{q:"Can I pay by Cash on Delivery?",a:"You can request COD at checkout. Our team must confirm COD availability and the final amount before dispatch."},{q:"Can retailers or distributors contact you?",a:"Yes. Retailers, wholesalers, supermarkets and distributors can contact us for business enquiries."}].map((item,i)=><details key={item.q} className="faq-item rounded-xl border border-border bg-card p-5"><summary className="cursor-pointer list-none font-bold text-primary"><span className="mr-3 text-spice">0{i+1}</span>{item.q}</summary><p className="mt-3 pl-9 text-sm leading-6 text-muted-foreground">{item.a}</p></details>)}</div></div></section>

      <TradeCTA title="Let’s bring authentic flavour to more kitchens." sub="For product availability, pack sizes, retail, wholesale and distribution enquiries, connect with Aviraj Foods and Spices." />
    </>
  );
}


function ReviewSlider() {
  const [active, setActive] = useState(0);
  const cards = [
    { title: "Tried an Aviraj spice?", text: "Tell us what you cooked, which product you used and what you think of its flavour.", action: "Share feedback" },
    { title: "Help other shoppers", text: "Your honest product experience can help other households choose their everyday spices.", action: "Send feedback" },
    { title: "Retail or wholesale buyer?", text: "Share feedback about your product enquiry or discuss stocking Aviraj with our team.", action: "Contact the team" },
  ];
  useEffect(() => { const timer = window.setInterval(() => setActive(i => (i + 1) % cards.length), 5200); return () => window.clearInterval(timer); }, [cards.length]);
  const card = cards[active]!;
  return <div className="review-slider mx-auto max-w-4xl rounded-3xl border border-border bg-card p-6 shadow-card sm:p-9">
    <div className="flex items-center justify-center gap-2 text-primary"><Leaf size={20}/><span className="text-xs font-extrabold uppercase tracking-[.16em]">Aviraj Community</span><Leaf size={20}/></div>
    <p className="mt-3 text-center text-xs font-bold uppercase tracking-[.16em] text-muted-foreground">Customer reviews are being collected</p>
    <div className="review-slide-content" key={active}><h3 className="mt-5 text-center font-display text-2xl font-semibold text-primary sm:text-3xl">{card.title}</h3><p className="mx-auto mt-3 max-w-2xl text-center leading-7 text-muted-foreground">{card.text}</p><div className="mt-6 text-center"><a href={waLink(`Hello Aviraj Foods and Spices, I would like to share feedback about your products / enquiry.`)} target="_blank" rel="noreferrer" className={`${btn.primary} !rounded-xl`}>{card.action} <ArrowRight size={16}/></a></div></div>
    <div className="mt-7 flex items-center justify-center gap-4"><button onClick={() => setActive(i => (i + cards.length - 1) % cards.length)} aria-label="Previous feedback slide" className="review-arrow"><ChevronLeft size={18}/></button><div className="flex gap-2">{cards.map((c,i)=><button key={c.title} onClick={()=>setActive(i)} aria-label={`Show slide ${i+1}`} className={`review-dot ${active===i?"review-dot-active":""}`}/>)}</div><button onClick={() => setActive(i => (i + 1) % cards.length)} aria-label="Next feedback slide" className="review-arrow"><ChevronRight size={18}/></button></div>
  </div>;
}
