import axios from '@/api/axios';

export type ParkingSession = {
  parkingSessionId: string;
  parkingSpaceId: number;
  isSessionEnded: boolean;
  sessionLengthInHoursMinutes: number;
  sessionStartedAt: string;
  sessionEndedAt?: string;
  vehicleLicensePlate: string;
  vehicleType: 'CAR' | 'MOTOR';
};

export const getSessions = async (): Promise<ParkingSession[]> => {
  const res = await axios.get('/parking/sessions/list?limit=1000');
  return res.data.data.parkingSessions;
};


export const endSession = async (id: string) => {
  const res = await axios.post('/parking/session/end', {
    parkingSession: {
      id,
    },
  });
  return res.data;
};