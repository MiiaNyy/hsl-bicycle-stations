import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { gql, useQuery } from "@apollo/client";


const GET_JOURNEY = gql`
    query Query($getJourneyId: ID!) {
        getJourney(id: $getJourneyId) {
            id
            departure
            return
            departureStation {
                stationId
                name
                city
            }
            returnStation {
                stationId
                name
                city
            }
            coveredDistance
            duration
        }
    }`;

function getDate (date) {
	const today = new Date( date );
	const journeysDate = today.toISOString().split( 'T' )[0];
	const journeysTime = today.toISOString().split( 'T' )[1].split( '.' )[0];
	return journeysDate + " " + journeysTime;
}

function formatDate (date) {
	return new Date( date ).toISOString().split( 'T' )[0];
}

function formatTime (date) {
	return new Date( date ).toISOString().split( 'T' )[1].split( '.' )[0];
}

function Journey () {
	const { id } = useParams();
	
	const { loading, error, data } = useQuery( GET_JOURNEY, {
		variables : { getJourneyId : id },
	} );
	
	if ( loading ) return <p>Loading...</p>;
	if ( error ) return <p>Error :(</p>;
	
	const journey = data.getJourney;
	
	return (
		<div className="text-center station__container">
			<h1 className="mb-4 ">Bicycle journey, {journey.coveredDistance}km</h1>
			<Row className="border border-2 border-warning rounded box-shadow">
				<Col xs className="border-end border-warning">
					<p className="info-header">Start</p>
					<p>{ formatDate(journey.departure) }</p>
					<p>{ formatTime(journey.departure) }</p>
				</Col>
				<Col xs className="border-end border-warning">
					<p className="info-header">End</p>
					<p>{ formatDate(journey.return) }</p>
					<p>{ formatTime(journey.return) }</p>
				</Col>
				<Col xs className="">
					<p className="info-header">Duration</p>
					<p>{ journey.duration } min</p>
				</Col>
			</Row>
			<StationContainer journeysStation={ journey.departureStation } station={ "Departure" }/>
			<StationContainer journeysStation={ journey.returnStation } station={ "Return" }/>
		
		</div>
	);
}

function StationContainer ({ journeysStation, station }) {
	return (
		<Row className="border border-2 border-warning rounded mt-2 box-shadow">
			<h4 className="pt-2 pb-2">{ station } station</h4>
			<Col className="border-end border-warning">
				<p className="info-header">ID</p>
				<p>{ journeysStation.stationId }</p>
			</Col>
			<Col className="border-end border-warning">
				<p className="info-header">Name</p>
				<p><a href={ "station/" + journeysStation.stationId }
					  className="link-secondary"> { journeysStation.name }</a>
				</p>
			</Col>
			<Col>
				<p className="info-header">City</p>
				<p>{ journeysStation.city }</p>
			</Col>
		
		
		</Row>
	)
}


export default Journey;
