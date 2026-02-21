import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Main layout component for consistent page structure
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { XPPopupManager } from './components/XPPopup';
import { LevelUpModal } from './components/LevelUpModal';
import { AchievementToastManager } from './components/AchievementToast';
import { PublicLayout } from './components/PublicLayout';
import { PageLoader } from './components/PageLoader';

// Keep Landing and Auth statically imported
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { Pricing } from './pages/Pricing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Lazy load everything else
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const LessonPlayer = lazy(() => import('./components/LessonPlayer').then(m => ({ default: m.LessonPlayer })));
const Profile = lazy(() => import('./pages/Profile').then(m => ({ default: m.Profile })));
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));
const Quiz = lazy(() => import('./pages/Quiz').then(m => ({ default: m.Quiz })));
const MyCourses = lazy(() => import('./pages/MyCourses').then(m => ({ default: m.MyCourses })));
const PythonCourse = lazy(() => import('./pages/PythonCourse'));
const StudyWorkspace = lazy(() => import('./pages/StudyWorkspace').then(m => ({ default: m.StudyWorkspace })));
const CodingArena = lazy(() => import('./pages/CodingArena').then(m => ({ default: m.CodingArena })));
const Onboarding = lazy(() => import('./pages/Onboarding').then(m => ({ default: m.Onboarding })));
const TopicDifficulty = lazy(() => import('./pages/TopicDifficulty').then(m => ({ default: m.TopicDifficulty })));
const ProblemList = lazy(() => import('./pages/ProblemList').then(m => ({ default: m.ProblemList })));
const CodingGame = lazy(() => import('./pages/CodingGame').then(m => ({ default: m.CodingGame })));

// Wrapper to conditionally render Layout (LessonViewer has its own layout structure)
const RouteLayout = ({ children, noShell = false }: { children: React.ReactNode, noShell?: boolean }) => {
  if (noShell) return <>{children}</>;
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <Router>
      <XPPopupManager />
      <LevelUpModal />
      <AchievementToastManager />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/courses" element={<PublicLayout><Courses /></PublicLayout>} />
          <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
          <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />

          {/* Onboarding Route */}
          <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />

          {/* Protected Dashboard & App Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><RouteLayout><Dashboard /></RouteLayout></ProtectedRoute>} />
          <Route path="/my-courses" element={<ProtectedRoute><RouteLayout><MyCourses /></RouteLayout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><RouteLayout><Profile /></RouteLayout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><RouteLayout><Settings /></RouteLayout></ProtectedRoute>} />
          <Route path="/quiz/:courseId/:lessonId" element={<ProtectedRoute><RouteLayout><Quiz /></RouteLayout></ProtectedRoute>} />

          {/* Study Workspace */}
          <Route path="/study" element={<ProtectedRoute><StudyWorkspace /></ProtectedRoute>} />

          {/* Coding Arena Routes */}
          <Route path="/coding" element={<ProtectedRoute><Layout><CodingArena /></Layout></ProtectedRoute>} />
          <Route path="/coding/topic/:topicId" element={<ProtectedRoute><Layout><TopicDifficulty /></Layout></ProtectedRoute>} />
          <Route path="/coding/topic/:topicId/:difficulty" element={<ProtectedRoute><Layout><ProblemList /></Layout></ProtectedRoute>} />
          <Route path="/coding/problem/:id" element={<ProtectedRoute><CodingGame /></ProtectedRoute>} />

          {/* Python Course Routes */}
          <Route path="/course/python" element={<ProtectedRoute><RouteLayout noShell><PythonCourse /></RouteLayout></ProtectedRoute>} />
          <Route path="/course/python/module/:moduleId/lesson/:lessonId" element={<ProtectedRoute><RouteLayout noShell><LessonPlayer /></RouteLayout></ProtectedRoute>} />

          {/* Generic Lesson Route */}
          <Route path="/course/:courseId/lesson/:lessonId" element={<ProtectedRoute><RouteLayout noShell><LessonPlayer /></RouteLayout></ProtectedRoute>} />

          {/* Redirect shortcuts for demo */}
          <Route path="/course/:courseId" element={<Navigate to="/courses" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;