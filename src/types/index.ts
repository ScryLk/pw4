export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'client';
  avatar?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'sale' | 'rent';
  category: 'house' | 'apartment' | 'commercial' | 'land';
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  images: string[];
  features: string[];
  agentId: string;
  status: 'available' | 'pending' | 'sold' | 'rented';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
