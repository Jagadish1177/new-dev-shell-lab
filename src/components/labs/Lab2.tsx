import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Terminal, CheckCircle, Play } from 'lucide-react';
import TerminalSimulator from '../TerminalSimulator';

interface Lab2Props {
  onBack: () => void;
}

const Lab2: React.FC<Lab2Props> = ({ onBack }) => {
  const [completedCommands, setCompletedCommands] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const expectedCommands = ['mkdir myproject', 'touch readme.txt', 'ls', 'cp readme.txt backup.txt', 'mv backup.txt archive.txt', 'rm archive.txt'];
  
  const exercises = [
    {
      command: 'mkdir myproject',
      description: 'Create a new directory called "myproject"',
      explanation: 'mkdir creates directories. Essential for organizing your files.'
    },
    {
      command: 'touch readme.txt',
      description: 'Create an empty file called "readme.txt"',
      explanation: 'touch creates empty files quickly. Great for creating templates.'
    },
    {
      command: 'ls',
      description: 'List contents to see your new files',
      explanation: 'Always verify your file operations were successful.'
    },
    {
      command: 'cp readme.txt backup.txt',
      description: 'Copy readme.txt to create backup.txt',
      explanation: 'cp command copies files. Format: cp source destination'
    },
    {
      command: 'mv backup.txt archive.txt',
      description: 'Rename backup.txt to archive.txt',
      explanation: 'mv can move files or rename them when used in same directory.'
    },
    {
      command: 'rm archive.txt',
      description: 'Delete the archive.txt file',
      explanation: 'rm removes files. Be careful - this is permanent!'
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
          <h1 className="text-2xl font-bold text-white">Lab 2: File Operations</h1>
          <p className="text-slate-400">Master creating, copying, moving, and deleting files</p>
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
                <h3 className="text-lg font-medium text-white mb-2">File Management Commands</h3>
                <p className="mb-4">
                  File operations are crucial for managing your projects. These commands let you create, organize, and maintain your file system.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">mkdir (Make Directory)</h4>
                  <p className="text-sm mb-2">Creates new directories for organizing files.</p>
                  <code className="text-green-400 bg-slate-800 px-2 py-1 rounded text-xs">$ mkdir directory_name</code>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">touch (Create File)</h4>
                  <p className="text-sm mb-2">Creates empty files or updates timestamps.</p>
                  <code className="text-green-400 bg-slate-800 px-2 py-1 rounded text-xs">$ touch filename.txt</code>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">cp (Copy)</h4>
                  <p className="text-sm mb-2">Copies files or directories.</p>
                  <code className="text-green-400 bg-slate-800 px-2 py-1 rounded text-xs">$ cp source destination</code>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">mv (Move/Rename)</h4>
                  <p className="text-sm mb-2">Moves files or renames them.</p>
                  <code className="text-green-400 bg-slate-800 px-2 py-1 rounded text-xs">$ mv oldname newname</code>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">rm (Remove)</h4>
                  <p className="text-sm mb-2">Deletes files permanently. Use with caution!</p>
                  <code className="text-green-400 bg-slate-800 px-2 py-1 rounded text-xs">$ rm filename</code>
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
              <li>• Use "rm -r" to remove directories</li>
              <li>• Use "cp -r" to copy directories</li>
              <li>• Always double-check before using rm</li>
              <li>• Use wildcards like *.txt for multiple files</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lab2;