import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalSimulatorProps {
  expectedCommands?: string[];
  onCommandComplete?: (command: string, success: boolean) => void;
  currentDirectory?: string;
  allowedCommands?: string[];
}

const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({
  expectedCommands = [],
  onCommandComplete,
  currentDirectory = '/home/user',
  allowedCommands = []
}) => {
  const [history, setHistory] = useState<Array<{type: 'input' | 'output' | 'error', content: string}>>([
    { type: 'output', content: 'Welcome to the DevOps Shell Lab Terminal!' },
    { type: 'output', content: 'Type commands below to practice. Use "help" for available commands.' },
    { type: 'output', content: '' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandIndex, setCommandIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const simulateCommand = (command: string): { output: string; success: boolean } => {
    const cmd = command.trim().toLowerCase();
    
    if (cmd === 'help') {
      return {
        output: `Available commands:
• ls - list directory contents
• cd <directory> - change directory
• pwd - print working directory
• mkdir <name> - create directory
• touch <file> - create file
• cat <file> - display file contents
• echo <text> - display text
• rm <file> - remove file
• cp <source> <dest> - copy file
• mv <source> <dest> - move file
• clear - clear terminal`,
        success: true
      };
    }

    if (cmd === 'clear') {
      return { output: 'CLEAR', success: true };
    }

    if (cmd === 'pwd') {
      return { output: currentDirectory, success: true };
    }

    if (cmd === 'ls') {
      return {
        output: `Documents  Downloads  Pictures  Videos
example.txt  script.sh  notes.md`,
        success: true
      };
    }

    if (cmd.startsWith('cd ')) {
      const dir = cmd.substring(3).trim();
      return {
        output: dir === '..' ? 'Changed to parent directory' : `Changed to directory: ${dir}`,
        success: true
      };
    }

    if (cmd.startsWith('mkdir ')) {
      const dirName = cmd.substring(6).trim();
      return {
        output: `Directory '${dirName}' created successfully`,
        success: true
      };
    }

    if (cmd.startsWith('touch ')) {
      const fileName = cmd.substring(6).trim();
      return {
        output: `File '${fileName}' created successfully`,
        success: true
      };
    }

    if (cmd.startsWith('echo ')) {
      const text = cmd.substring(5).trim();
      return {
        output: text.replace(/['"]/g, ''),
        success: true
      };
    }

    if (cmd.startsWith('cat ')) {
      const fileName = cmd.substring(4).trim();
      return {
        output: `Content of ${fileName}:
This is a sample file content.
You can view file contents using the cat command.`,
        success: true
      };
    }

    if (cmd.startsWith('rm ')) {
      const fileName = cmd.substring(3).trim();
      return {
        output: `File '${fileName}' removed successfully`,
        success: true
      };
    }

    if (cmd.startsWith('cp ')) {
      const parts = cmd.substring(3).trim().split(' ');
      if (parts.length >= 2) {
        return {
          output: `Copied '${parts[0]}' to '${parts[1]}'`,
          success: true
        };
      }
    }

    if (cmd.startsWith('mv ')) {
      const parts = cmd.substring(3).trim().split(' ');
      if (parts.length >= 2) {
        return {
          output: `Moved '${parts[0]}' to '${parts[1]}'`,
          success: true
        };
      }
    }

    return {
      output: `bash: ${command}: command not found`,
      success: false
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const newHistory = [
      ...history,
      { type: 'input' as const, content: `${currentDirectory}$ ${currentInput}` }
    ];

    const result = simulateCommand(currentInput);
    
    if (result.output === 'CLEAR') {
      setHistory([]);
    } else {
      const outputType = result.success ? 'output' : 'error';
      newHistory.push({ type: outputType, content: result.output });
      setHistory(newHistory);
    }

    // Check if command matches expected command
    if (expectedCommands.length > 0 && onCommandComplete) {
      const isExpected = expectedCommands[commandIndex]?.toLowerCase() === currentInput.trim().toLowerCase();
      onCommandComplete(currentInput, isExpected);
      if (isExpected) {
        setCommandIndex(prev => prev + 1);
      }
    }

    setCurrentInput('');
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2 border-b border-gray-700">
        <TerminalIcon className="w-4 h-4 text-green-400" />
        <span className="text-sm text-gray-300">Terminal</span>
        <div className="flex space-x-1 ml-auto">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="h-96 overflow-y-auto p-4 font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, index) => (
          <div key={index} className={`mb-1 ${
            entry.type === 'input' ? 'text-green-400' : 
            entry.type === 'error' ? 'text-red-400' : 'text-gray-300'
          }`}>
            {entry.content}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400 mr-2">{currentDirectory}$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none"
            placeholder="Type your command here..."
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default TerminalSimulator;