import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Terminal, CheckCircle, Play } from 'lucide-react';
import TerminalSimulator from '../TerminalSimulator';

interface Lab6Props {
  onBack: () => void;
}

const Lab6: React.FC<Lab6Props> = ({ onBack }) => {
  const [completedCommands, setCompletedCommands] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const expectedCommands = [
    'greet() { echo "Hello $1!"; }',
    'greet World',
    'calculate() { echo $(($1 + $2)); }',
    'calculate 5 3',
    'backup_file() { cp "$1" "$1.backup"; echo "Backed up $1"; }'
  ];
  
  const exercises = [
    {
      command: 'greet() { echo "Hello $1!"; }',
      description: 'Create a function that greets someone',
      explanation: 'Functions are defined with name() { commands; }. $1 is the first parameter.'
    },
    {
      command: 'greet World',
      description: 'Call the greet function with "World" as parameter',
      explanation: 'Call functions by name followed by parameters separated by spaces.'
    },
    {
      command: 'calculate() { echo $(($1 + $2)); }',
      description: 'Create a function that adds two numbers',
      explanation: 'Use $(( )) for arithmetic operations. $1 and $2 are first and second parameters.'
    },
    {
      command: 'calculate 5 3',
      description: 'Call calculate function with numbers 5 and 3',
      explanation: 'Pass multiple parameters separated by spaces.'
    },
    {
      command: 'backup_file() { cp "$1" "$1.backup"; echo "Backed up $1"; }',
      description: 'Create a function to backup files',
      explanation: 'Functions can contain multiple commands. Quote parameters to handle spaces.'
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
          <h1 className="text-2xl font-bold text-white">Lab 6: Functions & Parameters</h1>
          <p className="text-slate-400">Create reusable shell functions with parameters</p>
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
                <h3 className="text-lg font-medium text-white mb-2">Shell Functions</h3>
                <p className="mb-4">
                  Functions allow you to group commands together and reuse them with different parameters. They make your scripts modular and maintainable.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Function Syntax</h4>
                  <pre className="text-green-400 bg-slate-800 p-2 rounded text-xs mb-2">
{`function_name() {
  command1
  command2
  return value
}`}
                  </pre>
                  <p className="text-sm">Functions are called by name: function_name arg1 arg2</p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Parameters</h4>
                  <div className="text-xs space-y-1">
                    <p><code className="text-yellow-400">$1, $2, $3...</code> - Individual parameters</p>
                    <p><code className="text-yellow-400">$@</code> - All parameters as separate words</p>
                    <p><code className="text-yellow-400">$*</code> - All parameters as single word</p>
                    <p><code className="text-yellow-400">$#</code> - Number of parameters</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Example Function</h4>
                  <pre className="text-green-400 bg-slate-800 p-2 rounded text-xs">
{`create_backup() {
  if [ $# -eq 0 ]; then
    echo "Usage: create_backup <file>"
    return 1
  fi
  cp "$1" "$1.$(date +%Y%m%d)"
  echo "Backup created for $1"
}`}
                  </pre>
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
                      <code className="text-green-400 font-medium text-xs">{exercise.command}</code>
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
              <li>• Always quote parameters: "$1" not $1</li>
              <li>• Check parameter count with [ $# -eq n ]</li>
              <li>• Use return codes: return 0 (success) or return 1 (error)</li>
              <li>• Local variables: local var="value"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lab6;