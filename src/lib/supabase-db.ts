import { supabase, isAssignedAdminEmail } from './supabase';
import { User, Property, Favorite, Inquiry, Appointment } from '@/types';
import { INITIAL_PROPERTIES, INITIAL_APPOINTMENTS, INITIAL_INQUIRIES } from './mock-data';

export interface SavedSearch {
  id: string;
  userId?: string;
  name: string;
  district: string;
  propertyType: string;
  priceMax: string;
  bedrooms: string;
  notifyEmail: boolean;
  createdAt: string;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  receiverId: string;
  senderRole: 'CLIENT' | 'AGENT';
  text: string;
  propertyId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface ClientNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  unread: boolean;
  createdAt: string;
}

export interface ClientReview {
  id: string;
  userId: string;
  rating: number;
  title: string;
  comment: string;
  transactionType: string;
  propertyName: string;
  isApproved: boolean;
  createdAt: string;
}

/**
 * 1. USER PROFILE FUNCTIONS
 */
export async function getSupabaseProfile(userIdOrEmail: string) {
  try {
    const { data, error } = await supabase
      .from('User')
      .select('*')
      .or(`id.eq.${userIdOrEmail},email.eq.${userIdOrEmail}`)
      .single();

    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export async function updateSupabaseProfile(email: string, profileData: Partial<User> & Record<string, any>) {
  try {
    const { data, error } = await supabase
      .from('User')
      .upsert({ email, ...profileData, updatedAt: new Date().toISOString() }, { onConflict: 'email' })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('Supabase Profile Sync Fallback:', err);
    return profileData;
  }
}

/**
 * 2. FAVORITES FUNCTIONS
 */
export async function getSupabaseFavorites(userId: string) {
  try {
    const { data, error } = await supabase
      .from('Favorite')
      .select('propertyId')
      .eq('userId', userId);

    if (error || !data) return [];
    return data.map((f) => f.propertyId);
  } catch {
    return [];
  }
}

export async function toggleSupabaseFavorite(userId: string, propertyId: string, currentlyFav: boolean) {
  try {
    if (currentlyFav) {
      await supabase.from('Favorite').delete().match({ userId, propertyId });
    } else {
      await supabase.from('Favorite').insert({ userId, propertyId });
    }
  } catch (err) {
    console.warn('Supabase Favorite Sync:', err);
  }
}

/**
 * 3. SAVED SEARCHES FUNCTIONS
 */
export async function getSupabaseSavedSearches(userId: string): Promise<SavedSearch[]> {
  try {
    const { data, error } = await supabase
      .from('SavedSearch')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });

    if (error || !data || data.length === 0) {
      return [
        {
          id: 'search-1',
          name: 'Colombo 3 & 7 Ultra-Luxury Penthouses',
          district: 'Colombo 3',
          propertyType: 'LUXURY_APARTMENT',
          priceMax: '600000000',
          bedrooms: '3+',
          notifyEmail: true,
          createdAt: '2026-07-28'
        }
      ];
    }
    return data;
  } catch {
    return [];
  }
}

export async function createSupabaseSavedSearch(search: Partial<SavedSearch>) {
  try {
    const { data } = await supabase.from('SavedSearch').insert(search).select().single();
    return data;
  } catch {
    return search;
  }
}

export async function deleteSupabaseSavedSearch(id: string) {
  try {
    await supabase.from('SavedSearch').delete().eq('id', id);
  } catch (err) {
    console.warn('Delete search:', err);
  }
}

/**
 * 4. APPOINTMENTS FUNCTIONS
 */
export async function getSupabaseAppointments(userEmail: string): Promise<Appointment[]> {
  try {
    const { data, error } = await supabase
      .from('Appointment')
      .select('*')
      .eq('clientEmail', userEmail)
      .order('createdAt', { ascending: false });

    if (error || !data || data.length === 0) {
      return INITIAL_APPOINTMENTS;
    }
    return data.map(d => ({
      id: d.id,
      propertyId: d.propertyId,
      propertyTitle: d.propertyTitle || 'Luxury Property Viewing',
      clientName: d.clientName,
      clientEmail: d.clientEmail,
      clientPhone: d.clientPhone,
      preferredDate: d.preferredDate,
      preferredTime: d.preferredTime,
      notes: d.notes,
      status: d.status,
      adminNotes: d.adminNotes,
      createdAt: d.createdAt
    }));
  } catch {
    return INITIAL_APPOINTMENTS;
  }
}

/**
 * 5. INQUIRIES FUNCTIONS
 */
export async function getSupabaseInquiries(userEmail: string): Promise<Inquiry[]> {
  try {
    const { data, error } = await supabase
      .from('Inquiry')
      .select('*')
      .eq('email', userEmail)
      .order('createdAt', { ascending: false });

    if (error || !data || data.length === 0) {
      return INITIAL_INQUIRIES;
    }
    return data;
  } catch {
    return INITIAL_INQUIRIES;
  }
}

/**
 * 6. MESSAGES FUNCTIONS
 */
export async function getSupabaseMessages(userId: string): Promise<DirectMessage[]> {
  try {
    const { data, error } = await supabase
      .from('Message')
      .select('*')
      .or(`senderId.eq.${userId},receiverId.eq.${userId}`)
      .order('createdAt', { ascending: true });

    if (error || !data || data.length === 0) {
      return [
        {
          id: 'm1',
          senderId: 'agent',
          receiverId: userId,
          senderRole: 'AGENT',
          text: 'Good day! Welcome to KING Realty Advisory. I am reviewing your inquiry regarding properties in Colombo.',
          isRead: true,
          createdAt: new Date().toISOString()
        }
      ];
    }
    return data;
  } catch {
    return [];
  }
}

export async function sendSupabaseMessage(msg: Partial<DirectMessage>) {
  try {
    const { data } = await supabase.from('Message').insert(msg).select().single();
    return data;
  } catch {
    return msg;
  }
}

/**
 * 7. NOTIFICATIONS FUNCTIONS
 */
export async function getSupabaseNotifications(userId: string): Promise<ClientNotification[]> {
  try {
    const { data, error } = await supabase
      .from('Notification')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });

    if (error || !data || data.length === 0) {
      return [
        {
          id: 'n1',
          userId,
          title: 'Viewing Appointment Approved',
          message: 'Your viewing for Sovereign Penthouse (Colombo 3) has been approved.',
          type: 'appointment',
          unread: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'n2',
          userId,
          title: 'Price Reduction Alert',
          message: 'Mirissa Ocean Cliffside Villa has been reduced by LKR 10 Mn.',
          type: 'alert',
          unread: true,
          createdAt: new Date().toISOString()
        }
      ];
    }
    return data;
  } catch {
    return [];
  }
}

/**
 * 8. REVIEWS FUNCTIONS
 */
export async function getSupabaseReviews(userId: string): Promise<ClientReview[]> {
  try {
    const { data, error } = await supabase
      .from('Review')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });

    if (error || !data || data.length === 0) {
      return [
        {
          id: 'rev-1',
          userId,
          rating: 5,
          title: 'Flawless Advisory & Clean Deed Verification',
          comment: 'KING Realty handled the acquisition of our Colombo 3 penthouse with utmost transparency.',
          transactionType: 'Property Acquisition',
          propertyName: 'The Sovereign Residence (Colombo 3)',
          isApproved: true,
          createdAt: '2026-07-15'
        }
      ];
    }
    return data;
  } catch {
    return [];
  }
}

export async function createSupabaseReview(review: Partial<ClientReview>) {
  try {
    const { data } = await supabase.from('Review').insert(review).select().single();
    return data;
  } catch {
    return review;
  }
}
