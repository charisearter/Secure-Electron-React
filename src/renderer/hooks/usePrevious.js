const { useEffect, useRef } = require('react');

function usePrevious(path) {
	const ref = useRef();
	useEffect(() => {
		ref.current = path; // assign the value of ref to argument
	}, [path]); //this code runs when value of 'path' changes
	return ref.current; // return the current value
}

export default usePrevious;
