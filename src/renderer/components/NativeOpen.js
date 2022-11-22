import React from 'react';

function NativeOpen({ fileOpen, filePath }) {
	return (
		<div>
			<h2>Open File and Show Path - Native</h2>
			<button onClick={fileOpen}>Open a file</button>
			<p>
				File path: <strong> {filePath} </strong>
			</p>
			<hr />
		</div>
	);
}

export default NativeOpen;
