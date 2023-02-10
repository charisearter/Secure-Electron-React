import React from 'react';

function NativeOpen({ fileOpen, filePath, parentDir }) {
	return (
		<div>
			<h2>Open File and Show Path - Native</h2>
			<button onClick={fileOpen}>Open a file</button>
			<p>
				File path: <strong> {filePath} </strong>
			</p>
			<p>
				Parent: <em> {parentDir}</em>
			</p>

			<hr />
		</div>
	);
}

export default NativeOpen;
