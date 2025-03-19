import { FC } from 'react';
import {
  Plus,
  Mail,
  Bell,
  Calendar,
  MessageSquare,
  FileCheck,
  GitBranch,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AutomationTemplate {
  title: string;
  description: string;
  icon: JSX.Element;
  category: string;
}

interface ActiveAutomation {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: boolean;
  lastRun?: string;
}

const templates: AutomationTemplate[] = [
  {
    title: 'Task Notifications',
    description: 'Send notifications when tasks are assigned or due',
    icon: <Bell className="h-6 w-6" />,
    category: 'Tasks',
  },
  {
    title: 'Email Updates',
    description: 'Automatically send project status updates via email',
    icon: <Mail className="h-6 w-6" />,
    category: 'Communication',
  },
  {
    title: 'Meeting Scheduler',
    description: 'Schedule meetings based on team availability',
    icon: <Calendar className="h-6 w-6" />,
    category: 'Calendar',
  },
  {
    title: 'Client Follow-up',
    description: 'Send follow-up messages to inactive clients',
    icon: <MessageSquare className="h-6 w-6" />,
    category: 'Client',
  },
  {
    title: 'Task Completion',
    description: 'Mark related tasks as complete automatically',
    icon: <FileCheck className="h-6 w-6" />,
    category: 'Tasks',
  },
  {
    title: 'Workflow Branching',
    description: 'Create conditional workflows based on task status',
    icon: <GitBranch className="h-6 w-6" />,
    category: 'Workflow',
  },
];

const activeAutomations: ActiveAutomation[] = [
  {
    id: '1',
    name: 'Daily Task Summary',
    trigger: 'Every day at 5 PM',
    action: 'Send email summary',
    status: true,
    lastRun: '2024-03-15 17:00',
  },
  {
    id: '2',
    name: 'Project Deadline Alert',
    trigger: '3 days before deadline',
    action: 'Send notification',
    status: true,
    lastRun: '2024-03-14 10:30',
  },
  {
    id: '3',
    name: 'Client Inactivity Check',
    trigger: 'After 30 days inactive',
    action: 'Create follow-up task',
    status: false,
    lastRun: '2024-03-01 09:15',
  },
];

const Automations: FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Automations</h1>
        <p className="mt-2 text-muted-foreground">
          Create and manage automated workflows
        </p>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Automations</CardTitle>
                <CardDescription>
                  Currently running automated workflows
                </CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Automation
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeAutomations.map((automation) => (
                <div
                  key={automation.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <p className="font-medium">{automation.name}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Trigger: {automation.trigger}</p>
                      <p>Action: {automation.action}</p>
                      {automation.lastRun && (
                        <p>Last run: {automation.lastRun}</p>
                      )}
                    </div>
                  </div>
                  <Switch checked={automation.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Automation Templates</h2>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="tasks">Tasks</SelectItem>
              <SelectItem value="communication">Communication</SelectItem>
              <SelectItem value="calendar">Calendar</SelectItem>
              <SelectItem value="client">Client</SelectItem>
              <SelectItem value="workflow">Workflow</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    {template.icon}
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      {template.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {template.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {template.category}
                  </span>
                  <Button variant="outline" size="sm">
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Automations; 