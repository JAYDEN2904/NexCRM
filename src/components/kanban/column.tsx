import { Card } from '@/components/ui/card';
import { KanbanCard } from './card';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: any[];
}

export function KanbanColumn({ id, title, tasks }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <Card className="flex h-full w-80 flex-col">
      <div className="border-b p-4">
        <h3 className="font-semibold">{title}</h3>
        <div className="mt-1 text-sm text-muted-foreground">
          {tasks.length} tasks
        </div>
      </div>
      <div
        ref={setNodeRef}
        className="flex-1 space-y-4 overflow-y-auto p-4"
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <KanbanCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </Card>
  );
}