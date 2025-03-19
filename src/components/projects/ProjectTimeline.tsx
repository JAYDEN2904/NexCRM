import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, differenceInDays, startOfDay, addDays } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Task {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  dependencies?: string[];
  priority: 'low' | 'medium' | 'high';
  assignee?: {
    name: string;
    avatar?: string;
  };
}

interface ProjectTimelineProps {
  tasks: Task[];
}

export function ProjectTimeline({ tasks }: ProjectTimelineProps) {
  // Calculate timeline dimensions
  const startDate = startOfDay(new Date(Math.min(...tasks.map(t => t.startDate.getTime()))));
  const endDate = startOfDay(new Date(Math.max(...tasks.map(t => t.endDate.getTime()))));
  const totalDays = differenceInDays(endDate, startDate) + 1;

  // Generate day labels
  const dayLabels = Array.from({ length: totalDays }, (_, i) => {
    const date = addDays(startDate, i);
    return {
      short: format(date, 'dd'),
      month: format(date, 'MMM'),
      full: format(date, 'MMM dd'),
      isToday: format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'),
      isWeekend: [0, 6].includes(date.getDay()),
    };
  });

  // Group days by month for header
  const months = dayLabels.reduce((acc, day, index) => {
    const month = day.month;
    if (!acc[month]) {
      acc[month] = { label: month, start: index, count: 0 };
    }
    acc[month].count++;
    return acc;
  }, {} as Record<string, { label: string; start: number; count: number }>);

  const priorityColors = {
    low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    medium: 'bg-amber-50 text-amber-700 border-amber-200',
    high: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const priorityProgressColors = {
    low: 'bg-emerald-500',
    medium: 'bg-amber-500',
    high: 'bg-rose-500',
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-8">
        <div>
          <CardTitle className="text-2xl">Project Timeline</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {format(startDate, 'MMM d, yyyy')} - {format(endDate, 'MMM d, yyyy')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Month and day labels */}
            <div className="sticky top-0 z-10 bg-background">
              <div 
                className="grid" 
                style={{ 
                  gridTemplateColumns: `300px repeat(${totalDays}, minmax(40px, 1fr))`,
                }}
              >
                <div className="font-medium p-4 border-b border-r">Tasks</div>
                {Object.values(months).map((month) => (
                  <div
                    key={month.label}
                    className="text-center font-medium p-4 border-b border-r"
                    style={{
                      gridColumn: `${month.start + 2} / span ${month.count}`,
                    }}
                  >
                    {month.label}
                  </div>
                ))}
              </div>

              <div 
                className="grid" 
                style={{ 
                  gridTemplateColumns: `300px repeat(${totalDays}, minmax(40px, 1fr))`,
                }}
              >
                <div className="border-r"></div>
                {dayLabels.map((label, index) => (
                  <div
                    key={index}
                    className={`text-center p-2 border-r ${
                      label.isWeekend ? 'bg-muted/50' : ''
                    } ${label.isToday ? 'bg-primary/5 font-medium' : ''}`}
                  >
                    <span className="text-sm">{label.short}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Task bars */}
            <div className="relative">
              {tasks.map((task) => {
                const startOffset = differenceInDays(task.startDate, startDate);
                const duration = differenceInDays(task.endDate, task.startDate) + 1;

                return (
                  <div
                    key={task.id}
                    className="group grid items-center border-b hover:bg-accent/5 transition-colors"
                    style={{
                      gridTemplateColumns: `300px repeat(${totalDays}, minmax(40px, 1fr))`,
                    }}
                  >
                    <div className="p-4 border-r">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium mb-1">{task.title}</div>
                          <Badge
                            variant="outline"
                            className={`${priorityColors[task.priority]}`}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        {task.assignee && (
                          <Avatar className="h-8 w-8">
                            {task.assignee.avatar && (
                              <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                            )}
                            <AvatarFallback>
                              {task.assignee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {format(task.startDate, 'MMM d')} - {format(task.endDate, 'MMM d')}
                        </span>
                      </div>
                    </div>
                    <div
                      className="relative col-span-full py-4 group-hover:opacity-100"
                      style={{
                        gridColumn: `${startOffset + 2} / span ${duration}`,
                      }}
                    >
                      <Progress 
                        value={task.progress} 
                        className="h-6 w-[calc(100%-8px)] mx-auto"
                        indicatorClassName={priorityProgressColors[task.priority]}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium text-white mix-blend-difference">
                          {task.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 