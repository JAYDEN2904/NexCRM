import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Star, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { mockTeamMembers } from '@/lib/data/team'
import { TeamMember } from '@/types/team'
import { TeamMemberDialog } from '@/components/team/TeamMemberDialog'
import { Search } from 'lucide-react'

export function TeamList() {
  const navigate = useNavigate()
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMember, setSelectedMember] = useState<TeamMember | undefined>()

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSaveMember = (data: Partial<TeamMember>) => {
    if (selectedMember) {
      // Update existing member
      setMembers(
        members.map((m) =>
          m.id === selectedMember.id ? { ...m, ...data } : m
        )
      )
    } else {
      // Add new member
      const newMember: TeamMember = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        performance: {
          tasksCompleted: 0,
          tasksInProgress: 0,
          averageCompletionTime: 0,
          qualityScore: 0,
        },
      } as TeamMember
      setMembers([...members, newMember])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Team Members</h2>
          <p className="text-sm text-muted-foreground">
            Manage your team members and their roles
          </p>
        </div>
        <TeamMemberDialog
          member={selectedMember}
          onSave={handleSaveMember}
          trigger={
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          }
        />
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search team members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <Card
            key={member.id}
            className="p-6 cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => navigate(`/team/${member.id}`)}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
              <TeamMemberDialog
                member={member}
                onSave={handleSaveMember}
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedMember(member)
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                }
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline">{member.department}</Badge>
              {member.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Tasks Completed:</span>{' '}
                {member.performance.tasksCompleted}
              </div>
              <div>
                <span className="font-medium">In Progress:</span>{' '}
                {member.performance.tasksInProgress}
              </div>
              <div>
                <span className="font-medium">Avg. Time:</span>{' '}
                {member.performance.averageCompletionTime}h
              </div>
              <div>
                <span className="font-medium">Quality Score:</span>{' '}
                {member.performance.qualityScore}/5
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 