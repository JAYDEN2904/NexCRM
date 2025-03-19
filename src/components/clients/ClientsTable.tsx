import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Eye, MoreHorizontal, Search } from 'lucide-react'
import { Client } from '@/types'
import { DataTable } from '@/components/ui/data-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatCurrency, formatDate } from '@/lib/data'

interface ClientsTableProps {
  data: Client[]
  onViewDetails: (clientId: string) => void
}

export function ClientsTable({ data, onViewDetails }: ClientsTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'company',
      header: 'Company',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return (
          <Badge
            variant={status === 'active' ? 'default' : 'secondary'}
            className={
              status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'lastContact',
      header: 'Last Contact',
      cell: ({ row }) => {
        return formatDate(row.getValue('lastContact'))
      },
    },
    {
      accessorKey: 'deals',
      header: 'Deals',
    },
    {
      accessorKey: 'value',
      header: 'Value',
      cell: ({ row }) => {
        return formatCurrency(row.getValue('value'))
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const client = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails(client.id)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const filteredData = data.filter((client) => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = 
      statusFilter === 'all' || client.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable 
        columns={columns} 
        data={filteredData} 
        searchKey="name"
        pagination={{
          pageSize: 10,
          pageIndex: 0,
        }}
      />
    </div>
  )
} 