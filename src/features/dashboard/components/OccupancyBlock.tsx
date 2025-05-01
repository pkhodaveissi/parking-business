import './OccupancyBlock.css';

export const OccupancyBlock = ({
  label,
  stats,
}: {
  label: string;
  stats: {
    occupied: number;
    capacity: number;
    percent: number | null;
    hasBackendBug: boolean;
  };
}) => (
  <div className="occupancy-block">
    <h3 className="occupancy-label">{label}</h3>
    <p>
      {stats.occupied} / {stats.capacity} occupied
      {stats.percent !== null && ` (${stats.percent}%)`}
    </p>

    <div className="occupancy-bar">
      <div
        className={`occupancy-bar-fill ${
          stats.hasBackendBug ? 'bug-fill' : ''
        }`}
        style={{ width: `${stats.percent ?? 100}%` }}
      />
    </div>

    {stats.hasBackendBug && (
      <p className="occupancy-warning">
        ⚠ Occupancy data may be inaccurate due to backend issue
      </p>
    )}
  </div>
);
