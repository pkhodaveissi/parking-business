import { useQuery } from '@tanstack/react-query';
import { getParkingSpaces } from './api';

export default function DashboardPage() {
  const { data: spaces, isLoading } = useQuery({
    queryKey: ['parkingSpaces'],
    queryFn: getParkingSpaces,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!spaces) return <p>Error loading data.</p>;
  // TODO: Move to a custom hook for readability and maintainability
  // Group-based summary using one representative row per type
  const getStats = (type: 'CAR' | 'MOTOR' | null) => {
    const group = spaces.find(
      (s) => s.vehicleType === type || (type === null && s.vehicleType === null)
    );
    if (!group) return { occupied: 0, capacity: 0, percent: 0 };
  
    const capacity = group.capacity ?? 0;
    const freeSpots = Math.abs(group.occupancy ?? 0);
    const occupied = capacity - freeSpots;
    const percent = capacity > 0 ? Math.round((occupied / capacity) * 100) : 0;
  
    return { occupied, capacity, percent };
  };

  const residentStats = getStats(null);
  const carStats = getStats('CAR');
  const motorcycleStats = getStats('MOTOR');

  // TODO: if necessary, move ot it's own component file
  // Reusable display component
  const renderStat = (label: string, stats: { occupied: number; capacity: number; percent: number }) => (
    <div key={label} style={{ marginBottom: '2rem' }}>
      <h3>{label}</h3>
      <p>
        {stats.occupied} / {stats.capacity} occupied ({stats.percent}%)
      </p>
      <div style={{ background: '#eee', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${stats.percent}%`,
            background: '#0070f3',
            height: '100%',
          }}
        />
      </div>
    </div>
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Occupancy Overview</h2>
      {renderStat('Residents', residentStats)}
      {renderStat('Cars', carStats)}
      {renderStat('Motorcycles', motorcycleStats)}
    </div>
  );
}