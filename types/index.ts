export interface User {
  id: string; 
  email: string;
  role: 'admin' | 'client';
  created_at?: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon?: string;
  created_at?: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  price: string;
  currencySymbol: string;
  isNew: boolean;
  stock: number;
  description: string;
  created_at?: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  created_at?: string;
}
