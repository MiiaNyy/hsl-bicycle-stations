import { gql, useQuery } from "@apollo/client";
import { Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import TableBorder from "./TableBorder";

const GET_JOURNEYS = gql`
    query Query($amount: Int!) {
        getJourneys(amount: $amount) {
            id
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
		variables : { amount : 10 },
	} );
	if ( loading ) return <p>Loading...</p>;
	if ( error ) return <p>Error :(</p>;
	
	
	return (
		<Container>
			<TableBorder>
				<Table striped borderless className="mb-0 text-center">
					<thead className="border-bottom border-2 bg-warning">
					<tr>
						<th>Covered Distance</th>
						<th>Duration (min)</th>
						<th>Departure station</th>
						<th>Return station</th>
						<th></th>
					</tr>
					</thead>
					<tbody>
					{ data.getJourneys.map( journey => (
						<TableRow key={ journey.id } journey={ journey }/>
					) ) }
					</tbody>
				</Table>
			</TableBorder>
		</Container>
		
		
	)
}

function TableRow ({ journey }) {
	const departureStation = journey.departureStation;
	const returnStation = journey.returnStation;
	
	return (
		<tr key={ journey.id }>
			<td className="border-end border-2 border-warning">{ journey.coveredDistance } km</td>
			<td className="border-end border-2 border-warning">{ journey.duration }</td>
			<td className="border-end border-2 border-warning"><a href={ "station/" + departureStation.stationId }>{ departureStation.name }</a></td>
			<td className="border-end border-2 border-warning"><a href={ "station/" + returnStation.stationId }>{ returnStation.name }</a></td>
			<td>
				<a href={ "journey/" + journey.id } className="btn__link">&#8594;</a>
			</td>
		</tr>
	);
}

export default JourneysTable;
