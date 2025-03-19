import { FC } from 'react';
import { BarChart3, Users, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReportCard {
  title: string;
  description: string;
  icon: JSX.Element;
}

const reports: ReportCard[] = [
  {
    title: 'Project Performance',
    description: 'Track project completion rates, timelines, and resource allocation',
    icon: <BarChart3 className="h-6 w-6" />,
  },
  {
    title: 'Task Analytics',
    description: 'Analyze task distribution, completion rates, and team productivity',
    icon: <Calendar className="h-6 w-6" />,
  },
  {
    title: 'Client Interactions',
    description: 'Monitor client engagement, feedback, and satisfaction metrics',
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: 'Revenue Analysis',
    description: 'Track financial metrics, project costs, and revenue trends',
    icon: <DollarSign className="h-6 w-6" />,
  },
];

const Reports: FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <p className="mt-2 text-muted-foreground">
          Comprehensive insights into your business performance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {reports.map((report, index) => (
          <Card key={index} className="hover:bg-accent/50 cursor-pointer transition-colors">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  {report.icon}
                </div>
                <CardTitle className="text-lg">{report.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{report.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">Project Timeline Chart Coming Soon</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">Task Distribution Chart Coming Soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports; 