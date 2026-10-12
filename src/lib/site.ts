import turmeric from "@/assets/turmeric.jpg";
import coriander from "@/assets/coriander.jpg";
import chilli from "@/assets/red-chilli.jpg";
import cumin from "@/assets/cumin.jpg";
import pepper from "@/assets/black-pepper.jpg";
import chicken from "@/assets/chicken-masala.jpg";
import mutton from "@/assets/mutton-masala.jpg";
import garam from "@/assets/garam-masala.jpg";

export const company = {
  name: "Aviraj Foods and Spices",
  proprietor: "Mrs. Arti Kumari",
  established: "2025",
  address: "Ward No. 14, Dandai, District Garhwa, Jharkhand, India",
  phone: "+91 89876 91732",
  phoneHref: "tel:+918987691732",
  email: "avirajfoodsandspices@gmail.com",
  gstin: "20NWFPK4000Q1ZF",
  fssai: "21126112000123",
  udyam: "UDYAM-JH-07-0023702",
};

export const waLink = (text = "Hello Aviraj Foods and Spices, I would like to enquire about your products.") =>
  `https://wa.me/918987691732?text=${encodeURIComponent(text)}`;

export type Category = "ground" | "blended";
export type Product = { name: string; image: string; category: Category; description: string; cookingUses: string };
export const productSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const products: Product[] = [
  { name: "Turmeric Powder", image: turmeric, category: "ground", description: "A vibrant everyday spice known for its warm colour and earthy character.", cookingUses: "Dal, sabzi, rice dishes, marinades and everyday curries." },
  { name: "Coriander Powder", image: coriander, category: "ground", description: "A fragrant kitchen essential that brings gentle citrusy, earthy notes to recipes.", cookingUses: "Vegetable curries, dals, gravies, chutneys and spice mixes." },
  { name: "Red Chilli Powder", image: chilli, category: "ground", description: "A bold red spice for adding colour and heat to favourite Indian dishes.", cookingUses: "Curries, tadka, marinades, chutneys and snacks." },
  { name: "Cumin Powder", image: cumin, category: "ground", description: "A warm, aromatic spice with a distinctive savoury flavour.", cookingUses: "Raita, chaas, chaat, vegetables, lentils and curries." },
  { name: "Black Pepper Powder", image: pepper, category: "ground", description: "A sharp, warming spice that adds a lively finish to everyday cooking.", cookingUses: "Soups, vegetables, sauces, marinades and seasoning." },
  { name: "Chicken Masala", image: chicken, category: "blended", description: "A convenient blend made for richly flavoured chicken dishes.", cookingUses: "Chicken curry, roasted chicken, gravies and marinades." },
  { name: "Mutton Masala", image: mutton, category: "blended", description: "A traditional-style blend for hearty, aromatic mutton recipes.", cookingUses: "Mutton curry, keema, slow-cooked gravies and marinades." },
  { name: "Garam Masala", image: garam, category: "blended", description: "A classic warming blend to round out the flavour of Indian dishes.", cookingUses: "Curries, dals, vegetables, pulao and finishing seasoning." },
];

export const categoryLabel: Record<Category, string> = {
  ground: "Ground Spices",
  blended: "Blended Masalas",
};

export const packSizes = ["50 g", "100 g", "200 g", "500 g"];

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Products" },
  { to: "/quality", label: "Quality" },
  { to: "/business", label: "Business & Distribution" },
  { to: "/contact", label: "Contact Us" },
] as const;
