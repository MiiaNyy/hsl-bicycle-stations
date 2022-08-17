import StationsTable from "./components/StationsTable";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Stations () {
	return (
		<>
			<Container>
				<Row className="mt-2 text-center m-auto">
					<h1 className="mb-5">HSL Bicycle Stations</h1>
					<StationsTable/>
				</Row>
			</Container>
		</>
	);
}

export default Stations;
