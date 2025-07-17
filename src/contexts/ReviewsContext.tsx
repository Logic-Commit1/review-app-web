import React, { createContext, useContext, useCallback, useState } from 'react';
import { Review, getReviews, getReviewById, createReview, updateReview, deleteReview } from '../data/Reviews';
import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';

interface ReviewsContextType {
  reviews: Review[] | undefined;
  reviewsLoading: boolean;
  reviewsLoaded: boolean;
  refetchReviews: (business_id?: string) => void;
  review: Review | null | undefined;
  reviewLoading: boolean;
  reviewLoaded: boolean;
  fetchReview: (id: string) => void;
  createReviewMutation: UseMutationResult<Review, Error, Omit<Review, 'id' | 'created_at'>>;
  updateReviewMutation: UseMutationResult<Review, Error, { id: string; updates: Partial<Omit<Review, 'id' | 'created_at'>> }>;
  deleteReviewMutation: UseMutationResult<void, Error, string>;
  setBusinessId: (id: string | undefined) => void;
  businessId: string | undefined;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [businessId, setBusinessId] = useState<string | undefined>(undefined);

  // All reviews (optionally by business_id)
  const {
    data: reviews,
    isLoading: reviewsLoading,
    isFetched: reviewsLoaded,
    refetch: refetchReviews
  }: UseQueryResult<Review[], Error> = useQuery({
    queryKey: businessId ? ['reviews', businessId] : ['reviews'],
    queryFn: () => getReviews(businessId)
  });

  // Single review
  const {
    data: review,
    isLoading: reviewLoading,
    isFetched: reviewLoaded,
    refetch: refetchReview
  }: UseQueryResult<Review | null, Error> = useQuery({
    queryKey: ['review', selectedReviewId],
    queryFn: () => selectedReviewId ? getReviewById(selectedReviewId) : Promise.resolve(null),
    enabled: !!selectedReviewId
  });

  const fetchReview = useCallback((id: string) => {
    setSelectedReviewId(id);
    refetchReview();
  }, [refetchReview]);

  // Mutations
  const createReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reviews'] })
  });

  const updateReviewMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Omit<Review, 'id' | 'created_at'>> }) => updateReview(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reviews'] })
  });

  const deleteReviewMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reviews'] })
  });

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        reviewsLoading,
        reviewsLoaded,
        refetchReviews: () => refetchReviews(),
        review,
        reviewLoading,
        reviewLoaded,
        fetchReview,
        createReviewMutation,
        updateReviewMutation,
        deleteReviewMutation,
        setBusinessId,
        businessId
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviewsContext = () => {
  const context = useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error('useReviewsContext must be used within a ReviewsProvider');
  }
  return context;
}; 