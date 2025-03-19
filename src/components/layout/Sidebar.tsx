import { Home, Users, UserPlus, MessageSquare, Settings, FolderKanban, Zap, BarChart, HelpCircle, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useLocation, Link } from 'react-router-dom'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Team', href: '/team', icon: UserPlus },
  { name: 'Chat', href: '/chat', icon: MessageSquare },
  { name: 'Automations', href: '/automations', icon: Zap },
  { name: 'Reports', href: '/reports', icon: BarChart },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Support', href: '/support', icon: HelpCircle },
  { name: 'Billing', href: '/billing', icon: CreditCard },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <h1 className="text-lg font-semibold">CRM</h1>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Button
              key={item.name}
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start',
                isActive && 'bg-accent'
              )}
              asChild
            >
              <Link to={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          )
        })}
      </nav>
    </div>
  )
} 