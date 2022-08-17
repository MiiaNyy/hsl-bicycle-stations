import { MongoDataSource } from "apollo-datasource-mongodb";
import getPaginationInfo from "../helpers/getPaginationInfo";

class Journeys extends MongoDataSource {
	// if page is not provided, it will be 1. If limit is not provided, it will be 10.
	async getJourneys (page = 1, limit) {
		return this.model.paginate( {}, { page, limit, collation : { locale : 'en' } }, async (err, result) => {
			if ( err ) {
				console.log( err );
			}
			console.log( "On getJourneys datasource. The limit is:", limit );
			return {
				journeys : result.docs,
				pagination : getPaginationInfo( result ),
			}
		} );
	}
	
	async getJourney (id) {
		return this.model.findById( id );
	}
	
	async getJourneysStartingFromStation (stationId) {
		return this.model.find( { departureStationId : stationId } );
	}
	
	async getJourneysReturnedToStation (stationId) {
		return this.model.find( { returnStationId : stationId } );
	}
}

export default Journeys;
