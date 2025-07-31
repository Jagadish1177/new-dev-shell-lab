import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Terminal, CheckCircle, Play } from 'lucide-react';
import TerminalSimulator from '../TerminalSimulator';

interface Lab5Props {
  onBack: () => void;
}

const Lab5: React.FC<Lab5Props> = ({ onBack }) => {
  const [completedCommands, setCompletedCommands] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const expectedCommands = ['if [ -f "script.sh" ]; then echo "File exists"; fi', 'for i in 1 2 3; do echo "Number: $i"; done', 'count=0', 'while [ $count -lt 3 ]; do echo "Count: $count"; count=$((count + 1)); done'];
  
  const exercises = [
    {
      command: 'if [ -f "script.sh" ]; then echo "File exists"; fi',
      description: 'Check if script.sh file exists using if statement',
      explanation: 'if statements allow conditional execution. -f tests for file existence.'
    },
    {
      command: 'for i in 1 2 3; do echo "Number: $i"; done',
      description: 'Loop through numbers 1, 2, 3 using for loop',
      explanation: 'for loops iterate over lists of items or ranges.'
    },
    {
      command: 'count=0',
      description: 'Initialize a counter variable',
      explanation: 'Set up variables for use in loops and conditions.'
    },
    {
      command: 'while [ $count -lt 3 ]; do echo "Count: $count"; count=$((count + 1)); done',
      description: 'Use while loop to count from 0 to 2',
      explanation: 'while loops continue as long as condition is true. -lt means "less than".'
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
          <h1 className="text-2xl font-bold text-white">Lab 5: Control Flow</h1>
          <p className="text-slate-400">Master conditionals and loops in shell scripting</p>
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
                <h3 className="text-lg font-medium text-white mb-2">Control Flow</h3>
                <p className="mb-4">
                  Control flow structures like conditionals and loops make your scripts intelligent and capable of handling complex logic.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">If Statements</h4>
                  <pre className="text-green-400 bg-slate-800 p-2 rounded text-xs mb-2">
{`if [ condition ]; then
  command
fi`}
                  </pre>
                  <p className="text-sm">Common tests: -f (file), -d (directory), -eq (equal)</p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">For Loops</h4>
                  <pre className="text-green-400 bg-slate-800 p-2 rounded text-xs mb-2">
{`for item in list; do
  command
done`}
                  </pre>
                  <p className="text-sm">Iterate over lists, ranges, or file patterns</p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">While Loops</h4>
                  <pre className="text-green-400 bg-slate-800 p-2 rounded text-xs mb-2">
{`while [ condition ]; do
  command
done`}
                  </pre>
                  <p className="text-sm">Continue while condition is true</p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Comparison Operators</h4>
                  <div className="text-xs space-y-1">
                    <p><code className="text-yellow-400">-eq</code> equal to</p>
                    <p><code className="text-yellow-400">-lt</code> less than</p>
                    <p><code className="text-yellow-400">-gt</code> greater than</p>
                    <p><code className="text-yellow-400">-f</code> file exists</p>
                    <p><code className="text-yellow-400">-d</code> directory exists</p>
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
              <li>• Use $((expression)) for arithmetic</li>
              <li>• Spaces around [ ] are required</li>
              <li>• Use elif for multiple conditions</li>
              <li>• break and continue control loop flow</li>
            </ul>
          </div>

          {/* Completion */}
          {progress === 100 && (
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">🎉 Congratulations!</h3>
              <p className="text-sm text-slate-300">
                You've completed all 5 labs and mastered the basics of shell scripting! 
                You're now ready to create your own automated scripts and tackle more advanced DevOps challenges.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lab5;