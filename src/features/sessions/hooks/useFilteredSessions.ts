import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { endSession, getSessions } from '../api';

const vehicleOptions = ['ALL', 'CAR', 'MOTOR', 'RESIDENT'] as const;
export type VehicleFilter = typeof vehicleOptions[number];

const statusOptions = ['ALL', 'ACTIVE', 'ENDED'] as const;
export type StatusFilter = typeof statusOptions[number];



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

  const [vehicleFilter, setVehicleFilter] = useState<VehicleFilter>('ALL');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
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
    vehicleOptions,
    statusOptions,
  }
};
