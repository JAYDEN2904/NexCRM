import { Routes, Route } from 'react-router-dom'
import { TeamList } from './TeamList'
import { TeamMemberDetails } from './TeamMemberDetails'
import { TeamCalendar } from './TeamCalendar'
import { TeamTasks } from './TeamTasks'
import { TeamAnalytics } from './TeamAnalytics'

export default function Team() {
  return (
    <Routes>
      <Route path="/" element={<TeamList />} />
      <Route path="/:memberId" element={<TeamMemberDetails />} />
      <Route path="/calendar" element={<TeamCalendar />} />
      <Route path="/tasks" element={<TeamTasks />} />
      <Route path="/analytics" element={<TeamAnalytics />} />
    </Routes>
  )
}