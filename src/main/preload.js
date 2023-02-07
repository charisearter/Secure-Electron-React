const { contextBridge, ipcRenderer } = require('electron');

const API = {
	// Renderer to Main
	send: (channel, data) => {
		let validChannels = [];
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data);
		}
	},

	// Bi-directional
	invoke: (channel, data) => {
		let validChannels = [];
		if (validChannels.includes(channel)) {
			ipcRenderer.invoke(channel, data);
		}
	},

	// Main to renderer
	receive: (channel, func) => {
		let validChannels = [];
		if (validChannels.includes(channel)) {
			ipcRenderer.on(channel, (_, ...args) => func(...args));
		}
	},

	openNativeFile: (params) =>
		ipcRenderer.invoke('dialog:openNativeFile', params),
};

contextBridge.exposeInMainWorld('api', API);
