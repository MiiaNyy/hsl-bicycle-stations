import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import JourneysTable from "./components/JourneysTable";
import StationsTable from "./components/StationsTable";
import Navigation from "./components/Navigation";


function Home () {
	
	const border = {
		border : "2px solid pink",
		
	};
	
	
	return (
		<>
			<Navigation/>
			<Container style={ border }>
				<Row>
					<h2>Helsinki city bicycle data</h2>
				</Row>
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
