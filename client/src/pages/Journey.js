import { useParams } from "react-router-dom";

function Journey () {
	const { id } = useParams();
	
	return (
		<div>
			<h1>🥰 Journey view!</h1>
			<p>{ id }</p>
		</div>
	);
}


export default Journey;
