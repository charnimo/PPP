const { app, BrowserWindow, ipcMain } = require('electron/main')
const { exec } = require('child_process')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // recommended for security
      contextIsolation: true, // recommended for security
      preload: path.join(__dirname, 'preload.js') // add this line
    }
  })

  win.loadURL('http://localhost:8080')
}

// Add this IPC handler
ipcMain.handle('execute-command', (event, command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message)
      } else {
        resolve(stdout)
      }
    })
  })
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})