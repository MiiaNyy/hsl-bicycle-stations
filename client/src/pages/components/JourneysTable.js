import { gql, useQuery } from "@apollo/client";

import { Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import { useState } from "react";

import PaginationButtons from "./PaginationButtons";
import TableHeadRow from "./TableHeadRow";
import TableBorder from "./TableBorder";
import TableDataBorder from "./TableDataBorder";
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import getMonthAndDay from "../../helpers/getMonthAndDay";

const GET_JOURNEYS = gql`
    query Query($page: Int, $limit: Int, $query: JourneyQuery, $sort: JourneySort) {
        getJourneys(page: $page, limit: $limit, query: $query, sort: $sort) {
            journeys {
                id
                coveredDistance
                duration
                departure
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
	const [limit, setLimit] = useState( 10 );
	const [query, setQuery] = useState( {} );
	const [sort, setSort] = useState( { field : "departure", value : "asc" } );
	
	const [duration, setDuration] = useState( "asc" );
	const [distance, setDistance] = useState( "asc" );
	
	const { loading, error, data } = useQuery( GET_JOURNEYS, {
		variables : {
			"page" : currentPage,
			"limit" : limit,
			"query" : query,
			"sort" : sort
		},
	} );
	
	if ( loading ) return <LoadingSpinner/>;
	if ( error ) return <Error error={ error }/>;
	
	const journeys = data.getJourneys.journeys;
	const pagination = data.getJourneys.pagination;
	
	return (
		<>
			<Container>
				<TableHeadRow pagination={ pagination } setLimit={ setLimit } currentLimit={ limit } query={ query }
							  setQuery={ setQuery }/>
				<TableBorder>
					<Table striped borderless responsive="xl" className="mb-0 text-center">
						<thead className="border-bottom border-2 bg-warning">
						<tr>
							<th>Date</th>
							<th>
								Covered Distance
								<i className="fa-solid fa-angle-down arrow-icon"
								   onClick={ () => {
									   setDistance( (current) => current === "asc" ? "desc" : "asc" );
									   setSort({ field : "coveredDistance", value : distance })
								   } }></i>
							</th>
							<th>Duration
								<i className="fa-solid fa-angle-down arrow-icon"
								   onClick={ () => {
									   setDuration( (current) => current === "asc" ? "desc" : "asc" );
									   setSort({ field : "duration", value : duration })
								   } }></i>
							</th>
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
		</>
	)
}


function TableRow ({ journey }) {
	const departureStation = journey.departureStation;
	const returnStation = journey.returnStation;
	
	return (
		<tr key={ journey.id }>
			<TableDataBorder><p className="m-1">{ getMonthAndDay( journey.departure ) }</p></TableDataBorder>
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
