const electron = require('electron');
// Modules
const {app, BrowserWindow, Menu, MenuItem} = electron;

require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createMenu() {
  let menu = new Menu();
  let subMenu = new Menu();

  let menuItem1_1 = new MenuItem({
    label: 'Item 1',
    click: () => { console.log('Clicked Item 1') }
  });

  let menuItem1_2 = new MenuItem({
    label: 'Item 2',
    click: () => { console.log('Clicked Item 2') }
  });

  subMenu.append(menuItem1_1);
  subMenu.append(menuItem1_2);

  let menuItem1 = new MenuItem({
    label: 'Electron',
    //click: () => {console.log('Clicked')}
    submenu: subMenu
  });

  menu.append(menuItem1);

  return menu;
}

function createMenuShort() {
  let menu = new Menu.buildFromTemplate([
    {
      label: 'Electron',
      submenu: 
      [
        {
          label: 'Item 01',
          click: () => { console.log('Clicked Item 01') },
          accelerator: 'CommandOrControl+Q'
        },
        {
          label: 'Item 02',
          click: () => { console.log('Clicked Item 02') },
          accelerator: 'CommandOrControl+S'
        }
      ]
    },
    {
      label: 'Actions',
      submenu: 
      [
        {
          label: 'Action 1',
          submenu: [
            {
              label: 'Action 1.1',
              click: () => { console.log('Clicked Action 1.1') }
            },
            {              
              type: 'separator'
            },
            {
              label: 'Action 1.2',
              click: () => { console.log('Clicked Action 1.2') },
              enabled: false
            }   
          ]
        },
        {
          label: 'Action 02',
          click: () => { console.log('Clicked Action 02') }
        }
      ]
    },
    {
      label: 'Developer',
      submenu: [
        {          
          role: 'reload'
        }, 
        {
          role: 'forcereload'
        }, 
        {
          label: 'Developer Tools',
          role: 'toggledevtools'
        }
      ]
    }
  ]);

  return menu;
}

function createWindow () {
  // Run the following from the Console tab of your app's DevTools
  require('devtron').install();

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {mainWindow = null
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  Menu.setApplicationMenu(createMenuShort());
});

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
