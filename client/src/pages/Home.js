import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import JourneysTable from "./components/JourneysTable";
import StationsTable from "./components/StationsTable";


function Home () {
	
	return (
		<>
			<Container>
				<Row className="mt-5 mb-5 text-center">
					<h1>Helsinki Region Transport’s (HSL) city bicycles </h1>
					<p className="sub-header">Bicycle journeys and stations data from a year 2021 in the cities of
						Helsinki and Espoo.</p>
				</Row>
				<Row sm className="pb-5 mb-5">
					<h3 className="mb-3">HSL Bicycle Journeys </h3>
					<JourneysTable amount={ 10 }/>
				</Row>
				<Row className=" pb-5 mb-5">
					<h3 className="mb-3">HSL Bicycle Stations</h3>
					<StationsTable amount={ 10 }/>
				</Row>
			</Container>
		</>
	
	);
}


export default Home;
