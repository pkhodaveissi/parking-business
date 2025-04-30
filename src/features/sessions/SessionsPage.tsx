import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSessions, endSession } from './api';

const getSessionTypeLabel = (id: number): string => {
  if (id === 1) return 'Resident Sp.';
  if (id === 2) return 'Car Sp.';
  if (id === 3) return 'Motorcycle Sp.';
  return 'Unknown';
};
export default function SessionsPage() {
  const queryClient = useQueryClient();
  // TODO: move logic to a custom hook
  const { data: sessions, isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: getSessions,
  });

  const mutation = useMutation({
    mutationFn: endSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });

  // TODO: Use the same type axios call has with a pluck to avoid repetition
  const [vehicleFilter, setVehicleFilter] = useState<'ALL' | 'CAR' | 'MOTOR' | 'RESIDENT'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'ENDED'>('ALL');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  if (isLoading) return <p>Loading sessions...</p>;
  if (!sessions) return <p>Error loading sessions.</p>;

  const filteredSessions = sessions.filter((s) => {
    const typeMatch =
      vehicleFilter === 'ALL' ||
      (vehicleFilter === 'RESIDENT' && s.parkingSpaceId === 1) ||
      (vehicleFilter === 'CAR' && s.parkingSpaceId === 2) ||
      (vehicleFilter === 'MOTOR' && s.parkingSpaceId === 3);

    const statusMatch =
      statusFilter === 'ALL' ||
      (statusFilter === 'ACTIVE' && !s.isSessionEnded) ||
      (statusFilter === 'ENDED' && s.isSessionEnded);

    const dateMatch = (() => {
        if (!s.sessionEndedAt) return false;
        const endDate = new Date(s.sessionEndedAt);
        if (startDateFilter && endDate < new Date(startDateFilter)) return false;
        if (endDateFilter && endDate > new Date(endDateFilter)) return false;
        return true;
      })();
    return typeMatch && statusMatch && dateMatch;
  });

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
          <input
            type="date"
            value={startDateFilter}
            onChange={(e) => setStartDateFilter(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: '2rem' }}>
          Ended Before:{' '}
          <input
            type="date"
            value={endDateFilter}
            onChange={(e) => setEndDateFilter(e.target.value)}
          />
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
                  📋
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