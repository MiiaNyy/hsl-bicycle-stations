import { gql, useQuery } from "@apollo/client";

import { useState } from "react";

import { Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import TableBorder from "./TableBorder";
import TableDataBorder from "./TableDataBorder";
import LoadingSpinner from "./LoadingSpinner";

import Error from "./Error";
import PaginationButtons from "./PaginationButtons";
import addSpaceBetweenDigits from "../../helpers/addSpaceBetweenDigits";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableHeadRow from "./TableHeadRow";

const GET_STATIONS = gql`
    query Query($page: Int, $limit: Int) {
        getStations(page: $page, limit: $limit) {
            stations {
                stationId
                name
                capacity
                city
            }
            pagination {
                totalDocs
                limit
                totalPages
                page
                hasNextPage
                hasPrevPage
                nextPage
                prevPage
            }
        }
    }
`;

function StationsTable () {
	
	const [currentPage, setCurrentPage] = useState( 1 );
	const [limit, setLimit] = useState( 10 );
	
	const { loading, error, data } = useQuery( GET_STATIONS, {
		variables : {
			"page" : currentPage,
			"limit" : limit
		},
	} );
	
	if ( loading ) return <LoadingSpinner/>;
	if ( error ) return <Error error={ error }/>;
	
	const stations = data.getStations.stations;
	const pagination = data.getStations.pagination;
	
	return (
		<>
			<h3 className="mb-3">HSL Bicycle Stations</h3>
			<Container>
				<TableHeadRow pagination={ pagination } setLimit={ setLimit } tableName={ "stations" }
							  currentLimit={ limit }/>
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
						{ stations.map( station => (
							<TableRow key={ station.stationId + Math.random() } station={ station }/>
						) ) }
						</tbody>
					</Table>
				</TableBorder>
				<PaginationButtons pageSetter={ setCurrentPage } pagination={ pagination }/>
			</Container>
		</>
	
	);
}

function TableRow ({ station }) {
	
	return (
		<tr key={ station.stationId + Math.random() }>
			<TableDataBorder>{ station.stationId }</TableDataBorder>
			<TableDataBorder>{ station.name }</TableDataBorder>
			<TableDataBorder>{ station.city }</TableDataBorder>
			<TableDataBorder>{ station.capacity }</TableDataBorder>
			<td>
				<a href={ "/station/" + station.stationId } className="btn__link">&#8594;</a>
			</td>
		</tr>
	);
}

export default StationsTable;
