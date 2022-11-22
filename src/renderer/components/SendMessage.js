import React from 'react';

function SendMessage({ sendMessage, onMsgChange, msg }) {
	return (
		<div>
			<h2> Send message </h2>
			<h3> {msg} </h3>
			<input type='text' onChange={onMsgChange} />
			<button onClick={sendMessage}> Sending Message to Main </button>
			<hr />
		</div>
	);
}

export default SendMessage;
