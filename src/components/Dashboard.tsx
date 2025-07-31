import React from 'react';
import { Terminal, BookOpen, Code, Play, ChevronRight, Star, Clock, Users } from 'lucide-react';

interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: string;
}

interface DashboardProps {
  labs: Lab[];
  onSelectLab: (labId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ labs, onSelectLab }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      case 'Expert': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
            <Terminal className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Master Shell Scripting
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Learn shell scripting from absolute basics with interactive exercises, comprehensive theory, and hands-on practice in a simulated terminal environment.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 text-center">
          <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white mb-1">8</div>
          <div className="text-slate-400">Interactive Labs</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 text-center">
          <Clock className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white mb-1">4-5 hrs</div>
          <div className="text-slate-400">Total Duration</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 text-center">
          <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white mb-1">Beginner</div>
          <div className="text-slate-400">Friendly</div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Code className="w-6 h-6" />
          <span>Learning Path</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {labs.map((lab, index) => (
            <div
              key={lab.id}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer"
              onClick={() => onSelectLab(lab.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {lab.title}
                    </h3>
                    <p className="text-slate-400 text-sm">{lab.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getDifficultyColor(lab.difficulty)}`}>
                    {lab.difficulty}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400">
                  <Play className="w-4 h-4" />
                  <span className="text-sm">Start Lab</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-3">Getting Started</h3>
        <div className="space-y-2 text-slate-300">
          <p>• Each lab includes comprehensive theory and hands-on practice</p>
          <p>• Use the interactive terminal to practice commands safely</p>
          <p>• Complete exercises in order for the best learning experience</p>
          <p>• Take your time - there's no rush!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;