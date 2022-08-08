function validateStationId (stationId) {
	return !( !isNumber( stationId ) );
}

function validateStationName (stationName) {
	return !( !isString( stationName ) );
}

function isString (str) {
	return str !== null && typeof str === 'string';
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

function isNumber (num) {
	return num !== null && typeof num === 'number';
}

function validateData (data, callback) {
	if ( !validateDuration( data.duration ) ) return;
	if ( !validateDistance( data.coveredDistance ) ) return;
	if ( !validateStationId( data.departureStationId ) ) return;
	if ( !validateStationId( data.returnStationId ) ) return;
	if ( !validateStationName( data.departureStationName ) ) return;
	if ( !validateStationName( data.returnStationName ) ) return;
	if ( !validateDate( data.departure ) ) return;
	if ( !validateDate( data['return'] ) ) return;
	
	callback()
}

export default validateData;
