import { MongoDataSource } from "apollo-datasource-mongodb";
import getPaginationInfo from "../helpers/getPaginationInfo";


class Journeys extends MongoDataSource {
	
	async getJourneys (page, limit, filter) {
		const query = !filter ? {} : getMonthFilter( filter );
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

function getMonthFilter (month) {
	// For some reason the time starts at 21:00:00 instead of 00:00:00. That's why we need to start from hour 3.
	const firstDay = new Date( 2021, month - 1, 1, 3, 0, 0, 0 );
	const lastDay = new Date( 2021, month, 0, 3, 0, 0, 0 );
	return {
		departure : {
			$gte : firstDay,
			$lte : lastDay,
		}
	};
}


export default Journeys;
