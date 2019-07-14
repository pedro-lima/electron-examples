// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//all methods and classes inside remote use ipc comunication.
const remote = require('electron').remote;
const { dialog, app } = remote;

//================================================================================
/*
 * Electron makes sure that as long as the remote object in the renderer process 
 * lives (in other words, has not been garbage collected), the corresponding object 
 * in the main process will not be released. When the remote object has been garbage 
 * collected, the corresponding object in the main process will be dereferenced.
 */
const window = remote.getCurrentWindow();
window.on('close', () => {
    /*
     * But remember the callback is referenced by the main process until you 
     * explicitly uninstall it. If you do not, each time you reload your window 
     * the callback will be installed again, leaking one callback for each restart.
     */
    window.removeListener('on');
    window = null;
});
//================================================================================

//chamadas ao remote sem callback eh feito de forma assincrona

//using ipc sync comunication (without callback method)
let options = {message: 'This is a sync message', buttons: ['Ok', 'Cancel']};
let value = dialog.showMessageBox(options);
console.log(`Return from the sync call: ${value}`);

/*
 *  In order to avoid deadlocks, the callbacks passed to the main process are called 
 * asynchronously. You should not expect the main process to get the return value of 
 * the passed callbacks.
 */
//using ipc assync comunication (with callback method)
options = {message: 'Do you want to quit?', buttons: ['Yes', 'No']};
dialog.showMessageBox(options, (btnIndex) => {
    if(btnIndex === 0) {
        app.quit();
    }
});



//console.log(remote);
console.log(remote.getGlobal('globalVariable'));

