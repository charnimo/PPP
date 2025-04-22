import React from 'react';
import { executeCommand } from './commandService';

const CommandButton = () => {
  const handleClick = async () => {
    try {
      const result = await executeCommand('dir'); // or 'ls' on Unix systems
      console.log('Command result:', result);
      // You might want to display the result to the user
    } catch (error) {
      console.error('Command failed:', error);
      // You might want to show an error message to the user
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Run Directory Command
    </button>
  );
};

export default CommandButton;