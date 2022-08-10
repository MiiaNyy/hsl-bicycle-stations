import { gql, useQuery } from "@apollo/client";
import { Table } from "react-bootstrap";

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
		variables : { amount : 20 },
	} );
	
	if ( loading ) return <p>Loading...</p>;
	if ( error ) return <p>Error :(</p>;
	
	return (
		<div>
			<Table striped bordered>
				<thead>
				<tr>
					<th>Station id</th>
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
		</div>
	);
}

function TableRow ({ station }) {
	
	return (
		<tr key={ station.id }>
			<td>{ station.stationId }</td>
			<td>{ station.name }</td>
			<td>{ station.city }</td>
			<td>{ station.capacity }</td>
			<td>
				<button>➡</button>
			</td>
		</tr>
	);
}

export default StationsTable;
