import { gql, useQuery } from "@apollo/client";
import { Table } from "react-bootstrap";
import TableBorder from "./TableBorder";
import Container from "react-bootstrap/Container";
import TableDataBorder from "./TableDataBorder";

const GET_STATIONS = gql`
    query Query($amount: Int!) {
        getStations(amount: $amount) {
            stationId
            name
            capacity
            city
        }
    }
`;

function StationsTable () {
	
	const { loading, error, data } = useQuery( GET_STATIONS, {
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
						<th>ID</th>
						<th>Name</th>
						<th>City</th>
						<th>Capacity</th>
						<th></th>
					</tr>
					</thead>
					<tbody>
					{ data.getStations.map( station => (
						<TableRow key={ station.id } station={ station }/>
					) ) }
					</tbody>
				</Table>
			</TableBorder>
		</Container>
	);
}

function TableRow ({ station }) {
	
	return (
		<tr key={ station.stationId }>
			<TableDataBorder>{ station.stationId }</TableDataBorder>
			<TableDataBorder>{ station.name }</TableDataBorder>
			<TableDataBorder>{ station.city }</TableDataBorder>
			<TableDataBorder>{ station.capacity }</TableDataBorder>
			<td>
				<a href={ "station/" + station.stationId } className="btn__link">&#8594;</a>
			</td>
		</tr>
	);
}

export default StationsTable;
