import { StatCard } from '@/components/dashboard/StatCard'
import { RevenueChart } from '@/components/dashboard/RevenueChart'
import { RecentTasks } from '@/components/dashboard/RecentTasks'
import {
  mockDashboardStats,
  mockRevenueData,
  mockTasks,
  formatCurrency,
} from '@/lib/data'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            21 Oct - 21 Nov • Daily
          </span>
          <button className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Product Revenue"
          value={formatCurrency(mockDashboardStats.totalRevenue)}
          subValue={`+ ${formatCurrency(1245)} Revenue`}
          change={mockDashboardStats.revenueChange}
        />
        <StatCard
          title="Total Deals"
          value={mockDashboardStats.totalDeals}
          subValue={`+ ${842} Deals`}
          change={mockDashboardStats.dealsChange}
        />
        <StatCard
          title="Created Tickets"
          value={mockDashboardStats.totalClients}
          subValue={`+ ${1023} Tickets`}
          change={mockDashboardStats.clientsChange}
        />
        <StatCard
          title="Average Reply"
          value={mockDashboardStats.averageResponseTime}
          subValue="+ 0:40 Faster"
          change={mockDashboardStats.responseTimeChange}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart data={mockRevenueData} />
        <RecentTasks tasks={mockTasks} />
      </div>
    </div>
  )
}