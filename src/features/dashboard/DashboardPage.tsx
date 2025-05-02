import { useOccupancyStats } from './hooks/useOccupancyStats';
import { useRevenueMetrics } from './hooks/useRevenueMetrics';
import { OccupancyBlock } from './components/OccupancyBlock';
import './DashboardPage.css';

export default function DashboardPage() {
  const { residentStats, carStats, motorcycleStats } = useOccupancyStats();
  const { totalFormatted, todayFormatted } = useRevenueMetrics();

  return (
    <div className="dashboard">
      <h2>Occupancy Overview</h2>
      <OccupancyBlock label="Residents" stats={residentStats} />
      <OccupancyBlock label="Non-Resident Cars" stats={carStats} />
      <OccupancyBlock label="Non-Resident Motorcycles" stats={motorcycleStats} />

      <div className="revenue-block">
        <h3>Total Revenue</h3>
        <p>{totalFormatted}</p>

        <h3>Today’s Revenue</h3>
        <p>{todayFormatted}</p>
      </div>
    </div>
  );
}