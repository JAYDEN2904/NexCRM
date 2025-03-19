import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface WorkflowRule {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'task_status' | 'due_date' | 'priority' | 'assignment';
    condition: string;
    value: string;
  };
  actions: {
    type: 'send_email' | 'notify_user' | 'update_status' | 'assign_task';
    target: string;
    template?: string;
  }[];
  isActive: boolean;
}

const defaultRules: WorkflowRule[] = [
  {
    id: "1",
    name: "Task Overdue Notification",
    description: "Send notification when task becomes overdue",
    trigger: {
      type: "due_date",
      condition: "is_overdue",
      value: "true",
    },
    actions: [
      {
        type: "send_email",
        target: "assignee",
        template: "task_overdue",
      },
      {
        type: "notify_user",
        target: "assignee",
      },
    ],
    isActive: true,
  },
  {
    id: "2",
    name: "High Priority Assignment",
    description: "Notify team lead when high priority task is assigned",
    trigger: {
      type: "priority",
      condition: "equals",
      value: "high",
    },
    actions: [
      {
        type: "notify_user",
        target: "team_lead",
      },
    ],
    isActive: true,
  },
];

export function WorkflowSettings() {
  const [rules, setRules] = useState<WorkflowRule[]>(defaultRules);
  const [selectedRule, setSelectedRule] = useState<WorkflowRule | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleActive = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  const handleSave = () => {
    if (selectedRule) {
      setRules(rules.map(r => 
        r.id === selectedRule.id ? selectedRule : r
      ));
      setSelectedRule(null);
      setIsEditing(false);
    }
  };

  const handleDelete = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Workflow Automation</h3>
          <p className="text-muted-foreground">
            Configure automated actions based on triggers
          </p>
        </div>
        <Button onClick={() => {
          setSelectedRule({
            id: Date.now().toString(),
            name: "",
            description: "",
            trigger: {
              type: "task_status",
              condition: "",
              value: "",
            },
            actions: [],
            isActive: true,
          });
          setIsEditing(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          New Rule
        </Button>
      </div>

      <div className="grid gap-6">
        {!selectedRule ? (
          <Card>
            <CardHeader>
              <CardTitle>Workflow Rules</CardTitle>
              <CardDescription>
                Automated rules and actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Trigger</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map(rule => (
                    <TableRow key={rule.id}>
                      <TableCell>{rule.name}</TableCell>
                      <TableCell>{rule.description}</TableCell>
                      <TableCell className="capitalize">
                        {rule.trigger.type.replace('_', ' ')}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={rule.isActive}
                          onCheckedChange={() => handleToggleActive(rule.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setSelectedRule(rule);
                              setIsEditing(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(rule.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>
                {isEditing ? (selectedRule.id ? "Edit" : "New") : "View"} Rule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Rule Name</Label>
                  <Input
                    id="name"
                    value={selectedRule.name}
                    onChange={(e) =>
                      setSelectedRule({
                        ...selectedRule,
                        name: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={selectedRule.description}
                    onChange={(e) =>
                      setSelectedRule({
                        ...selectedRule,
                        description: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid gap-4">
                  <Label>Trigger</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="triggerType">Type</Label>
                      <Select
                        value={selectedRule.trigger.type}
                        onValueChange={(value: WorkflowRule['trigger']['type']) =>
                          setSelectedRule({
                            ...selectedRule,
                            trigger: {
                              ...selectedRule.trigger,
                              type: value,
                            },
                          })
                        }
                        disabled={!isEditing}
                      >
                        <SelectTrigger id="triggerType">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="task_status">Task Status</SelectItem>
                          <SelectItem value="due_date">Due Date</SelectItem>
                          <SelectItem value="priority">Priority</SelectItem>
                          <SelectItem value="assignment">Assignment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Input
                        id="condition"
                        value={selectedRule.trigger.condition}
                        onChange={(e) =>
                          setSelectedRule({
                            ...selectedRule,
                            trigger: {
                              ...selectedRule.trigger,
                              condition: e.target.value,
                            },
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="value">Value</Label>
                      <Input
                        id="value"
                        value={selectedRule.trigger.value}
                        onChange={(e) =>
                          setSelectedRule({
                            ...selectedRule,
                            trigger: {
                              ...selectedRule.trigger,
                              value: e.target.value,
                            },
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Actions</Label>
                  <div className="space-y-4">
                    {selectedRule.actions.map((action, index) => (
                      <div key={index} className="grid grid-cols-2 gap-4">
                        <Select
                          value={action.type}
                          onValueChange={(value: WorkflowRule['actions'][0]['type']) => {
                            const newActions = [...selectedRule.actions];
                            newActions[index] = {
                              ...action,
                              type: value,
                            };
                            setSelectedRule({
                              ...selectedRule,
                              actions: newActions,
                            });
                          }}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="send_email">Send Email</SelectItem>
                            <SelectItem value="notify_user">Notify User</SelectItem>
                            <SelectItem value="update_status">Update Status</SelectItem>
                            <SelectItem value="assign_task">Assign Task</SelectItem>
                          </SelectContent>
                        </Select>

                        <Input
                          value={action.target}
                          onChange={(e) => {
                            const newActions = [...selectedRule.actions];
                            newActions[index] = {
                              ...action,
                              target: e.target.value,
                            };
                            setSelectedRule({
                              ...selectedRule,
                              actions: newActions,
                            });
                          }}
                          disabled={!isEditing}
                          placeholder="Target"
                        />
                      </div>
                    ))}

                    {isEditing && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          setSelectedRule({
                            ...selectedRule,
                            actions: [
                              ...selectedRule.actions,
                              { type: "notify_user", target: "" },
                            ],
                          })
                        }
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Action
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedRule(null);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
                {isEditing && (
                  <Button onClick={handleSave}>Save Rule</Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 