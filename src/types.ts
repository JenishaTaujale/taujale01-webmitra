export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface StoreConfig {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  accentColor: string; // Tailwind class prefix or hex code
  paymentGateways: string[]; // e.g., ['esewa', 'khalti', 'cod']
  courierService: string; // e.g., 'pathao', 'upaya', 'local'
  products: Product[];
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: {
    product: Product;
    quantity: number;
  }[];
  totalAmount: number;
  paymentMethod: string;
  createdAt: string;
  status: 'pending' | 'completed' | 'processing';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
