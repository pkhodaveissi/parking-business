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
