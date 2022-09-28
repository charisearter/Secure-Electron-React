const { contextBridge, ipcRenderer } = require('electron');

const API = {
	send: (channel, data) => {
		let validChannels = ['message'];
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data);
		}
	},
	invoke: (channel, data) => {
		let validChannels = ['say-hello'];
		if (validChannels.includes(channel)) {
			ipcRenderer.invoke(channel, data);
		}
	},
	receive: (channel, func) => {
		let validChannels = ['count'];
		if (validChannels.includes(channel)) {
			ipcRenderer.on(channel, (_, ...args) => func(...args));
		}
	},
};

contextBridge.exposeInMainWorld('api', API);
