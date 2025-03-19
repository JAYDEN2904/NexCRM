import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Download, Filter, Plus } from 'lucide-react';

interface ProjectAnalyticsProps {
  project: {
    id: string;
    name: string;
    tasks: {
      id: string;
      title: string;
      status: 'todo' | 'in_progress' | 'completed';
      priority: 'low' | 'medium' | 'high';
      estimatedHours: number;
      actualHours?: number;
      assignedTo: string;
    }[];
    team: {
      id: string;
      name: string;
      role: string;
    }[];
    milestones: {
      id: string;
      title: string;
      status: 'pending' | 'in_progress' | 'completed';
      progress: number;
    }[];
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Mock data - In a real app, this would come from your backend
const salesData = [
  { month: 'Jan', revenue: 4000, forecast: 4200, lastYear: 3800 },
  { month: 'Feb', revenue: 4500, forecast: 4300, lastYear: 3900 },
  { month: 'Mar', revenue: 4100, forecast: 4400, lastYear: 3700 },
  { month: 'Apr', revenue: 4800, forecast: 4600, lastYear: 4100 },
  { month: 'May', revenue: 5200, forecast: 4800, lastYear: 4300 },
  { month: 'Jun', revenue: 5100, forecast: 5000, lastYear: 4500 },
];

const pipelineData = [
  { stage: 'Lead', value: 120 },
  { stage: 'Qualified', value: 86 },
  { stage: 'Proposal', value: 54 },
  { stage: 'Negotiation', value: 32 },
  { stage: 'Closed', value: 22 },
];

const engagementData = [
  { date: '2024-01', engagement: 85, churn: 2 },
  { date: '2024-02', engagement: 88, churn: 1.8 },
  { date: '2024-03', engagement: 92, churn: 1.5 },
  { date: '2024-04', engagement: 90, churn: 1.7 },
  { date: '2024-05', engagement: 95, churn: 1.2 },
];

export function ProjectAnalytics({ project }: ProjectAnalyticsProps) {
  const [timeRange, setTimeRange] = useState('1y');
  const [dashboardLayout, setDashboardLayout] = useState('default');

  const exportData = (type: string) => {
    // In a real app, this would handle different export formats
    const data = {
      projectName: project.name,
      salesData,
      pipelineData,
      engagementData,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name}-analytics-${new Date().toISOString()}.${type}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Calculate task status distribution
  const taskStatusData = project.tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const taskStatusChartData = Object.entries(taskStatusData).map(
    ([name, value]) => ({ name, value })
  );

  // Calculate task priority distribution
  const taskPriorityData = project.tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const taskPriorityChartData = Object.entries(taskPriorityData).map(
    ([name, value]) => ({ name, value })
  );

  // Calculate team member workload
  const teamWorkloadData = project.team.map(member => {
    const memberTasks = project.tasks.filter(t => t.assignedTo === member.id);
    return {
      name: member.name,
      tasks: memberTasks.length,
      completed: memberTasks.filter(t => t.status === 'completed').length,
    };
  });

  // Calculate milestone progress
  const milestoneProgressData = project.milestones.map(milestone => ({
    name: milestone.title,
    progress: milestone.progress,
  }));

  // Calculate time tracking metrics
  const timeTrackingData = project.tasks.reduce((acc, task) => {
    if (task.actualHours) {
      acc.estimated += task.estimatedHours;
      acc.actual += task.actualHours;
    }
    return acc;
  }, { estimated: 0, actual: 0 });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive project analytics and insights
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dashboardLayout} onValueChange={setDashboardLayout}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="sales">Sales Focus</SelectItem>
              <SelectItem value="customer">Customer Focus</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Widget
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales & Revenue</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="engagement">Customer Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#0088FE" />
                      <Bar dataKey="forecast" fill="#00C49F" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={pipelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="stage" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="engagement" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="churn" stroke="#ff7300" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Revenue Forecast</CardTitle>
                <Button variant="outline" size="sm" onClick={() => exportData('csv')}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                      <Line type="monotone" dataKey="forecast" stroke="#82ca9d" strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="lastYear" stroke="#ffc658" strokeDasharray="3 3" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Sales Pipeline</CardTitle>
                <Button variant="outline" size="sm" onClick={() => exportData('xlsx')}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pipelineData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pipelineData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pipeline Analysis</CardTitle>
              <Button variant="outline" size="sm" onClick={() => exportData('pdf')}>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pipelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8">
                      {pipelineData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Engagement Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="engagement" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Churn Rate Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="churn" stroke="#ff7300" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 