import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Terminal, CheckCircle, Play } from 'lucide-react';
import TerminalSimulator from '../TerminalSimulator';

interface Lab4Props {
  onBack: () => void;
}

const Lab4: React.FC<Lab4Props> = ({ onBack }) => {
  const [completedCommands, setCompletedCommands] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const expectedCommands = ['name="DevOps"', 'echo $name', 'echo "Hello $name"', 'echo "#!/bin/bash" > script.sh', 'echo "echo Hello from script" >> script.sh'];
  
  const exercises = [
    {
      command: 'name="DevOps"',
      description: 'Create a shell variable named "name"',
      explanation: 'Variables store data that can be reused. No spaces around = sign!'
    },
    {
      command: 'echo $name',
      description: 'Display the value of the name variable',
      explanation: 'Use $ prefix to access variable values.'
    },
    {
      command: 'echo "Hello $name"',
      description: 'Use the variable in a string',
      explanation: 'Variables are expanded inside double quotes.'
    },
    {
      command: 'echo "#!/bin/bash" > script.sh',
      description: 'Create a script file with shebang',
      explanation: 'Shebang tells system which interpreter to use.'
    },
    {
      command: 'echo "echo Hello from script" >> script.sh',
      description: 'Add a command to the script',
      explanation: 'Build scripts by adding commands to files.'
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
          <h1 className="text-2xl font-bold text-white">Lab 4: Variables & Scripts</h1>
          <p className="text-slate-400">Learn shell variables and basic script creation</p>
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
                <h3 className="text-lg font-medium text-white mb-2">Variables & Shell Scripts</h3>
                <p className="mb-4">
                  Variables store data for reuse, making your scripts dynamic and flexible. Shell scripts automate repetitive tasks.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Shell Variables</h4>
                  <div className="space-y-2">
                    <p className="text-sm mb-1">Create: <code className="text-green-400">variable_name="value"</code></p>
                    <p className="text-sm mb-1">Access: <code className="text-green-400">$variable_name</code></p>
                    <p className="text-sm">No spaces around the = sign!</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Script Structure</h4>
                  <div className="space-y-2">
                    <p className="text-sm mb-1">Shebang: <code className="text-green-400">#!/bin/bash</code></p>
                    <p className="text-sm mb-1">Commands: One per line</p>
                    <p className="text-sm">Execute: <code className="text-green-400">bash script.sh</code></p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Example Script</h4>
                  <pre className="text-green-400 bg-slate-800 p-2 rounded text-xs">
{`#!/bin/bash
name="World"
echo "Hello $name"
echo "Today is $(date)"`}
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
              <li>• Use single quotes for literal strings</li>
              <li>• Use double quotes for variable expansion</li>
              <li>• Make scripts executable with chmod +x</li>
              <li>• Use $(command) for command substitution</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lab4;