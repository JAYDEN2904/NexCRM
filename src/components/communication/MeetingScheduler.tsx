import { useState } from 'react'
import { Calendar, Clock, Users, Video, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockTeamMembers } from '@/lib/data/team'
import { format } from 'date-fns'

interface Meeting {
  id: string
  title: string
  description: string
  date: Date
  startTime: string
  endTime: string
  attendees: string[]
  location: string
  type: 'in-person' | 'virtual'
  status: 'scheduled' | 'completed' | 'cancelled'
}

export function MeetingScheduler() {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    attendees: [] as string[],
    location: '',
    type: 'virtual' as 'in-person' | 'virtual',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newMeeting: Meeting = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      date: new Date(formData.date),
      status: 'scheduled',
    }
    setMeetings([...meetings, newMeeting])
    setShowForm(false)
    setFormData({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      attendees: [],
      location: '',
      type: 'virtual',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Schedule a Meeting</h2>
        <Button onClick={() => setShowForm(true)}>
          New Meeting
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Meeting title"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as 'in-person' | 'virtual',
                    })
                  }
                >
                  <option value="virtual">Virtual</option>
                  <option value="in-person">In Person</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Meeting description"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Time</label>
                  <Input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Time</label>
                  <Input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder={formData.type === 'virtual' ? 'Meeting link' : 'Physical location'}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Attendees</label>
              <select
                multiple
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={formData.attendees}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    attendees: Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    ),
                  })
                }
              >
                {mockTeamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Schedule Meeting</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {meetings.map((meeting) => (
          <Card key={meeting.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="font-semibold">{meeting.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {meeting.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {format(meeting.date, 'MMM d, yyyy')}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {meeting.startTime} - {meeting.endTime}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {meeting.type === 'virtual' ? 'Virtual Meeting' : meeting.location}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {meeting.attendees.length} attendees
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    meeting.status === 'scheduled'
                      ? 'default'
                      : meeting.status === 'completed'
                      ? 'secondary'
                      : 'destructive'
                  }
                >
                  {meeting.status}
                </Badge>
                {meeting.type === 'virtual' && (
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 