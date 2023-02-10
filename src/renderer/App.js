import React, { useState } from 'react';
import NativeOpen from './components/NativeOpen';

function App() {
	const [filePath, setFilePath] = useState([]);
	const [parentDir, setParentDir] = useState('');

	// Show Dialog - Native Open file
	const fileOpen = async () => {
		const thePath = await window.api.openNativeFile(parentDir);
		if (!thePath) {
			return;
		}
		console.log('Length of Path: ', thePath.length);
		setFilePath(thePath);

		console.log(`Render - default: ${parentDir}`);
	};

	return (
		<section>
			<NativeOpen
				fileOpen={fileOpen}
				filePath={filePath}
				parentDir={parentDir}
			/>
		</section>
	);
}

export default App;
