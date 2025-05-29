const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const { spawn } = require('child_process');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let pythonProcess = null;

const startPythonBackend = () => {
  const pythonScript = path.join(__dirname, '../../avatar_api.py');
  console.log('Starting Python backend:', pythonScript);
  
  pythonProcess = spawn('python', [pythonScript], {
    cwd: path.dirname(pythonScript),
    stdio: 'pipe'
  });

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python backend: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python backend error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python backend exited with code ${code}`);
  });

  return pythonProcess;
};

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false // Allow loading local content
    },
  });

  // Load the React app
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Start Python backend first
  startPythonBackend();
  
  // Wait a moment for backend to start, then create window
  setTimeout(() => {
    createWindow();
  }, 2000);

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  // Kill Python process when app closes
  if (pythonProcess) {
    pythonProcess.kill();
  }
  
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Clean up Python process when app is quitting
app.on('before-quit', () => {
  if (pythonProcess) {
    pythonProcess.kill();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
