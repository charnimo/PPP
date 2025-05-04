const { app, BrowserWindow, ipcMain } = require('electron/main')
const { exec } = require('child_process')
const path = require('path');

const http = require('http');


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
ipcMain.handle('api-request', async (event, { path, method = 'POST', body }) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);

    const options = {
      hostname: '128.85.43.221',
      port: 8085,
      path, // dynamic path like '/login' or '/register'
      method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          data: responseData
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
});

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