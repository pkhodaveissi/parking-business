import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import DashboardPage from './features/dashboard/DashboardPage';
import SessionsPage from './features/sessions/SessionsPage';
import { useAuth } from './auth/useAuth';

export default function App() {
  const { isAuthenticated } = useAuth(); // We'll build this

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/sessions" element={<SessionsPage />} />
    </Routes>
  );
}