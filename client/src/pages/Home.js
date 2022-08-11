import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import JourneysTable from "./components/JourneysTable";
import StationsTable from "./components/StationsTable";


function Home () {
	
	return (
		<>
			<Container>
				<Row className="mt-5 mb-5 text-center">
					<h1>Helsinki Region Transport’s (HSL) city bicycles </h1>
					<p className="sub-header">Bicycle journeys and stations data from a year 2021 in the cities of Helsinki and Espoo.</p>
				</Row>
				<Row>
					<h3>HSL Bicycle Journeys </h3>
					<JourneysTable/>
				</Row>
				<Row className="mt-5">
					<h3>HSL Bicycle Stations</h3>
					<StationsTable/>
				</Row>
			</Container>
		</>
	
	);
}


export default Home;
