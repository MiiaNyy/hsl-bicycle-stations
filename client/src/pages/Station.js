import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Table } from "react-bootstrap";


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
	
	if ( loading ) return <p>Loading...</p>;
	if ( error ) return <p>Error :(</p>;
	
	return (
		<div>
			
			<Row>
				<Col>
					<StationBasicInfo station={ data.getStation }/>
				</Col>
			</Row>
			<Row>
				<Col>
					<Row>
						<Col>
							<p className="info-header">Total number of <em>departing</em> journeys</p>
							<p>{ data.getStation.numOfJourneysStartingFrom }</p>
						</Col>
					</Row>
					<Row>
						<Col>
							<p className="info-header">Total number of <em>returning</em> journeys</p>
							<p>{ data.getStation.numOfJourneysReturningTo }</p>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<p className="info-header">Average distance driven, when departing</p>
				<p>{ data.getStation.averageDistanceStartingFrom }km</p>
				<p className="info-header">Average distance driven, when returning</p>
				<p>{ data.getStation.averageDistanceReturnedTo }km</p>
			</Row>
			<Row>
				<Col>
					<p className="info-header">Most popular starting stations when ending journey
						in { data.getStation.name }</p>
					
					<Table striped bordered>
						<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th></th>
						</tr>
						</thead>
						<tbody>
						{ data.getStation.mostPopularDepartureStationsForJourneysReturnedTo.map( station => (
							<tr key={ station.stationId }>
								<td>{ station.stationId }</td>
								<td>{ station.name }</td>
								<td>
									<a href={ "station/" + station.stationId }>&#8594;</a>
								</td>
							</tr>
						) ) }
						</tbody>
					</Table>
				</Col>
				<Col>
					<p className="info-header">Most popular ending stations when starting journey
						from { data.getStation.name }</p>
					
					<Table striped bordered>
						<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th></th>
						</tr>
						</thead>
						<tbody>
						{ data.getStation.mostPopularReturnStationsForJourneysStartingFrom.map( station => (
							<tr key={ station.stationId }>
								<td>{ station.stationId }</td>
								<td>{ station.name }</td>
								<td>
									<a href={ "station/" + station.stationId }>&#8594;</a>
								</td>
							</tr>
						) ) }
						</tbody>
					</Table>
				</Col>
			</Row>
		</div>
	)
}


function StationBasicInfo ({ station }) {
	return (
		<div>
			<Row className="m-auto text-center border-bottom borders">
				<Row className={ "borders m-auto" }>
					<h2>{ station.stationId } { station.name } station</h2>
				</Row>
				<Row className="m-auto mt-2 p-0 station__container">
					<Col sm={ 5 } className="borders ">
						<p className="info-header">Address</p>
						<p>{ station.address }</p>
					</Col>
					<Col xs className="borders">
						<p className="info-header">City</p>
						<p>{ station.city }</p>
					</Col>
					<Col xs className="borders">
						<p className="info-header">Capacity</p>
						<p>{ station.capacity }</p>
					</Col>
				</Row>
			</Row>
		</div>
	);
}


export default Station;
