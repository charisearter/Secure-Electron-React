const cp = require('child_process');
let child = cp.spawn('console.log', ['abcde']);

child.stdout.on('data', data => {
	console.log(`Data:\n ${data}`);
});

child.stderr.on('data', err => {
	console.log(`The error: ${err}`);
});

child.on('error', err => {
	console.log(`There was an error: \n ${err}`);
});
