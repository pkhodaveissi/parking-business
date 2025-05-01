import { describe, it, expect, vi } from 'vitest';
import { isSuspicious } from './isSuspicious';
import { ParkingSession } from '../api';

// Freeze system time for consistent tests
const mockNow = new Date('2025-01-01T12:00:00Z');
vi.useFakeTimers().setSystemTime(mockNow);

// Base session mock
const baseSession: ParkingSession = {
  parkingSessionId: 'abc123',
  parkingSpaceId: 2,
  isSessionEnded: false,
  sessionLengthInHoursMinutes: 0,
  sessionStartedAt: '2025-01-01T10:00:00Z',
  vehicleLicensePlate: 'XX-123-YY',
  vehicleType: 'CAR',
};

describe('isSuspicious', () => {
  it('returns false for ended sessions', () => {
    expect(
      isSuspicious({ ...baseSession, isSessionEnded: true })
    ).toBe(false);
  });

  it('returns false for short, cheap active session', () => {
    const session = {
      ...baseSession,
      sessionStartedAt: '2025-01-01T11:00:00Z', // 1h ago → €5
    };
    expect(isSuspicious(session)).toBe(false);
  });

  it('returns true for long active session (>8h)', () => {
    const session = {
      ...baseSession,
      sessionStartedAt: '2025-01-01T02:00:00Z', // 10h ago
    };
    expect(isSuspicious(session)).toBe(true);
  });

  it('returns true for expensive active session (>€100)', () => {
    const session = {
      ...baseSession,
      parkingSpaceId: 2, // €5/hr
      sessionStartedAt: '2024-12-31T08:00:00Z', // 28h ago → €140
    };
    expect(isSuspicious(session)).toBe(true);
  });

  it('returns false for exactly 8h and €100', () => {
    const session = {
      ...baseSession,
      parkingSpaceId: 2, // €5/hr
      sessionStartedAt: '2025-01-01T04:00:00Z', // 8h ago → €100
    };
    expect(isSuspicious(session)).toBe(false);
  });
});
