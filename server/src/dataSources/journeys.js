import { MongoDataSource } from "apollo-datasource-mongodb";
import getPaginationInfo from "../helpers/getPaginationInfo";

const options = {
	page : 1,
	limit : 10,
	collation : {
		locale : 'en',
	},
};

class Journeys extends MongoDataSource {
	// if page is not provided, it will be 1. If limit is not provided, it will be 10.
	async getJourneys (page = 3, limit = 10) {
		console.log( "getJourneys page and limit:", page, limit );
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
