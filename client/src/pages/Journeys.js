import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import JourneysTable from "./components/JourneysTable";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Journey from "./Journey";

function Journeys() {
	return (
		<>
			<Container>
				<Row className="mt-2 text-center">
					<h1 className="mb-5">HSL Bicycle Journeys</h1>
					<JourneysTable amount={ 25 }/>
				</Row>
			</Container>
		</>
	);
}

export default Journeys;
