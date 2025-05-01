import { describe, it, expect } from 'vitest';
import { getStats } from './getStats';

const mockSpaces = [
  { parkingSpaceId: 1, occupancy: 25, capacity: 50 },
  { parkingSpaceId: 2, occupancy: 80, capacity: 100 },
  { parkingSpaceId: 3, occupancy: -5, capacity: 20 }, // invalid
];

describe('getStats', () => {
  it('calculates correct percentage and values', () => {
    const result = getStats(1, mockSpaces);
    expect(result).toEqual({
      occupied: 25,
      capacity: 50,
      percent: 50,
      hasBackendBug: false,
    });
  });

  it('returns percent null if capacity is zero', () => {
    const result = getStats(99, [
      { parkingSpaceId: 99, occupancy: 0, capacity: 0 },
    ]);
    expect(result.percent).toBeNull();
    expect(result.hasBackendBug).toBe(false);
  });

  it('flags backend bug when occupancy is negative', () => {
    const result = getStats(3, mockSpaces);
    expect(result.hasBackendBug).toBe(true);
    expect(result.percent).toBeNull();
  });

  it('flags backend bug when capacity is negative', () => {
    const result = getStats(4, [
      { parkingSpaceId: 4, occupancy: 5, capacity: -50 },
    ]);
    expect(result.hasBackendBug).toBe(true);
    expect(result.percent).toBeNull();
  });

  it('returns fallback when space ID is not found', () => {
    const result = getStats(999, mockSpaces);
    expect(result).toEqual({
      occupied: 0,
      capacity: 0,
      percent: null,
      hasBackendBug: true,
    });
  });
});
