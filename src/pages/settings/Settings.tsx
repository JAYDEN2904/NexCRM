import { FC } from 'react';
import {
  Bell,
  Lock,
  User,
  Palette,
  Globe,
  Mail,
  Shield,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface SettingSection {
  icon: JSX.Element;
  title: string;
  description: string;
}

const settingSections: SettingSection[] = [
  {
    icon: <User className="h-5 w-5" />,
    title: 'Profile',
    description: 'Manage your personal information and preferences',
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: 'Security',
    description: 'Configure your account security settings',
  },
  {
    icon: <Bell className="h-5 w-5" />,
    title: 'Notifications',
    description: 'Control your notification preferences',
  },
  {
    icon: <Palette className="h-5 w-5" />,
    title: 'Appearance',
    description: 'Customize the look and feel of your workspace',
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Language & Region',
    description: 'Set your language and regional preferences',
  },
  {
    icon: <Mail className="h-5 w-5" />,
    title: 'Email Settings',
    description: 'Manage your email notifications and preferences',
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'Privacy',
    description: 'Control your privacy settings and data usage',
  },
  {
    icon: <CreditCard className="h-5 w-5" />,
    title: 'Billing',
    description: 'Manage your subscription and payment methods',
  },
];

const Settings: FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <User className="h-6 w-6" />
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern Time</SelectItem>
                  <SelectItem value="pst">Pacific Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Bell className="h-6 w-6" />
              <div>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure your notifications</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email updates about your activity
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications in your browser
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Digest</Label>
                <p className="text-sm text-muted-foreground">
                  Get a weekly summary of your activity
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {settingSections.map((section, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:bg-accent/50 transition-colors"
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  {section.icon}
                </div>
                <div>
                  <CardTitle className="text-base">{section.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {section.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Settings; 