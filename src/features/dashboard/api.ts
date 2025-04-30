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