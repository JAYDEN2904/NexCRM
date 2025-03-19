import { FC } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutGrid,
  Users,
  FolderKanban,
  Settings,
  BarChart3,
  HelpCircle,
  CreditCard,
  Zap,
  Search,
  Bell,
  Moon,
  Sun,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/components/theme-provider';

interface NavItem {
  title: string;
  href: string;
  icon: JSX.Element;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutGrid className="h-5 w-5" />,
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: <FolderKanban className="h-5 w-5" />,
  },
  {
    title: 'Clients',
    href: '/clients',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'Team',
    href: '/team',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: 'Support',
    href: '/support',
    icon: <HelpCircle className="h-5 w-5" />,
  },
  {
    title: 'Billing',
    href: '/billing',
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: 'Automations',
    href: '/automations',
    icon: <Zap className="h-5 w-5" />,
  },
];

const MainLayout: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-20 h-full w-64 border-r bg-card">
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
            <span>CRM Pro</span>
          </Link>
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                location.pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 min-h-screen">
        {/* Top navigation */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-6">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="w-full pl-9"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              size="icon"
              className="text-foreground hover:text-foreground"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="text-foreground hover:text-foreground"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                    <AvatarFallback>AT</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <div className="h-[calc(100vh-4rem)] w-full p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout; 