import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { ClientsTable } from '@/components/clients/ClientsTable'
import { ClientDetails } from '@/components/clients/ClientDetails'
import { AddClientDialog } from '@/components/clients/AddClientDialog'
import { Button } from '@/components/ui/button'
import { mockClients, mockDeals } from '@/lib/data'
import { Client } from '@/types'

function ClientsList() {
  const [clients, setClients] = useState<Client[]>(mockClients)

  const handleAddClient = (newClient: Omit<Client, 'id' | 'lastContact' | 'deals' | 'value'>) => {
    const client: Client = {
      ...newClient,
      id: Math.random().toString(36).substr(2, 9),
      lastContact: new Date(),
      deals: 0,
      value: 0,
    }
    setClients((prev) => [...prev, client])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Clients</h2>
          <p className="text-sm text-muted-foreground">
            Manage your client relationships
          </p>
        </div>
        <AddClientDialog onAddClient={handleAddClient} />
      </div>
      <ClientsTable
        data={clients}
        onViewDetails={(id) => {
          // Navigate to client details
          window.location.href = `/clients/${id}`
        }}
      />
    </div>
  )
}

function ClientDetailsPage() {
  const clientId = window.location.pathname.split('/').pop()
  const client = mockClients.find((c) => c.id === clientId)
  const clientDeals = clientId ? mockDeals.filter((deal) => deal.clientId === clientId) : []

  if (!client) {
    return <div>Client not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">
            {client.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {client.company}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => window.location.href = '/clients'}
        >
          Back to Clients
        </Button>
      </div>
      <ClientDetails client={client} deals={clientDeals} />
    </div>
  )
}

export default function Clients() {
  return (
    <Routes>
      <Route path="/" element={<ClientsList />} />
      <Route path="/:clientId" element={<ClientDetailsPage />} />
    </Routes>
  )
}