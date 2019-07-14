const electron = require('electron');
// Modules.
const {app,BrowserWindow}  = electron;

const fs = require('fs');

app.disableHardwareAcceleration();

let bgWin;

app.on('ready', () => {
  bgWin = new BrowserWindow({
    show: false,
    width: 1200,
    height: 800,
    webPreferences: {
      offscreen: true
    }
  });
  
  bgWin.loadURL('https://github.com/');

  
  bgWin.webContents.on('did-finish-load', () => {
    console.log(bgWin.getTitle());
    app.quit();
  });
  
  let dir = '/tmp/img_electron'
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  let i = 0;
  bgWin.webContents.on('paint', (event, dirtyArea, nativeImage) => {
    
    let img = nativeImage.toPNG();   
    fs.writeFile(`${dir}/${++i}.png`, img, (err) => {
      if(err) {
        console.error(err);
      }
    });

  });



});
