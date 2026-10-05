import { Link, Outlet, Route, createRoutesFromElements } from 'react-router-dom'
import { LICENSES } from '@/data'
import { LicenseScope } from '@/lib/useRouteParams'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { LicensePage } from '@/pages/License'
import { LessonPage } from '@/pages/Lesson'
import { ExamPage, GroupPractice, Review } from '@/pages/Practice'
import { Browse } from '@/pages/Browse'
import { SettingsPage } from '@/pages/Settings'
import { Acknowledgements } from '@/pages/Acknowledgements'
import { CompendiumRoute } from '@/compendium/pages'

/** Shared by the browser (main.tsx) and the static prerenderer (entry-server.tsx). */
export const routes = createRoutesFromElements(
  <Route element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="settings" element={<SettingsPage />} />
    <Route path="acknowledgements" element={<Acknowledgements />} />
    <Route path="browse/:license" element={<Browse />} />
    <Route path="compendium/*" element={<CompendiumRoute />} />
    {LICENSES.map((l) => (
      <Route key={l} path={l} element={<LicenseScope.Provider value={l}><Outlet /></LicenseScope.Provider>}>
        <Route index element={<LicensePage />} />
        <Route path="review" element={<Review />} />
        <Route path="exam" element={<ExamPage />} />
        <Route path=":group" element={<LessonPage />} />
        <Route path=":group/practice" element={<GroupPractice />} />
      </Route>
    ))}
    <Route path="*" element={<div className="empty"><h2>Lost signal</h2><p><Link to="/">Back to start</Link></p></div>} />
  </Route>,
)

/** Router basename derived from Vite's base ('/' -> '', '/hamplitude/' -> '/hamplitude'). */
export const basename = import.meta.env.BASE_URL.replace(/\/$/, '')
