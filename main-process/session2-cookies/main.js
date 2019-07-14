const electron = require('electron');
// Module to control application life.
const { app, BrowserWindow, session, ipcMain } = electron;

require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let window1;

function createWindow () {
    
  window1 = new BrowserWindow({width: 800, height: 600, show: false});  
  let session = window1.webContents.session;

  window1.loadURL(`file://${__dirname}/index.html`);
  window1.on('closed', function () { window1 = null });
  
  const cookie = {
    url: 'https://myapp.com', 
    name: 'cookie1', 
    value: 'cookie_value', 
    domain: 'myapp.com',
    expirationDate: 99999999999999
  };
  
  session.cookies.set(cookie, (error) => {
    console.log('Cookies Set');
    session.cookies.get({}, (error, cookies) => {
      console.log(cookies);
    });    
  });

  window1.once('ready-to-show', () => {
    window1.show();    
    session.cookies.get({name: 'cookie1'}, (error, cookies) => {
      console.log("===============================");
      console.log(cookies);
    });
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
  if (window1 === null) {
    createWindow();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
