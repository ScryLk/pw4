export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROPERTIES: '/properties',
  PROPERTY_DETAIL: '/properties/:id',
  ADD_PROPERTY: '/properties/add',
  PROFILE: '/profile',
} as const;

export const PROPERTY_TYPES = {
  SALE: 'sale',
  RENT: 'rent',
} as const;

export const PROPERTY_CATEGORIES = {
  HOUSE: 'house',
  APARTMENT: 'apartment',
  COMMERCIAL: 'commercial',
  LAND: 'land',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  AGENT: 'agent',
  CLIENT: 'client',
} as const;
