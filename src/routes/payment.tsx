import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Banknote, CheckCircle2, ShieldCheck } from "lucide-react";
import { btn } from "@/components/site/ui";
import { getCart, getCheckoutDetails, saveCart, saveOrder, type CartItem, type CheckoutDetails, type CustomerOrder } from "@/lib/cart";
import { products } from "@/lib/site";

export const Route = createFileRoute("/payment")({ component: PaymentPage, head: () => ({ meta: [{ title: "Payment | Aviraj Foods and Spices" }] }) });
function PaymentPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState<CheckoutDetails | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => { setItems(getCart()); setCustomer(getCheckoutDetails()); }, []);
  const placeOrder = () => {
    if (!customer || !items.length || !confirmed) return;
    const order: CustomerOrder = { orderId: `AV${Date.now().toString().slice(-8)}`, createdAt: new Date().toISOString(), customer, items, paymentMethod: "cod", status: "awaiting-confirmation" };
    saveOrder(order); saveCart([]); void navigate({ to: "/order-success" });
  };
  if (!customer || !items.length) return <div className="container-site section-y text-center"><h1 className="h-section text-primary">Checkout details missing</h1><p className="mt-3 text-muted-foreground">Please add items and enter your delivery details first.</p><Link to="/cart" className={`${btn.primary} mt-6`}>Return to cart</Link></div>;
  return <div className="container-site section-y"><Link to="/checkout" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"><ArrowLeft size={16}/> Back to delivery details</Link><div className="mb-8"><p className="eyebrow">Step 2 of 2</p><h1 className="h-section mt-2 text-primary">Payment method</h1><p className="mt-3 text-muted-foreground">Choose how you would like to pay. Cash on Delivery can be requested; the team must confirm availability and the final amount.</p></div>
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_.8fr]"><section className="rounded-2xl border border-border bg-card p-5 sm:p-7"><h2 className="text-xl font-bold">Select payment option</h2><label className="mt-5 flex cursor-pointer gap-4 rounded-2xl border-2 border-primary bg-secondary p-5"><input type="radio" checked readOnly className="mt-1 accent-green-700"/><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-primary"><Banknote size={26}/></span><span><strong className="block text-lg">Cash on Delivery (COD)</strong><span className="mt-1 block text-sm leading-6 text-muted-foreground">Pay the confirmed amount when your order arrives. COD is subject to service availability and order confirmation.</span><span className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-primary">Pay at delivery</span></span></label><div className="mt-5 rounded-xl border border-border p-4 text-sm leading-6 text-muted-foreground"><ShieldCheck className="mr-2 inline h-5 w-5 text-primary"/>Online UPI, card and net-banking payments are not active because no payment gateway has been connected. This page will never collect payment credentials.</div><label className="mt-5 flex items-start gap-3 text-sm"><input type="checkbox" checked={confirmed} onChange={e=>setConfirmed(e.target.checked)} className="mt-1 accent-green-700"/><span>I understand that this is an order request and the seller must confirm the product prices, delivery charges and COD availability before dispatch.</span></label><button onClick={placeOrder} disabled={!confirmed} className={`${btn.primary} mt-6 w-full !rounded-xl disabled:cursor-not-allowed disabled:opacity-50`}><CheckCircle2 size={17}/> Place COD order request</button></section>
      <aside className="rounded-2xl border border-border bg-card p-5 sm:p-6"><h2 className="text-xl font-bold">Order summary</h2><div className="mt-4 divide-y divide-border">{items.map(i=>{const p=products.find(x=>x.name===i.name);return <div key={`${i.name}-${i.size}`} className="flex items-center gap-3 py-3"><img src={p?.image} alt={i.name} className="h-14 w-14 rounded-lg bg-secondary object-contain p-1"/><div className="min-w-0 flex-1"><p className="text-sm font-bold">{i.name}</p><p className="text-xs text-muted-foreground">{i.size} · Qty {i.qty}</p></div></div>})}</div><div className="mt-4 border-t border-border pt-4"><p className="text-sm"><strong>Deliver to:</strong> {customer.name}</p><p className="mt-2 text-sm text-muted-foreground">{customer.address}, {customer.city}, {customer.state} - {customer.pincode}</p><p className="mt-3 text-sm"><strong>Total:</strong> Price to be confirmed</p></div></aside>
    </div>
  </div>;
}
