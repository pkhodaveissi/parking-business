import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getParkingSpaces } from '../api';
import { getStats } from '../utils/getStats';

export const useOccupancyStats = () => {
  const { data: spaces = [], isLoading } = useQuery({
    queryKey: ['parkingSpaces'],
    queryFn: getParkingSpaces,
  });

  const residentStats = useMemo(() => getStats(1, spaces), [spaces]);
  const carStats = useMemo(() => getStats(2, spaces), [spaces]);
  const motorcycleStats = useMemo(() => getStats(3, spaces), [spaces]);

  return {
    residentStats,
    carStats,
    motorcycleStats,
    isLoading,
  };
};