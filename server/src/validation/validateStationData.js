import isNumber from "../helpers/isNumber";
import isString from "../helpers/isString";

function validateStationData (data, callback) {
	if ( !validateStationId( data.stationId ) ) return;
	if ( !isString( data.nameFIN ) ){
		console.log( "NameFIN is not a string" );
		return;
	}
	if ( !isString( data.nameSWE ) ) {
		console.log( "NameSWE is not a string" );
		return;
	}
	if ( !isString( data.nameENG ) ) {
		console.log( "NameENG is not a string" );
		return;
	}
	if ( !isString( data.addressFIN ) ){
		console.log( "AddressFIN is not a string" );
		return;
	}
	if ( !isString( data.addressSWE ) ) {
		console.log( "AddressSWE is not a string" );
		return;
	}
	if ( !isString( data.cityFIN ) ) {
		console.log( "CityFIN is not a string" );
		return;
	}
	if ( !isString( data.citySWE ) ) {
		console.log( "CitySWE is not a string" );
		return;
	}
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
