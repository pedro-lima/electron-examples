const electron = require('electron');
// Module to control application life.
const { app, BrowserWindow, session, ipcMain } = electron;

require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let window1;

function createWindow () {
    
  window1 = new BrowserWindow({width: 800, height: 600, show: false}); 
  window1.loadURL(`file://${__dirname}/index.html`);
  
  
  let session = window1.webContents.session;
  session.on('will-download', (event, downloadItem, webContents) => {
    //Get file name
    let fileName = downloadItem.getFilename();

    //Set the download path
    downloadItem.setSavePath(`downloads/${fileName}`);

    let size = downloadItem.getTotalBytes();

    downloadItem.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('\nDownload is interrupted but can be resumed')
      } else if (state === 'progressing') {
        let progess = Math.round((downloadItem.getReceivedBytes() / size) * 100);
        
        process.stdout.clearLine();
        process.stdout.cursorTo(0);

        if (downloadItem.isPaused()) {          
          process.stdout.write('Download is paused');
        } else {
          process.stdout.write(`Downloaded: ${progess}%`);
        }
      }      
    });

    downloadItem.once('done', (event, state) => {      
      if (state === 'completed') {
        console.log('\nDownload successfully')
      } else {
        console.log(`\nDownload failed: ${state}`)
      }
    });
  });

  window1.on('closed', () => { 
    window1 = null 
  });

  window1.once('ready-to-show', () => {
    window1.show();
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
