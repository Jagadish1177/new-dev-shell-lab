import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Terminal, CheckCircle, Play } from 'lucide-react';
import TerminalSimulator from '../TerminalSimulator';

interface Lab3Props {
  onBack: () => void;
}

const Lab3: React.FC<Lab3Props> = ({ onBack }) => {
  const [completedCommands, setCompletedCommands] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const expectedCommands = ['echo "Hello World"', 'echo "Learning Shell" > learning.txt', 'cat learning.txt', 'echo "Advanced Topics" >> learning.txt', 'cat learning.txt'];
  
  const exercises = [
    {
      command: 'echo "Hello World"',
      description: 'Display text on the terminal',
      explanation: 'echo prints text to the screen. Basic output command.'
    },
    {
      command: 'echo "Learning Shell" > learning.txt',
      description: 'Write text to a new file',
      explanation: '> redirects output to a file, creating or overwriting it.'
    },
    {
      command: 'cat learning.txt',
      description: 'Display the contents of learning.txt',
      explanation: 'cat shows the contents of files on your screen.'
    },
    {
      command: 'echo "Advanced Topics" >> learning.txt',
      description: 'Append text to the existing file',
      explanation: '>> appends output to a file without overwriting existing content.'
    },
    {
      command: 'cat learning.txt',
      description: 'View the updated file contents',
      explanation: 'Verify that your text was appended correctly.'
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
          <h1 className="text-2xl font-bold text-white">Lab 3: Content Management</h1>
          <p className="text-slate-400">Learn to view, create, and manage file contents</p>
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
                <h3 className="text-lg font-medium text-white mb-2">Content Management</h3>
                <p className="mb-4">
                  Working with file contents is essential for shell scripting. Learn to display, create, and modify text files efficiently.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">echo (Display Text)</h4>
                  <p className="text-sm mb-2">Prints text to the terminal or redirects to files.</p>
                  <code className="text-green-400 bg-slate-800 px-2 py-1 rounded text-xs">$ echo "Hello World"</code>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">cat (Display File Contents)</h4>
                  <p className="text-sm mb-2">Shows the entire contents of a file.</p>
                  <code className="text-green-400 bg-slate-800 px-2 py-1 rounded text-xs">$ cat filename.txt</code>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Redirection Operators</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm mb-1"><code className="text-yellow-400">&gt;</code> - Overwrites file content</p>
                      <code className="text-green-400 bg-slate-800 px-2 py-1 rounded text-xs">$ echo "text" &gt; file.txt</code>
                    </div>
                    <div>
                      <p className="text-sm mb-1"><code className="text-yellow-400">&gt;&gt;</code> - Appends to file content</p>
                      <code className="text-green-400 bg-slate-800 px-2 py-1 rounded text-xs">$ echo "more text" &gt;&gt; file.txt</code>
                    </div>
                  </div>
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
              <li>• Use head -n 5 file.txt to see first 5 lines</li>
              <li>• Use tail -n 5 file.txt to see last 5 lines</li>
              <li>• Use grep "pattern" file.txt to search text</li>
              <li>• Be careful with &gt; - it overwrites files!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lab3;