import { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { ModeToggle } from '../components/ui/mode-toggle';
import { useAuth } from '@/hooks/use-auth';

const AuthLayout: FC = () => {
  const { session } = useAuth();

  // If user is already authenticated, redirect to dashboard
  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative">
      <ModeToggle className="absolute top-4 right-4" />
      <div className="w-full max-w-md p-8 space-y-6">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome to CRM</h1>
          <p className="text-sm text-muted-foreground">
            Manage your business efficiently
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout; 