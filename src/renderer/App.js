import React, { useState } from 'react';
import NativeOpen from './components/NativeOpen';
import usePrevious from './hooks/usePrevious';

function App() {
	const [filePath, setFilePath] = useState([]);
	const prevPathSrc = usePrevious(filePath);
	const [prevSrc, setPrevSrc] = useState(prevPathSrc);

	// options
	let options = {
		title: 'Testing Title',
		defaultPath: filePath && filePath.length > 0 ? filePath : prevPathSrc,
		properties: ['openFile', 'multiSelection'],
	};

	// Show Dialog - Naive Open file
	const fileOpen = async () => {
		const thePath = await window.api.openNativeFile(options);
		if (!thePath) {
			setFilePath(prevPathSrc);
			return;
		}
		console.log('Length of Path: ', thePath.length);
		setFilePath(thePath);
		setPrevSrc(thePath);
		console.log(`Render - default: ${options.defaultPath}`);
		console.log(`Render - Prev source: ${prevSrc}`);
	};

	return (
		<section>
			<NativeOpen
				fileOpen={fileOpen}
				filePath={filePath}
				prevSrc={prevSrc}
				prevPathSrc={prevPathSrc}
			/>
		</section>
	);
}

export default App;
