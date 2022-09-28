const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

// Check to see if in Development mode
const isDev = !app.isPackaged;

// make a global variable so it won't be garbage collected
let mainWindow;

const createWindow = () => {
	mainWindow = new BrowserWindow({
		show: false, // don't show until finished loading
		autoHideMenuBar: true, //hide default electron menu bar
		resizable: false, // disallow user to resize window
		width: 800,
		height: 700,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	// show window if finished loading
	mainWindow.on('ready-to-show', mainWindow.show);

	// if development open dev tools
	if (isDev) {
		mainWindow.webContents.openDevTools();
	}

	// load UI window
	mainWindow.loadFile('index.html');
};

// if development, run electron reload
if (isDev) {
	require('electron-reload')(__dirname, {
		electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
	});
}

app.whenReady().then(createWindow);

// Quit all windows, except on macOS
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// IPC events here

// Say Hello
ipcMain.handle('say-hello', (_, args) => {
	console.log(args);
	return `Hello from Main. This is app version ${app.getVersion()}.`;
});
