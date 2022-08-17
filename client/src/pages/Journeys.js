import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import JourneysTable from "./components/JourneysTable";

function Journeys() {
	return (
		<>
			<Container>
				<Row className="mt-2">
					<JourneysTable/>
				</Row>
			</Container>
		</>
	);
}

export default Journeys;
