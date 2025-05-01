import { useQuery } from '@tanstack/react-query';
import { DashboardSession, getEndedSessions } from '../api';

export const getRate = (spaceId: number) => {
  if (spaceId === 2) return 5;
  if (spaceId === 3) return 3;
  return 0;
};

const euroFormatter = new Intl.NumberFormat('en-NL', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const calculateRevenue = (sessions: DashboardSession[]) =>
  sessions.reduce((sum, s) => {
    const minutes = s.sessionLengthInHoursMinutes || 0;
    return sum + (minutes / 60) * getRate(s.parkingSpaceId);
  }, 0);

export const useRevenueMetrics = () => {
  const { data: sessions = [], isLoading: loadingAll } = useQuery({
    queryKey: ['endedSessions'],
    queryFn: () => getEndedSessions(),
  });

  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

  const { data: todaySessions = [], isLoading: loadingToday } = useQuery({
    queryKey: ['endedSessionsToday'],
    queryFn: () => getEndedSessions(startOfDay, endOfDay),
  });
  const totalRaw = Math.round(calculateRevenue(sessions) * 100) / 100;
  const todayRaw = Math.round(calculateRevenue(todaySessions) * 100) / 100;
  
  return {
    totalRevenue: totalRaw,
    todayRevenue: todayRaw,
    totalFormatted: euroFormatter.format(totalRaw),
    todayFormatted: euroFormatter.format(todayRaw),
    isLoading: loadingAll || loadingToday,
  };
};
