export {};

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send: (channel: string, data: string) => void;
        on: (channel: string, func: (...args: string[]) => void) => void;
      };
    };
  }
}
