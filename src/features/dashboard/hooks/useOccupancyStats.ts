import { useQuery } from '@tanstack/react-query';
import { getParkingSpaces } from '../api';

export const useOccupancyStats = () => {
  const { data: spaces = [], isLoading } = useQuery({
    queryKey: ['parkingSpaces'],
    queryFn: getParkingSpaces,
  });

  const getStats = (spaceId: 1 | 2 | 3) => {
    const group = spaces.find((s) => s.parkingSpaceId === spaceId);
    if (!group) return { occupied: 0, capacity: 0, percent: 0 };

    const capacity = group.capacity ?? 0;
    const freeSpots = Math.abs(group.occupancy ?? 0);
    const occupied = capacity - freeSpots;
    const percent = capacity > 0 ? Math.round((occupied / capacity) * 100) : 0;

    return { occupied, capacity, percent };
  };

  return {
    residentStats: getStats(1),
    carStats: getStats(2),
    motorcycleStats: getStats(3),
    isLoading,
  };
};
