const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const isDevelopment = process.env.NODE_ENV === 'development';

// Check to see if in Development mode
const isDev = !app.isPackaged;

let mainWindow;

// Show Dialog - Native
const handleNativeFileOpen = async () => {
	const { canceled, filePaths } = await dialog.showOpenDialog();
	if (canceled) {
		return;
	} else {
		return filePaths[0];
	}
};

const createWindow = () => {
	mainWindow = new BrowserWindow({
		show: false, // don't show until finished loading
		autoHideMenuBar: true,
		width: 1000,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	// Event listeners on the window
	mainWindow.webContents.on('did-finish-load', () => {
		mainWindow.show();
		mainWindow.focus();
	});

	// Load our HTML file
	if (isDevelopment) {
		mainWindow.loadURL('http://localhost:40992');
	} else {
		console.log('production');
		mainWindow.loadFile('src/dist/index.html');
	}
};

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

// Open file
ipcMain.handle('dialog:openNativeFile', handleNativeFileOpen);

// This method is called when Electron
// has finished initializing
app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
