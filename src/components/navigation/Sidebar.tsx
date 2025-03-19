import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  UserCircle,
  Settings,
  BarChart,
  Headphones,
  CreditCard,
  Workflow,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/projects', icon: Briefcase, label: 'Projects' },
    { path: '/clients', icon: Users, label: 'Clients' },
    { path: '/team', icon: UserCircle, label: 'Team' },
    { path: '/automations', icon: Workflow, label: 'Automations' },
    { path: '/reports', icon: BarChart, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/support', icon: Headphones, label: 'Support' },
    { path: '/billing', icon: CreditCard, label: 'Billing' },
  ];

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } transition-width duration-300 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4">
          {isOpen && (
            <span className="text-xl font-semibold text-gray-800 dark:text-white">
              CRM Pro
            </span>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {isOpen && <span className="ml-3">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar; 