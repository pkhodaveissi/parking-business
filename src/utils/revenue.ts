export const getRate = (spaceId: number): number => {
  if (spaceId === 2) return 5; // Car
  if (spaceId === 3) return 3; // Motorcycle
  return 0; // Resident or unknown
};

export type Session = {
  parkingSpaceId: number;
  sessionLengthInHoursMinutes: number;
};

export const calculateRevenue = (sessions: Session[]): number =>
  sessions.reduce((sum, s) => {
    const hours = (s.sessionLengthInHoursMinutes || 0) / 60;
    return sum + hours * getRate(s.parkingSpaceId);
  }, 0);