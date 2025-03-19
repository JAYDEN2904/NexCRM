import { Client, Deal } from '@/types'
import { formatCurrency, formatDate } from '@/lib/data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ClientDetailsProps {
  client: Client
  deals: Deal[]
}

export function ClientDetails({ client, deals }: ClientDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Client Info */}
      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p>{client.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Company</p>
              <p>{client.company}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{client.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p>{client.phone}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge
                variant={client.status === 'active' ? 'default' : 'secondary'}
                className={
                  client.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }
              >
                {client.status}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Last Contact
              </p>
              <p>{formatDate(client.lastContact)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Associated Deals */}
      <Card>
        <CardHeader>
          <CardTitle>Associated Deals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <p className="font-medium">{deal.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        deal.status === 'won'
                          ? 'default'
                          : deal.status === 'lost'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {deal.status}
                    </Badge>
                    <Badge variant="outline">{deal.stage}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{formatCurrency(deal.value)}</p>
                  <p className="text-sm text-muted-foreground">
                    Closing {formatDate(deal.closingDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact History */}
      <Card>
        <CardHeader>
          <CardTitle>Contact History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* This would typically come from an API - using mock data for now */}
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex-1">
                <p className="font-medium">Initial Meeting</p>
                <p className="text-sm text-muted-foreground">
                  Discussed project requirements and timeline
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(new Date('2024-03-15'))}
              </p>
            </div>
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex-1">
                <p className="font-medium">Follow-up Call</p>
                <p className="text-sm text-muted-foreground">
                  Reviewed proposal and addressed questions
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(new Date('2024-03-10'))}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 