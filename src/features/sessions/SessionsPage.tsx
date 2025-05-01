import { StatusFilter, useFilteredSessions, VehicleFilter } from './hooks/useFilteredSessions';
import './SessionsPage.css';
import { isSuspicious } from './utils/isSuspicious';

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
    searchQuery,
    setSearchQuery,
    vehicleOptions,
    statusOptions,
  } = useFilteredSessions();

  if (isLoading) return <p>Loading sessions...</p>;
  return (
    <div className="sessions-page">
      <h2>Active Parking Sessions</h2>

      <div className="filters">
        <label>
          Category:{' '}
          <select value={vehicleFilter} onChange={(e) => setVehicleFilter(e.target.value as VehicleFilter)}>
            {vehicleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Status:{' '}
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          License Plate:{' '}
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </label>

        <label>
          Ended After:{' '}
          <input type="date" value={startDateFilter} onChange={(e) => setStartDateFilter(e.target.value)} />
        </label>

        <label>
          Ended Before:{' '}
          <input type="date" value={endDateFilter} onChange={(e) => setEndDateFilter(e.target.value)} />
        </label>
      </div>
      <div className="table-container">
        <table className="sessions-table">
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
              <tr
                key={session.parkingSessionId}
                className={isSuspicious(session) ? 'suspicious-row' : ''}
              >
                <td>
                  <code>{session.parkingSessionId.slice(0, 4)}...</code>
                  <button
                    onClick={() => navigator.clipboard.writeText(session.parkingSessionId)}
                    title="Copy full ID"
                    className="copy-button"
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
                <td className="action-cell">
                  <button
                    className="action-plate-link"
                    onClick={() => setSearchQuery(session.vehicleLicensePlate)}
                  >
                    {session.vehicleLicensePlate}
                  </button>

                  {!session.isSessionEnded && (
                    <button
                      className="end-button"
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
    </div>
  );
}