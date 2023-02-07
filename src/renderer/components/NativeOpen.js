import React from 'react';

function NativeOpen({ fileOpen, filePath, prevSrc, prevPathSrc }) {
	return (
		<div>
			<h2>Open File and Show Path - Native</h2>
			<button onClick={fileOpen}>Open a file</button>
			<p>
				File path: <strong> {filePath} </strong>
			</p>
			<p>
				Prev Src: <em> {prevSrc}</em>
			</p>
			<p>
				Prev Src Path:
				<em>
					<strong>{prevPathSrc} </strong>
				</em>
			</p>
			<hr />
		</div>
	);
}

export default NativeOpen;
