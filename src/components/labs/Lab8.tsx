import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Terminal, CheckCircle, Play } from 'lucide-react';
import TerminalSimulator from '../TerminalSimulator';

interface Lab8Props {
  onBack: () => void;
}

const Lab8: React.FC<Lab8Props> = ({ onBack }) => {
  const [completedCommands, setCompletedCommands] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const expectedCommands = [
    'ls -la',
    'chmod 755 script.sh',
    'whoami',
    'df -h',
    'free -h'
  ];
  
  const exercises = [
    {
      command: 'ls -la',
      description: 'List files with detailed permissions',
      explanation: '-l shows long format with permissions, -a shows hidden files starting with .'
    },
    {
      command: 'chmod 755 script.sh',
      description: 'Set file permissions to rwxr-xr-x',
      explanation: '755 means owner can read/write/execute, group and others can read/execute.'
    },
    {
      command: 'whoami',
      description: 'Display current username',
      explanation: 'Shows the effective user ID - useful in scripts to check user context.'
    },
    {
      command: 'df -h',
      description: 'Show disk space usage in human-readable format',
      explanation: 'df displays filesystem disk space usage. -h makes sizes human-readable.'
    },
    {
      command: 'free -h',
      description: 'Display memory usage information',
      explanation: 'free shows RAM and swap usage. -h displays in human-readable format.'
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
          <h1 className="text-2xl font-bold text-white">Lab 8: System Administration</h1>
          <p className="text-slate-400">Master file permissions, users, and system monitoring</p>
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
                <h3 className="text-lg font-medium text-white mb-2">System Administration</h3>
                <p className="mb-4">
                  System administration involves managing users, permissions, and monitoring system resources. These skills are essential for DevOps professionals.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">File Permissions</h4>
                  <div className="text-xs space-y-2">
                    <p>Format: <code className="text-yellow-400">drwxrwxrwx</code></p>
                    <p><code className="text-yellow-400">d</code> = directory, <code className="text-yellow-400">-</code> = file</p>
                    <p><code className="text-yellow-400">rwx</code> = read, write, execute</p>
                    <p>Three groups: owner, group, others</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Numeric Permissions</h4>
                  <div className="text-xs space-y-1">
                    <p><code className="text-yellow-400">4</code> = read (r)</p>
                    <p><code className="text-yellow-400">2</code> = write (w)</p>
                    <p><code className="text-yellow-400">1</code> = execute (x)</p>
                    <p><code className="text-yellow-400">755</code> = rwxr-xr-x</p>
                    <p><code className="text-yellow-400">644</code> = rw-r--r--</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">System Information</h4>
                  <div className="text-xs space-y-1">
                    <p><code className="text-yellow-400">whoami</code> - Current user</p>
                    <p><code className="text-yellow-400">id</code> - User and group IDs</p>
                    <p><code className="text-yellow-400">uname -a</code> - System information</p>
                    <p><code className="text-yellow-400">uptime</code> - System uptime and load</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Resource Monitoring</h4>
                  <div className="text-xs space-y-1">
                    <p><code className="text-yellow-400">df</code> - Disk space usage</p>
                    <p><code className="text-yellow-400">du</code> - Directory space usage</p>
                    <p><code className="text-yellow-400">free</code> - Memory usage</p>
                    <p><code className="text-yellow-400">top</code> - Process activity</p>
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
              <li>• Use sudo for administrative commands</li>
              <li>• chmod +x makes files executable</li>
              <li>• chown changes file ownership</li>
              <li>• Use watch command for continuous monitoring</li>
            </ul>
          </div>

          {/* Final Completion */}
          {progress === 100 && (
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">🎉 Master Achievement Unlocked!</h3>
              <p className="text-sm text-slate-300 mb-2">
                Congratulations! You've completed all 8 comprehensive labs and mastered shell scripting fundamentals!
              </p>
              <p className="text-xs text-slate-400">
                You're now equipped with essential DevOps skills including navigation, file operations, scripting, functions, process management, and system administration.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lab8;