import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import LoginPage from './features/auth/LoginPage';
import DashboardPage from './features/dashboard/DashboardPage';
import SessionsPage from './features/sessions/SessionsPage';
import { RequireAuth } from './auth/RequireAuth';
import { Suspense } from 'react';
import { DashboardSkeleton } from './features/dashboard/components/DashboardSkeleton';
export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <AppLayout>
              <Suspense fallback={<DashboardSkeleton />}>
                <DashboardPage />
              </Suspense>
            </AppLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/sessions"
        element={
          <RequireAuth>
            <AppLayout>
              <SessionsPage />
            </AppLayout>
          </RequireAuth>
        }
      />
    </Routes>
  );
}