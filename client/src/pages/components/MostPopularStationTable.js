import Container from "react-bootstrap/Container";
import TableBorder from "./TableBorder";
import { Table } from "react-bootstrap";
import TableDataBorder from "./TableDataBorder";

function MostPopularStationTable ({ stations }) {
	
	return (
		<Container>
			<TableBorder>
				<Table striped borderless className="mb-0">
					<thead className="border-bottom border-2 bg-warning">
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th></th>
					</tr>
					</thead>
					<tbody>
					{ stations.map( station => (
						<tr key={ station.stationId }>
							<TableDataBorder>{ station.stationId }</TableDataBorder>
							<td>{ station.name }</td>
							<td className="border-start border-2 border-warning">
								<a href={ "/station/" + station.stationId } className="btn__link">&#8594;</a>
							</td>
						</tr>
					) ) }
					</tbody>
				</Table>
			</TableBorder>
		</Container>
	
	)
}

export default MostPopularStationTable;
