export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: 'active' | 'inactive'
  avatar?: string
  performance: {
    tasksCompleted: number
    tasksInProgress: number
    averageCompletionTime: number
    qualityScore: number
  }
  skills: string[]
  availability: {
    startTime: string
    endTime: string
    timezone: string
  }
}

export interface TaskAssignment {
  id: string
  title: string
  description: string
  assignedTo: string
  assignedBy: string
  dueDate: Date
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in_progress' | 'completed'
  estimatedHours: number
  actualHours?: number
  tags: string[]
}

export interface CalendarEvent {
  id: string
  title: string
  description: string
  start: Date
  end: Date
  type: 'meeting' | 'task' | 'leave'
  attendees: string[]
  location?: string
  status: 'scheduled' | 'completed' | 'cancelled'
} 