import axios from '@/api/axios';

export type ParkingSpace = {
  parkingSpaceId: number;
  isOccupied: boolean;
  vehicleType: 'CAR' | 'MOTOR';
  occupancy: number;
  capacity: number;
};

export const getParkingSpaces = async (): Promise<ParkingSpace[]> => {
  const res = await axios.get('/parking/spaces/list');
  return res.data.data.parkingSpaces;
};

export type DashboardSession = {
  parkingSessionId: string;
  parkingSpaceId: number; // 1 = Resident, 2 = Car, 3 = Motorcycle
  isSessionEnded: boolean;
  sessionLengthInHoursMinutes: number;
  sessionStartedAt: string;
  sessionEndedAt: string;
  vehicleLicensePlate: string;
  vehicleType: 'CAR' | 'MOTOR';
};

export type EndedSessionsResponse = {
  parkingSessions: DashboardSession[];
  parkingSessionsTotalCount: number;
};

export const getEndedSessions = async (
  from?: string,
  to?: string
): Promise<DashboardSession[]> => {
  const params: Record<string, any> = {
    isSessionEnded: true,
    limit: 1000,
  };

  if (from) params.sessionEndedAtFrom = from;
  if (to) params.sessionEndedAtTo = to;

  const res = await axios.get<EndedSessionsResponse>('/parking/sessions/list', { params });
  console.log( params.sessionEndedAtFrom , res)
  return res.data.data.parkingSessions;
};