import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import GoogleMapReact from 'google-map-react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Table } from "react-bootstrap";


const GET_STATION = gql`
    query Query($stationId: Int!) {
        getStation(stationId: $stationId) {
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
                city
            }
            mostPopularDepartureStationsForJourneysReturnedTo {
                stationId
                name
                city
            }
        }
    }
`;

function Station () {
	const { id } = useParams();
	const { loading, error, data } = useQuery( GET_STATION, {
		variables: { stationId: id },
	} );
	
	
	if ( loading ) return <p>Loading...</p>;
	if ( error ) {
		console.log( error );
		return <p>Error :(</p>;
	}
	
	return (
		<div>
			<h1>🎊 STATION VIEW</h1>
			<p>Station id: { id }</p>
			<Row>
				<Col>
					<StationInfoTable station={ data.getStation }/>
				</Col>
				
				<Col>
					<SimpleMap/>
				</Col>
			</Row>
		</div>
	)
}


function StationInfoTable ({ station }) {
	return (
		<Table striped bordered>
			<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Address</th>
				<th>City</th>
				<th>Capacity</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td>{ station.stationId }</td>
				<td>{ station.name }</td>
				<td>{ station.address }</td>
				<td>{ station.city }</td>
				<td>{ station.capacity }</td>
			</tr>
			</tbody>
		</Table>
	);
}


const AnyReactComponent = (
		  { text }
	  ) =>
		  <div>{ text }</div>
;

function SimpleMap () {
	const defaultProps = {
		center : {
			lat : 10.99835602,
			lng : 77.01502627
		},
		zoom : 11
	};
	
	return (
		<div style={ { height : '300px', maxWidth : '450px', width : '100%' } }>
			<GoogleMapReact
				bootstrapURLKeys={ { key : process.env.REACT_APP_GOOGLE_MAPS_API_KEY } }
				defaultCenter={ defaultProps.center }
				defaultZoom={ defaultProps.zoom }
			>
				<AnyReactComponent
					lat={ 59.955413 }
					lng={ 30.337844 }
					text="My Marker"
				/>
			</GoogleMapReact>
		</div>
	);
}


export default Station;
