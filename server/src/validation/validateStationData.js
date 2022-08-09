import isNumber from "../helpers/isNumber";
import isString from "../helpers/isString";

function validateStationData (data, callback) {
	if ( !validateStationId( data.stationId ) ) return;
	if ( !isString( data.nameFIN ) ) return;
	if ( !isString( data.nameSWE ) ) return;
	if ( !isString( data.nameENG ) ) return;
	if ( !isString( data.addressFIN ) ) return;
	if ( !isString( data.addressSWE ) ) return;
	if ( !isString( data.cityFIN ) ) return;
	if ( !isString( data.citySWE ) ) return;
	if ( !validateCapacity( data.capacity ) ) return;
	callback();
}

function validateStationId (stationId) {
	return !( !isNumber( stationId ) );
}

function validateCapacity (capacity) {
	if ( !isNumber( capacity ) ) return false;
	return capacity >= 0;
}


export default validateStationData;
