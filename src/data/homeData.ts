import { Shirt, Box, Layers, ShieldCheck, Zap, Layout, Crown, Briefcase, Users, Star } from 'lucide-react'

// Templates Data
export const TEMPLATES = [
  {
    id: 't1',
    name: 'Minimalist Brand Tee',
    category: 'Brand Merch',
    style: 'Minimal',
    productType: 't-shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 120
  },
  {
    id: 't2',
    name: 'Streetwear Oversized Hoodie',
    category: 'Fashion Drops',
    style: 'Streetwear',
    productType: 'hoodie',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 280
  },
  {
    id: 't3',
    name: 'Tech Startup Crewneck',
    category: 'Corporate Gifting',
    style: 'Minimal',
    productType: 'sweatshirt',
    image: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 180
  },
  {
    id: 't4',
    name: 'Vintage Band Tee',
    category: 'Events',
    style: 'Vintage',
    productType: 't-shirt',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 140
  },
  {
    id: 't5',
    name: 'Team Uniform Polo',
    category: 'Teams',
    style: 'Standard',
    productType: 't-shirt',
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 160
  },
  {
    id: 't6',
    name: 'Eco-Friendly Tote',
    category: 'Brand Merch',
    style: 'Minimal',
    productType: 'accessory',
    image: 'https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 80
  },
  {
    id: 't7',
    name: 'Urban Zip Hoodie',
    category: 'Fashion Drops',
    style: 'Streetwear',
    productType: 'hoodie',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 320
  },
  {
    id: 't8',
    name: 'Retro Graphic Tee',
    category: 'Events',
    style: 'Vintage',
    productType: 't-shirt',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 130
  }
]

// Use Cases
export const USE_CASES = [
  {
    id: 'uc1',
    title: 'Brand Merch',
    description: 'Launch your own clothing line with premium quality blanks.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    icon: Briefcase
  },
  {
    id: 'uc2',
    title: 'Corporate Gifting',
    description: 'Impress clients and employees with high-end custom gear.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    icon: Layout
  },
  {
    id: 'uc3',
    title: 'Events & Teams',
    description: 'Outfit your team or event attendees in style.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    icon: Users
  }
]

// Features
export const FEATURES = [
  {
    icon: Box,
    title: 'Premium Blanks',
    description: 'Curated selection of high-quality fabrics and fits.'
  },
  {
    icon: Layers,
    title: 'Intelligent Validation',
    description: 'Real-time checks for print readiness and quality.'
  },
  {
    icon: ShieldCheck,
    title: 'Reliable Fulfillment',
    description: 'Global production network with strict QA.'
  },
  {
    icon: Zap,
    title: 'AI Assist Tools',
    description: 'Smart layout, resolution checks, and suggestions.'
  },
  {
    icon: Layout,
    title: 'Multi-Product',
    description: 'Design across collections seamlessly.'
  },
  {
    icon: Crown,
    title: 'Enterprise Grade',
    description: 'Scalable solutions for growing businesses.'
  }
]

// Testimonials
export const TESTIMONIALS = [
  {
    id: 'tm1',
    name: 'Alex C.',
    role: 'Creative Director',
    company: 'Studio X',
    text: "The quality of the blanks and the print validation tools saved us hours of back-and-forth. Best platform we've used.",
    rating: 5
  },
  {
    id: 'tm2',
    name: 'Sarah L.',
    role: 'Event Manager',
    company: 'TechConf',
    text: "Ordered 500 hoodies for our conference. Delivery was on time and the attendees loved the premium feel.",
    rating: 5
  },
  {
    id: 'tm3',
    name: 'Marcus J.',
    role: 'Founder',
    company: 'StreetLabel',
    text: "Finally a POD service that understands streetwear fits. The heavy cotton tees are perfect.",
    rating: 5
  }
]
