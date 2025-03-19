import { useState } from 'react'
import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockTaskAssignments, mockTeamMembers } from '@/lib/data/team'
import { TaskAssignment } from '@/types/team'
import { TaskAssignmentDialog } from '@/components/team/TaskAssignmentDialog'

export function TeamTasks() {
  const [tasks, setTasks] = useState<TaskAssignment[]>(mockTaskAssignments)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')

  const getAssigneeName = (assigneeId: string) => {
    return mockTeamMembers.find((m) => m.id === assigneeId)?.name
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getAssigneeName(task.assignedTo)?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === 'all' || task.status === statusFilter

    const matchesPriority =
      priorityFilter === 'all' || task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleSaveTask = (data: any) => {
    const newTask: TaskAssignment = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date().toISOString(),
    }
    setTasks([...tasks, newTask])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Team Tasks</h2>
          <p className="text-sm text-muted-foreground">
            Manage and track team task assignments
          </p>
        </div>
        <TaskAssignmentDialog
          teamMembers={mockTeamMembers}
          onSave={handleSaveTask}
        />
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start justify-between p-4 border rounded-lg"
            >
              <div className="space-y-2">
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {task.description}
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div>
                    <span className="font-medium">Assigned to:</span>{' '}
                    {getAssigneeName(task.assignedTo)}
                  </div>
                  <div>
                    <span className="font-medium">Due:</span>{' '}
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Est. Hours:</span>{' '}
                    {task.estimatedHours}
                    {task.actualHours && ` (Actual: ${task.actualHours})`}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4">
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
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 