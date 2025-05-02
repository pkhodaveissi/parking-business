import { useSuspenseQuery } from '@tanstack/react-query';
import { getParkingSpaces } from '../api';
import { getStats } from '../utils/getStats';

export const useOccupancyStats = () => {
  const { data: spaces = [] } = useSuspenseQuery({
    queryKey: ['parkingSpaces'],
    queryFn: getParkingSpaces,
  });

  const residentStats = getStats(1, spaces);
  const carStats = getStats(2, spaces);
  const motorcycleStats = getStats(3, spaces);

  return {
    residentStats,
    carStats,
    motorcycleStats,
  };
};