import { FC } from 'react';
import { Bell, Menu, Sun, Moon, Search } from 'lucide-react';
import { useTheme } from '../ui/ThemeProvider';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <img
              src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">User Name</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">user@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 