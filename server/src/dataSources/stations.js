import { MongoDataSource } from "apollo-datasource-mongodb";

const options = {
	page : 2,
	limit : 10,
	collation : {
		locale : 'en',
	},
}

class Stations extends MongoDataSource {
	
	async getStations () {
		return this.model.paginate( {}, options, async (err, result) => {
			if ( err ) {
				console.log( err );
			}
			return {
				stations: result.docs,
				pagination: {
					totalDocs: result.totalDocs,
					limit : result.limit,
					totalPages: result.totalPages,
					page: result.page,
					hasNextPage: result.hasNextPage,
					hasPrevPage: result.hasPrevPage,
					nextPage: result.nextPage,
					prevPage: result.prevPage,
				}
			}
		} );
	}
	
	async getStation (id) {
		return this.model.findOne( { stationId : id } );
	}
	
	async getMultipleStations (ids) {
		return this.model.find( { stationId : ids } );
	}
}

export default Stations;
