import { Link, Route, RouterProvider, createHashRouter, createRoutesFromElements } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { LicensePage } from '@/pages/License'
import { LessonPage } from '@/pages/Lesson'
import { ExamPage, GroupPractice, Review } from '@/pages/Practice'
import { Browse } from '@/pages/Browse'
import { SettingsPage } from '@/pages/Settings'
import { CompendiumRoute } from '@/compendium/pages'

// Hash routing keeps the site deployable on any static host with zero server config.
const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="browse/:license" element={<Browse />} />
      <Route path="compendium/*" element={<CompendiumRoute />} />
      <Route path=":license" element={<LicensePage />} />
      <Route path=":license/review" element={<Review />} />
      <Route path=":license/exam" element={<ExamPage />} />
      <Route path=":license/:group" element={<LessonPage />} />
      <Route path=":license/:group/practice" element={<GroupPractice />} />
      <Route path="*" element={<div className="empty"><h2>Lost signal</h2><p><Link to="/">Back to start</Link></p></div>} />
    </Route>,
  ),
)

export default function App() {
  return <RouterProvider router={router} />
}
