import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { btn } from "@/components/site/ui";
import { getCart, saveCheckoutDetails, type CartItem } from "@/lib/cart";
import { company, products } from "@/lib/site";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage, head: () => ({ meta: [{ title: "Checkout | Aviraj Foods and Spices" }] }) });

function CheckoutPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "", state: "Jharkhand", pincode: "", notes: "" });
  const [error, setError] = useState("");
  useEffect(() => setItems(getCart()), []);
  const update = (key: keyof typeof form, value: string) => setForm(prev => ({ ...prev, [key]: value }));
  const submit = (e: FormEvent) => {
    e.preventDefault(); setError("");
    if (!items.length) { setError("Your cart is empty. Please add a product first."); return; }
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "").slice(-10))) { setError("Please enter a valid 10-digit Indian mobile number."); return; }
    if (!/^\d{6}$/.test(form.pincode)) { setError("Please enter a valid 6-digit PIN code."); return; }
    saveCheckoutDetails(form);
    void navigate({ to: "/payment" });
  };
  if (!items.length) return <div className="container-site section-y text-center"><h1 className="h-section text-primary">Nothing to checkout yet</h1><p className="mt-3 text-muted-foreground">Add products to your cart before checkout.</p><Link to="/products" className={`${btn.primary} mt-6`}>Browse products</Link></div>;
  return <div className="container-site section-y"><Link to="/cart" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"><ArrowLeft size={16}/> Back to cart</Link><div className="mb-8"><p className="eyebrow">Step 1 of 2</p><h1 className="h-section mt-2 text-primary">Delivery details</h1><p className="mt-3 text-muted-foreground">Enter your delivery address. You will choose the available payment method on the next step.</p></div>
    <form onSubmit={submit} className="grid items-start gap-8 lg:grid-cols-[1.3fr_.7fr]"><section className="rounded-2xl border border-border bg-card p-5 sm:p-7"><h2 className="text-xl font-bold">Delivery information</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{([{key:"name",label:"Full name",required:true},{key:"phone",label:"Mobile number",required:true},{key:"email",label:"Email (optional)",required:false},{key:"pincode",label:"PIN code",required:true},{key:"city",label:"City / Town",required:true},{key:"state",label:"State",required:true}] as const).map(field=><label key={field.key} className="block text-sm font-semibold">{field.label}<input required={field.required} value={form[field.key]} onChange={e=>update(field.key,e.target.value)} inputMode={field.key === "phone" || field.key === "pincode" ? "numeric" : undefined} type={field.key === "email" ? "email" : "text"} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" placeholder={field.key === "phone" ? "10-digit mobile number" : field.key === "pincode" ? "6-digit PIN code" : field.key === "state" ? "State" : field.label}/></label>)}<label className="block text-sm font-semibold sm:col-span-2">Full delivery address<textarea required value={form.address} onChange={e=>update("address",e.target.value)} rows={3} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" placeholder="House / street / locality"/></label><label className="block text-sm font-semibold sm:col-span-2">Delivery notes (optional)<textarea value={form.notes} onChange={e=>update("notes",e.target.value)} rows={2} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" placeholder="Landmark or delivery instructions"/></label></div>
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button type="submit" className={`${btn.primary} mt-6 w-full !rounded-xl`}><CheckCircle2 size={17}/> Continue to payment</button><p className="mt-3 text-xs leading-5 text-muted-foreground">By continuing, you agree to be contacted by {company.name} to confirm the order.</p></section>
      <aside className="rounded-2xl border border-border bg-card p-5 sm:p-6"><h2 className="text-xl font-bold">Your order</h2><div className="mt-4 divide-y divide-border">{items.map(i=>{const p=products.find(x=>x.name===i.name);return <div key={`${i.name}-${i.size}`} className="flex items-center gap-3 py-3"><img src={p?.image} alt={i.name} className="h-14 w-14 rounded-lg bg-secondary object-contain p-1"/><div className="min-w-0 flex-1"><p className="text-sm font-bold">{i.name}</p><p className="text-xs text-muted-foreground">{i.size} · Qty {i.qty}</p></div></div>})}</div><div className="mt-4 border-t border-border pt-4"><div className="flex justify-between gap-3 text-sm"><span className="text-muted-foreground">Payable amount</span><strong>To be confirmed</strong></div><p className="mt-3 text-xs leading-5 text-muted-foreground">Product prices and delivery charges are not configured in this site yet. The seller must confirm the total before dispatch.</p></div></aside>
    </form>
  </div>;
}
