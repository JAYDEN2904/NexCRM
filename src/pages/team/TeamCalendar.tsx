import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus } from 'lucide-react'
import { mockCalendarEvents, mockTeamMembers } from '@/lib/data/team'
import { CalendarEvent } from '@/types/team'

const getEventColor = (type: string) => {
  switch (type) {
    case 'meeting':
      return '#3b82f6'
    case 'task':
      return '#10b981'
    case 'leave':
      return '#ef4444'
    default:
      return '#6b7280'
  }
}

const getAttendeeNames = (attendeeIds: string[]) => {
  return attendeeIds
    .map((id) => mockTeamMembers.find((m) => m.id === id)?.name)
    .filter(Boolean)
    .join(', ')
}

export function TeamCalendar() {
  const [events] = useState<CalendarEvent[]>(mockCalendarEvents)

  const calendarEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    backgroundColor: getEventColor(event.type),
    extendedProps: {
      description: event.description,
      type: event.type,
      attendees: getAttendeeNames(event.attendees),
      location: event.location,
    },
  }))

  const handleEventClick = (info: any) => {
    const event = info.event
    const props = event.extendedProps
    alert(`
      ${event.title}
      Type: ${props.type}
      Description: ${props.description}
      Attendees: ${props.attendees}
      Location: ${props.location}
    `)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Team Calendar</h2>
          <p className="text-sm text-muted-foreground">
            View and manage team events and meetings
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-sm">Meetings</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="text-sm">Tasks</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <span className="text-sm">Leave</span>
          </div>
        </div>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={calendarEvents}
          eventClick={handleEventClick}
          height="auto"
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
          }}
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          nowIndicator={true}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          firstDay={1}
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '08:00',
            endTime: '20:00',
          }}
        />
      </Card>
    </div>
  )
} 