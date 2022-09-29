const { contextBridge, ipcRenderer } = require('electron');

const API = {
	// Renderer to Main
	send: (channel, data) => {
		let validChannels = ['message', 'notify'];
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
	// Main to Renderer
	receive: (channel, func) => {
		let validChannels = [];
		if (validChannels.includes(channel)) {
			ipcRenderer.on(channel, (_, ...args) => func(...args));
		}
	},

	openNativeFile: () => ipcRenderer.invoke('dialog:openNativeFile'),
};

contextBridge.exposeInMainWorld('api', API);
