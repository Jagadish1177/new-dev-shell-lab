import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Terminal, CheckCircle, Play } from 'lucide-react';
import TerminalSimulator from '../TerminalSimulator';

interface Lab7Props {
  onBack: () => void;
}

const Lab7: React.FC<Lab7Props> = ({ onBack }) => {
  const [completedCommands, setCompletedCommands] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const expectedCommands = [
    'ps aux',
    'sleep 30 &',
    'jobs',
    'kill %1',
    'nohup sleep 60 > /dev/null 2>&1 &'
  ];
  
  const exercises = [
    {
      command: 'ps aux',
      description: 'List all running processes',
      explanation: 'ps shows process status. aux shows all processes with detailed info.'
    },
    {
      command: 'sleep 30 &',
      description: 'Run sleep command in background',
      explanation: '& at the end runs commands in background, returning control to shell.'
    },
    {
      command: 'jobs',
      description: 'List active background jobs',
      explanation: 'jobs shows background processes started from current shell.'
    },
    {
      command: 'kill %1',
      description: 'Kill the first background job',
      explanation: '%1 refers to job number 1. Use kill %n to terminate job n.'
    },
    {
      command: 'nohup sleep 60 > /dev/null 2>&1 &',
      description: 'Run process that survives shell exit',
      explanation: 'nohup prevents hangup signal. Redirects output to avoid terminal dependency.'
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
          <h1 className="text-2xl font-bold text-white">Lab 7: Process Management</h1>
          <p className="text-slate-400">Learn to manage processes and background jobs</p>
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
                <h3 className="text-lg font-medium text-white mb-2">Process Management</h3>
                <p className="mb-4">
                  Understanding how to manage processes is crucial for system administration and automation. Learn to run, monitor, and control processes effectively.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Process Commands</h4>
                  <div className="text-xs space-y-1">
                    <p><code className="text-yellow-400">ps</code> - Show running processes</p>
                    <p><code className="text-yellow-400">jobs</code> - List background jobs</p>
                    <p><code className="text-yellow-400">kill</code> - Terminate processes</p>
                    <p><code className="text-yellow-400">nohup</code> - Run immune to hangups</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Background Jobs</h4>
                  <div className="text-xs space-y-1">
                    <p><code className="text-yellow-400">command &</code> - Run in background</p>
                    <p><code className="text-yellow-400">Ctrl+Z</code> - Suspend current job</p>
                    <p><code className="text-yellow-400">bg</code> - Resume job in background</p>
                    <p><code className="text-yellow-400">fg</code> - Bring job to foreground</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Process Signals</h4>
                  <div className="text-xs space-y-1">
                    <p><code className="text-yellow-400">SIGTERM (15)</code> - Graceful termination</p>
                    <p><code className="text-yellow-400">SIGKILL (9)</code> - Force kill</p>
                    <p><code className="text-yellow-400">SIGHUP (1)</code> - Hangup signal</p>
                    <p><code className="text-yellow-400">SIGINT (2)</code> - Interrupt (Ctrl+C)</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Redirection</h4>
                  <div className="text-xs space-y-1">
                    <p><code className="text-yellow-400">/dev/null</code> - Discard output</p>
                    <p><code className="text-yellow-400">2&gt;&amp;1</code> - Redirect stderr to stdout</p>
                    <p><code className="text-yellow-400">&amp;&gt;</code> - Redirect both stdout and stderr</p>
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
              <li>• Use ps aux | grep process_name to find specific processes</li>
              <li>• killall process_name kills all instances</li>
              <li>• Use screen or tmux for persistent sessions</li>
              <li>• Monitor with top or htop for real-time view</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lab7;