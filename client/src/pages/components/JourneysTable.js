
import { gql, useQuery } from "@apollo/client";

import { Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import TableBorder from "./TableBorder";
import TableDataBorder from "./TableDataBorder";
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";

const GET_JOURNEYS = gql`
    query Query($amount: Int!) {
        getJourneys(amount: $amount) {
            id
            coveredDistance
            duration
            departureStation {
                stationId
                name
            }
            returnStation {
                stationId
                name
            }
        }
    }`;

function JourneysTable ({ amount }) {
	const { loading, error, data } = useQuery( GET_JOURNEYS, {
		variables : { amount : amount },
	} );
	
	if ( loading  ) return <LoadingSpinner/>;
	if ( error ) return <Error error={ error }/>;
	
	
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
			<TableDataBorder><p className="m-1">{ journey.coveredDistance } km</p></TableDataBorder>
			<TableDataBorder>{ journey.duration }</TableDataBorder>
			<TableDataBorder><a href={ "/station/" + departureStation.stationId }
								className="link-secondary">{ departureStation.name }</a></TableDataBorder>
			<TableDataBorder><a href={ "/station/" + returnStation.stationId }
								className="link-secondary">{ returnStation.name }</a></TableDataBorder>
			<td>
				<a href={ "/journey/" + journey.id } className="btn__link">&#8594;</a>
			</td>
		</tr>
	);
}

export default JourneysTable;
