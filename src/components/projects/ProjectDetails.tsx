import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import { Calendar, Users, Target, Clock } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'in_progress' | 'completed';
  progress: number;
}

interface ProjectDetailsProps {
  project: {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: 'planning' | 'active' | 'completed' | 'on_hold';
    progress: number;
    team: {
      id: string;
      name: string;
      role: string;
    }[];
    milestones: Milestone[];
  };
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const statusColors = {
    planning: 'bg-blue-100 text-blue-800',
    active: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    on_hold: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{project.name}</CardTitle>
            <Badge className={statusColors[project.status]}>
              {project.status.replace('_', ' ')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">{project.description}</p>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Timeline</p>
                <p className="text-sm text-muted-foreground">
                  {format(project.startDate, 'MMM dd, yyyy')} - {format(project.endDate, 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Team Size</p>
                <p className="text-sm text-muted-foreground">{project.team.length} members</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Milestones</p>
                <p className="text-sm text-muted-foreground">{project.milestones.length} total</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Progress</p>
                <p className="text-sm text-muted-foreground">{project.progress}%</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Progress value={project.progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {project.milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-start justify-between p-4 border rounded-lg"
              >
                <div className="space-y-2">
                  <h4 className="font-medium">{milestone.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {milestone.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        milestone.status === 'completed'
                          ? 'default'
                          : milestone.status === 'in_progress'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {milestone.status.replace('_', ' ')}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Due: {format(milestone.dueDate, 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
                <Progress value={milestone.progress} className="w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 