import React, { useState } from 'react';
import { Terminal, BookOpen, Code, Play, ChevronRight, Home, FileText } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Lab1 from './components/labs/Lab1';
import Lab2 from './components/labs/Lab2';
import Lab3 from './components/labs/Lab3';
import Lab4 from './components/labs/Lab4';
import Lab5 from './components/labs/Lab5';
import Lab6 from './components/labs/Lab6';
import Lab7 from './components/labs/Lab7';
import Lab8 from './components/labs/Lab8';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const labs = [
    { id: 'lab1', title: 'Navigation Basics', description: 'Learn ls, cd, pwd commands', difficulty: 'Beginner' },
    { id: 'lab2', title: 'File Operations', description: 'Create, copy, move, and delete files', difficulty: 'Beginner' },
    { id: 'lab3', title: 'Content Management', description: 'View and search file contents', difficulty: 'Intermediate' },
    { id: 'lab4', title: 'Variables & Scripts', description: 'Shell variables and basic scripting', difficulty: 'Intermediate' },
    { id: 'lab5', title: 'Control Flow', description: 'Conditionals and loops in shell', difficulty: 'Advanced' },
    { id: 'lab6', title: 'Functions & Parameters', description: 'Create reusable shell functions', difficulty: 'Advanced' },
    { id: 'lab7', title: 'Process Management', description: 'Managing processes and background jobs', difficulty: 'Expert' },
    { id: 'lab8', title: 'System Administration', description: 'File permissions, users, and system info', difficulty: 'Expert' }
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'lab1': return <Lab1 onBack={() => setCurrentView('dashboard')} />;
      case 'lab2': return <Lab2 onBack={() => setCurrentView('dashboard')} />;
      case 'lab3': return <Lab3 onBack={() => setCurrentView('dashboard')} />;
      case 'lab4': return <Lab4 onBack={() => setCurrentView('dashboard')} />;
      case 'lab5': return <Lab5 onBack={() => setCurrentView('dashboard')} />;
      case 'lab6': return <Lab6 onBack={() => setCurrentView('dashboard')} />;
      case 'lab7': return <Lab7 onBack={() => setCurrentView('dashboard')} />;
      case 'lab8': return <Lab8 onBack={() => setCurrentView('dashboard')} />;
      default: return <Dashboard labs={labs} onSelectLab={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">DevOps Shell Lab</h1>
                <p className="text-sm text-slate-400">Interactive Shell Scripting Learning</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;