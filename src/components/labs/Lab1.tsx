import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Terminal, CheckCircle, XCircle, Play } from 'lucide-react';
import TerminalSimulator from '../TerminalSimulator';

interface Lab1Props {
  onBack: () => void;
}

const Lab1: React.FC<Lab1Props> = ({ onBack }) => {
  const [completedCommands, setCompletedCommands] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const expectedCommands = ['pwd', 'ls', 'cd Documents', 'pwd', 'ls'];
  
  const exercises = [
    {
      command: 'pwd',
      description: 'Print the current working directory',
      explanation: 'The pwd command shows you exactly where you are in the file system.'
    },
    {
      command: 'ls',
      description: 'List the contents of the current directory',
      explanation: 'The ls command displays all files and folders in your current location.'
    },
    {
      command: 'cd Documents',
      description: 'Change to the Documents directory',
      explanation: 'The cd command lets you navigate between directories.'
    },
    {
      command: 'pwd',
      description: 'Verify your new location',
      explanation: 'Always good practice to confirm where you are after changing directories.'
    },
    {
      command: 'ls',
      description: 'List contents of the Documents directory',
      explanation: 'See what files and folders are in your new location.'
    }
  ];

  const handleCommandComplete = (command: string, success: boolean) => {
    if (success && !completedCommands.includes(command)) {
      setCompletedCommands([...completedCommands, command]);
      if (currentStep < exercises.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const progress = (completedCommands.length / expectedCommands.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Lab 1: Navigation Basics</h1>
          <p className="text-slate-400">Learn the fundamental navigation commands</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-medium">Progress</span>
          <span className="text-slate-400">{completedCommands.length}/{expectedCommands.length}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theory Section */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Theory</h2>
            </div>
            
            <div className="space-y-4 text-slate-300">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Navigation Commands</h3>
                <p className="mb-4">
                  Navigation is the foundation of shell scripting. These three commands will help you move around the file system with confidence.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">pwd (Print Working Directory)</h4>
                  <p className="text-sm mb-2">Shows your current location in the file system.</p>
                  <code className="text-green-400 bg-slate-800 px-2 py-1 rounded text-xs">$ pwd</code>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">ls (List)</h4>
                  <p className="text-sm mb-2">Displays files and directories in the current location.</p>
                  <code className="text-green-400 bg-slate-800 px-2 py-1 rounded text-xs">$ ls</code>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">cd (Change Directory)</h4>
                  <p className="text-sm mb-2">Moves you to a different directory.</p>
                  <code className="text-green-400 bg-slate-800 px-2 py-1 rounded text-xs">$ cd directory_name</code>
                </div>
              </div>
            </div>
          </div>

          {/* Exercise Steps */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Play className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-semibold text-white">Exercise Steps</h2>
            </div>
            
            <div className="space-y-3">
              {exercises.map((exercise, index) => (
                <div 
                  key={index}
                  className={`flex items-start space-x-3 p-3 rounded-lg transition-all ${
                    index === currentStep 
                      ? 'bg-blue-500/20 border border-blue-500/30' 
                      : completedCommands.includes(exercise.command)
                      ? 'bg-green-500/20 border border-green-500/30'
                      : 'bg-slate-900/50'
                  }`}
                >
                  <div className="mt-1">
                    {completedCommands.includes(exercise.command) ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : index === currentStep ? (
                      <Play className="w-5 h-5 text-blue-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-600"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <code className="text-green-400 font-medium">{exercise.command}</code>
                    </div>
                    <p className="text-sm text-slate-400 mb-1">{exercise.description}</p>
                    <p className="text-xs text-slate-500">{exercise.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal Section */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Terminal className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-semibold text-white">Practice Terminal</h2>
            </div>
            
            <TerminalSimulator
              expectedCommands={expectedCommands}
              onCommandComplete={handleCommandComplete}
              currentDirectory="/home/user"
            />
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">💡 Pro Tips</h3>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Use Tab key for auto-completion</li>
              <li>• Type "clear" to clean your terminal</li>
              <li>• Use "cd .." to go up one directory</li>
              <li>• Use "cd ~" to go to home directory</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lab1;