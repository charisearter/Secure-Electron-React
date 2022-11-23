import React, { useState } from 'react';
import NativeOpen from './components/NativeOpen';

function App() {
	const [filePath, setFilePath] = useState([]);

	// Show Dialog - Naive Open file
	const fileOpen = async () => {
		const thePath = await window.api.openNativeFile();
		console.log(thePath);
		setFilePath(thePath);
	};

	return (
		<section>
			<NativeOpen fileOpen={fileOpen} filePath={filePath} />
		</section>
	);
}

export default App;
