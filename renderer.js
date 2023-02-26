const func = async () => {
	const response = await window.versions.samiha();
	console.log(response); // prints out 'pong'
};

func();
