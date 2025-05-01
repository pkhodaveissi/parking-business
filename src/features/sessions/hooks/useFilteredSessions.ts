import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { endSession, getSessions, ParkingSession } from '../api';
// TODO: Move to a higher level package
import { getRate } from '@/features/dashboard/hooks/useRevenueMetrics';

export const useFilteredSessions = () => {
  const queryClient = useQueryClient();
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: getSessions,
  });

  const mutation = useMutation({
    mutationFn: endSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });

  const [vehicleFilter, setVehicleFilter] = useState<'ALL' | 'CAR' | 'MOTOR' | 'RESIDENT'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'ENDED'>('ALL');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSessions = sessions.filter((s) => {
    const typeMatch =
      vehicleFilter === 'ALL' ||
      (vehicleFilter === 'RESIDENT' && s.parkingSpaceId === 1) ||
      (vehicleFilter === 'CAR' && s.parkingSpaceId === 2) ||
      (vehicleFilter === 'MOTOR' && s.parkingSpaceId === 3);

    const statusMatch =
      statusFilter === 'ALL' ||
      (statusFilter === 'ACTIVE' && !s.isSessionEnded) ||
      (statusFilter === 'ENDED' && s.isSessionEnded);

    const plateMatch = s.vehicleLicensePlate.toLowerCase().includes(searchQuery.toLowerCase());

    const dateMatch = (() => {
      // If no date filters are set, let the session through
      if (!startDateFilter && !endDateFilter) return true;
      // If filtering by date, skip active sessions
      if (!s.sessionEndedAt) return false;

      const endDate = new Date(s.sessionEndedAt);
      if (startDateFilter && endDate < new Date(startDateFilter)) return false;
      if (endDateFilter && endDate > new Date(endDateFilter)) return false;
      return true;
    })();

    return plateMatch && typeMatch && statusMatch && dateMatch;
  });

  const isSuspicious = (s: ParkingSession) => {
    if (s.isSessionEnded) return false; // don't flag ended sessions
  
    const startedAt = new Date(s.sessionStartedAt);
    const now = new Date();
    const elapsedMinutes = (now.getTime() - startedAt.getTime()) / (1000 * 60);
    const elapsedHours = elapsedMinutes / 60;
  
    const priceEstimate = elapsedHours * getRate(s.parkingSpaceId);
  
    return elapsedHours > 8 || priceEstimate > 100;
  };
  

  return {
    filteredSessions,
    mutation,
    isLoading,
    vehicleFilter,
    setVehicleFilter,
    statusFilter,
    setStatusFilter,
    startDateFilter,
    setStartDateFilter,
    endDateFilter,
    setEndDateFilter,
    searchQuery,
    setSearchQuery,
    // TODO: move to it's own file if there are more utils to be used
    utils: {
      isSuspicious,
    },
  }
};
