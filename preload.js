const { contextBridge, ipcRenderer } = require('electron');

const API = {
	// Renderer to Main (FFMPEG uses this one to send filePath to Main)
	send: (channel, data) => {
		let validChannels = ['nodeTest'];
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data);
		}
	},

	// Bi-directional
	invoke: (channel, data) => {
		let validChannels = ['say-hello'];
		if (validChannels.includes(channel)) {
			ipcRenderer.invoke(channel, data);
		}
	},

	receive: (channel, func) => {
		let validChannels = ['test-succeeded'];
		if (validChannels.includes(channel)) {
			ipcRenderer.on(channel, (_, ...args) => func(...args));
		}
	},

	openNativeFile: () => ipcRenderer.invoke('dialog:openNativeFile'),
};

contextBridge.exposeInMainWorld('api', API);
