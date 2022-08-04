
function validateStationId (stationId) {
	if ( !isNumber( stationId ) ) return false;
	return true;
}

function validateStationName (stationName) {
	if ( !isString( stationName ) ) return false;
	return true;
}

function isString (str) {
	return str !== null && typeof str === 'string';
}

function validateDate (date) {
	if ( date === null ) return false;
	return true;
}

function dateIsValid (date) {
	return date instanceof Date && !isNaN( date );
}

function validateDuration (duration) {
	if ( !isNumber( duration ) ) return false;
	if ( duration < 10 ) return false;
	return true;
}

function validateDistance (distance) {
	if ( !isNumber( distance ) ) return false;
	if ( distance < 10 ) return false;
	return true;
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
