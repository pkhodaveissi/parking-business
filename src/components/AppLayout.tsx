import { useAuth } from '@/auth/useAuth';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/features/auth/api';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
        <div>
          <strong>ParkingBusiness</strong>
        </div>
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          <Link
            to="/dashboard"
            style={{
              fontWeight: isActive('/dashboard') ? 'bold' : 'normal',
              textDecoration: 'none'
            }}
          >
            Dashboard
          </Link>
          <Link
            to="/sessions"
            style={{
              fontWeight: isActive('/sessions') ? 'bold' : 'normal',
              textDecoration: 'none'
            }}
          >
            Sessions
          </Link>
        </nav>
        <div>
          {isLoading ? (
            'Loading user...'
          ) : (
            <>
              <span>{user?.email}</span>
              <button style={{ marginLeft: '1rem' }} onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};
