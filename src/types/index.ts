export type Role = 'GUEST' | 'CLIENT' | 'ADMIN';

export type PropertyStatus = 'AVAILABLE' | 'RESERVED' | 'UNDER_NEGOTIATION' | 'SOLD';

export type PropertyType = 
  | 'RESIDENTIAL_HOUSE'
  | 'LUXURY_APARTMENT'
  | 'COMMERCIAL'
  | 'LAND_PLOTS'
  | 'BEACHFRONT_VILLA';

export type LeadStatus = 
  | 'NEW' 
  | 'CONTACTED' 
  | 'VIEWING_SCHEDULED' 
  | 'NEGOTIATING' 
  | 'CLOSED' 
  | 'CANCELLED';

export type AppointmentStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'RESCHEDULED' 
  | 'CANCELLED' 
  | 'COMPLETED';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: Role;
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  priceLKR: number;
  priceUSD?: number;
  propertyType: PropertyType;
  status: PropertyStatus;
  address: string;
  city: string;
  district: string; // e.g., Colombo 3, Rajagiriya, Galle Fort, Kandy
  province: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  landSizePerch?: number;
  features: string[];
  images: string[];
  floorPlanUrl?: string;
  virtualTourUrl?: string;
  isFeatured: boolean;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Favorite {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: string;
  property?: Property;
}

export interface Appointment {
  id: string;
  propertyId: string;
  userId?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: AppointmentStatus;
  adminNotes?: string;
  createdAt: string;
  propertyTitle?: string;
}

export interface Inquiry {
  id: string;
  propertyId?: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: string; // General, Property Inquiry, Valuation, Sell Property
  status: LeadStatus;
  notes?: string;
  createdAt: string;
  propertyTitle?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  authorName: string;
  published: boolean;
  publishedAt: string;
  viewsCount: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  roleTitle?: string;
  content: string;
  rating: number;
  isApproved: boolean;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  active: boolean;
  createdAt: string;
}
