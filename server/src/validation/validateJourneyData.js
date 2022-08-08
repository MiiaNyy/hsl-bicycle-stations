import isNumber from "../helpers/isNumber";
import isString from "../helpers/isString";

function validateStationId (stationId) {
	return !( !isNumber( stationId ) );
}

function validateStationName (stationName) {
	return !( !isString( stationName ) );
}

function validateDate (date) {
	return date !== null;
}

function validateDuration (duration) {
	if ( !isNumber( duration ) ) return false;
	return duration >= 10;
}

function validateDistance (distance) {
	if ( !isNumber( distance ) || isNaN( distance ) ) {
		return false;
	}
	
	return distance >= 10;
}



function validateJourneyData (data, callback) {
	if ( !validateDuration( data.duration ) ) return;
	if ( !validateDistance( data.coveredDistance ) ) return;
	if ( !validateStationId( data.departureStationId ) ) return;
	if ( !validateStationId( data.returnStationId ) ) return;
	if ( !validateDate( data.departure ) ) return;
	if ( !validateDate( data['return'] ) ) return;
	
	callback()
}

export default validateJourneyData;
