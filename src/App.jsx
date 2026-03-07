import React, { lazy, Suspense, Component } from 'react';
import { Analytics } from '@vercel/analytics/react';

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error("Caught by ErrorBoundary:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', padding: '20px', fontFamily: 'monospace', background: 'black', height: '100vh' }}>
          <h2>React Crash</h2>
          <pre>{this.state.error?.toString()}</pre>
          <pre>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

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
      <ErrorBoundary>
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
        <Analytics />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
