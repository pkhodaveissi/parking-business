import { useOccupancyStats } from './hooks/useOccupancyStats';
import { useRevenueMetrics } from './hooks/useRevenueMetrics';
import { OccupancyBlock } from './components/OccupancyBlock';
import './DashboardPage.css';

export default function DashboardPage() {
  const { residentStats, carStats, motorcycleStats, isLoading: loadingOccupancy } = useOccupancyStats();
  const { totalFormatted, todayFormatted, isLoading: loadingRevenue } = useRevenueMetrics();

  if (loadingOccupancy || loadingRevenue) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h2>Occupancy Overview</h2>
      <OccupancyBlock label="Residents" stats={residentStats} />
      <OccupancyBlock label="Cars" stats={carStats} />
      <OccupancyBlock label="Motorcycles" stats={motorcycleStats} />

      <div className="revenue-block">
        <h3>Total Revenue</h3>
        <p>{totalFormatted}</p>

        <h3>Today’s Revenue</h3>
        <p>{todayFormatted}</p>
      </div>
    </div>
  );
}