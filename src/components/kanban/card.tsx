import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

interface KanbanCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: Date;
  };
}

export function KanbanCard({ task }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="font-medium">{task.title}</h4>
          <Badge variant="outline" className={priorityColors[task.priority]}>
            {task.priority}
          </Badge>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          {task.description}
        </p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          {format(task.dueDate, 'MMM dd, yyyy')}
        </div>
      </div>
    </Card>
  );
}