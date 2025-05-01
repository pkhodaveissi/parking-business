// tests/revenue.test.ts
import { describe, it, expect } from 'vitest';
import { getRate, calculateRevenue } from './revenue';

describe('getRate', () => {
  it('returns 5 for car space (id 2)', () => {
    expect(getRate(2)).toBe(5);
  });

  it('returns 3 for motorcycle space (id 3)', () => {
    expect(getRate(3)).toBe(3);
  });

  it('returns 0 for resident/invalid space', () => {
    expect(getRate(1)).toBe(0);
    expect(getRate(999)).toBe(0);
  });
});

describe('calculateRevenue', () => {
  it('returns 0 for empty input', () => {
    expect(calculateRevenue([])).toBe(0);
  });

  it('calculates revenue for car and motorcycle sessions', () => {
    const sessions = [
      { parkingSpaceId: 2, sessionLengthInHoursMinutes: 120 }, // 2h * €5 = 10
      { parkingSpaceId: 3, sessionLengthInHoursMinutes: 180 }, // 3h * €3 = 9
    ];
    expect(calculateRevenue(sessions)).toBe(19);
  });

  it('ignores sessions with 0 duration', () => {
    const sessions = [
      { parkingSpaceId: 2, sessionLengthInHoursMinutes: 0 },
    ];
    expect(calculateRevenue(sessions)).toBe(0);
  });

  it('calculates partial hours correctly', () => {
    const sessions = [
      { parkingSpaceId: 2, sessionLengthInHoursMinutes: 30 }, // 0.5h * €5 = 2.5
    ];
    expect(calculateRevenue(sessions)).toBeCloseTo(2.5);
  });
});
