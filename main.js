const { app, BrowserWindow, ipcMain} = require('electron');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        width:800,
        height: 600,
        webPreferences:{
            nodeIntegration: true,
        },
    });

    mainWindow.loadFile('index.html');
    mainWindow.on('closed', function(){
        mainWindow = null;
    });

    mainWindow.once("ready-to-show", ()=> {
        autoUpdater.checkForUpdatesAndNotify();
    });
}

app.on('ready', ()=> {
    createWindow();
});

app.on("window-all-closed", function(){
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', function() {
    if (mainWindow === null){
        createWindow();
    }
})

autoUpdater.on("update-available", ()=> {
    mainWindow.webContents.BrowserWindow("update_available");
});

autoUpdater.on("update-downloaded", ()=> {
    mainWindow.webContents.BrowserWindow("update_downloaded");
})

ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
});