const electron = require('electron');
// Modules
const {app, BrowserWindow, ipcMain} = electron;

require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

ipcMain.on('channel1', (event, data) => {
  console.log(data);

  event.sender.send('channel1', 'Message received from channel 1');  
});

ipcMain.on('synchronous-channel', (event, data) => {
  console.log(data);
  setTimeout(() => {
    event.returnValue = 'Result of a synchronous channel';  
  }, 4000);
});

function createWindow () {
  // Run the following from the Console tab of your app's DevTools
  require('devtron').install();

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  });

  mainWindow.webContents.on('did-finish-load', function () {
    mainWindow.webContents.send('channel2', 'Message received from main process');
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
