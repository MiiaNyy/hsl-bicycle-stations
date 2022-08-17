import StationsTable from "./components/StationsTable";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Stations () {
	return (
		<>
			<Container>
				<Row className="mt-2">
					<StationsTable/>
				</Row>
			</Container>
		</>
	);
}

export default Stations;
