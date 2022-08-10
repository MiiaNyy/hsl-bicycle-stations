import { useParams } from "react-router-dom";

function Station () {
	const { id } = useParams();
  return (
	<div>
	  <h1>🎊 STATION VIEW</h1>
		<p>Station id: {id}</p>
	</div>
  )
}

export default Station;
