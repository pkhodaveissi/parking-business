import './OccupancyBlock.css';

export const OccupancyBlock = ({
  label,
  stats,
}: {
  label: string;
  stats: { occupied: number; capacity: number; percent: number | null };
}) => (
  <div className="occupancy-block">
    <h3 className="occupancy-label">{label}</h3>
    {stats.percent === null ? (
      <p className="occupancy-warning">Occupancy data unavailable</p>
    ) : (
      <>
        <p>
          {stats.occupied} / {stats.capacity} occupied ({stats.percent}%)
        </p>
        <div className="occupancy-bar">
          <div
            className="occupancy-bar-fill"
            style={{ width: `${stats.percent}%` }}
          />
        </div>
      </>
    )}
  </div>
);