import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ModeToggle } from '../components/ui/mode-toggle';

const LandingLayout: FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-xl font-bold">CRM Pro</div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <a href="/login" className="text-sm font-medium hover:text-primary">
              Sign In
            </a>
            <a
              href="/signup"
              className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default LandingLayout; 