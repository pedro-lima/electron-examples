const electron = require('electron');
const {app, BrowserWindow, dialog} = electron;

require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function showOpenDialog() {
  const options = {
    defaultPath: '/home/pedro/Imagens/', 
    buttonLabel: 'Select Logo',
    properties: ['openFile', 'multiSelections', 'createDirectory']
  };
  dialog.showOpenDialog(options, (openPath) => {
    console.log(openPath);
  });
}

function showSaveDialog() {
  const options = {
    defaultPath: '/home/pedro/Imagens/'    
  };
  dialog.showSaveDialog(options, (fileName) => {
    console.log(fileName);
  });
}

function showMessageBox() {
  let buttons = ['Yes', 'No', 'Maybe'];
  const options = {
    buttons,
    title: 'Electron message dialog',
    message: 'Please select a answer',
    detail: 'A more decriptive message with more details'
  };
  dialog.showMessageBox(options, (btnIndex) => {
    console.log(`User selected: ${buttons[btnIndex]}`);
  });
}

function showErrorBox() {  
  dialog.showErrorBox('Error title', 'Error message');
}


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});  
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', function () { mainWindow = null });

  setTimeout(() => {
    showErrorBox();
  }, 2000);
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
