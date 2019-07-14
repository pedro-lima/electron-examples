const electron = require('electron');
const {app, BrowserWindow, globalShortcut} = electron;

require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});  
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', function () { mainWindow = null });

  //o comando sera executado mesmo se a aplicacao ficar fora
  //de focu ou em segundo plano
  mainWindow.on('focus', () => {
    globalShortcut.register('CommandOrControl+A', () => {
      console.log('Comando executado');
    });
  });  

  mainWindow.on('blur', () => {
    //globalShortcut.unregister('CommandOrControl+A');
    globalShortcut.unregisterAll();
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
