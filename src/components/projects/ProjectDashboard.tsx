import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BarChart, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Plus, 
  Users,
  MessageSquare,
  Calendar as CalendarIcon,
  ListTodo,
  Activity
} from 'lucide-react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { format } from 'date-fns';

interface ProjectDashboardProps {
  project: {
    tasks: {
      id: string;
      title: string;
      status: 'todo' | 'in_progress' | 'completed';
      priority: 'low' | 'medium' | 'high';
      dueDate: Date;
      assignee: {
        name: string;
        avatar?: string;
      };
    }[];
    activities: {
      id: string;
      type: 'comment' | 'update' | 'create' | 'complete';
      user: {
        name: string;
        avatar?: string;
      };
      content: string;
      timestamp: Date;
    }[];
    meetings: {
      id: string;
      title: string;
      date: Date;
      attendees: {
        name: string;
        avatar?: string;
      }[];
    }[];
    stats: {
      tasksCompleted: number;
      tasksInProgress: number;
      tasksPending: number;
      teamMembers: number;
    };
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export function ProjectDashboard({ project }: ProjectDashboardProps) {
  const taskStatusData = [
    { name: 'Completed', value: project.stats.tasksCompleted },
    { name: 'In Progress', value: project.stats.tasksInProgress },
    { name: 'Pending', value: project.stats.tasksPending },
  ];

  const activityIcons = {
    comment: <MessageSquare className="h-4 w-4" />,
    update: <Activity className="h-4 w-4" />,
    create: <Plus className="h-4 w-4" />,
    complete: <CheckCircle2 className="h-4 w-4" />,
  };

  const quickActions = [
    { icon: <Plus className="h-4 w-4" />, label: 'New Task', color: 'bg-blue-500' },
    { icon: <Users className="h-4 w-4" />, label: 'Team Meeting', color: 'bg-green-500' },
    { icon: <FileText className="h-4 w-4" />, label: 'Add Document', color: 'bg-purple-500' },
    { icon: <MessageSquare className="h-4 w-4" />, label: 'Discussion', color: 'bg-orange-500' },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      {/* Main Stats and Charts */}
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Tasks Completed</div>
              <div className="text-2xl font-bold">{project.stats.tasksCompleted}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">In Progress</div>
              <div className="text-2xl font-bold">{project.stats.tasksInProgress}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Pending</div>
              <div className="text-2xl font-bold">{project.stats.tasksPending}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Team Members</div>
              <div className="text-2xl font-bold">{project.stats.teamMembers}</div>
            </div>
          </div>

          <div className="mt-6 h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto flex-col gap-2 p-4 hover:bg-accent"
              >
                <div className={`${action.color} p-2 rounded-full text-white`}>
                  {action.icon}
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tasks Widget */}
      <Card className="lg:col-span-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Tasks</CardTitle>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {project.tasks.map((task) => (
              <div
                key={task.id}
                className="mb-4 flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-8 w-8">
                    {task.assignee.avatar && (
                      <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                    )}
                    <AvatarFallback>
                      {task.assignee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Due {format(task.dueDate, 'MMM d, yyyy')}
                    </div>
                  </div>
                </div>
                <Badge
                  variant={
                    task.status === 'completed'
                      ? 'default'
                      : task.status === 'in_progress'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {task.status}
                </Badge>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Calendar Widget */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={new Date()}
            className="rounded-md border"
          />
          <div className="mt-4 space-y-4">
            <h4 className="text-sm font-medium">Upcoming Meetings</h4>
            {project.meetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{meeting.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {format(meeting.date, 'MMM d, h:mm a')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card className="lg:col-span-7">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Recent Activity</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {project.activities.map((activity) => (
              <div
                key={activity.id}
                className="mb-4 flex items-start gap-4 rounded-lg border p-4"
              >
                <Avatar className="h-8 w-8">
                  {activity.user.avatar && (
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  )}
                  <AvatarFallback>
                    {activity.user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{activity.user.name}</span>
                    <span className="text-muted-foreground">
                      {activityIcons[activity.type]}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {format(activity.timestamp, 'MMM d, h:mm a')}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {activity.content}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
} 