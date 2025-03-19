import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';

const initialTasks = [
  {
    id: '1',
    title: 'Client Meeting',
    description: 'Discuss project requirements with the client',
    date: '2024-03-25',
    priority: 'high',
    assignee: {
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
  },
  {
    id: '2',
    title: 'Design Review',
    description: 'Review and approve new design mockups',
    date: '2024-03-26',
    priority: 'medium',
    assignee: {
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
  },
  // Add more tasks as needed
];

export function Tasks() {
  const [tasks] = useState(initialTasks);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState('list');

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <div className="flex items-center gap-4">
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="list">List View</SelectItem>
              <SelectItem value="calendar">Calendar</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  {task.title}
                </CardTitle>
                <Badge
                  variant={
                    task.priority === 'high'
                      ? 'destructive'
                      : task.priority === 'medium'
                      ? 'default'
                      : 'secondary'
                  }
                >
                  {task.priority}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {task.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={task.assignee.avatar} />
                      <AvatarFallback>
                        {task.assignee.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {task.assignee.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                    {format(new Date(task.date), 'MMM dd, yyyy')}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}