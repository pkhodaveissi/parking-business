export type OccupancyStats = {
  occupied: number;
  capacity: number;
  percent: number | null;
  hasBackendBug: boolean;
};

type ParkingSpace = {
  parkingSpaceId: number;
  occupancy: number;
  capacity: number;
};

export const getStats = (
  spaceId: number,
  spaces: ParkingSpace[]
): OccupancyStats => {
  const group = spaces.find((s) => s.parkingSpaceId === spaceId);
  if (!group) {
    return { occupied: 0, capacity: 0, percent: null, hasBackendBug: true };
  }

  const capacity = group.capacity ?? 0;
  const occupancy = group.occupancy ?? 0;

  const hasBackendBug = capacity < 0 || occupancy < 0;
  if (hasBackendBug) {
    console.warn('⚠ Backend bug in occupancy data', group);
    return { occupied: 0, capacity: 0, percent: null, hasBackendBug: true };
  }

  const percent = capacity > 0
    ? Math.round((occupancy / capacity) * 100)
    : null;

  return {
    occupied: occupancy,
    capacity,
    percent,
    hasBackendBug: false,
  };
};