import React, { useState } from 'react';
import NativeOpen from './components/NativeOpen';
import NodeTest from './components/NodeTest';

function App() {
	//const [msg, setMsg] = useState('Initial message');
	const [filePath, setFilePath] = useState([]);
	//const [path, setPath] = useState([]);

	// One-Way: Say Hello -  IPC renderer -> main
	// const getGreeting = async () => {
	// 	await api.invoke('say-hello', 'This is another greeting: Sup!');
	// 	console.log('Sent to Main - appears in Electron console');
	// };

	// Two-Way: Send Message - IPC renderer -> main --> renderer
	// const sendMessage = () => {
	// 	window.api.send('message', msg);
	// };

	// const onMsgChange = e => {
	// 	e.preventDefault();
	// 	setMsg(e.target.value);
	// };

	// Node Test
	const testNode = () => {
		api.send('nodeTest', `Renderer --> Main set up to test Node`);
	};

	// Show Dialog - Naive Open file
	const fileOpen = async () => {
		const thePath = await window.api.openNativeFile();
		console.log(thePath);
		setFilePath(thePath);
	};

	// Notify Pop up
	// const sendNotification = () => {
	// 	api.send('notify', 'You have been notified!');
	// };

	return (
		<section>
			<NativeOpen fileOpen={fileOpen} filePath={filePath} />

			<NodeTest testNode={testNode} />
		</section>
	);
}

export default App;
