/*
预加载文件，执行在浏览器窗口中，可以拿到node的环境
*/
import { ipcRenderer } from 'electron'
const { contextBridge } = require('electron')
contextBridge.exposeInMainWorld('ipcSend', function (...arg) {
  if (arg) {
    return ipcRenderer.send(...arg)
  } else {
    return e => { }
  }
})
contextBridge.exposeInMainWorld('ipcOn', function (...arg) {
  if (arg) {
    return ipcRenderer.on(...arg)
  } else {
    return e => { }
  }
})

// window.ipcRenderer = ipcRenderer
