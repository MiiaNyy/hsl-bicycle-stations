import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { gql, useQuery } from "@apollo/client";
import { Table } from "react-bootstrap";

const GET_JOURNEYS = gql`
    query Query($amount: Int!) {
        getJourneys(amount: $amount) {
            duration
            coveredDistance
            returnStation {
                name
				stationId
            }
            departureStation {
                name
				stationId
            }
        }
    }`;


function JourneysTable () {
	const { loading, error, data } = useQuery( GET_JOURNEYS, {
		variables : { amount : 20 },
	} );
	
	if ( loading ) return <p>Loading...</p>;
	if ( error ) return <p>Error :(</p>;
	
	
	return (
		<Table striped bordered>
			<thead>
			<tr>
				<th>Covered Distance (km)</th>
				<th>Duration (min)</th>
				<th>Departure station</th>
				<th>Return station</th>
				<th></th>
			</tr>
			</thead>
			<tbody>
			{ data.getJourneys.map( journey => (
				<TableRow key={ journey.id } journey={ journey } />
			) ) }
			</tbody>
		</Table>
	)
}

function TableRow ( {journey} ) {
	const departureStation = journey.departureStation;
	const returnStation = journey.returnStation;
	
	return (
		<tr key={ journey.id }>
			<td>{ journey.coveredDistance }</td>
			<td>{ journey.duration }</td>
			<td><a href={"station/" + departureStation.stationId }>{ departureStation.name }</a> </td>
			<td><a href="">{ returnStation.name }</a> </td>
			<td><button>➡</button></td>
		</tr>
	);
}

function Home () {
	return (
		<Container>
			<Row>
				<h2>My first Apollo app 🚀</h2>
			</Row>
			<Row>
				<Col md>
					1 of 2
				</Col>
				<Col md>
					2 of 2
					<JourneysTable/>
				</Col>
			</Row>
		</Container>
	);
};


export default Home;
