import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockTeamMembers, mockTaskAssignments } from '@/lib/data/team'
import { TeamMember, TaskAssignment } from '@/types/team'
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
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function TeamAnalytics() {
  const [members] = useState<TeamMember[]>(mockTeamMembers)
  const [tasks] = useState<TaskAssignment[]>(mockTaskAssignments)

  // Calculate department distribution
  const departmentData = members.reduce((acc, member) => {
    acc[member.department] = (acc[member.department] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const departmentChartData = Object.entries(departmentData).map(
    ([name, value]) => ({ name, value })
  )

  // Calculate task completion by department
  const taskCompletionData = members.map((member) => {
    const memberTasks = tasks.filter((t) => t.assignedTo === member.id)
    const completedTasks = memberTasks.filter((t) => t.status === 'completed')
    return {
      department: member.department,
      completed: completedTasks.length,
      total: memberTasks.length,
    }
  })

  // Calculate average performance metrics
  const avgMetrics = {
    tasksCompleted: Math.round(
      members.reduce((acc, m) => acc + m.performance.tasksCompleted, 0) /
        members.length
    ),
    tasksInProgress: Math.round(
      members.reduce((acc, m) => acc + m.performance.tasksInProgress, 0) /
        members.length
    ),
    avgCompletionTime: Number(
      (
        members.reduce((acc, m) => acc + m.performance.averageCompletionTime, 0) /
        members.length
      ).toFixed(1)
    ),
    qualityScore: Number(
      (
        members.reduce((acc, m) => acc + m.performance.qualityScore, 0) /
        members.length
      ).toFixed(1)
    ),
  }

  // Calculate task status distribution
  const taskStatusData = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const taskStatusChartData = Object.entries(taskStatusData).map(
    ([name, value]) => ({ name, value })
  )

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Team Analytics</h2>
        <p className="text-sm text-muted-foreground">
          Comprehensive insights into team performance and productivity
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <h3 className="font-medium mb-2">Average Tasks Completed</h3>
          <p className="text-3xl font-bold">{avgMetrics.tasksCompleted}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-medium mb-2">Average Tasks In Progress</h3>
          <p className="text-3xl font-bold">{avgMetrics.tasksInProgress}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-medium mb-2">Average Completion Time</h3>
          <p className="text-3xl font-bold">{avgMetrics.avgCompletionTime}h</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-medium mb-2">Average Quality Score</h3>
          <p className="text-3xl font-bold">{avgMetrics.qualityScore}/5</p>
        </Card>
      </div>

      <Tabs defaultValue="department" className="space-y-6">
        <TabsList>
          <TabsTrigger value="department">Department Distribution</TabsTrigger>
          <TabsTrigger value="tasks">Task Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="department" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-medium mb-4">Department Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-medium mb-4">Task Status Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskStatusChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-medium mb-4">Task Completion by Department</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={taskCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#8884d8"
                    name="Completed"
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#82ca9d"
                    name="Total"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 