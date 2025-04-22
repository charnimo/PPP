import React, { useEffect, useState } from 'react';

// Define global window interface with our API
declare global {
  interface Window {
    api?: {
      test: () => string;
      executeCommand: (command: string) => Promise<{stdout: string, stderr: string}>;
      send: (channel: string, data: unknown) => void;
      receive: (channel: string, func: (...args: unknown[]) => void) => void;
    };
  }
}

const ApiTest: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<string>('Checking API...');
  const [commandResult, setCommandResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Check if the API is available when component mounts
    console.log('Window API available:', !!window.api);
    
    if (window.api) {
      try {
        const testResult = window.api.test();
        setApiStatus(`API connected: ${testResult}`);
        console.log('API methods:', Object.keys(window.api));
      } catch (err) {
        const error = err as Error;
        setApiStatus(`API found but test failed: ${error.message}`);
      }
    } else {
      setApiStatus('API not available. Are you running in Electron?');
    }
  }, []);

  const runSimpleCommand = async () => {
    if (!window.api) return;
    
    setIsLoading(true);
    try {
      // Use a simple command that should work on most systems
      const command = process.platform === 'win32' ? 'echo Hello from Electron!' : 'echo "Hello from Electron!"';
      const result = await window.api.executeCommand(command);
      setCommandResult(result.stdout);
    } catch (err) {
      const error = err as { error: string };
      setCommandResult(`Error: ${error.error || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Electron API Test</h2>
      <div className="mb-4 p-2 bg-gray-100 rounded">
        Status: {apiStatus}
      </div>

      <button 
        onClick={runSimpleCommand}
        disabled={!window.api || isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
      >
        {isLoading ? 'Running...' : 'Run Test Command'}
      </button>

      {commandResult && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <h3 className="font-semibold">Command Output:</h3>
          <pre>{commandResult}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest;