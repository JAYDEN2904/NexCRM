import { Client, Deal, Task, TeamMember, DashboardStats, RevenueData } from '@/types'

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@techcorp.com',
    company: 'TechCorp',
    phone: '+1 (555) 123-4567',
    status: 'active',
    lastContact: new Date('2024-03-15'),
    deals: 3,
    value: 75000,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@innovate.io',
    company: 'Innovate IO',
    phone: '+1 (555) 234-5678',
    status: 'active',
    lastContact: new Date('2024-03-10'),
    deals: 2,
    value: 45000,
  },
  // Add more mock clients as needed
]

export const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'Enterprise Software License',
    value: 50000,
    clientId: '1',
    clientName: 'TechCorp',
    status: 'pending',
    stage: 'negotiation',
    createdAt: new Date('2024-02-01'),
    closingDate: new Date('2024-04-01'),
  },
  {
    id: '2',
    title: 'Consulting Services',
    value: 25000,
    clientId: '2',
    clientName: 'Innovate IO',
    status: 'won',
    stage: 'closed',
    createdAt: new Date('2024-01-15'),
    closingDate: new Date('2024-03-15'),
  },
  // Add more mock deals as needed
]

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Follow up with TechCorp',
    description: 'Schedule a meeting to discuss implementation timeline',
    status: 'todo',
    priority: 'high',
    dueDate: new Date('2024-03-20'),
    assignedTo: '1',
    clientId: '1',
    dealId: '1',
  },
  {
    id: '2',
    title: 'Prepare proposal',
    description: 'Create detailed proposal for Innovate IO project',
    status: 'in-progress',
    priority: 'medium',
    dueDate: new Date('2024-03-25'),
    assignedTo: '2',
    clientId: '2',
    dealId: '2',
  },
  // Add more mock tasks as needed
]

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex@company.com',
    role: 'manager',
    department: 'Sales',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    status: 'active',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria@company.com',
    role: 'agent',
    department: 'Support',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    status: 'active',
  },
  // Add more mock team members as needed
]

export const mockDashboardStats: DashboardStats = {
  totalRevenue: 4250,
  totalDeals: 1625,
  totalClients: 3452,
  averageResponseTime: '8:02',
  revenueChange: 8,
  dealsChange: -5,
  clientsChange: 16,
  responseTimeChange: 4,
}

export const mockRevenueData: RevenueData[] = [
  { date: '22 Oct', revenue: 2000 },
  { date: '24 Oct', revenue: 2500 },
  { date: '26 Oct', revenue: 3000 },
  { date: '28 Oct', revenue: 4500 },
  { date: '30 Oct', revenue: 4000 },
  { date: '1 Nov', revenue: 3500 },
  { date: '3 Nov', revenue: 3200 },
  { date: '5 Nov', revenue: 3000 },
  { date: '7 Nov', revenue: 2800 },
]

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4')
} 