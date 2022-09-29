import React, { useState } from 'react';
// components
import SayHello from './components/SayHello';
import SendMessage from './components/SendMessage';
import NativeOpen from './components/NativeOpen';

function App() {
	const [msg, setMsg] = useState('Initial message');
	const [filePath, setFilePath] = useState([]);

	// One-Way: Say Hello -  IPC renderer -> main
	const getGreeting = async () => {
		await api.invoke('say-hello', 'This is another greeting: Sup!');
		console.log('Sent to Main - appears in Electron console');
	};

	// Two-Way: Send Message - IPC renderer -> main --> renderer
	const sendMessage = () => {
		window.api.send('message', msg);
	};

	const onMsgChange = e => {
		e.preventDefault();
		setMsg(e.target.value);
	};

	// Show Dialog - Naive Open file
	const fileOpen = async () => {
		const thePath = await window.api.openNativeFile();
		console.log(thePath);
		setFilePath(thePath);
	};

	return (
		<section>
			<h1> This is the App component </h1>
			<SayHello getGreeting={getGreeting} />
			<SendMessage
				sendMessage={sendMessage}
				onMsgChange={onMsgChange}
				msg={msg}
			/>
			<NativeOpen fileOpen={fileOpen} filePath={filePath} />
		</section>
	);
}

export default App;
