

function Error ({error}) {
	console.log(error);
	return (
		<div>
			<h3>🚫 { error.message } :(</h3>
		</div>
	);
}

export default Error;
