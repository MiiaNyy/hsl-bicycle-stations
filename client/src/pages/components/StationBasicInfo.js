import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function StationBasicInfo ({ station }) {
	return (
		<Container className="text-center station__container mt-4 mt-md-0">
			<Row className="border border-2 border-warning rounded box-shadow">
				<Col sm={ 5 } className="border-end border-warning">
					<p className="info-header">Address</p>
					<p>{ station.address }</p>
				</Col>
				<Col xs className="border-end border-warning">
					<p className="info-header">City</p>
					<p>{ station.city }</p>
				</Col>
				<Col xs className="">
					<p className="info-header">Capacity</p>
					<p>{ station.capacity }</p>
				</Col>
			</Row>
			<Row className="border border-2 border-warning rounded mt-2 box-shadow">
				<h4 className="pt-2 pb-2">Total number of...</h4>
				<Col className="border-end border-warning">
					<p className="info-header"><em>Departing</em> journeys</p>
					<p>{ station.numOfJourneysStartingFrom }</p>
				</Col>
				<Col>
					<p className="info-header"><em>Returning</em> journeys</p>
					<p>{ station.numOfJourneysReturningTo }</p>
				</Col>
			
			</Row>
			<Row className="border border-2 border-warning rounded pt-2 mt-2 box-shadow">
				<h4 className="pt-2 pb-2">Average distance travelled...</h4>
				<Col className="border-end border-warning">
					<p className="info-header">From here</p>
					<p>{ station.averageDistanceStartingFrom }km</p>
				</Col>
				<Col>
					<p className="info-header">To here</p>
					<p>{ station.averageDistanceReturnedTo }km</p>
				</Col>
			</Row>
		</Container>
	);
}

export default StationBasicInfo;
