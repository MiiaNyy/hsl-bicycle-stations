import { MongoDataSource } from "apollo-datasource-mongodb";
import getPaginationInfo from "../helpers/getPaginationInfo";


class Journeys extends MongoDataSource {
	
	async getJourneys (page, limit, filter) {
		// If there is no filter, return all journeys, otherwise return filtered journeys by month
		const query = getJourneyQuery( filter );
		console.log( "getJourneys", page, limit, query );
		const options = {
			page,
			limit,
			sort : {
				departure : 'asc',
			},
			collation : { locale : 'en' }
		};
		return this.model.paginate( query, options, async (err, result) => {
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

function getJourneyQuery (filter) {
	console.log( "getJourneyQuery", filter.month );
	
	if ( filter.month === 0 ){
		console.log( "getJourneyQuery", "no filter. Return ALL Journeys" );
		return {};
	}
	
	console.log( "getJourneyQuery", "filter. Return Journeys in month:", filter.month );
	// For some reason the time starts at 21:00:00 instead of 00:00:00. That's why we need to start from hour 3.
	const firstDay = new Date( 2021, filter.month - 1, 1, 3, 0, 0, 0 );
	const lastDay = new Date( 2021, filter.month, 0, 3, 0, 0, 0 );
	console.log( "firstDay", firstDay );
	console.log( "lastDay", lastDay );
	return {
		departure : {
			$gte : firstDay,
			$lte : lastDay,
		}
	};
}


export default Journeys;
