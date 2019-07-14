const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;


const isMacOS = process.platform === 'darwin';
let mainWindow;
let addWindow;

function createMenu() {
    let menuTemplate = [
        {
            label: 'File',
            submenu: [
                { 
                    label: 'New Todo',
                    click() {
                        creadAddWindow();
                    }
                },
                { 
                    label: 'Clear Todos',
                    click() {
                        clearTodos();
                    }
                },
                { 
                    label: 'Quit', 
                    //accelerator: 'Shift+Q',
                    /*
                    accelerator: (() => {
                        if(isMac) {
                            return 'Command+Q';
                        } else {
                            return 'Ctrl+Q';                        
                        }
                    })(),
                    */
                    accelerator: isMacOS ? 'Command+Q' : 'Ctrl+Q',
                    click(item, focusedWindow) {
                        focusedWindow.close();
                    }
                }
            ]
        }
    ];
    
    if(isMacOS) {
        menuTemplate.unshift({});
    }

    // 'production'
    // 'development'
    // 'staging'
    // 'test'
    if(process.env.NODE_ENV !== 'production') {
        menuTemplate.push({
            label: '!!!DEVELOPER!!!',
            submenu: [
                {
                    role: 'reload'
                },
                {
                    role: 'forcereload',
                },
                {
                    role: 'toggledevtools'
                }
                /*
                {
                    label: 'Toggle developer tools',
                    accelerator: isMacOS ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                }
                */
            ]
        });
    }

    return menuTemplate;
}

function createMainWindow () {
    console.log('App is running');

    mainWindow = new BrowserWindow({
        title: "My Todos",
        icon: `file://${__dirname}/todos.svg`
    });
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    //mainWindow.setFullScreen(true);
    mainWindow.maximize();
    mainWindow.on('close', () => {
        app.quit();
    });

    // uncomment below to open the DevTools.
    // mainWindow.webContents.openDevTools()

    const mainMenu = Menu.buildFromTemplate(createMenu());
    Menu.setApplicationMenu(mainMenu);
}

ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:add', todo);
    addWindow.close();   
});

function clearTodos() {
    mainWindow.webContents.send('todo:clear');
}

function creadAddWindow() {
    addWindow = new BrowserWindow({
        height: 200,
        width: 200,
        title: 'Add New Todo'

    });
    addWindow.loadURL(`file://${__dirname}/add.html`);
    addWindow.on('close', () => addWindow = null);
}

app.on('ready', () => {
    createMainWindow();  
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS specific close process
    if (isMacOS) {
        app.quit()
    }
});

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createMainWindow()
    }
});
