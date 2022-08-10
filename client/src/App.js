import { useQuery, gql } from '@apollo/client';

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const GET_STATION = gql`
    query GetStation($stationId: Int!) {
        getStation(stationId: $stationId) {
            name
            stationId
            address
        }
    }`;

const GET_JOURNEYS = gql`
    query Query($amount: Int!) {
        getJourneys(amount: $amount) {
            duration
            coveredDistance
            returnStation {
                name
            }
            departureStation {
                name
            }
        }
    }`;

function DisplayStation () {
	const { loading, error, data } = useQuery( GET_STATION, {
		variables : { stationId : 30 },
	} );
	
	if ( loading ) return <p>Loading...</p>;
	if ( error ) return <p>Error :(</p>;
	return (
		<div>
			<h2>{ data.getStation.name }</h2>
			<p>{ data.getStation.stationId }</p>
			<p>{ data.getStation.address }</p>
		</div>
	);
}

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
				<th>Duration</th>
				<th>Covered Distance</th>
				<th>Departure station</th>
				<th>Return station</th>
			</tr>
			</thead>
			<tbody>
			{ data.getJourneys.map( journey => (
				<tr key={ journey.id }>
					<td>{ journey.duration }</td>
					<td>{ journey.coveredDistance }</td>
					<td><a href="">{ journey.departureStation.name }</a> </td>
					<td><a href="">{ journey.returnStation.name }</a> </td>
					<td><button>info..</button></td>
				</tr>
			) ) }
			</tbody>
		</Table>
	)
}

function App () {
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
}

export default App;
