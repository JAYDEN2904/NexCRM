import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRolesSettings } from "./UserRolesSettings";
import { CompanySettings } from "./CompanySettings";
import { EmailTemplateSettings } from "./EmailTemplateSettings";
import { WorkflowSettings } from "./WorkflowSettings";
import { IntegrationSettings } from "./IntegrationSettings";

export function SettingsLayout() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your company settings, user roles, and system configurations.
        </p>
      </div>
      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="w-full justify-start border-b">
          <TabsTrigger value="company">Company Profile</TabsTrigger>
          <TabsTrigger value="roles">User Roles</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
          <TabsTrigger value="workflow">Workflow Rules</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        <TabsContent value="company">
          <CompanySettings />
        </TabsContent>
        <TabsContent value="roles">
          <UserRolesSettings />
        </TabsContent>
        <TabsContent value="email">
          <EmailTemplateSettings />
        </TabsContent>
        <TabsContent value="workflow">
          <WorkflowSettings />
        </TabsContent>
        <TabsContent value="integrations">
          <IntegrationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
} 