import { useQuery } from '@tanstack/react-query';
import { getParkingSpaces } from '../api';
import { getStats } from '../utils/getStats';

export const useOccupancyStats = () => {
  const { data: spaces = [], isLoading } = useQuery({
    queryKey: ['parkingSpaces'],
    queryFn: getParkingSpaces,
  });

  return {
    residentStats: getStats(1, spaces),
    carStats: getStats(2, spaces),
    motorcycleStats: getStats(3, spaces),
    isLoading,
  };
};