import React from 'react';

function Notify({ sendNotification }) {
	return (
		<div>
			<h2> Notify test - Make Pop-up notification</h2>
      <button onClick={sendNotification}> Notify Me</button>
      
		</div>
	);
}

export default Notify;
