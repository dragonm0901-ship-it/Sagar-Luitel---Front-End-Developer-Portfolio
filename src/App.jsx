import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './components/Layout/MainLayout';

// Lazy load the future course platform components to keep the initial landing page bundle small
const AuthGate = lazy(() => import('./components/Courses/AuthGate'));
const CourseDashboard = lazy(() => import('./components/Courses/CourseDashboard'));
const CourseViewer = lazy(() => import('./components/Courses/CourseViewer'));

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Portfolio Landing Page */}
          <Route path="/" element={<MainLayout />} />
          
          {/* Secure Course Platform Routes */}
          <Route 
            path="/courses" 
            element={
              <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">Loading Terminal...</div>}>
                <AuthGate>
                  <CourseDashboard />
                </AuthGate>
              </Suspense>
            } 
          />
          <Route 
            path="/courses/:courseId" 
            element={
              <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">Booting Course...</div>}>
                <AuthGate>
                  <CourseViewer />
                </AuthGate>
              </Suspense>
            } 
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
