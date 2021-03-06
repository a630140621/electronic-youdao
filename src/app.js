const settings = require('../settings');
const {
    app,
    BrowserWindow
} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
    // 创建浏览器窗口。
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        show: false,
        // frame: false,
        autoHideMenuBar: true, // 自动隐藏菜单栏, 按 alt 键显示
    })

    // 加载 有道云地址
    win.loadURL('https://note.youdao.com/web/#/file/recent')

    let webContents = win.webContents
    // 打开开发者工具
    if (settings['dev']) webContents.openDevTools()

    // 最大化窗口
    win.maximize()

    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
        // console.log('window closed')
    })

    win.on('focus', (event) => {
        // console.log('focus')
    })

    win.on('maximize', () => {
        // console.log('maximize');
    })


    // dom 加载完毕触发
    webContents.on('dom-ready', () => {
        // 修改原有的布局, 1. 隐藏 header 部分
        webContents.insertCSS(`
        header div.top-banner {
            display: none;
        }
        div.main-container {
            top: 0;
        }
        `)
    })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow()
    }
})