// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, shell} = require('electron')
const path = require('path')

// creating Class Window to access mainWindow object
class Window{
  mainWindow //access to change object's property  

  constructor(url, width, height){
    this.url = url
    this.width = width
    this.height = height
  }
  createWindow(){
    this.mainWindow = new BrowserWindow({
      width: this.width,
      height: this.height,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
    this.mainWindow.loadFile(this.url)
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)
    //this.mainWindow.webContents.openDevTools()
    
  }

  getWindow() {
    return this.mainWindow
  }
}

let window = new Window('index.html', 1200, 600)

const mainMenuTemplate = [
  {
    label: 'Back',
    click() {
      console.log('promise pending')
      window.mainWindow.loadURL(path.join(__dirname, "index.html"))
    }
  }
]

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  window.createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) window.createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
