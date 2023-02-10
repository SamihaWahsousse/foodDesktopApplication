const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

if(require('electron-squirrel-startup')) return;
require('update-electron-app')()

const electronReload = require('electron-reload');
electronReload(__dirname,{});

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })
    ipcMain.handle('ping', () => 'pong')
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


// main.js
//const mainWindow = new BrowserWindow()

// In this example, only windows with the `about:blank` url will be created.
// All other urls will be blocked.


/* renderer process (mainWindow)
const childWindow = window.open('', 'modal')
childWindow.document.write('<h1>Hello</h1>')*/