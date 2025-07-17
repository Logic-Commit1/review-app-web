import { supabase } from '../utils/supabase';

export type Review = {
  id: string;
  business_id?: string;
  rating: number;
  comment: string;
  name?: string;
  created_at?: string;
};

// Fetch all reviews, optionally by business_id
export const getReviews = async (business_id?: string): Promise<Review[]> => {
  let query = supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });
  if (business_id) {
    query = query.eq('business_id', business_id);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data as Review[];
};

// Fetch a single review by ID
export const getReviewById = async (id: string): Promise<Review | null> => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Review;
};

// Create a new review
export const createReview = async (review: Omit<Review, 'id' | 'created_at'>): Promise<Review> => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([review])
    .select()
    .single();
  if (error) throw error;
  return data as Review;
};

// Update a review
export const updateReview = async (id: string, updates: Partial<Omit<Review, 'id' | 'created_at'>>): Promise<Review> => {
  const { data, error } = await supabase
    .from('reviews')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Review;
};

// Delete a review
export const deleteReview = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);
  if (error) throw error;
}; 