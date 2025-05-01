import { useQuery } from '@tanstack/react-query';
import { getEndedSessions } from '../api';
import { calculateRevenue } from '@/utils/revenue';

const euroFormatter = new Intl.NumberFormat('en-NL', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});


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
