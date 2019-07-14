const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Run the following from the Console tab of your app's DevTools
  require('devtron').install();

  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  let mainContents = mainWindow.webContents;
  //console.log(mainContents);

  //quando toda a pagina eh carregada
  mainContents.on('did-finish-load', () => {
    console.log('Finished load all the page');
  });

  //quando eh criado uma nova janela seja criando uma
  //nova BrowserWindow ou atraves da navegação da pagina
  mainContents.on('new-window', (event, url) => {
    //console.log(`New window created for: ${url}`);
    event.preventDefault();

    let modalWindow = new BrowserWindow({width: 600, height: 400, modal: true, parent: mainWindow});
    modalWindow.loadURL(url);

    modalWindow.on('closed', function () {      
      modalWindow = null
    });
  });

  //antes de realizar a navegação de uma pagina para outra
  mainContents.on('will-navigate', (event, url) => {
    console.log(`will navigate to: ${url}`);
  });

  //depois de fazer a navegação de uma pagina para outra
  mainContents.on('did-navigate', (event, url) => {
    console.log(`navigated to: ${url}`);
  });


  mainContents.on('media-started-playing', () => {
    console.log('Video stated');    
  });

  mainContents.on('media-paused', () => {
    console.log('Video paused');    
  });

  //representa o menu de contexto, com o click do botão direito do mouse
  mainContents.on('context-menu', (event, params) => {
    console.log(`Context menu opened on: ${params.mediaType} at: ${params.x}, y: ${params.y}`);
    console.log(`User selected text: ${params.selectionText}`);
    console.log(`Selection can be copied: ${params.editFlags.canCopy}`);
    
  });

  //paginas com autentição direta
  /*
  mainContents.on('login', (event, request, authInfo, callback) => {
    event.preventDefault();

    callback('admin', 'randonpassword');
  });
  */


  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
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
