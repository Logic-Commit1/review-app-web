import { supabase } from '../utils/supabase';

export type Business = {
  id: string;
  name: string;
  location: string;
  facebook_url?: string;
  google_maps_url?: string;
  created_at?: string;
};

// Fetch all businesses
export const getBusinesses = async (): Promise<Business[]> => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Business[];
};

// Fetch a single business by ID
export const getBusinessById = async (id: string): Promise<Business | null> => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Business;
};

// Create a new business
export const createBusiness = async (business: Omit<Business, 'id' | 'created_at'>): Promise<Business> => {
  const { data, error } = await supabase
    .from('businesses')
    .insert([business])
    .select()
    .single();
  if (error) throw error;
  return data as Business;
};

// Update a business
export const updateBusiness = async (id: string, updates: Partial<Omit<Business, 'id' | 'created_at'>>): Promise<Business> => {
  const { data, error } = await supabase
    .from('businesses')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Business;
};

// Delete a business
export const deleteBusiness = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('businesses')
    .delete()
    .eq('id', id);
  if (error) throw error;
}; 