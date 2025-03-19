import { Task } from '@/types'
import { formatDate } from '@/lib/data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface RecentTasksProps {
  tasks: Task[]
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
}

const statusColors = {
  todo: 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
}

export function RecentTasks({ tasks }: RecentTasksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start justify-between space-x-4 rounded-lg border p-4"
            >
              <div className="space-y-1">
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-muted-foreground">
                  {task.description}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Badge
                    variant="secondary"
                    className={priorityColors[task.priority]}
                  >
                    {task.priority}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={statusColors[task.status]}
                  >
                    {task.status}
                  </Badge>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Due {formatDate(task.dueDate)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 