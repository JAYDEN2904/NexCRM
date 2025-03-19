import { useState } from 'react'
import { Bell, X, Check, AlertCircle, MessageSquare, Calendar, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Notification {
  id: string
  type: 'message' | 'meeting' | 'task' | 'system'
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: 'high' | 'medium' | 'low'
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New Team Message',
    message: 'John Doe sent you a message in the Engineering channel',
    timestamp: '2024-02-20T10:30:00Z',
    read: false,
    priority: 'high',
  },
  {
    id: '2',
    type: 'meeting',
    title: 'Upcoming Meeting',
    message: 'Team sync meeting in 30 minutes',
    timestamp: '2024-02-20T11:00:00Z',
    read: false,
    priority: 'high',
  },
  {
    id: '3',
    type: 'task',
    title: 'Task Assigned',
    message: 'You have been assigned to the new feature implementation',
    timestamp: '2024-02-20T09:15:00Z',
    read: true,
    priority: 'medium',
  },
  {
    id: '4',
    type: 'system',
    title: 'System Update',
    message: 'New version of the application has been deployed',
    timestamp: '2024-02-20T08:00:00Z',
    read: true,
    priority: 'low',
  },
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<string>('all')

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'all') return true
    return notification.type === filter
  })

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    )
  }

  const handleClearAll = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, read: true }))
    )
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4" />
      case 'meeting':
        return <Calendar className="h-4 w-4" />
      case 'task':
        return <Check className="h-4 w-4" />
      case 'system':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-xs"
          >
            Mark all as read
          </Button>
        </div>
        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <TabsList className="w-full justify-start rounded-none border-b">
            <TabsTrigger value="all" className="rounded-none">
              All
            </TabsTrigger>
            <TabsTrigger value="message" className="rounded-none">
              Messages
            </TabsTrigger>
            <TabsTrigger value="meeting" className="rounded-none">
              Meetings
            </TabsTrigger>
            <TabsTrigger value="task" className="rounded-none">
              Tasks
            </TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[400px]">
            <div className="p-4 space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-4 p-3 rounded-lg ${
                    notification.read ? 'bg-transparent' : 'bg-accent'
                  }`}
                >
                  <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{notification.title}</p>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
} 