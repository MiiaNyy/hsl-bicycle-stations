import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import JourneysTable from "./components/JourneysTable";
import StationsTable from "./components/StationsTable";


function Home () {
	
	const border = {
		border : "2px solid pink",
		
	};
	
	return (
		<>
			<Container style={ border }>
				<Row>
					<Col md>
						<h2>Stations</h2>
						<StationsTable/>
					</Col>
					<Col md style={ border }>
						<h2>Journeys</h2>
						<JourneysTable/>
					</Col>
				</Row>
			</Container>
		</>
	
	);
}


export default Home;
