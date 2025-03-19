import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import LandingLayout from './layouts/LandingLayout';
import LoadingSpinner from './components/shared/LoadingSpinner';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Lazy load components
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Projects = lazy(() => import('./pages/projects/Projects'));
const Clients = lazy(() => import('./pages/clients/Clients'));
const Team = lazy(() => import('./pages/team/Team'));
const Automations = lazy(() => import('./pages/automations/Automations'));
const Reports = lazy(() => import('./pages/reports/Reports'));
const Settings = lazy(() => import('./pages/settings/Settings'));
const Support = lazy(() => import('./pages/support/Support'));
const Billing = lazy(() => import('./pages/billing/Billing'));
const LandingPage = lazy(() => import('./pages/LandingPage'));

// Create a wrapper component for protected routes
function ProtectedRoutes() {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <MainLayout />;
}

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<LandingLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects/*" element={<Projects />} />
            <Route path="/clients/*" element={<Clients />} />
            <Route path="/team/*" element={<Team />} />
            <Route path="/automations/*" element={<Automations />} />
            <Route path="/reports/*" element={<Reports />} />
            <Route path="/settings/*" element={<Settings />} />
            <Route path="/support/*" element={<Support />} />
            <Route path="/billing/*" element={<Billing />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="crm-theme">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;