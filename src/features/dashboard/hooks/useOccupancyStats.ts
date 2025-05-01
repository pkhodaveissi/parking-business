import { useQuery } from '@tanstack/react-query';
import { getParkingSpaces } from '../api';

export const useOccupancyStats = () => {
  const { data: spaces = [], isLoading } = useQuery({
    queryKey: ['parkingSpaces'],
    queryFn: getParkingSpaces,
  });

  const getStats = (spaceId: 1 | 2 | 3) => {
    const group = spaces.find((s) => s.parkingSpaceId === spaceId);
    if (!group) {
      console.warn(`No data found for parkingSpaceId: ${spaceId}`);
      return { occupied: 0, capacity: 0, percent: null };
    }
  
    const rawCapacity = group.capacity ?? 0;
    const rawOccupancy = group.occupancy ?? 0;
  
    const hasBug = rawCapacity < 0 || rawOccupancy < 0;
    if (hasBug) {
      console.warn('Backend bug detected in occupancy data:', {
        spaceId,
        capacity: rawCapacity,
        occupancy: rawOccupancy,
      });
    }
  
    const capacity = Math.max(0, rawCapacity);
    const occupancy = Math.max(0, rawOccupancy);
    const percent = capacity > 0 ? Math.round((occupancy / capacity) * 100) : null;
  
    return {
      occupied: occupancy,
      capacity,
      percent,
    };
  };

  return {
    residentStats: getStats(1),
    carStats: getStats(2),
    motorcycleStats: getStats(3),
    isLoading,
  };
};
