const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
    //require('devtron').install();

    console.log('App is running');

    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);    
});

ipcMain.on('video:submit', (event, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
        if(err) {
            console.log('ERROR:', err);
            return;
        }

        console.log('Video duration is: ', metadata.format.duration);

        mainWindow.webContents.send('video:metadata', metadata.format.duration);

    });
});