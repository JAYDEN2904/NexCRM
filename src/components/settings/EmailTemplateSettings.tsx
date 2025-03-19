import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Copy } from "lucide-react";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: 'welcome' | 'notification' | 'reminder' | 'custom';
  variables: string[];
}

const defaultTemplates: EmailTemplate[] = [
  {
    id: "1",
    name: "Welcome Email",
    subject: "Welcome to {{company_name}}!",
    body: "Dear {{user_name}},\n\nWelcome to {{company_name}}! We're excited to have you on board.\n\nBest regards,\n{{sender_name}}",
    type: "welcome",
    variables: ["company_name", "user_name", "sender_name"],
  },
  {
    id: "2",
    name: "Task Assignment",
    subject: "New Task Assigned: {{task_name}}",
    body: "Hi {{user_name}},\n\nA new task has been assigned to you:\n\nTask: {{task_name}}\nDue Date: {{due_date}}\nPriority: {{priority}}\n\nBest regards,\n{{sender_name}}",
    type: "notification",
    variables: ["user_name", "task_name", "due_date", "priority", "sender_name"],
  },
  {
    id: "3",
    name: "Task Due Reminder",
    subject: "Reminder: {{task_name}} due soon",
    body: "Hi {{user_name}},\n\nThis is a reminder that the following task is due soon:\n\nTask: {{task_name}}\nDue Date: {{due_date}}\n\nBest regards,\n{{sender_name}}",
    type: "reminder",
    variables: ["user_name", "task_name", "due_date", "sender_name"],
  },
];

export function EmailTemplateSettings() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (selectedTemplate) {
      setTemplates(templates.map(t => 
        t.id === selectedTemplate.id ? selectedTemplate : t
      ));
      setSelectedTemplate(null);
      setIsEditing(false);
    }
  };

  const handleDelete = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  const handleDuplicate = (template: EmailTemplate) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
    };
    setTemplates([...templates, newTemplate]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Email Templates</h3>
          <p className="text-muted-foreground">
            Manage your email templates and automated messages
          </p>
        </div>
        <Button onClick={() => {
          setSelectedTemplate({
            id: Date.now().toString(),
            name: "",
            subject: "",
            body: "",
            type: "custom",
            variables: [],
          });
          setIsEditing(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </div>

      <div className="grid gap-6">
        {!selectedTemplate ? (
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>
                All available email templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map(template => (
                    <TableRow key={template.id}>
                      <TableCell>{template.name}</TableCell>
                      <TableCell className="capitalize">{template.type}</TableCell>
                      <TableCell>{template.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setSelectedTemplate(template);
                              setIsEditing(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDuplicate(template)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(template.id)}
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
                {isEditing ? (selectedTemplate.id ? "Edit" : "New") : "View"} Template
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Template Name</Label>
                  <Input
                    id="name"
                    value={selectedTemplate.name}
                    onChange={(e) =>
                      setSelectedTemplate({
                        ...selectedTemplate,
                        name: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="type">Template Type</Label>
                  <Select
                    value={selectedTemplate.type}
                    onValueChange={(value: EmailTemplate['type']) =>
                      setSelectedTemplate({
                        ...selectedTemplate,
                        type: value,
                      })
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="welcome">Welcome</SelectItem>
                      <SelectItem value="notification">Notification</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={selectedTemplate.subject}
                    onChange={(e) =>
                      setSelectedTemplate({
                        ...selectedTemplate,
                        subject: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="body">Email Body</Label>
                  <Textarea
                    id="body"
                    value={selectedTemplate.body}
                    onChange={(e) =>
                      setSelectedTemplate({
                        ...selectedTemplate,
                        body: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="min-h-[200px]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Available Variables</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.variables.map((variable) => (
                      <div
                        key={variable}
                        className="rounded-md bg-secondary px-2 py-1 text-sm"
                      >
                        {`{{${variable}}}`}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedTemplate(null);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
                {isEditing && (
                  <Button onClick={handleSave}>Save Template</Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 