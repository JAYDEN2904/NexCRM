import { useState } from 'react'
import { Mail, Send, Trash2, Star, Paperclip, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockTeamMembers } from '@/lib/data/team'

interface Email {
  id: string
  from: string
  to: string[]
  subject: string
  content: string
  timestamp: string
  read: boolean
  starred: boolean
  attachments?: string[]
}

const mockEmails: Email[] = [
  {
    id: '1',
    from: 'john.doe@example.com',
    to: ['jane.smith@example.com'],
    subject: 'Project Update',
    content: 'Hi Jane, I wanted to update you on the latest project status...',
    timestamp: '2024-02-20T10:00:00Z',
    read: false,
    starred: false,
    attachments: ['project_update.pdf'],
  },
  {
    id: '2',
    from: 'sarah.wilson@example.com',
    to: ['jane.smith@example.com'],
    subject: 'Team Meeting Notes',
    content: 'Here are the notes from our team meeting yesterday...',
    timestamp: '2024-02-19T15:30:00Z',
    read: true,
    starred: true,
  },
]

export function EmailIntegration() {
  const [emails, setEmails] = useState<Email[]>(mockEmails)
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [showCompose, setShowCompose] = useState(false)
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    content: '',
  })

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    const newEmail: Email = {
      id: Math.random().toString(36).substr(2, 9),
      from: 'jane.smith@example.com',
      to: composeData.to.split(',').map((email) => email.trim()),
      subject: composeData.subject,
      content: composeData.content,
      timestamp: new Date().toISOString(),
      read: false,
      starred: false,
    }
    setEmails([newEmail, ...emails])
    setShowCompose(false)
    setComposeData({
      to: '',
      subject: '',
      content: '',
    })
  }

  const toggleStar = (emailId: string) => {
    setEmails(
      emails.map((email) =>
        email.id === emailId
          ? { ...email, starred: !email.starred }
          : email
      )
    )
  }

  const markAsRead = (emailId: string) => {
    setEmails(
      emails.map((email) =>
        email.id === emailId ? { ...email, read: true } : email
      )
    )
  }

  return (
    <div className="flex h-[600px] border rounded-lg">
      {/* Email List */}
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Inbox</h2>
            <Button onClick={() => setShowCompose(true)}>
              <Send className="mr-2 h-4 w-4" />
              Compose
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search emails..."
              className="pl-9"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100%-80px)]">
          <div className="space-y-1">
            {emails.map((email) => (
              <div
                key={email.id}
                className={`p-4 cursor-pointer hover:bg-accent ${
                  selectedEmail?.id === email.id ? 'bg-accent' : ''
                } ${!email.read ? 'font-semibold' : ''}`}
                onClick={() => {
                  setSelectedEmail(email)
                  markAsRead(email.id)
                }}
              >
                <div className="flex items-start space-x-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://avatar.vercel.sh/${email.from}`} />
                    <AvatarFallback>
                      {email.from
                        .split('@')[0]
                        .split('.')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{email.from}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleStar(email.id)
                        }}
                      >
                        <Star
                          className={`h-4 w-4 ${
                            email.starred ? 'fill-yellow-400 text-yellow-400' : ''
                          }`}
                        />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {email.subject}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {email.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Email Details */}
      <div className="flex-1">
        {selectedEmail ? (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{selectedEmail.subject}</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <span className="font-medium">From:</span>
                  <span className="ml-1">{selectedEmail.from}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">To:</span>
                  <span className="ml-1">{selectedEmail.to.join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Date:</span>
                  <span className="ml-1">
                    {new Date(selectedEmail.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <p className="whitespace-pre-wrap">{selectedEmail.content}</p>
              {selectedEmail.attachments && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Attachments</h3>
                  <div className="space-y-2">
                    {selectedEmail.attachments.map((attachment) => (
                      <div
                        key={attachment}
                        className="flex items-center space-x-2 text-sm text-muted-foreground"
                      >
                        <Paperclip className="h-4 w-4" />
                        <span>{attachment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t">
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Reply
              </Button>
            </div>
          </div>
        ) : showCompose ? (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">New Message</h2>
            </div>
            <form onSubmit={handleSendEmail} className="flex-1 flex flex-col">
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <Input
                    value={composeData.to}
                    onChange={(e) =>
                      setComposeData({ ...composeData, to: e.target.value })
                    }
                    placeholder="Enter email addresses (comma-separated)"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    value={composeData.subject}
                    onChange={(e) =>
                      setComposeData({ ...composeData, subject: e.target.value })
                    }
                    placeholder="Enter subject"
                    required
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    value={composeData.content}
                    onChange={(e) =>
                      setComposeData({ ...composeData, content: e.target.value })
                    }
                    placeholder="Type your message"
                    className="h-full"
                    required
                  />
                </div>
              </div>
              <div className="p-4 border-t flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCompose(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <Mail className="h-12 w-12" />
            <p className="ml-2">Select an email to view</p>
          </div>
        )}
      </div>
    </div>
  )
} 