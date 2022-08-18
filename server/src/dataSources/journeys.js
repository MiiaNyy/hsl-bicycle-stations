import { MongoDataSource } from "apollo-datasource-mongodb";
import getPaginationInfo from "../helpers/getPaginationInfo";



class Journeys extends MongoDataSource {

	async getJourneys (page, limit) {
		return this.model.paginate( {}, { page, limit, collation : { locale : 'en' } }, async (err, result) => {
			if ( err ) {
				console.log( err );
			}
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
