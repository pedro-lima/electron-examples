// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require('electron');
const {ipcRenderer} = electron;


ipcRenderer.send('channel1', 'Hello from the renderer process');

ipcRenderer.on('channel1', (event, data) => {
    console.log(data);
});
//=============================
ipcRenderer.on('channel2', (event, data) => {
    console.log(data);
});

//=============================
let result = ipcRenderer.sendSync('synchronous-channel', {msg: 'Sync message from renderer process'});
console.log(result);
console.log('Blocked until receive a response');