import { FC } from 'react';
import { Check, CreditCard, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
  downloadUrl: string;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: '$29',
    description: 'Perfect for small teams just getting started',
    features: [
      'Up to 5 team members',
      '10 projects',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    price: '$99',
    description: 'For growing teams that need more power',
    features: [
      'Up to 20 team members',
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$299',
    description: 'For large organizations with complex needs',
    features: [
      'Unlimited team members',
      'Unlimited projects',
      'Advanced analytics & reporting',
      '24/7 dedicated support',
      'Custom integrations',
      'SLA guarantee',
    ],
  },
];

const invoices: Invoice[] = [
  {
    id: 'INV-2024-001',
    date: '2024-03-01',
    amount: '$99.00',
    status: 'paid',
    downloadUrl: '#',
  },
  {
    id: 'INV-2024-002',
    date: '2024-02-01',
    amount: '$99.00',
    status: 'paid',
    downloadUrl: '#',
  },
  {
    id: 'INV-2024-003',
    date: '2024-01-01',
    amount: '$99.00',
    status: 'paid',
    downloadUrl: '#',
  },
];

const Billing: FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>You are currently on the Professional plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">$99/month</p>
                <p className="text-sm text-muted-foreground">Next billing date: April 1, 2024</p>
              </div>
              <Button variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                Update Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.popular ? 'border-primary' : undefined}
            >
              <CardHeader>
                {plan.popular && (
                  <div className="mb-2">
                    <span className="bg-primary/10 text-primary text-sm font-medium px-2 py-1 rounded">
                      Popular
                    </span>
                  </div>
                )}
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant={plan.popular ? 'default' : 'outline'}
                  className="w-full"
                >
                  {plan.name === 'Professional' ? 'Current Plan' : 'Upgrade'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Billing History</h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          invoice.status === 'paid'
                            ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                            : invoice.status === 'pending'
                            ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                            : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                        }`}
                      >
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Billing; 