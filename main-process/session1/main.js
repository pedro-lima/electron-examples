const electron = require('electron');
// Module to control application life.
const { app, BrowserWindow, session, ipcMain } = electron;

require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let sessionWindow1;
let sessionWindow2;
let sessionWindow3;

function createWindow () {
  /*
   * Apesar do nome ser session, os dados são armezenados no local storage
   * do navegador
   */
  
  sessionWindow1 = new BrowserWindow({width: 400, height: 400});  
  sessionWindow1.loadURL(`file://${__dirname}/session1.html`);
  sessionWindow1.on('closed', function () { sessionWindow1 = null });  

  let session2 = session.fromPartition('partition2');
  sessionWindow2 = new BrowserWindow({width: 400, height: 400, webPreferences: {session: session2}});
  sessionWindow2.loadURL(`file://${__dirname}/session2.html`);
  sessionWindow2.on('closed', function () { sessionWindow2 = null });  
  
  //let session3 = session.fromPartition('persist:partition3');
  sessionWindow3 = new BrowserWindow({width: 400, height: 400, webPreferences: {partition: 'persist:partition3'}});
  sessionWindow3.loadURL(`file://${__dirname}/session3.html`);
  sessionWindow3.on('closed', function () { sessionWindow3 = null });
  
  let defaultSession = session.defaultSession;
  let session1 = sessionWindow1.webContents.session;
  let session3 = sessionWindow3.webContents.session;

  console.log(Object.is(defaultSession, session1)); //true
  console.log(Object.is(defaultSession, session2)); //false
  console.log(Object.is(defaultSession, session3)); //false
  console.log(Object.is(session2, session3)); //false

  ipcMain.on('session:clear', (event, value) => {    
    switch(value) {
      case 1:
        console.log('clear session 1');
        session1.clearStorageData();
        break;
      case 2:
        console.log('clear session 2');
        session2.clearStorageData();
        break;
      default:
        console.log('clear session 3');
        session3.clearStorageData();
        break;
    }
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
  if (sessionWindow1 === null) {
    createWindow();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
