const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  executeCommand: (command) => ipcRenderer.invoke('execute-command', command)
})  

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    invoke: (channel, data) => {
      const validChannels = ['api-request'];
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, data);
      }
    }
  }
});