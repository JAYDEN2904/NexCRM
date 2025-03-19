import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { KanbanColumn } from '@/components/kanban/column';
import { KanbanCard } from '@/components/kanban/card';
import { ProjectTimeline } from '@/components/projects/ProjectTimeline';
import { ProjectDetails } from '@/components/projects/ProjectDetails';
import { ProjectAnalytics } from '@/components/projects/ProjectAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectDashboard } from '@/components/projects/ProjectDashboard';

interface Column {
  id: string;
  title: string;
}

interface Task {
  id: string;
  columnId: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: Date;
  startDate: Date;
  endDate: Date;
  progress: number;
  dependencies?: string[];
  estimatedHours: number;
  actualHours?: number;
  assignedTo: string;
  status: 'todo' | 'in_progress' | 'completed';
}

interface Project {
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
  milestones: {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    status: 'pending' | 'in_progress' | 'completed';
    progress: number;
  }[];
  tasks: Task[];
}

type TaskStatus = 'todo' | 'in_progress' | 'completed';
type ActivityType = 'update' | 'comment' | 'create' | 'complete';

const initialColumns: Column[] = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' },
];

const initialTasks: Task[] = [
  {
    id: '1',
    columnId: 'backlog',
    title: 'Website Redesign',
    description: 'Update the company website with new branding',
    priority: 'high',
    dueDate: new Date('2024-04-01'),
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-04-01'),
    progress: 0,
    estimatedHours: 40,
    assignedTo: '1',
    status: 'todo',
  },
  {
    id: '2',
    columnId: 'in-progress',
    title: 'Mobile App Development',
    description: 'Create a new mobile app for client management',
    priority: 'medium',
    dueDate: new Date('2024-05-15'),
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-05-15'),
    progress: 30,
    estimatedHours: 120,
    actualHours: 36,
    assignedTo: '2',
    status: 'in_progress',
  },
];

const mockProject: Project = {
  id: '1',
  name: 'Website Redesign Project',
  description: 'Complete overhaul of the company website with modern design and improved user experience',
  startDate: new Date('2024-03-01'),
  endDate: new Date('2024-05-15'),
  status: 'active',
  progress: 35,
  team: [
    { id: '1', name: 'John Smith', role: 'Senior Developer' },
    { id: '2', name: 'Sarah Johnson', role: 'UI Designer' },
    { id: '3', name: 'Mike Wilson', role: 'Project Manager' },
  ],
  milestones: [
    {
      id: '1',
      title: 'Design Phase',
      description: 'Complete all design mockups and get client approval',
      dueDate: new Date('2024-03-15'),
      status: 'completed',
      progress: 100,
    },
    {
      id: '2',
      title: 'Development Phase',
      description: 'Implement all features and functionality',
      dueDate: new Date('2024-04-30'),
      status: 'in_progress',
      progress: 45,
    },
    {
      id: '3',
      title: 'Testing & Launch',
      description: 'Complete testing and deploy to production',
      dueDate: new Date('2024-05-15'),
      status: 'pending',
      progress: 0,
    },
  ],
  tasks: initialTasks,
};

const mockDashboardData = {
  tasks: initialTasks.map(task => {
    const status: TaskStatus = task.columnId === 'done' ? 'completed' : 
                             task.columnId === 'in-progress' ? 'in_progress' : 
                             'todo';
    return {
      id: task.id,
      title: task.title,
      status,
      priority: task.priority,
      dueDate: task.dueDate,
      assignee: {
        name: 'John Doe',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      },
    };
  }),
  activities: [
    {
      id: '1',
      type: 'update' as ActivityType,
      user: {
        name: 'John Doe',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      },
      content: 'Updated the website redesign task progress to 60%',
      timestamp: new Date('2024-03-18T10:30:00'),
    },
    {
      id: '2',
      type: 'comment' as ActivityType,
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      },
      content: 'The new design looks great! Just a few minor adjustments needed.',
      timestamp: new Date('2024-03-18T09:15:00'),
    },
    {
      id: '3',
      type: 'create' as ActivityType,
      user: {
        name: 'Mike Wilson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      },
      content: 'Created a new task: Mobile app testing',
      timestamp: new Date('2024-03-17T16:45:00'),
    },
  ],
  meetings: [
    {
      id: '1',
      title: 'Design Review',
      date: new Date('2024-03-19T14:00:00'),
      attendees: [
        {
          name: 'John Doe',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        },
        {
          name: 'Sarah Johnson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        },
      ],
    },
    {
      id: '2',
      title: 'Sprint Planning',
      date: new Date('2024-03-20T10:00:00'),
      attendees: [
        {
          name: 'Mike Wilson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        },
        {
          name: 'John Doe',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        },
      ],
    },
  ],
  stats: {
    tasksCompleted: 12,
    tasksInProgress: 8,
    tasksPending: 5,
    teamMembers: 6,
  },
};

const Projects = () => {
  const [columns] = useState<Column[]>(initialColumns);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedProject] = useState<Project>(mockProject);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over?.id);

        return arrayMove(tasks, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    const overTask = tasks.find((task) => task.id === over.id);

    if (!activeTask || !overTask) return;

    if (activeTask.columnId !== overTask.columnId) {
      setTasks(tasks.map((task) =>
        task.id === activeTask.id
          ? { ...task, columnId: overTask.columnId }
          : task
      ));
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="details">Project Details</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <ProjectDashboard project={mockDashboardData} />
        </TabsContent>

        <TabsContent value="kanban">
          <div className="flex gap-4 overflow-x-auto pb-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
            >
              <div className="flex gap-4">
                {columns.map((column) => (
                  <KanbanColumn
                    key={column.id}
                    id={column.id}
                    title={column.title}
                    tasks={tasks.filter((task) => task.columnId === column.id)}
                  />
                ))}
              </div>

              <DragOverlay>
                {activeId ? (
                  <Card className="w-80 p-4">
                    <KanbanCard
                      task={tasks.find((task) => task.id === activeId) || initialTasks[0]}
                    />
                  </Card>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <ProjectTimeline tasks={tasks} />
        </TabsContent>

        <TabsContent value="details">
          <ProjectDetails project={selectedProject} />
        </TabsContent>

        <TabsContent value="analytics">
          <ProjectAnalytics project={selectedProject} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Projects;