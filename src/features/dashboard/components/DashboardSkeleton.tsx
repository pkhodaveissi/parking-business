import './DashboardSkeleton.css';

export const DashboardSkeleton = () => {
  const Section = ({ label }: { label: string }) => (
    <div className="skeleton-section">
      <h3>{label}</h3>
      <div className="skeleton-label" />
      <div className="skeleton-bar" />
    </div>
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Occupancy Overview</h2>
      <Section label="Residents" />
      <Section label="Cars" />
      <Section label="Motorcycles" />

      <div className="revenue-block">
        <h3>Total Revenue</h3>
        <div className="skeleton-small" />
        <h3>Today’s Revenue</h3>
        <div className="skeleton-smaller" />
      </div>
    </div>
  );
};