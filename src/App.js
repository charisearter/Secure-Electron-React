import React, { useState } from 'react';
import NativeOpen from './components/NativeOpen';
import Counter from './components/Counter';
import NodeTest from './components/NodeTest';

function App() {
	//const [msg, setMsg] = useState('Initial message');
	const [filePath, setFilePath] = useState([]);
	const [count, setCount] = useState(0);

	//const [path, setPath] = useState([]);

	// counter Auto

	window.api.receive('onCount', data => {
		setCount(data);
	});

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
		api.send('nodeTest');
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
			<Counter count={count} />
			<NodeTest testNode={testNode} />
			<NativeOpen fileOpen={fileOpen} filePath={filePath} />
		</section>
	);
}

export default App;
