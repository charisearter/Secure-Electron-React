import React, { useState } from 'react';
// components
import SayHello from './components/SayHello';
import SendMessage from './components/SendMessage';
import NativeOpen from './components/NativeOpen';

function App() {
	const [msg, setMsg] = useState('Initial message');
	const [filePath, setFilePath] = useState([]);

	// Say Hello -  uses invoke
	const getGreeting = async () => {
		await api.invoke('say-hello', 'This is another greeting: Sup!');
		console.log('Sent to Main - appears in Electron console');
	};

	// Send Message - IPC renderer -> main
	const sendMessage = () => {
		window.api.send(msg);
		setMsg('');
	};

	const onMsgChange = e => {
		e.preventDefault();
		setMsg(e.target.value);
	};

	// Show Dialog - Naive Open file
	const nativeFileOpen = async () => {
		const thePath = await window.api.nativeOpenFile();
		setFilePath(thePath);
	};

	return (
		<section>
			<h1> This is the App component </h1>
			<SayHello getGreeting={getGreeting} />
			<SendMessage sendMessage={sendMessage} onMsgChange={onMsgChange} />
			<NativeOpen />
		</section>
	);
}

export default App;
