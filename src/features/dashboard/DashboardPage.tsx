import { useOccupancyStats } from './hooks/useOccupancyStats';
import { useRevenueMetrics } from './hooks/useRevenueMetrics';
import { OccupancyBlock } from './components/OccupancyBlock';

export default function DashboardPage() {
  const { residentStats, carStats, motorcycleStats, isLoading: loadingOccupancy } = useOccupancyStats();
  const { totalRevenue, todayRevenue, isLoading: loadingRevenue } = useRevenueMetrics();

  if (loadingOccupancy || loadingRevenue) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Occupancy Overview</h2>
      <OccupancyBlock label="Residents" stats={residentStats} />
      <OccupancyBlock label="Cars" stats={carStats} />
      <OccupancyBlock label="Motorcycles" stats={motorcycleStats} />

      <h3>Total Revenue</h3>
      <p>€{totalRevenue.toFixed(2)}</p>

      <h3>Today’s Revenue</h3>
      <p>€{todayRevenue.toFixed(2)}</p>
    </div>
  );
}