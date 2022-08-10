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
	
	const styles = {
		padding : "10em",
		border : "2px solid pink",
	}
	
	const { loading, error, data } = useQuery( GET_JOURNEYS, {
		variables : { amount : 20 },
	} );
	
	if ( loading ) return <p>Loading...</p>;
	if ( error ) return <p>Error :(</p>;
	
	
	return (
		<Table striped bordered style={styles}>
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
			<td><a href={"station/" + returnStation.stationId }>{ returnStation.name }</a> </td>
			<td><button>➡</button></td>
		</tr>
	);
}

export default JourneysTable;
