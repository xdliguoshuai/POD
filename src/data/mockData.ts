import { ProductType } from "../state/types";

export interface Product {
  id: string;
  type: ProductType;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  colors: { name: string; value: string; hex: string }[];
  sizes: string[];
  specs: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const PRODUCTS: Product[] = [
  // T-Shirts
  {
    id: "t-shirt-classic",
    type: "t-shirt",
    name: "Classic Heavyweight Tee",
    price: 39,
    description:
      "The definitive blank for high-end brands. Crafted from 100% heavyweight organic cotton (240 GSM), this tee features a refined boxy fit, a tight-knit surface perfect for DTG, and double-needle stitching for durability.",
    shortDescription: "100% Organic Cotton • 240 GSM • Boxy Fit",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "White", value: "white", hex: "#FFFFFF" },
      { name: "Black", value: "black", hex: "#111111" },
      { name: "Olive", value: "olive", hex: "#4B5320" },
      { name: "Navy", value: "navy", hex: "#000080" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    specs: [
      "100% Organic Cotton",
      "240 GSM Jersey",
      "Pre-shrunk",
      "Drop Shoulder",
    ],
    isBestSeller: true,
  },
  {
    id: "t-shirt-vintage",
    type: "t-shirt",
    name: "Vintage Wash Tee",
    price: 45,
    description:
      "Achieve that lived-in look and feel from day one. Our Vintage Wash Tee undergoes a special pigment dye and enzyme wash process to create a soft, slightly faded aesthetic with unique character.",
    shortDescription: "Pigment Dyed • Soft Hand Feel • Retro Fit",
    image: "/assets/images/download.png",
    images: ["/assets/images/download.png"],
    colors: [
      { name: "Washed Black", value: "charcoal", hex: "#333333" },
      { name: "Bone", value: "bone", hex: "#E3DAC9" },
      { name: "Sage", value: "sage", hex: "#9CAF88" },
    ],
    sizes: ["S", "M", "L", "XL"],
    specs: ["100% Cotton", "200 GSM", "Garment Dyed", "Relaxed Fit"],
    isNew: true,
  },
  {
    id: "t-shirt-performance",
    type: "t-shirt",
    name: "Tech Performance Tee",
    price: 42,
    description:
      "Engineered for movement. This moisture-wicking blend offers superior breathability and stretch, making it ideal for activewear brands or modern streetwear collections.",
    shortDescription: "Moisture Wicking • 4-Way Stretch",
    image:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Slate", value: "slate", hex: "#708090" },
      { name: "Black", value: "black", hex: "#000000" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    specs: ["Poly-Spandex Blend", "180 GSM", "Quick Dry", "Athletic Fit"],
  },

  // Crewnecks
  {
    id: "crewneck-premium",
    type: "sweatshirt",
    name: "Premium French Terry Crew",
    price: 59,
    description:
      "A structural masterpiece. Made from luxury French terry fleece (400 GSM), offering a heavy drape and a silhouette that stays sharp. Features ribbed side panels and minimal branding.",
    shortDescription: "400 GSM French Terry • Structured Fit",
    image:
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Heather Gray", value: "gray", hex: "#D3D3D3" },
      { name: "Black", value: "black", hex: "#111111" },
      { name: "Burgundy", value: "burgundy", hex: "#800020" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    specs: [
      "100% Cotton Face",
      "400 GSM",
      "French Terry Loopback",
      "Ribbed Panels",
    ],
    isBestSeller: true,
  },
  {
    id: "crewneck-oversized",
    type: "sweatshirt",
    name: "Oversized Fleece Crew",
    price: 65,
    description:
      "Maximum comfort, modern silhouette. This fleece crewneck features an exaggerated drop shoulder and wide body for that trendy oversized look. Ultra-soft brushed interior.",
    shortDescription: "Brushed Fleece • Massive Drop Shoulder",
    image:
      "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Cream", value: "cream", hex: "#FFFDD0" },
      { name: "Mocha", value: "mocha", hex: "#967969" },
      { name: "Black", value: "black", hex: "#000000" },
    ],
    sizes: ["S", "M", "L", "XL"],
    specs: ["80/20 Cotton Poly", "350 GSM", "Brushed Interior", "Oversized"],
  },

  // Hoodies
  {
    id: "hoodie-luxe",
    type: "hoodie",
    name: "Hoodie Luxe",
    price: 79,
    description:
      "The ultimate canvas. Featuring a double-lined hood without drawstrings for a clean, minimalist aesthetic. Heavyweight fleece (450 GSM) ensures warmth and premium structure.",
    shortDescription: "450 GSM • Double-lined Hood • No Drawstrings",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Charcoal", value: "charcoal", hex: "#36454F" },
      { name: "Forest Green", value: "forest", hex: "#228B22" },
      { name: "Navy", value: "navy", hex: "#000080" },
      { name: "Black", value: "black", hex: "#000000" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    specs: ["Cross-Grain Fleece", "450 GSM", "Double Hood", "Kangaroo Pocket"],
    isNew: true,
    isBestSeller: true,
  },
  {
    id: "hoodie-zip",
    type: "hoodie",
    name: "Heavyweight Zip Hoodie",
    price: 85,
    description:
      "A versatile essential. Premium metal zipper, split kangaroo pocket, and the same heavyweight fleece fabric as our Luxe pullover. Perfect for layering.",
    shortDescription: "Metal Zipper • Heavyweight Fleece",
    image:
      "https://images.unsplash.com/photo-1647773356066-6701b228b340?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1647773356066-6701b228b340?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Black", value: "black", hex: "#000000" },
      { name: "Heather Gray", value: "gray", hex: "#D3D3D3" },
    ],
    sizes: ["S", "M", "L", "XL"],
    specs: ["YKK Metal Zipper", "400 GSM", "Standard Fit", "Ribbed Cuffs"],
  },
];

export function getProductById(id: string | null) {
  if (!id) return undefined;
  return PRODUCTS.find((p) => p.id === id);
}
