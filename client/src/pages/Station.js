import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Table } from "react-bootstrap";
import TableBorder from "./components/TableBorder";
import Container from "react-bootstrap/Container";
import TableDataBorder from "./components/TableDataBorder";
import LoadingSpinner from "./components/LoadingSpinner";


const GET_STATION = gql`
    query Query($getStationId: Int!) {
        getStation(id: $getStationId) {
            stationId
            name
            address
            city
            capacity
            numOfJourneysStartingFrom
            numOfJourneysReturningTo
            averageDistanceStartingFrom
            averageDistanceReturnedTo
            mostPopularReturnStationsForJourneysStartingFrom {
                stationId
                name
            }
            mostPopularDepartureStationsForJourneysReturnedTo {
                stationId
                name
            }
        }
    }
`;


function Station () {
	const { id } = useParams();
	
	const { loading, error, data } = useQuery( GET_STATION, {
		variables : { getStationId : Number( id ) }, // From params it is String, but we need Number
	} );
	
	if ( loading ) return <LoadingSpinner/>;
	if ( error ) return <p>Error :(</p>;
	
	const station = data.getStation;
	
	return (
		<div>
			
			<Row>
				<StationBasicInfo station={ station }/>
			</Row>
			
			<Row className="mt-5 mb-5 text-center">
				<h4 className="mb-3">Top 5 most popular...</h4>
				<Col md>
					<p className="info-header mb-2">Departure stations for journeys <em>ending</em> at { station.name }
					</p>
					<MostPopularStationTable stations={ station.mostPopularDepartureStationsForJourneysReturnedTo }/>
				</Col>
				<Col>
					<p className="info-header mb-2">Return stations for journeys <em>starting</em> from { station.name }:
					</p>
					<MostPopularStationTable stations={ station.mostPopularReturnStationsForJourneysStartingFrom }/>
				</Col>
			</Row>
		</div>
	)
}

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


function StationBasicInfo ({ station }) {
	return (
		<div className="text-center station__container">
			<h1 className="mb-4 ">{ station.stationId }, { station.name }</h1>
			<Row className=" ">
			</Row>
			<Row className="border border-2 border-warning rounded box-shadow">
				<Col sm={ 5 } className="border-end border-warning">
					<p className="info-header">Address</p>
					<p>{ station.address }</p>
				</Col>
				<Col xs className="border-end border-warning">
					<p className="info-header">City</p>
					<p>{ station.city }</p>
				</Col>
				<Col xs className="">
					<p className="info-header">Capacity</p>
					<p>{ station.capacity }</p>
				</Col>
			</Row>
			<Row className="border border-2 border-warning rounded mt-2 box-shadow">
				<h4 className="pt-2 pb-2">Total number of...</h4>
				<Col className="border-end border-warning">
					<p className="info-header"><em>Departing</em> journeys</p>
					<p>{ station.numOfJourneysStartingFrom }</p>
				</Col>
				<Col>
					<p className="info-header"><em>Returning</em> journeys</p>
					<p>{ station.numOfJourneysReturningTo }</p>
				</Col>
			
			</Row>
			<Row className="border border-2 border-warning rounded pt-2 mt-2 box-shadow">
				<h4 className="pt-2 pb-2">Average distance travelled...</h4>
				<Col className="border-end border-warning">
					<p className="info-header">From here</p>
					<p>{ station.averageDistanceStartingFrom }km</p>
				</Col>
				<Col>
					<p className="info-header">To here</p>
					<p>{ station.averageDistanceReturnedTo }km</p>
				</Col>
			</Row>
		</div>
	);
}


export default Station;
