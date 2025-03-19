import { ArrowDown, ArrowUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface StatCardProps {
  title: string
  value: string | number
  subValue: string
  change: number
}

export function StatCard({ title, value, subValue, change }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">{value}</h2>
            <span
              className={`flex items-center text-sm font-medium ${
                change > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change > 0 ? (
                <ArrowUp className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4" />
              )}
              {Math.abs(change)}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{subValue}</p>
        </div>
      </CardContent>
    </Card>
  )
} 