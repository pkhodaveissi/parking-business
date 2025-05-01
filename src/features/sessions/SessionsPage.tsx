import { useFilteredSessions } from './hooks/useFilteredSessions';


const getSessionTypeLabel = (id: number): string => {
  if (id === 1) return 'Resident Sp.';
  if (id === 2) return 'Car Sp.';
  if (id === 3) return 'Motorcycle Sp.';
  return 'Unknown';
};

export default function SessionsPage() {
  const {
    filteredSessions,
    mutation,
    isLoading,
    vehicleFilter,
    setVehicleFilter,
    statusFilter,
    setStatusFilter,
    startDateFilter,
    setStartDateFilter,
    endDateFilter,
    setEndDateFilter,
  } = useFilteredSessions();

  if (isLoading) return <p>Loading sessions...</p>;
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Active Parking Sessions</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Category:{' '}
          <select value={vehicleFilter} onChange={(e) => setVehicleFilter(e.target.value as any)}>
            <option value="ALL">All</option>
            <option value="CAR">Car Space</option>
            <option value="MOTOR">Motorcycle Space</option>
            <option value="RESIDENT">Resident Space</option>
          </select>
        </label>

        <label style={{ marginLeft: '2rem' }}>
          Status:{' '}
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
            <option value="ALL">All</option>
            <option value="ACTIVE">Active</option>
            <option value="ENDED">Ended</option>
          </select>
        </label>

        <label style={{ marginLeft: '2rem' }}>
          Ended After:{' '}
          <input type="date" value={startDateFilter} onChange={(e) => setStartDateFilter(e.target.value)} />
        </label>

        <label style={{ marginLeft: '2rem' }}>
          Ended Before:{' '}
          <input type="date" value={endDateFilter} onChange={(e) => setEndDateFilter(e.target.value)} />
        </label>
      </div>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>License Plate</th>
            <th>Type</th>
            <th>Started At</th>
            <th>Ended At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSessions.map(session => (
            <tr key={session.parkingSessionId}>
              <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <code>{session.parkingSessionId.slice(0, 4)}...</code>
                <button
                  onClick={() => navigator.clipboard.writeText(session.parkingSessionId)}
                  title="Copy full ID"
                  style={{ cursor: 'pointer' }}
                >
                  ⿻
                </button>
              </td>
              <td>{getSessionTypeLabel(session.parkingSpaceId)}</td>
              <td>{session.vehicleLicensePlate}</td>
              <td>{session.vehicleType}</td>
              <td>{new Date(session.sessionStartedAt).toLocaleString()}</td>
              <td>
                {session.sessionEndedAt
                  ? new Date(session.sessionEndedAt).toLocaleString()
                  : '-'}
              </td>
              <td>{session.isSessionEnded ? 'Ended' : 'Active'}</td>
              <td>
                {!session.isSessionEnded && (
                  <button
                    onClick={() => mutation.mutate(session.parkingSessionId)}
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? 'Ending...' : 'End'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}