export interface Client {
  id: string
  name: string
  email: string
  company: string
  phone: string
  status: 'active' | 'inactive'
  lastContact: Date
  deals: number
  value: number
}

export interface Deal {
  id: string
  title: string
  value: number
  clientId: string
  clientName: string
  status: 'pending' | 'won' | 'lost'
  stage: 'initial' | 'proposal' | 'negotiation' | 'closed'
  createdAt: Date
  closingDate: Date
}

export interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  dueDate: Date
  assignedTo: string
  clientId?: string
  dealId?: string
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'agent'
  department: string
  avatar: string
  status: 'active' | 'inactive'
}

export interface DashboardStats {
  totalRevenue: number
  totalDeals: number
  totalClients: number
  averageResponseTime: string
  revenueChange: number
  dealsChange: number
  clientsChange: number
  responseTimeChange: number
}

export interface RevenueData {
  date: string
  revenue: number
} 