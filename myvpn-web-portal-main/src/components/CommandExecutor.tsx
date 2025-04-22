import React, { useState } from 'react';

// Define proper types for our API responses
interface CommandSuccess {
  stdout: string;
  stderr: string;
}

interface CommandError {
  error: string;
  stderr?: string;
}

// Define the window interface to include our API
declare global {
  interface Window {
    api?: {
      executeCommand: (command: string) => Promise<CommandSuccess>;
      send: (channel: string, data: unknown) => void;
      receive: (channel: string, func: (...args: unknown[]) => void) => void;
    };
  }
}

const CommandExecutor: React.FC = () => {
  const [command, setCommand] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleCommandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  const executeCommand = async (): Promise<void> => {
    if (!window.api) {
      setError('API not available. Are you running in Electron?');
      return;
    }
    
    if (!command.trim()) {
      setError('Please enter a command');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const result = await window.api.executeCommand(command);
      setOutput(result.stdout || result.stderr || 'Command executed successfully with no output');
    } catch (err) {
      const errorObj = err as CommandError;
      setError(`Error executing command: ${errorObj.error || 'Unknown error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Command Executor</h2>
      
      <div className="mb-4">
        <label htmlFor="command" className="block text-sm font-medium text-gray-700 mb-1">
          Enter Command:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="command"
            value={command}
            onChange={handleCommandChange}
            className="flex-1 p-2 border border-gray-300 rounded"
            placeholder="Enter a command to execute"
          />
          <button
            onClick={executeCommand}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLoading ? 'Running...' : 'Execute'}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {output && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Output:</h3>
          <pre className="p-3 bg-gray-100 rounded overflow-x-auto whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Note: For security reasons, only run commands you trust.</p>
      </div>
    </div>
  );
};

export default CommandExecutor;