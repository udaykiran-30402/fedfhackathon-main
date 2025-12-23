// Mock product data for the e-commerce store
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  material: string;
  origin: string;
  color: string[];
  sizes: string[];
  inStock: boolean;
  featured: boolean;
  image: string;
  images: string[];
  description: string;
  details: string[];
  reviews: Review[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Kanchipuram Silk Saree",
    slug: "kanchipuram-silk-saree",
    price: 15999,
    originalPrice: 19999,
    category: "sarees",
    material: "silk",
    origin: "Tamil Nadu",
    color: ["rust", "gold"],
    sizes: ["one-size"],
    inStock: true,
    featured: true,
    image: "/src/assets/product-saree.jpg",
    images: [
      "/src/assets/product-saree.jpg",
      "/src/assets/product-saree-drape.jpg",
      "/src/assets/product-saree-detail.jpg"
    ],
    description: "Exquisite Kanchipuram silk saree with traditional gold border and intricate weaving patterns. Hand-woven by master artisans in Tamil Nadu.",
    details: [
      "100% Pure Silk",
      "Hand-woven traditional design",
      "Length: 6.3 meters",
      "Includes matching blouse piece",
      "Dry clean only"
    ],
    reviews: [
      {
        id: "r1",
        user: "Priya Sharma",
        rating: 5,
        comment: "Absolutely beautiful saree! The quality is exceptional and the weaving is stunning.",
        date: "2024-01-15"
      }
    ]
  },
  {
    id: "2",
    name: "Block Print Cotton Kurta",
    slug: "block-print-cotton-kurta",
    price: 2499,
    originalPrice: 3499,
    category: "kurtas",
    material: "cotton",
    origin: "Rajasthan",
    color: ["terracotta", "beige"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    featured: true,
    image: "/src/assets/product-kurta.jpg",
    images: [
      "/src/assets/product-kurta.jpg",
      "/src/assets/product-kurta-back.jpg",
      "/src/assets/product-kurta-detail.jpg"
    ],
    description: "Traditional block printed cotton kurta with intricate patterns. Hand-crafted by artisans using age-old techniques.",
    details: [
      "100% Cotton",
      "Hand block printed",
      "Comfortable fit",
      "Machine washable",
      "Inclusive sizing"
    ],
    reviews: [
      {
        id: "r2",
        user: "Amit Patel",
        rating: 4,
        comment: "Great quality kurta. The print is beautiful and fabric is comfortable.",
        date: "2024-01-20"
      }
    ]
  },
  {
    id: "3",
    name: "Handwoven Silk Scarf",
    slug: "handwoven-silk-scarf",
    price: 1899,
    category: "accessories",
    material: "silk",
    origin: "Varanasi",
    color: ["rust", "gold", "cream"],
    sizes: ["one-size"],
    inStock: true,
    featured: true,
    image: "/src/assets/product-scarf.jpg",
    images: ["/src/assets/product-scarf.jpg"],
    description: "Luxurious handwoven silk scarf with traditional patterns. Perfect accessory for any occasion.",
    details: [
      "Pure Silk",
      "Dimensions: 200cm x 70cm",
      "Hand-woven",
      "Lightweight and soft",
      "Dry clean recommended"
    ],
    reviews: []
  },
  {
    id: "4",
    name: "Banarasi Cotton Dupatta",
    slug: "banarasi-cotton-dupatta",
    price: 1299,
    category: "accessories",
    material: "cotton",
    origin: "Uttar Pradesh",
    color: ["rust", "cream"],
    sizes: ["one-size"],
    inStock: true,
    featured: false,
    image: "/src/assets/product-dupatta.jpg",
    images: ["/src/assets/product-dupatta.jpg"],
    description: "Traditional Banarasi cotton dupatta with ethnic patterns and fringed edges.",
    details: [
      "Cotton with silk thread work",
      "Length: 2.5 meters",
      "Traditional patterns",
      "Hand wash recommended",
      "Comfortable drape"
    ],
    reviews: []
  },
  {
    id: "5",
    name: "Handloom Cotton Saree - Beige",
    slug: "handloom-cotton-saree-beige",
    price: 3999,
    category: "sarees",
    material: "cotton",
    origin: "West Bengal",
    color: ["beige", "gold"],
    sizes: ["one-size"],
    inStock: true,
    featured: false,
    image: "/src/assets/product-saree.jpg",
    images: ["/src/assets/product-saree.jpg"],
    description: "Elegant handloom cotton saree perfect for daily wear and special occasions.",
    details: [
      "100% Cotton",
      "Hand-woven",
      "Length: 6.3 meters",
      "Breathable fabric",
      "Machine washable"
    ],
    reviews: []
  },
  {
    id: "6",
    name: "Chanderi Silk Kurta Set",
    slug: "chanderi-silk-kurta-set",
    price: 4999,
    category: "kurtas",
    material: "silk",
    origin: "Madhya Pradesh",
    color: ["cream", "gold"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    featured: false,
    image: "/src/assets/product-kurta.jpg",
    images: ["/src/assets/product-kurta.jpg"],
    description: "Premium Chanderi silk kurta with palazzo pants. Elegant and comfortable.",
    details: [
      "Chanderi Silk",
      "Includes kurta and palazzo",
      "Hand embroidered details",
      "Dry clean only",
      "Premium finish"
    ],
    reviews: []
  }
];

// Helper functions to filter and sort products
export const getProductBySlug = (slug: string) => {
  return products.find(p => p.slug === slug);
};

export const getFeaturedProducts = () => {
  return products.filter(p => p.featured);
};

export const getProductsByCategory = (category: string) => {
  return products.filter(p => p.category === category);
};
