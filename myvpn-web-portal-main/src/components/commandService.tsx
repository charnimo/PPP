declare global {
    interface Window {
      electronAPI?: {
        executeCommand: (command: string) => Promise<string>
      }
    }
  }
  
  export const executeCommand = async (command: string): Promise<string> => {
    if (window.electronAPI) {
      return window.electronAPI.executeCommand(command)
    }
    throw new Error('Electron API not available - running in browser')
  }