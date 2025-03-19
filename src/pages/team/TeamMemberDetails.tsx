import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Clock, Calendar, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockTeamMembers, mockTaskAssignments } from '@/lib/data/team'
import { TeamMember } from '@/types/team'

export function TeamMemberDetails() {
  const { memberId } = useParams()
  const navigate = useNavigate()
  const member = mockTeamMembers.find((m) => m.id === memberId)
  const memberTasks = mockTaskAssignments.filter((t) => t.assignedTo === memberId)

  if (!member) {
    return <div>Team member not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/team')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">{member.name}</h2>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>
        </div>
        <Badge
          variant={member.status === 'active' ? 'default' : 'secondary'}
          className={
            member.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }
        >
          {member.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={member.avatar} />
              <AvatarFallback>
                {member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-medium">Contact Information</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      {member.availability.startTime} - {member.availability.endTime}{' '}
                      ({member.availability.timezone})
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Department</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {member.department}
                </p>
              </div>

              <div>
                <h3 className="font-medium">Skills</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-medium mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                <span className="text-sm">Tasks Completed</span>
              </div>
              <span className="font-medium">{member.performance.tasksCompleted}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                <span className="text-sm">Tasks In Progress</span>
              </div>
              <span className="font-medium">{member.performance.tasksInProgress}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-blue-500" />
                <span className="text-sm">Avg Completion Time</span>
              </div>
              <span className="font-medium">
                {member.performance.averageCompletionTime}h
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-purple-500" />
                <span className="text-sm">Quality Score</span>
              </div>
              <span className="font-medium">
                {member.performance.qualityScore}/5
              </span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="tasks">
          <TabsList>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          <TabsContent value="tasks" className="mt-4">
            <div className="space-y-4">
              {memberTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
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
          </TabsContent>
          <TabsContent value="calendar" className="mt-4">
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              Calendar view coming soon...
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
} 