export type Category = 'All' | 'Hair' | 'Skin' | 'Body' | 'Teeth' | 'Home' | 'Bundles' | 'Refills';

export interface Variant {
  id: string;
  name: string;
  type: 'full' | 'refill_paper_bag' | 'bundle';
  price: number;
  weightOrVolume: string;
  inStock: boolean;
  savingsPercentage?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: Category;
  concern: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'New Arrival' | 'Bestseller' | 'Award Winner' | 'Refillable' | 'Plastic Free';
  image: string;
  galleryImages?: string[];
  description: string;
  whyItWorks: string[];
  howToUse: string[];
  ingredients: string[];
  variants: Variant[];
  isRefillable: boolean;
  isVegan: boolean;
  award?: string;
}

export interface CartItem {
  id: string; // unique item id
  product: Product;
  selectedVariant: Variant;
  quantity: number;
  isSubscription: boolean;
  subscriptionIntervalMonths?: number;
}

export interface Ingredient {
  id: string;
  commonName: string;
  botanicalName: string;
  description: string;
  benefits: string[];
  foundInProducts: string[];
  image?: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  location: string;
  productName: string;
  rating: number;
  quote: string;
  avatar: string;
  customerPhoto: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
}

export interface QuizQuestion {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    icon: string;
    value: string;
  }[];
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  country: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  giftNote?: string;
  subtotal: number;
  discount: number;
  total: number;
}

