import { app, Menu } from 'electron'
// import { currentContent } from './preview-server.js'
// import fs from 'fs-extra'

export function mainMenu(mainWindow) {
  const menuTemplate = [
    // { role: 'appMenu', visible: false, label: 'vue-editor' },
    {
      label: 'File',
      submenu: [
        {
          label: 'Save',
          accelerator: process.platform === 'darwin' ? 'Command+S' : 'Ctrl+S',
          click: () => {
            mainWindow.webContents.send('menuSave')
          }
        },
        {
          label: 'Quit',
          accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
          click: () => { app.quit() }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: process.platform === 'darwin' ? 'Command+Z' : 'Ctrl+Z',
          click: () => { mainWindow.webContents.send('editorDoUndo') }
        },
        {
          label: 'Redo',
          accelerator: process.platform === 'darwin' ? 'Command+Shift+Z' : 'Ctrl+Shift+Z',
          click: () => { mainWindow.webContents.send('editorDoRedo') }
        },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        {
          label: 'Select All',
          accelerator: process.platform === 'darwin' ? 'Command+A' : 'Ctrl+A',
          click: () => { mainWindow.webContents.send('editorSelectAll') }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    }
  ]
  if (process.platform === 'darwin') {
    menuTemplate.unshift({
      label: 'vueeditor',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        {
          role: 'quit',
          accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q'
        }
      ]
    })
  }
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
};
