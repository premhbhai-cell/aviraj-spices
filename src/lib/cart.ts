import { products } from "@/lib/site";

export type CartItem = { name: string; size: string; qty: number };
export type CustomerOrder = {
  orderId: string;
  createdAt: string;
  customer: { name: string; phone: string; email: string; address: string; city: string; state: string; pincode: string; notes: string };
  items: CartItem[];
  paymentMethod: "cod";
  status: "awaiting-confirmation";
};

const CART_KEY = "aviraj-cart";
const ORDER_KEY = "aviraj-latest-order";
const CHECKOUT_KEY = "aviraj-checkout-draft";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || "[]") as CartItem[];
    return Array.isArray(parsed) ? parsed.filter((item) => item && typeof item.name === "string" && typeof item.size === "string" && Number.isFinite(item.qty) && item.qty > 0) : [];
  } catch { return []; }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("aviraj-cart-updated"));
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const found = cart.find((i) => i.name === item.name && i.size === item.size);
  if (found) found.qty = Math.min(99, found.qty + item.qty);
  else cart.push({ ...item, qty: Math.min(99, item.qty) });
  saveCart(cart);
}

export function getLatestOrder(): CustomerOrder | null {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem(ORDER_KEY) || "null") as CustomerOrder | null; } catch { return null; }
}

export function saveOrder(order: CustomerOrder) {
  if (typeof window !== "undefined") localStorage.setItem(ORDER_KEY, JSON.stringify(order));
}

export function getProductName(name: string) { return products.find((p) => p.name === name)?.name ?? name; }

export type CheckoutDetails = { name: string; phone: string; email: string; address: string; city: string; state: string; pincode: string; notes: string };
export function saveCheckoutDetails(details: CheckoutDetails) { if (typeof window !== "undefined") localStorage.setItem(CHECKOUT_KEY, JSON.stringify(details)); }
export function getCheckoutDetails(): CheckoutDetails | null { if (typeof window === "undefined") return null; try { return JSON.parse(localStorage.getItem(CHECKOUT_KEY) || "null") as CheckoutDetails | null; } catch { return null; } }
