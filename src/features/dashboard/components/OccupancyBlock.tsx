export const OccupancyBlock = ({
  label,
  stats,
}: {
  label: string;
  stats: { occupied: number; capacity: number; percent: number | null };
}) => (
  <div style={{ marginBottom: '2rem' }}>
    <h3>{label}</h3>
    {stats.percent === null ? (
      <p style={{ color: 'orange' }}>Occupancy data unavailable</p>
    ) : (
      <>
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
      </>
    )}
  </div>
);