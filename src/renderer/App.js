import React, { useState, useEffect } from 'react';
import NativeOpen from './components/NativeOpen';
import NodeTest from './components/NodeTest';

function App() {
	const [filePath, setFilePath] = useState([]);

	// Message response Test
	window.api.receive('test-succeeded', () => {
		console.log('NodeTest - Response from main');
	});

	// Node Test
	const testNode = () => {
		api.send('nodeTest', 'Testing');
	};

	// Show Dialog - Naive Open file
	const fileOpen = async () => {
		const thePath = await window.api.openNativeFile();
		console.log(thePath);
		setFilePath(thePath);
	};

	return (
		<section>
			<NativeOpen fileOpen={fileOpen} filePath={filePath} />
			<NodeTest testNode={testNode} />
		</section>
	);
}

export default App;
