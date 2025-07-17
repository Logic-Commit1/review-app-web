import React, { createContext, useContext, useCallback, useState } from 'react';
import { Business, getBusinesses, getBusinessById, createBusiness, updateBusiness, deleteBusiness } from '../data/Businesses';
import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';

interface BusinessesContextType {
  businesses: Business[] | undefined;
  businessesLoading: boolean;
  businessesLoaded: boolean;
  refetchBusinesses: () => void;
  business: Business | null | undefined;
  businessLoading: boolean;
  businessLoaded: boolean;
  fetchBusiness: (id: string) => void;
  createBusinessMutation: UseMutationResult<Business, Error, Omit<Business, 'id' | 'created_at'>>;
  updateBusinessMutation: UseMutationResult<Business, Error, { id: string; updates: Partial<Omit<Business, 'id' | 'created_at'>> }>;
  deleteBusinessMutation: UseMutationResult<void, Error, string>;
}

const BusinessesContext = createContext<BusinessesContextType | undefined>(undefined);

export const BusinessesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);

  // All businesses
  const {
    data: businesses,
    isLoading: businessesLoading,
    isFetched: businessesLoaded,
    refetch: refetchBusinesses
  }: UseQueryResult<Business[], Error> = useQuery({
    queryKey: ['businesses'],
    queryFn: getBusinesses
  });

  // Single business
  const {
    data: business,
    isLoading: businessLoading,
    isFetched: businessLoaded,
    refetch: refetchBusiness
  }: UseQueryResult<Business | null, Error> = useQuery({
    queryKey: ['business', selectedBusinessId],
    queryFn: () => selectedBusinessId ? getBusinessById(selectedBusinessId) : Promise.resolve(null),
    enabled: !!selectedBusinessId
  });

  const fetchBusiness = useCallback((id: string) => {
    setSelectedBusinessId(id);
    refetchBusiness();
  }, [refetchBusiness]);

  // Mutations
  const createBusinessMutation = useMutation({
    mutationFn: createBusiness,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['businesses'] })
  });

  const updateBusinessMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Omit<Business, 'id' | 'created_at'>> }) => updateBusiness(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['businesses'] })
  });

  const deleteBusinessMutation = useMutation({
    mutationFn: deleteBusiness,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['businesses'] })
  });

  return (
    <BusinessesContext.Provider
      value={{
        businesses,
        businessesLoading,
        businessesLoaded,
        refetchBusinesses,
        business,
        businessLoading,
        businessLoaded,
        fetchBusiness,
        createBusinessMutation,
        updateBusinessMutation,
        deleteBusinessMutation
      }}
    >
      {children}
    </BusinessesContext.Provider>
  );
};

export const useBusinessesContext = () => {
  const context = useContext(BusinessesContext);
  if (context === undefined) {
    throw new Error('useBusinessesContext must be used within a BusinessesProvider');
  }
  return context;
}; 