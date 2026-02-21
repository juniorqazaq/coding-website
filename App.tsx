import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Main layout component for consistent page structure
import { Layout } from './components/Layout';
import { PublicLayout } from './components/PublicLayout';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { Dashboard } from './pages/Dashboard';
import { LessonViewer } from './pages/LessonViewer';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Quiz } from './pages/Quiz';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { MyCourses } from './pages/MyCourses';
import PythonCourse from './pages/PythonCourse';
import PythonLesson from './pages/PythonLesson';
import { StudyWorkspace } from './pages/StudyWorkspace';
import { Pricing } from './pages/Pricing';
import { CodingArena } from './pages/CodingArena';
import { TopicDifficulty } from './pages/TopicDifficulty';
import { ProblemList } from './pages/ProblemList';
import { CodingGame } from './pages/CodingGame';

// Wrapper to conditionally render Layout (LessonViewer has its own layout structure)
const RouteLayout = ({ children, noShell = false }: { children: React.ReactNode, noShell?: boolean }) => {
  if (noShell) return <>{children}</>;
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/courses" element={<PublicLayout><Courses /></PublicLayout>} />
        <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Study Workspace */}
        <Route path="/study" element={<StudyWorkspace />} />

        {/* Coding Arena Routes */}
        <Route path="/coding" element={<Layout><CodingArena /></Layout>} />
        <Route path="/coding/topic/:topicId" element={<Layout><TopicDifficulty /></Layout>} />
        <Route path="/coding/topic/:topicId/:difficulty" element={<Layout><ProblemList /></Layout>} />
        <Route path="/coding/problem/:id" element={<CodingGame />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<RouteLayout><Dashboard /></RouteLayout>} />
        <Route path="/my-courses" element={<RouteLayout><MyCourses /></RouteLayout>} />
        <Route path="/profile" element={<RouteLayout><Profile /></RouteLayout>} />
        <Route path="/settings" element={<RouteLayout><Settings /></RouteLayout>} />
        <Route path="/quiz/:courseId/:lessonId" element={<RouteLayout><Quiz /></RouteLayout>} />

        {/* Python Course Routes */}
        <Route path="/course/python" element={<RouteLayout noShell><PythonCourse /></RouteLayout>} />
        <Route path="/course/python/module/:moduleId/lesson/:lessonId" element={<RouteLayout noShell><PythonLesson /></RouteLayout>} />


        {/* Specific layout for deep focus mode */}
        <Route path="/course/:courseId/lesson/:lessonId" element={<RouteLayout noShell><LessonViewer /></RouteLayout>} />

        {/* Study Workspace */}
        <Route path="/study" element={<StudyWorkspace />} />

        {/* Redirect shortcuts for demo */}
        <Route path="/course/:courseId" element={<Navigate to="/courses" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;