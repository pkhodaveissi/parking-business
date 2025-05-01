import { useAuth } from '@/auth/useAuth';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/features/auth/api';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './AppLayout.css';

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
      <header className="app-header">
        <div>
          <strong>ParkingBusiness</strong>
        </div>
        <nav>
          <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
            Dashboard
          </Link>
          <Link to="/sessions" className={isActive('/sessions') ? 'active' : ''}>
            Sessions
          </Link>
        </nav>
        <div className="user-info">
          {isLoading ? (
            'Loading user...'
          ) : (
            <>
              <span>{user?.email}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};
