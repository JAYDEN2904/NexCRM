import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: {
    [key in PermissionKey]: boolean;
  };
}

type PermissionKey = 
  | 'viewDashboard'
  | 'manageUsers'
  | 'manageRoles'
  | 'manageProjects'
  | 'manageSettings'
  | 'viewReports'
  | 'manageTemplates'
  | 'manageWorkflows';

const defaultRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full system access with all permissions",
    permissions: {
      viewDashboard: true,
      manageUsers: true,
      manageRoles: true,
      manageProjects: true,
      manageSettings: true,
      viewReports: true,
      manageTemplates: true,
      manageWorkflows: true,
    },
  },
  {
    id: "2",
    name: "Project Manager",
    description: "Can manage projects and team members",
    permissions: {
      viewDashboard: true,
      manageUsers: false,
      manageRoles: false,
      manageProjects: true,
      manageSettings: false,
      viewReports: true,
      manageTemplates: true,
      manageWorkflows: false,
    },
  },
  {
    id: "3",
    name: "Team Member",
    description: "Basic access to assigned projects",
    permissions: {
      viewDashboard: true,
      manageUsers: false,
      manageRoles: false,
      manageProjects: false,
      manageSettings: false,
      viewReports: false,
      manageTemplates: false,
      manageWorkflows: false,
    },
  },
];

const permissionLabels: Record<PermissionKey, string> = {
  viewDashboard: "View Dashboard",
  manageUsers: "Manage Users",
  manageRoles: "Manage Roles",
  manageProjects: "Manage Projects",
  manageSettings: "Manage Settings",
  viewReports: "View Reports",
  manageTemplates: "Manage Templates",
  manageWorkflows: "Manage Workflows",
};

export function UserRolesSettings() {
  const [roles, setRoles] = useState<Role[]>(defaultRoles);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const handlePermissionChange = (roleId: string, permission: string) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        return {
          ...role,
          permissions: {
            ...role.permissions,
            [permission]: !role.permissions[permission],
          },
        };
      }
      return role;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">User Roles & Permissions</h3>
          <p className="text-muted-foreground">
            Manage user roles and their associated permissions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Role
        </Button>
      </div>

      <div className="grid gap-6">
        {roles.map(role => (
          <Card key={role.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>{role.name}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Permission</TableHead>
                      <TableHead className="w-[100px]">Access</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(role.permissions).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell>{permissionLabels[key as PermissionKey]}</TableCell>
                        <TableCell>
                          <Switch
                            checked={value}
                            onCheckedChange={() => handlePermissionChange(role.id, key as PermissionKey)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 