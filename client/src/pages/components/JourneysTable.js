import { gql, useQuery } from "@apollo/client";

import { Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Pagination from 'react-bootstrap/Pagination';


import TableBorder from "./TableBorder";
import TableDataBorder from "./TableDataBorder";
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import PaginationButtons from "./PaginationButtons";

const GET_JOURNEYS = gql`
    query Query($page: Int, $limit: Int) {
        getJourneys(page: $page, limit: $limit) {
            journeys {
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
    }`;

function JourneysTable () {
	
	const [currentPage, setCurrentPage] = useState( 1 );
	
	
	const { loading, error, data } = useQuery( GET_JOURNEYS, {
		variables : {
			"page" : currentPage,
			"limit" : 10
		},
	} );
	
	if ( loading ) return <LoadingSpinner/>;
	if ( error ) return <Error error={ error }/>;
	
	const journeys = data.getJourneys.journeys;
	const pagination = data.getJourneys.pagination;
	
	
	return (
		<Container>
			<p>Journeys { currentPage * pagination.limit } / { pagination.totalDocs }</p>
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
					{ journeys.map( journey => (
						<TableRow key={ journey.id } journey={ journey }/>
					) ) }
					</tbody>
				</Table>
			</TableBorder>
			<PaginationButtons pageSetter={ setCurrentPage } pagination={ pagination }/>
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
