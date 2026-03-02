import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './components/Layout/MainLayout';

function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
